import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const images = [
  ["group", "purity-group.webp"],
  ["writing", "purity-writing.webp"],
  ["one", "purity-one-on-one.webp"],
];

function readChunkedBase64(source) {
  const dir = path.join(root, "src", "media", "generated", source);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(name => name.endsWith(".b64")).sort();
    if (!files.length) throw new Error("No image chunks found for " + source);
    return files.map(name => fs.readFileSync(path.join(dir, name), "utf8").trim()).join("");
  }
  return fs.readFileSync(path.join(root, "src", "media", "generated", source + ".b64"), "utf8").trim();
}

for (const [source, output] of images) {
  const outputPath = path.join(root, "public", output);
  const encoded = readChunkedBase64(source);
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.length < 40000) {
    throw new Error(source + " image decoded to only " + bytes.length + " bytes; refusing low-quality asset.");
  }
  fs.writeFileSync(outputPath, bytes);
  console.log("materialized " + output + ": " + bytes.length + " bytes");
}
