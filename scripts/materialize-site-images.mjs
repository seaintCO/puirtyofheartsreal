import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const images = [
  ["group", "purity-group.avif"],
  ["writing", "purity-writing.avif"],
  ["one", "purity-one-on-one.avif"],
];

for (const [source, output] of images) {
  const sourcePath = path.join(root, "src", "media", "generated", source + ".b64");
  const outputPath = path.join(root, "public", output);
  const encoded = fs.readFileSync(sourcePath, "utf8").trim();
  const bytes = Buffer.from(encoded, "base64");

  if (bytes.length < 10000) {
    throw new Error(source + " image decoded to only " + bytes.length + " bytes; refusing blurry/truncated asset.");
  }

  fs.writeFileSync(outputPath, bytes);
  console.log("materialized " + output + ": " + bytes.length + " bytes");
}
