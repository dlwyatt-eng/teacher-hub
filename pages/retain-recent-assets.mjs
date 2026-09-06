import { cp, mkdir, readdir, rm, rename } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Keep two recent successful asset generations for tabs open across a release.
// Never restore an old index.html or overwrite an asset emitted by this build.
export async function retainRecentAssets(dist, history) {
  const assets = path.join(dist, 'assets');
  const next = `${history}.next`;
  await rm(next, { recursive: true, force: true });
  await mkdir(next, { recursive: true });
  await cp(assets, path.join(next, 'current'), { recursive: true });
  let retained = 0;
  for (const generation of ['current', 'previous']) {
    const directory = path.join(history, generation);
    let entries;
    try { entries = await readdir(directory, { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    for (const entry of entries) {
      if (!entry.isFile() || !/-[\w-]{8,}\.[\w.]+$/.test(entry.name)) continue;
      await cp(path.join(directory, entry.name), path.join(assets, entry.name), { force: false, errorOnExist: false });
      retained++;
    }
    if (generation === 'current') await cp(directory, path.join(next, 'previous'), { recursive: true });
  }
  await rm(history, { recursive: true, force: true });
  await rename(next, history);
  return retained;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const count = await retainRecentAssets(path.resolve('pages-dist'), path.resolve('.pages-asset-history'));
  console.log(`Retained ${count} recent asset files; current entry page remains unchanged.`);
}
