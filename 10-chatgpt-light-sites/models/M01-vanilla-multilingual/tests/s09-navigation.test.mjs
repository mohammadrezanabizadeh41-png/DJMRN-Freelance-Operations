import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=join(root,'site');
const translations=JSON.parse(await readFile(join(root,'content/i18n.v1.json'),'utf8'));
const pages=Object.fromEntries(await Promise.all(translations.localeOrder.map(async code=>
  [code,await readFile(join(site,code,'index.html'),'utf8')])));
const main=await readFile(join(site,'assets/js/main.js'),'utf8');
const nav=await readFile(join(site,'assets/js/nav.js'),'utf8');
const css=await readFile(join(site,'assets/css/components.css'),'utf8');
const renderer=await readFile(join(root,'scripts/render-home-locales.mjs'),'utf8');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

test('S09 primary navigation & language switch have distinct translated semantic landmarks',()=>{
for(const l of translations.localeOrder){
 const html=pages[l],ui=translations.locales[l].ui;
 assert(html.includes('<nav class="site-nav" id="primary-nav" aria-label="'+esc(ui.primaryNavigation)+'">'),l+' primary nav');
 assert(html.includes('<nav class="locale-switch" aria-label="'+esc(translations.locales[l].nav.languages)+'">'),l+' language nav');
 assert(html.includes('<nav class="footer-nav" aria-label="'+esc(ui.footerNavigation)+'">'),l+' footer nav');
 assert(html.includes('<a class="back-to-top" href="#main-content">'+esc(ui.backToTop)+'</a>'),l+' back to top');
}
});
test('S09 header/footer navigation includes built S11 pages and real Home anchors',()=>{
for(const l of translations.localeOrder){
 const html=pages[l],footer=html.match(/<nav class="footer-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert(footer,l+' footer exists');
 assert.equal((footer.match(/<a href=/g)||[]).length,5,l+' footer item count');
 for(const kind of ['home','services','work','catalog','contact']){
   const expected=kind==='home'?'/'+l+'/':(kind==='services'||kind==='work'||kind==='catalog'?'/'+l+'/'+kind+'/':'#'+kind);
   assert(footer.includes('href="'+expected+'"'),l+' footer '+kind);
 }
 assert(!html.includes('href="/'+l+'/demo-checkout/'),l+' no phantom checkout');
}
});
test('S09 main/sections are real focus targets for skip link and anchor activation',()=>{
for(const [l,html] of Object.entries(pages)){
 assert(html.includes('<main id="main-content" tabindex="-1">'),l+' focusable main');
 assert(html.includes('href="#main-content"'),l+' skip');
 for(const id of ['services','work','catalog','contact']){
   assert(new RegExp('<section[^>]+id="'+id+'"[^>]*tabindex="-1"').test(html),l+' focusable section '+id);
 }
}
});
test('S09 3 new UI key sets are non-empty and translation copy remains single source',()=>{
 const keys=['primaryNavigation','footerNavigation','backToTop'];
 for(const loc of translations.localeOrder)
 for(const k of keys)assert(translations.locales[loc].ui[k]?.trim().length>=5,loc+'/'+k);
 assert(renderer.includes('l.ui.primaryNavigation'));
 assert(renderer.includes('l.ui.footerNavigation'));
 assert(renderer.includes('l.ui.backToTop'));
});
test('S09 no-JS fallback remains native anchors; JS is only progressive disclosure',()=>{
 assert(main.includes("import { initNavigation } from './nav.js'"));
 for(const marker of ['aria-expanded','Escape','pointerdown','focusin','hashchange','requestAnimationFrame','aria-current','change'])
   assert(nav.includes(marker),'nav uses '+marker);
 assert(!nav.includes('role="menu"'),'not an ARIA app menu');
 for(const page of Object.values(pages)){
   assert(page.includes('src="/assets/js/main.js"'));
   assert(page.includes('href="#services"'));
   assert(page.includes('class="menu-toggle" type="button" hidden'));
 }
});
test('S09 CSS supports disclosure on compact mobile/tablet, wide nav and 44px touch targets',()=>{
 for(const marker of ['@media (max-width: 56rem)','site-nav[data-open="true"]','site-nav:not([data-open=true])','min-block-size: 2.75rem','z-index: 15','focus'])
 assert(css.includes(marker),marker);
});
