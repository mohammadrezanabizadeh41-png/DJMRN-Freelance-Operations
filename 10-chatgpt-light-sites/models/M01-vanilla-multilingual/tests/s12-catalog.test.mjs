import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile,stat} from 'node:fs/promises';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),site=join(root,'site');
const source=JSON.parse(await readFile(join(root,'content/i18n.v1.json'),'utf8'));
const codes=['fa','en','ar','tr','de'],ids=source.productIds;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&#34;').replace(/'/g,'&#39;');
const pages=Object.fromEntries(await Promise.all(codes.map(async k=>[k,await readFile(join(site,k,'catalog','index.html'),'utf8')])));
test('S12 five static Catalog routes have correct title, language direction, H1 and noindex',()=>{
 assert.deepEqual(source.pageKinds,['home','services','work','catalog','contact','demo-checkout']);
 for(const code of codes){
  const p=pages[code],l=source.locales[code];
  assert(p.startsWith('<!DOCTYPE html>'),code);
  assert(p.includes('<html lang="'+code+'" dir="'+l.dir+'">'),code);
  assert(p.includes('<h1 id="s12-heading">'+esc(l.views.catalog.h1)+'</h1>'),code);
  assert(p.includes('<title>'+esc(l.views.catalog.title)+'</title>'),code);
  assert(p.includes(esc(l.views.catalog.description)),code);
  assert(p.includes('name="robots" content="noindex,nofollow"'),code);
  assert(!p.includes('href="/'+code+'/contact/"')&&!p.includes('href="/'+code+'/demo-checkout/"'),code);
 }
});
test('S12 metadata: exactly six unique persistent kits with fixed categories, imaginary integer credits',()=>{
 assert.equal(ids.length,6);assert.equal(new Set(ids).size,6);
 assert.deepEqual(ids,['landing-kit','company-site-kit','portfolio-kit','multilingual-ui-kit','seo-starter-audit','performance-check-pack']);
 const en=source.locales.en.catalogDetail.items;
 const cat=ids.map(id=>en[id].category);
 assert.deepEqual(cat,['web','web','design','design','audit','audit']);
 for(const locale of codes){
  const pack=source.locales[locale].catalogDetail.items;
  assert.deepEqual(Object.keys(pack),ids,locale);
  assert.deepEqual(Object.keys(source.locales[locale].catalogDetail.labels),Object.keys(source.locales.en.catalogDetail.labels),locale+' labels');
  for(const id of ids){
   const p=pack[id];
   assert(p.category===en[id].category,locale+'/'+id+' category parity');
   assert(p.credits===en[id].credits&&Number.isSafeInteger(p.credits)&&p.credits>0,locale+'/'+id+' credits');
   assert(p.unit==='DEMO_CREDIT',locale+'/'+id);
   assert(source.serviceIds.includes(p.serviceId),locale+'/'+id+' service');
   for(const field of ['audience','use','deliverable','included','excluded'])
    assert(p[field]?.length>=8,locale+'/'+id+'/'+field);
   assert(p.categoryLabel?.length>=2,locale+'/'+id+'/categoryLabel');
  }
 }
 assert.equal(source.contentStatus,'DRAFT_EDITORIAL_HUMAN_REVIEW_PENDING');
});
test('S12 six cards per language display useful scopes, images, honest fictional value and native details',()=>{
 for(const locale of codes){
  const p=pages[locale],l=source.locales[locale];
  assert.equal((p.match(/class="kit-item"/g)||[]).length,6,locale);
  assert.equal((p.match(/class="kit-details"/g)||[]).length,6,locale);
  assert.equal((p.match(/class="kit-art"/g)||[]).length,6,locale);
  for(const id of ids){
   const kit=l.catalogDetail.items[id],product=l.products[id];
   assert(p.includes('id="kit-'+id+'"'),locale+'/'+id);
   assert(p.includes('data-category="'+kit.category+'"'),locale+'/'+id);
   assert(p.includes(esc(product.title)),locale+'/'+id+' title');
   assert(p.includes('alt="'+esc(product.alt)+'"'),locale+'/'+id+' alt');
   assert(p.includes('src="/assets/img/s12-'+id+'.svg"'),locale+'/'+id+' svg');
   for(const f of ['audience','use','deliverable','included','excluded'])assert(p.includes(esc(kit[f])),locale+'/'+id+' '+f);
   assert(p.includes('<bdi dir="ltr">'+kit.credits+'</bdi>'),locale+'/'+id+' credit');
   assert(p.includes('href="/'+locale+'/services/#service-'+kit.serviceId+'"'),locale+'/'+id+' related');
  }
  assert(p.includes(esc(l.ui.noPayment)),locale+' permanent banner');
  assert(p.includes(esc(l.catalogDetail.labels.notYetCart)),locale+' future cart disclosure');
 }
});
test('S12 original six vector assets are real SVG with accessible metadata, small enough for static website',async()=>{
 for(const id of ids){
  const f=join(site,'assets/img','s12-'+id+'.svg');
  const svg=await readFile(f,'utf8');
  const size=(await stat(f)).size;
  assert(svg.startsWith('<svg'),id);
  assert(svg.includes('<title id="title">')&&svg.includes('<desc id="desc">'),id);
  assert(svg.includes('viewBox="0 0 1200 690"'),id);
  assert(size>1000&&size<10000,id+' expected optimized vector, '+size);
  assert(!/<script|<foreignObject|(?:href|src)="https?:\/\//.test(svg),id+' no remote/malicious resource');
 }
});
test('S12 JS progressive search/select/reset/empty behaviors are isolated to catalog',async()=>{
 const js=await readFile(join(site,'assets/js/catalog.js'),'utf8');
 const main=await readFile(join(site,'assets/js/main.js'),'utf8');
 assert(main.includes("import { initCatalog } from './catalog.js'"));
 assert(main.includes("document.body?.dataset.page==='catalog'"));
 for(const marker of ['initCatalog','form.hidden=false','input.addEventListener','select.addEventListener','resetEmpty.addEventListener','textContent','card.hidden','form.reset()'])
 assert(js.includes(marker),marker);
 assert(!js.includes('innerHTML')&&!js.includes('localStorage')&&!js.includes('fetch(')&&!js.includes('XMLHttpRequest'));
 for(const p of Object.values(pages)){
  assert(p.includes('<form class="s12-controls" id="catalog-filters" role="search" hidden>'));
  assert(p.includes('<input id="kit-search"'));
  assert(p.includes('<select id="kit-category"'));
  assert(p.includes('id="kit-empty" role="status" hidden'));
  assert(p.includes('id="kit-count" role="status" aria-live="polite"'));
  assert(p.includes('<noscript>'));
  assert(!p.includes('method="post"')&&!p.includes('action="http'));
 }
});
test('S12 no-JS content has all six cards and no unreachable native anchors or invented future links',async()=>{
 for(const locale of codes){
  const html=pages[locale];
  const idsPresent=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
  assert.equal(idsPresent.size,[...html.matchAll(/\bid="([^"]+)"/g)].length,locale+' unique IDs');
  for(const [,href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
   const url=new URL(href,'http://127.0.0.1/'+locale+'/catalog/');
   const file=join(site,decodeURIComponent(url.pathname),'index.html');
   assert((await stat(file)).isFile(),locale+' -> '+href);
   if(url.hash){const target=await readFile(file,'utf8');assert(target.includes('id="'+url.hash.slice(1)+'"'),locale+' -> '+href+' fragment');}
  }
  assert(!html.includes('href="/'+locale+'/demo-checkout/"'));
 }
});
test('S12 existing Home and Services/Work navigation links now point to real Catalog in all locales',async()=>{
 for(const locale of codes){
  for(const path of ['index.html','services/index.html','work/index.html']){
   const content=await readFile(join(site,locale,path),'utf8');
   assert(content.includes('href="/'+locale+'/catalog/"'),locale+'/'+path+' Catalog');
  }
 }
});
test('S12 generators avoid external runtime and preserve simple HTML/CSS/vanilla-JS model',async()=>{
 const [art,render,css]=await Promise.all([
  readFile(join(root,'scripts/render-catalog-art.mjs'),'utf8'),
  readFile(join(root,'scripts/render-catalog.mjs'),'utf8'),
  readFile(join(site,'assets/css/s12-catalog.css'),'utf8')]);
 assert(render.includes("content','i18n.v1.json"));
 assert(!render.includes('node_modules')&&!render.includes('https://'));
 assert(art.includes('original vector'));
 assert(css.includes('min-width:48rem')&&css.includes('prefers-reduced-motion:reduce'));
 for(const p of Object.values(pages)){
  assert(!p.includes('https://fonts.googleapis.com')&&!p.includes('<iframe')&&!p.includes('localStorage'));
  assert(p.includes('<script type="module" src="/assets/js/main.js"></script>'));
 }
});
