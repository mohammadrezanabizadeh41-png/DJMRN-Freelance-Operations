import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(await readFile(join(root,'content/i18n.v1.json'),'utf8'));
const code=await readFile(join(root,'scripts/render-home-locales.mjs'),'utf8');
const sectionSource=await readFile(join(root,'scripts/home-sections.mjs'),'utf8');
const styling=await readFile(join(root,'site/assets/css/home.css'),'utf8');
const pages=Object.fromEntries(await Promise.all(data.localeOrder.map(async locale=>[
  locale,await readFile(join(root,'site',locale,'index.html'),'utf8')
])));
const escapeHTML=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

test('S10 one canonical editorial data source has complete five-language parity',()=>{
 assert.deepEqual(data.localeOrder,['fa','en','ar','tr','de']);
 const keys=Object.keys(data.locales.en.homeExperience).sort().join('|');
 for(const l of data.localeOrder){
  const e=data.locales[l].homeExperience;
  assert.equal(Object.keys(e).sort().join('|'),keys,l+' keys');
  for(const key of ['principles','steps','stats'])assert.equal(e[key].length,3,l+' '+key);
  for(const entry of [...e.principles,...e.steps]){
   assert(entry.title.length>=4,l+' title');
   assert(entry.description.length>=20,l+' description');
  }
  assert(e.sampleNotice.length>20,l+' honest counters');
 }
 assert.equal(data.contentStatus,'DRAFT_EDITORIAL_HUMAN_REVIEW_PENDING');
});
test('S10 generated five pages have meaningful hero & audience, original visual and separate useful CTAs',()=>{
 for(const l of data.localeOrder){
  const html=pages[l],e=data.locales[l].homeExperience;
  assert(html.includes('<h1 id="hero-heading">'+escapeHTML(data.locales[l].views.home.h1)+'</h1>'),l+' h1');
  assert(html.includes('class="home-audience"'),l+' audience');
  assert(html.includes(escapeHTML(e.audience)),l+' audience text');
  assert(html.includes(escapeHTML(e.heroNote)),l+' hero note');
  assert(html.includes('src="/assets/img/nova-hero-original.svg"'),l+' licensed original');
  assert(html.includes('class="hero-art-frame"'),l+' composition');
  assert(html.includes('href="#services"'),l+' service CTA');
  assert(html.includes('href="#work"'),l+' work CTA');
  assert(html.includes('/assets/css/home.css'),l+' shared visual stylesheet');
 }
});
test('S10 only genuine counts 6/3/6 and three editorial principles/steps in every locale',()=>{
 for(const l of data.localeOrder){
  const page=pages[l],e=data.locales[l].homeExperience;
  for(const n of [6,3,6])assert(page.includes('>'+n+'</bdi>'),l+' real count '+n);
  assert.equal((page.match(/class="stat"/g)||[]).length,3,l+' 3 stats');
  assert.equal((page.match(/class="principle"/g)||[]).length,3,l+' 3 principles');
  assert.equal((page.match(/class="process-step"/g)||[]).length,3,l+' 3 process steps');
  assert(page.includes('id="process"'),l+' process section');
  for(const item of e.steps)assert(page.includes(escapeHTML(item.description)),l+' content');
 }
});
test('S10 navigation remains native and links to built anchors without JS',()=>{
 for(const l of data.localeOrder){
  const page=pages[l];
  assert(page.includes('<main id="main-content" tabindex="-1">'),l+' skip target');
  assert(page.includes('id="services"'),l+' service target');
  assert(page.includes('id="work"'),l+' work target');
  assert(page.includes('id="process"'),l+' process target');
  assert(page.includes('id="contact"'),l+' contact target');
  assert(!page.includes('<form'),l+' no active form');
  assert(!page.includes('href="/'+l+'/contact/"'),l+' no phantom contact');
  assert(page.includes('noindex,nofollow'),l+' not published');
 }
});
test('S10 fictional identity and privacy boundaries persist across all pages',()=>{
 for(const locale of data.localeOrder){
   const page=pages[locale],ui=data.locales[locale].ui;
   assert(page.includes(escapeHTML(ui.noPayment)),locale+' no real payment');
   assert(page.includes(escapeHTML(ui.noPersonalData)),locale+' no contact collection');
   assert(page.includes(escapeHTML(ui.demo)),locale+' demo marker');
   assert(!page.includes('https://fonts.googleapis.com'),locale+' no remote font');
   assert(!page.includes('<script src="https://'),locale+' no third party JS');
 }
});
test('S10 design has responsive independent grid sizes and reduced-motion safe enhancements',()=>{
 for(const marker of ['min-width: 47rem','min-width: 69rem','max-width: 46.99rem','max-width: 24rem',
   'prefers-reduced-motion: reduce','home-stats','home-intro','home-process','home-closing','hover:hover']){
  assert(styling.includes(marker),'missing CSS: '+marker);
 }
 assert(code.includes("import {makeHomeBlocks} from './home-sections.mjs'"));
 assert(sectionSource.includes("source.serviceIds.length"));
 assert(sectionSource.includes("source.caseIds.length"));
 assert(sectionSource.includes("source.productIds.length"));
});
test('S10 generated output is original local static HTML with no dashboard or network dependency',()=>{
 for(const l of data.localeOrder){
  const html=pages[l];
  assert(html.startsWith('<!doctype html>'),l);
  assert(!html.includes('fetch('),l);
  assert(!html.includes('localStorage'),l);
  assert(!html.includes('customer testimonial'),l);
  assert(!html.includes('<iframe'),l);
  assert(!html.includes('href="/admin'),l);
 }
});
