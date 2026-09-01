import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../pages-dist/", import.meta.url));
const base = "/teacher-hub";
const publicRoots = ["images", "downloads", "printables", "icons"];

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  }))).flat();
}

for (const file of await files(root)) {
  if (!/\.(?:html|css|js)$/.test(file)) continue;
  let content = await readFile(file, "utf8");
  for (const folder of publicRoots) {
    // Rewrite only root-relative public assets. A broad replace also mutates
    // authoritative external URLs whose path happens to contain /images/,
    // /downloads/, /printables/, or /icons/.
    content = content.replace(new RegExp(`(?<![A-Za-z0-9])/${folder}/`, "g"), `${base}/${folder}/`);
  }
  content = content.replaceAll('href="/favicon.svg"', `href="${base}/favicon.svg"`);
  await writeFile(file, content);
}
