const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const srcDir = path.join(
  __dirname,
  "..",
  "..",
  "Gallery"
);
const outDir = path.join(__dirname, "..", "public", "images", "gallery");

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort();

async function main() {
  const manifest = [];
  let i = 1;
  for (const file of files) {
    const outName = `gallery-${String(i).padStart(2, "0")}.jpg`;
    const srcPath = path.join(srcDir, file);
    const outPath = path.join(outDir, outName);

    const image = sharp(srcPath).rotate(); // auto-orient from EXIF
    const resized = image.resize({
      width: 1800,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    });
    const buffer = await resized.jpeg({ quality: 82 }).toBuffer();
    const meta = await sharp(buffer).metadata();
    fs.writeFileSync(outPath, buffer);

    manifest.push({
      src: `/images/gallery/${outName}`,
      width: meta.width,
      height: meta.height,
    });
    console.log(
      `${file} -> ${outName} (${meta.width}x${meta.height}, ${Math.round(
        fs.statSync(srcPath).size / 1024
      )}KB -> ${Math.round(buffer.length / 1024)}KB)`
    );
    i++;
  }

  fs.writeFileSync(
    path.join(__dirname, "gallery-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("\nDone. Manifest written to scripts/gallery-manifest.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
