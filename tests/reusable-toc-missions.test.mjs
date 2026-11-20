import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source = fs.readFileSync(new URL('../app/toc-resource-library.tsx', import.meta.url), 'utf8');
test('reusable mission downloads exist on the existing TOC resource route', () => {
  for (const name of ['night-market-rescue-low-ink.pdf', 'midnight-museum-low-ink.pdf']) {
    assert.ok(source.includes("${import.meta.env.BASE_URL}printables/" + name));
    const bytes = fs.readFileSync(new URL(`../public/printables/${name}`, import.meta.url));
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
    assert.ok(bytes.length > 10000);
  }
});
test('reuse and public privacy boundaries stay explicit', () => {
  assert.match(source, /Both are undated/);
  assert.match(source, /not new assignments/);
  assert.match(source, /download route is not access-controlled/);
  assert.match(source, /two extra blank sheets/);
  assert.doesNotMatch(source, /Friday_Field_Files|libfile_fde3/);
});
