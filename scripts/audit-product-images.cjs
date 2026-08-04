const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

function slugify(value) {
  return String(value || "uncategorized")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function csv(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      image: true,
    },
    orderBy: [
      { category: "asc" },
      { title: "asc" },
    ],
  });

  let validLocalImages = 0;
  let missingLocalImages = 0;
  let remoteImages = 0;

  const categoryCounts = new Map();

  const rows = products.map((product) => {
    const categoryFolder = slugify(product.category);
    const targetImage =
      `/images/products/catalog/${categoryFolder}/${product.slug}.webp`;

    let status = "missing";

    if (/^https?:\/\//i.test(product.image || "")) {
      status = "remote";
      remoteImages += 1;
    } else if (product.image?.startsWith("/")) {
      const localPath = path.join(
        process.cwd(),
        "public",
        product.image.replace(/^\/+/, "")
      );

      if (fs.existsSync(localPath)) {
        status = "local-ok";
        validLocalImages += 1;
      } else {
        status = "local-missing";
        missingLocalImages += 1;
      }
    } else {
      missingLocalImages += 1;
    }

    categoryCounts.set(
      product.category,
      (categoryCounts.get(product.category) || 0) + 1
    );

    return [
      product.id,
      product.slug,
      product.title,
      product.category,
      product.image,
      status,
      targetImage,
    ].map(csv).join(",");
  });

  const header = [
    "id",
    "slug",
    "title",
    "category",
    "currentImage",
    "status",
    "targetImage",
  ].map(csv).join(",");

  fs.writeFileSync(
    "data/product-image-plan.csv",
    [header, ...rows].join("\n") + "\n",
    "utf8"
  );

  const categories = [...categoryCounts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, count]) => `${category}: ${count}`)
    .join("\n");

  const summary = [
    `Total products: ${products.length}`,
    `Valid local images: ${validLocalImages}`,
    `Missing local images: ${missingLocalImages}`,
    `Remote images: ${remoteImages}`,
    "",
    "Products by category:",
    categories,
  ].join("\n");

  fs.writeFileSync(
    "data/product-image-summary.txt",
    summary + "\n",
    "utf8"
  );

  console.log(summary);
  console.log("");
  console.log("Report created: data/product-image-plan.csv");
}

main()
  .catch((error) => {
    console.error("Image audit failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
