// M01 S08: Deterministic, dependency-free static rendering of five Home locales.
// S07 i18n.v1.json is the copy authority; outputs are ordinary HTML (usable without JS).
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {makeHomeBlocks} from './home-sections.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=join(root,'site');
const data=JSON.parse(await readFile(join(root,'content','i18n.v1.json'),'utf8'));
const expected=['fa','en','ar','tr','de'];
const requiredPageKinds=['home','services','work','catalog','contact','demo-checkout'];
if(JSON.stringify(data.localeOrder)!==JSON.stringify(expected))throw Error('Unexpected locale list');
if(JSON.stringify(data.pageKinds)!==JSON.stringify(requiredPageKinds))throw Error('Unexpected page-kind registry');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const row=(strings,idx,localeKey,cssClass,header)=>{
  const lang=data.locales[localeKey],dict=lang[strings],keys=data[idx];
  if(!keys?.length)throw Error('Missing keys '+idx);
  return keys.map((id,i)=>{
    const item=dict[id];if(!item?.title||!item?.description)throw Error('Missing '+localeKey+'/'+strings+'/'+id);
    if(cssClass==='service-card')return '<article class="card service-card"><span class="card-number" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span><div><h3>'+esc(item.title)+'</h3><p>'+esc(item.description)+'</p></div></article>';
    if(cssClass==='work-card')return '<article class="card work-card"><div class="work-mark" aria-hidden="true">✳</div><div><span class="eyebrow">'+esc(lang.ui.demo)+' · <bdi dir="ltr">0'+(i+1)+'</bdi></span><h3>'+esc(item.title)+'</h3><p>'+esc(item.description)+'</p></div></article>';
    return '<article class="card kit-card"><span class="eyebrow">'+esc(lang.ui.demo)+'</span><h3>'+esc(item.title)+'</h3><p>'+esc(item.description)+'</p></article>';
  }).join('\n');
};
const hrefs=['home','services','work','catalog','contact'];
const section=(lang,key,titleKey,lead,body)=>{
return '<section class="section" id="'+key+'" aria-labelledby="'+key+'-title" tabindex="-1">'
+'<div class="section-header"><div><p class="eyebrow"><bdi dir="ltr">'+({services:'01',work:'02',catalog:'03'}[key])+'</bdi> / '+esc(lang.nav[titleKey])+'</p><h2 id="'+key+'-title">'+esc(lang.nav[titleKey])+'</h2></div><p>'+esc(lead)+'</p></div>'
+body+'</section>';
};
function buildHome(locale){
 const l=data.locales[locale],home=l.views.home;
 if(!l||!home||!['rtl','ltr'].includes(l.dir))throw Error('Locale missing '+locale);
 for(const k of ['title','description','h1','lead'])if(!home[k])throw Error('Missing Home '+k+' for '+locale);
 const x=makeHomeBlocks(locale,data,esc);
 const nav='<nav class="site-nav" id="primary-nav" aria-label="'+esc(l.ui.primaryNavigation)+'">'
   +hrefs.map(k=>'<a href="'+(k==='home'?'/'+locale+'/':(k==='services'||k==='work'||k==='catalog'?'/'+locale+'/'+k+'/':'#'+k))+'"'+(k==='home'?' aria-current="page"':'')+'>'+esc(l.nav[k])+'</a>').join('\n')
   +'</nav>';
 const chooser='<nav class="locale-switch" aria-label="'+esc(l.nav.languages)+'">'
 +expected.map(code=>'<a href="/'+code+'/" lang="'+code+'" dir="'+data.locales[code].dir+'"'+(code===locale?' aria-current="page"':'')+'>'+esc(data.locales[code].autonym)+'</a>').join('')
 +'</nav>';
 const svc=row('services','serviceIds',locale,'service-card');
 const work=row('cases','caseIds',locale,'work-card');
 const catalog=row('products','productIds',locale,'kit-card');
 const language=esc(locale),dir=esc(l.dir);
 const html=[
 '<!doctype html>',
 '<html lang="'+language+'" dir="'+dir+'">',
 '<head>',
 '<meta charset="utf-8">',
 '<meta name="viewport" content="width=device-width, initial-scale=1">',
 '<meta name="robots" content="noindex,nofollow">',
 '<meta name="description" content="'+esc(home.description)+'">',
 '<title>'+esc(home.title)+'</title>',
 '<link rel="stylesheet" href="/assets/css/tokens.css">',
 '<link rel="stylesheet" href="/assets/css/base.css">',
 '<link rel="stylesheet" href="/assets/css/components.css">',
 '<link rel="stylesheet" href="/assets/css/home.css">',
 '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
 '<script type="module" src="/assets/js/main.js"></script>',
 '</head>',
 '<body data-page="home">',
 '<a class="skip-link" href="#main-content">'+esc(l.ui.skip)+'</a>',
 '<div class="shell">',
 '<header class="site-header">',
 '<a class="brand" href="/'+language+'/" aria-label="NOVA Atelier — '+esc(l.nav.home)+'"><span class="brand-mark" aria-hidden="true">✳</span><bdi lang="en" dir="ltr">NOVA ATELIER</bdi></a>',
 '<button class="menu-toggle" type="button" hidden aria-expanded="false" aria-controls="primary-nav" data-open-label="'+esc(l.ui.menuOpen)+'" data-close-label="'+esc(l.ui.menuClose)+'">'+esc(l.ui.menuOpen)+'</button>',
 nav,
 chooser,
 '</header>',
 '<main id="main-content" tabindex="-1">',
 '<section class="hero" aria-labelledby="hero-heading">',
 '<div class="hero-copy">',
 '<p class="eyebrow">'+x.kicker+'</p>',
 '<h1 id="hero-heading">'+esc(home.h1)+'</h1>',
 '<p class="hero-lead">'+esc(home.lead)+'</p>',
 x.heroContext,
 '<div class="hero-actions"><a class="btn btn-primary" href="#services">'+esc(l.ui.viewServices)+'</a><a class="btn btn-secondary" href="#work">'+esc(l.ui.viewWork)+'</a></div>',
 '</div>',
 '<figure class="hero-art-frame">',
 x.visualLabel,
 '<img class="hero-art" src="/assets/img/nova-hero-original.svg" alt="" width="1200" height="720" decoding="async" aria-hidden="true">',
 '<figcaption>'+esc(l.homeExperience.visualLabel)+'</figcaption>',
 '</figure>',
 '</section>',
 x.stats,
 x.intro,
 section(l,'services','services',l.views.services.lead,'<div class="service-grid">'+svc+'</div><p class="home-section-link"><a class="btn btn-secondary" href="/'+language+'/services/">'+esc(l.serviceWork.labels.exploreServices)+'</a></p>'),
 section(l,'work','work',l.views.work.lead,'<div class="work-grid">'+work+'</div><p class="home-section-link"><a class="btn btn-secondary" href="/'+language+'/work/">'+esc(l.serviceWork.labels.exploreWork)+'</a></p>'),
 x.process,
 section(l,'catalog','catalog',l.views.catalog.lead,'<div class="kit-grid">'+catalog+'</div><p class="home-section-link"><a class="btn btn-secondary" href="/'+language+'/catalog/">'+esc(l.ui.viewCatalog)+'</a></p>'),
 '<section class="section contact-panel" id="contact" aria-labelledby="contact-title" tabindex="-1">',
 '<div><p class="eyebrow"><bdi dir="ltr">04</bdi> / '+esc(l.nav.contact)+'</p><h2 id="contact-title">'+esc(l.views.contact.h1)+'</h2><p>'+esc(l.views.contact.lead)+'</p></div>',
 '<p class="contact-status" role="note">'+esc(l.ui.noPersonalData)+'</p>',
 '</section>',
 x.closing,
 '<aside class="demo-notice" aria-label="'+esc(l.ui.demo)+'"><strong>'+esc(l.ui.noPayment)+'</strong><p>'+esc(l.views.catalog.description)+'</p></aside>',
 '</main>',
 '<footer class="site-footer"><span><bdi lang="en" dir="ltr">NOVA Atelier</bdi> · '+esc(l.ui.demo)+'</span><nav class="footer-nav" aria-label="'+esc(l.ui.footerNavigation)+'">'+hrefs.map(k=>'<a href="'+(k==='home'?'/'+language+'/':(k==='services'||k==='work'||k==='catalog'?'/'+language+'/'+k+'/':'#'+k))+'">'+esc(l.nav[k])+'</a>').join('')+'</nav><a class="back-to-top" href="#main-content">'+esc(l.ui.backToTop)+'</a></footer>',
 '</div>',
 '</body>',
 '</html>',
 ''].join('\n');
 return html;
}
function rootChooser(){
 const english=data.locales.en;
 return ['<!doctype html>',
 '<html lang="en" dir="ltr">',
 '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>NOVA Atelier — choose language</title>',
 '<link rel="stylesheet" href="/assets/css/tokens.css"><link rel="stylesheet" href="/assets/css/base.css"><link rel="stylesheet" href="/assets/css/components.css"><link rel="icon" href="/favicon.svg" type="image/svg+xml"></head>',
 '<body><main class="shell entry"><p class="eyebrow">NOVA Atelier · Demo</p><h1>Choose a language</h1><p>Five-language Home, Services, Work and Catalog pages are available. Contact and the demo checkout remain planned for later stages.</p>',
 '<nav class="entry-languages" aria-label="'+esc(english.nav.languages)+'">',
 ...expected.map(k=>'<a class="btn btn-secondary" href="/'+k+'/" lang="'+k+'" dir="'+data.locales[k].dir+'">'+esc(data.locales[k].autonym)+'</a>'),
 '</nav><p class="demo-notice">'+esc(english.ui.noPayment)+'</p></main></body></html>',''
 ].join('\n');
}
for(const code of expected){
 const target=join(site,code,'index.html');
 await mkdir(dirname(target),{recursive:true});
 const text=buildHome(code);
 await writeFile(target,text,'utf8');
 console.log('M01_HOME_BUILT '+code+' '+Buffer.byteLength(text,'utf8')+' bytes');
}
await writeFile(join(site,'index.html'),rootChooser(),'utf8');
console.log('M01_ROOT_CHOOSER_READY 5');
