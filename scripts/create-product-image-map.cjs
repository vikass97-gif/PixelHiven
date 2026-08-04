const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

function getFamily(slug) {
  const rules = [
    ["chatgpt-plus", "chatgpt-plus"],
    ["jetbrains-", "jetbrains"],
    ["office-365-e3-", "microsoft-365-copilot"],
    ["parallels-desktop-", "parallels-desktop"],
    ["power-bi-", "power-bi-pro"],
    ["visual-studio-2022-", "visual-studio-2022"],
    ["vmware-workstation-", "vmware-workstation-17"],

    ["adobe-acrobat-", "adobe-acrobat-pro"],
    ["adobe-creative-cloud-", "adobe-creative-cloud"],
    ["autodesk-commercial-autocad-", "autocad-commercial"],
    ["canva-pro-", "canva-pro"],
    ["capcut-pro-", "capcut-pro"],
    ["final-cut-pro-", "final-cut-pro"],
    ["logic-pro-", "logic-pro"],
    ["sketchup-pro-", "sketchup-pro"],

    ["office-2019-", "office-2019-professional-plus"],
    ["office-2021-", "office-2021-professional-plus"],
    ["office-2024-excel-", "office-2024-excel"],
    ["office-2024-word-", "office-2024-word"],
    ["office-365-a3-", "office-365-a3"],
    ["office-365-family-", "microsoft-365-family"],
    ["office-ltsc-professional-plus-2024-", "office-ltsc-2024"],
    ["project-professional-2021-", "project-professional-2021"],
    ["visio-professional-2021-", "visio-professional-2021"],

    ["eset-nod32-", "eset-nod32"],
    ["kaspersky-internet-security-", "kaspersky-internet-security"],
    ["mcafee-total-protection-", "mcafee-total-protection"],
    ["nitro-pdf-pro-", "nitro-pdf-pro-14"],
    ["norton-360-", "norton-360-premium"],

    ["server-2022-", "windows-server-2022"],
    ["server-2025-", "windows-server-2025"],
    ["sql-server-2022-", "sql-server-2022"],
    ["sql-server-2025-", "sql-server-2025"],
    ["windows-1011-enterprise-", "windows-enterprise"],
    ["windows-1110-home-", "windows-home"],
    ["windows-1110-pro-", "windows-pro"],
    ["windows-server-2022-remote-", "windows-server-2022-rds"],

    ["dazn-", "dazn"],
    ["expressvpn-", "expressvpn"],
    ["idm-internet-download-manager-", "internet-download-manager"],
    ["spotify-premium-", "spotify-premium"],
  ];

  const match = rules.find(([prefix]) => slug.startsWith(prefix));
  return match ? match[1] : slug;
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

  const mapping = products.map((product) => {
    const family = getFamily(product.slug);

    return {
      id: product.id,
      slug: product.slug,
      title: product.title,
      category: product.category,
      family,
      currentImage: product.image,
      sourceFile: `assets/product-images-source/${family}`,
      targetImage: `/images/products/brands/${family}.webp`,
    };
  });

  fs.writeFileSync(
    "data/product-image-map.json",
    JSON.stringify(mapping, null, 2) + "\n",
    "utf8"
  );

  const families = [...new Set(mapping.map((item) => item.family))].sort();

  fs.writeFileSync(
    "data/product-image-sources-needed.txt",
    families
      .map(
        (family) =>
          `${family}.png OR ${family}.jpg OR ${family}.webp`
      )
      .join("\n") + "\n",
    "utf8"
  );

  console.log(`✅ ${products.length} produits mappés`);
  console.log(`✅ ${families.length} visuels professionnels nécessaires`);
  console.log("✅ Mapping : data/product-image-map.json");
  console.log("✅ Liste : data/product-image-sources-needed.txt");
}

main()
  .catch((error) => {
    console.error("Mapping failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
