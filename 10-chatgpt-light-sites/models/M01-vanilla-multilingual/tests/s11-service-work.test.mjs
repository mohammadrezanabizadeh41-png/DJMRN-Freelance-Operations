import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile,stat} from 'node:fs/promises';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=join(root,'site');
const source=JSON.parse(await readFile(join(root,'content/i18n.v1.json'),'utf8'));
const codes=['fa','en','ar','tr','de'],types=['services','work'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&#34;').replace(/'/g,'&#39;');
const read=(code,type)=>readFile(join(site,code,type,'index.html'),'utf8');
const pages=Object.fromEntries(await Promise.all(codes.flatMap(code=>types.map(async type=>[code+'/'+type,await read(code,type)]))));
test('S11 ten independent static routes exist with locale, metadata, page H1 and DEMO noindex',async()=>{
 for(const code of codes)for(const kind of types){
  const p=pages[code+'/'+kind],l=source.locales[code];
  assert(p.startsWith('<!DOCTYPE html>'),code+'/'+kind);
  assert(p.includes('<html lang="'+code+'" dir="'+l.dir+'">'),code+'/'+kind);
  assert(p.includes('<h1 id="s11-hero-title">'+esc(l.views[kind].h1)+'</h1>'),code+'/'+kind);
  assert(p.includes(esc(l.views[kind].description)),code+'/'+kind);
  assert(p.includes('content="noindex,nofollow"'),code+'/'+kind);
  assert(!p.includes('<form'),code+'/'+kind);
  assert(!p.includes('localStorage'),code+'/'+kind);
 }
});
test('S11 all five locales have six complete scoped service narratives with process and linked concept',()=>{
 for(const code of codes){
  const l=source.locales[code],p=pages[code+'/services'];
  assert.equal((p.match(/class="s11-service" id="service-/g)||[]).length,6,code);
  for(const id of source.serviceIds){
   const d=l.serviceWork.services[id],b=l.services[id];
   assert(p.includes('id="service-'+id+'"'),code+'/'+id);
   assert.equal(d.process.length,3,code+'/'+id);
   for(const key of ['audience','inputs','included','excluded','deliverable']){
    assert(d[key].length>15,code+'/'+id+'/'+key);
    assert(p.includes(esc(d[key])),code+'/'+id+'/'+key);
   }
   for(const item of d.process)assert(p.includes(esc(item)),code+'/'+id+'/process');
   assert(p.includes(esc(b.title)),code+'/'+id+'/title');
  }
  assert.equal((p.match(/class="s11-process"/g)||[]).length,6,code+' process panels');
  assert.equal((p.match(/<details>/g)||[]).length,3,code+' FAQ');
 }
});
test('S11 Work displays three honest concept stories with exact original artwork and related service',async()=>{
 const ids=source.caseIds;
 const files=['s11-corporate-presence.svg','s11-creative-portfolio.svg','s11-digital-catalog.svg'];
 for(const file of files){
  const content=await readFile(join(site,'assets/img',file),'utf8');
  const size=(await stat(join(site,'assets/img',file))).size;
  assert(content.startsWith('<svg'),file);
  assert(content.includes('<title'),file);
  assert(content.includes('viewBox="0 0 1200 690"'),file);
  assert(size<11000,file+' <=11 KB asset budget');
 }
 for(const code of codes){
  const p=pages[code+'/work'],l=source.locales[code];
  assert.equal((p.match(/class="s11-case" id="case-/g)||[]).length,3,code);
  assert.equal((p.match(/class="s11-art"/g)||[]).length,3,code);
  for(let i=0;i<ids.length;i++){
   const id=ids[i],n=l.serviceWork.cases[id],c=l.cases[id];
   assert(p.includes('id="case-'+id+'"'),code+'/'+id+' anchor');
   for(const field of ['problem','approach','artifact','learning']){
    assert(n[field].length>20,code+'/'+id+'/'+field);
    assert(p.includes(esc(n[field])),code+'/'+id+'/'+field);
   }
   assert(p.includes('alt="'+esc(c.alt)+'"'),code+'/'+id+' alt');
   assert(p.includes('src="/assets/img/'+files[i]+'"'),code+'/'+id+' asset');
   assert(source.serviceIds.includes(n.serviceId),code+'/'+id+' related service');
  }
  assert(p.includes(esc(l.ui.concept)),code+' transparent concept marker');
 }
});
test('S11 full navigation, internal links and anchors resolve to real files, with Contact pointing to Home',async()=>{
 for(const code of codes)for(const kind of types){
  const html=pages[code+'/'+kind];
  for(const [,href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
   if(!href.startsWith('/') && !href.startsWith('#'))continue;
   const dest=new URL(href,'http://127.0.0.1/'+code+'/'+kind+'/');
   const file=join(site,decodeURIComponent(dest.pathname),'index.html');
   assert((await stat(file)).isFile(),code+'/'+kind+' -> '+href);
   if(dest.hash){
    const target=dest.pathname==='/'+code+'/'+kind+'/'?html:await readFile(file,'utf8');
    assert(target.includes('id="'+decodeURIComponent(dest.hash.slice(1))+'"'),code+'/'+kind+' -> '+href+' target');
   }
  }
  for(const other of codes)assert(html.includes('href="/'+other+'/'+kind+'/" lang="'+other+'"'),code+'/'+kind+' switch->'+other);
  assert(!html.includes('href="/'+code+'/contact/"'),code+'/'+kind+' no not-built contact route');
 }
});
test('S11 cross-page journey Services -> related Work -> Home Contact exists without JavaScript',async()=>{
 for(const code of codes){
  const s=pages[code+'/services'],w=pages[code+'/work'];
  assert(s.includes('href="/'+code+'/work/#case-'),code+' services->work');
  assert(w.includes('href="/'+code+'/services/#service-'),code+' work->services');
  assert(w.includes('href="/'+code+'/#contact"'),code+' work->contact preview');
  const home=await readFile(join(site,code,'index.html'),'utf8');
  assert(home.includes('id="contact"'),code+' real fallback anchor');
  assert(home.includes('href="/'+code+'/services/"'),code+' Home->Services');
  assert(home.includes('href="/'+code+'/work/"'),code+' Home->Work');
 }
});
test('S11 no external script, form action, claims of results or new runtime architecture',async()=>{
 const js=await readFile(join(root,'scripts/render-service-work.mjs'),'utf8');
 assert(js.includes("content','i18n.v1.json"));
 for(const [name,html] of Object.entries(pages)){
  assert(!/<script[^>]+https?:\/\//.test(html),name);
  assert(!/<form\b|<iframe\b|<input\b/.test(html),name);
  assert(!html.includes('https://fonts.googleapis.com'),name);
  assert(html.includes('src="/assets/js/main.js"'),name);
 }
 assert.equal(source.contentStatus,'DRAFT_EDITORIAL_HUMAN_REVIEW_PENDING');
});
test('S11 no indexable pages introduced ahead of S15/S20 review',()=>{
 for(const p of Object.values(pages))assert(p.includes('name="robots" content="noindex,nofollow"'));
});
