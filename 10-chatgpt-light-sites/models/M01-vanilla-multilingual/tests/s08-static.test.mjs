import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
const page = await readFile(join(site, 'en/index.html'), 'utf8');
const chooser = await readFile(join(site, 'index.html'), 'utf8');
const source = JSON.parse(await readFile(join(root,'content/i18n.v1.json'), 'utf8'));
test('S08 real English Home has semantic metadata, lang/dir and page heading', () => {
  assert.match(page, /<html lang="en" dir="ltr">/);
  assert.match(page, /<meta name="viewport"/);
  assert.match(page, /<main id="main-content" tabindex="-1">/);
  assert.match(page, /<h1 id="hero-heading">/);
  assert(page.includes(source.locales.en.views.home.title));
  assert(page.includes(source.locales.en.views.home.h1));
  assert.match(page, /name="robots" content="noindex,nofollow"/);
});
test('S08 carries six services, three DEMO work cards, six synthetic products', () => {
  assert.equal((page.match(/class="card service-card"/g)??[]).length, 6);
  assert.equal((page.match(/class="card work-card"/g)??[]).length, 3);
  assert.equal((page.match(/class="card kit-card"/g)??[]).length, 6);
  assert.match(page, /no real payment/i);
});
test('S08 page uses shared CSS and same-origin native module only', async () => {
  for (const rel of ['assets/css/tokens.css','assets/css/base.css','assets/css/components.css','assets/js/main.js','assets/img/nova-hero-original.svg']) {
    assert((await stat(join(site,rel))).isFile(), rel);
    assert(page.includes('/'+rel), rel);
  }
  assert(!/<script[^>]+https?:\/\//.test(page));
  assert(!/<form/.test(page));
});
test('S08 anchor navigation has no missing targets', () => {
  for (const match of page.matchAll(/href="#([\w-]+)"/g)) assert(page.includes('id="'+match[1]+'"'), match[1]);
  assert.match(chooser, /href="\/en\/"/);
});
test('S08 regression with S11 links: built pages reachable, future pages absent', () => {
  for (const l of ['fa','en','ar','tr','de']) assert(page.includes('href="/'+l+'/'),l);
  for (const kind of ['services','work','catalog']) assert(page.includes('href="/en/'+kind+'/'),kind+' built link');
  for (const kind of ['contact','demo-checkout']) assert(!page.includes('href="/en/'+kind+'/'),kind+' future');
});
test('S08 actual image is bitwise identical to original approved S06 SVG', async () => {
  const [original,copy]=await Promise.all([
    readFile(join(root,'design/nova-hero-original.svg')),
    readFile(join(site,'assets/img/nova-hero-original.svg'))
  ]);
  assert(original.equals(copy));
});
