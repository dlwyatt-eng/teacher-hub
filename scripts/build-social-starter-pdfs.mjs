// Run with node, then python scripts/render-social-starter-pdfs.py.
// The student PDFs use the same React content as the on-screen materials.
import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
const out = '/tmp/social-starter-render';
await mkdir(out,{recursive:true});
const result = await build({entryPoints:['app/social-studies-starters.tsx'],bundle:true,write:false,platform:'node',format:'esm',jsx:'automatic'});
await writeFile(`${out}/starter.mjs`,result.outputFiles[0].text);
const {default:Starter} = await import(`${out}/starter.mjs`);
const {renderToStaticMarkup} = await import('react-dom/server');
const {createElement} = await import('react');
const ids=['city-moves','data-skyline','supply-chain-shockwave','cooperation-control-room','pull-the-system-thread','responses-under-pressure','make-it-teachable','expert-exchange'];
for(const id of ids) await writeFile(`${out}/${id}.html`,renderToStaticMarkup(createElement(Starter,{lessonId:id})));
console.log(`Rendered ${ids.length} student material sheets.`);
