import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { buildPublicManifest } from "./public-window-projection.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "content", "current-learning-window-v2.json");
const outputPath = path.join(root, "public", "generated", "public-window-v2.json");

const source = JSON.parse(await readFile(sourcePath, "utf8"));
const existing = JSON.parse(await readFile(outputPath, "utf8"));

const next = buildPublicManifest(existing, source);
await writeFile(outputPath, `${JSON.stringify(next, null, 2)}\n`);

console.log(`Synced ${path.relative(root, outputPath)} from ${path.relative(root, sourcePath)}.`);
