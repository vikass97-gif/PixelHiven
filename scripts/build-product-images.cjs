const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const mapping = JSON.parse(
  fs.readFileSync("data/product-image-map.json", "utf8")
);

const extensions = [".png", ".jpg", ".jpeg", ".webp"];

function findSource(basePath) {
  for (const extension of extensions) {
    const candidate = `${basePath}${extension}`;

    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function main() {
  const families = new Map();

  for (const item of mapping) {
    if (!families.has(item.family)) {
      families.set(item.family, item);
    }
  }

  const missing = [];
  const completed = [];

  for (const item of families.values()) {
    const source = findSource(item.sourceFile);

    if (!source) {
      missing.push(item.family);
      console.log(`❌ Source manquante : ${item.family}`);
      continue;
    }

    const target = path.join(
      process.cwd(),
      "public",
      item.targetImage.replace(/^\/+/, "")
    );

    fs.mkdirSync(path.dirname(target), { recursive: true });

    try {
      const metadata = await sharp(source).metadata();

      if (!metadata.width || !metadata.height) {
        throw new Error("Dimensions invalides");
      }

      await sharp(source)
        .rotate()
        .resize({
          width: 1200,
          height: 900,
          fit: "contain",
          background: {
            r: 248,
            g: 250,
            b: 252,
            alpha: 1,
          },
          withoutEnlargement: false,
        })
        .webp({
          quality: 86,
          effort: 5,
        })
        .toFile(target);

      completed.push(item.family);
      console.log(`✅ Créée : ${item.targetImage}`);
    } catch (error) {
      missing.push(item.family);
      console.error(`❌ Image invalide : ${source}`);
      console.error(error.message);
    }
  }

  fs.writeFileSync(
    "data/product-images-missing.txt",
    missing.join("\n") + (missing.length ? "\n" : ""),
    "utf8"
  );

  fs.writeFileSync(
    "data/product-images-completed.txt",
    completed.join("\n") + (completed.length ? "\n" : ""),
    "utf8"
  );

  console.log("");
  console.log(`Images créées : ${completed.length}`);
  console.log(`Images manquantes ou invalides : ${missing.length}`);

  if (missing.length > 0) {
    console.log("Voir : data/product-images-missing.txt");
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Image build failed:", error);
  process.exitCode = 1;
});
