import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, stat } from 'node:fs/promises';
import {dirname, resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const model=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=join(model,'site');
const content=JSON.parse(await readFile(join(model,'content/i18n.v1.json'),'utf8'));
const langs=['fa','en','ar','tr','de'];
const pages=Object.fromEntries(await Promise.all(langs.map(async l=>[l,await readFile(join(site,l,'index.html'),'utf8')])));
const chooser=await readFile(join(site,'index.html'),'utf8');
const escapeHTML=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

test('S08 five real Home HTML files use S07 copy and correct lang/dir',()=>{
 for(const l of langs){
  const page=pages[l],loc=content.locales[l];
  assert(page.includes('<html lang="'+l+'" dir="'+loc.dir+'">'),l+' lang/dir');
  assert(page.includes('<title>'+escapeHTML(loc.views.home.title)+'</title>'),l+' title');
  assert(page.includes(escapeHTML(loc.views.home.description)),l+' description');
  assert(page.includes(escapeHTML(loc.views.home.h1)),l+' H1');
  assert(page.includes(escapeHTML(loc.views.home.lead)),l+' intro');
  assert(page.includes('<main id="main-content" tabindex="-1">'),l+' main');
  assert(page.includes('noindex,nofollow'),l+' preview noindex');
  assert(!page.includes('aria-disabled="true"'),l+' no disabled locale');
 }
});
test('S08 all 25 language-switch links point to existing equivalent Home pages',()=>{
 for(const [lang,page] of Object.entries(pages)){
  assert.equal((page.match(/<a href="\/(?:fa|en|ar|tr|de)\/" lang=/g)??[]).length,5,lang+' switches');
  for(const target of langs)assert(page.includes('<a href="/'+target+'/" lang="'+target+'"'),lang+'->'+target);
  assert(page.includes('href="/'+lang+'/" aria-label="NOVA Atelier'),lang+' brand');
  assert.equal((page.match(/aria-current="page"/g)??[]).length,2,lang+' active nav and locale');
 }
});
test('S08 each locale has six services, three DEMO cases and six kits',()=>{
 for(const [l,page] of Object.entries(pages)){
  assert.equal((page.match(/class="card service-card"/g)??[]).length,6,l+' services');
  assert.equal((page.match(/class="card work-card"/g)??[]).length,3,l+' work');
  assert.equal((page.match(/class="card kit-card"/g)??[]).length,6,l+' kits');
  assert(page.includes(escapeHTML(content.locales[l].ui.noPayment)),l+' demo notice');
  assert(page.includes(escapeHTML(content.locales[l].ui.noPersonalData)),l+' contact no-send');
  assert(!page.includes('<form'),l+' no active form');
 }
});
test('S08 native anchors survive S11 and only actual routes are linked',()=>{
 for(const [l,page] of Object.entries(pages)){
  const hashes=[...page.matchAll(/href="#([\w-]+)"/g)].map(m=>m[1]);
  assert(hashes.length>=5,l+' anchors');
  for(const id of hashes)assert(page.includes('id="'+id+'"'),l+' #'+id);
  for(const kind of ['services','work','catalog'])
    assert(page.includes('href="/'+l+'/'+kind+'/'),l+' built '+kind);
  for(const kind of ['contact','demo-checkout'])
    assert(!page.includes('href="/'+l+'/'+kind+'/'),l+' unfinished '+kind);
 }
});
test('S08 menu is localized and JS is a shared same-origin module',()=>{
 for(const [l,page] of Object.entries(pages)){
  assert(page.includes('data-open-label="'+escapeHTML(content.locales[l].ui.menuOpen)+'"'),l+' menu open');
  assert(page.includes('data-close-label="'+escapeHTML(content.locales[l].ui.menuClose)+'"'),l+' menu close');
  assert(page.includes('<script type="module" src="/assets/js/main.js"></script>'),l+' local module');
  assert(!/<script[^>]+https?:\/\//.test(page),l+' no external script');
 }
});
test('S08 root chooser links to all five built languages',async()=>{
 for(const l of langs){
  assert(chooser.includes('href="/'+l+'/" lang="'+l+'"'),l+' root link');
  assert((await stat(join(site,l,'index.html'))).isFile(),l+' physical HTML');
 }
 assert((await stat(join(model,'scripts','render-home-locales.mjs'))).isFile());
});
