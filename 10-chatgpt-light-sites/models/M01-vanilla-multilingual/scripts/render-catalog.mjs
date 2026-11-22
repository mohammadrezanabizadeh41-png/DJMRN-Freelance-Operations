// S12 five-locale Catalog: deterministic semantic HTML, single canonical content JSON.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),site=join(root,'site');
const data=JSON.parse(await readFile(join(root,'content','i18n.v1.json'),'utf8'));
const locales=['fa','en','ar','tr','de'],ids=['landing-kit','company-site-kit','portfolio-kit','multilingual-ui-kit','seo-starter-audit','performance-check-pack'];
const classes=['web','web','design','design','audit','audit'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&#34;').replace(/'/g,'&#39;');
const v=(s,ref)=>{if(typeof s!=='string'||s.trim().length<2)throw Error('Missing catalog field '+ref);return esc(s)};
const a=(target,label,cls)=>'<a href="'+target+'"'+(cls?' class="'+cls+'"':'')+'>'+esc(label)+'</a>';
if(JSON.stringify(data.localeOrder)!==JSON.stringify(locales)||JSON.stringify(data.productIds)!==JSON.stringify(ids)||data.contentStatus!=='DRAFT_EDITORIAL_HUMAN_REVIEW_PENDING')throw Error('S12 invalid canonical registry');
function navTarget(locale,k){return k==='home'?'/'+locale+'/':k==='contact'?'/'+locale+'/#contact':'/'+locale+'/'+k+'/'}
function chrome(locale,l){
 const keys=['home','services','work','catalog','contact'];
 const nav=keys.map(k=>'<a href="'+navTarget(locale,k)+'"'+(k==='catalog'?' aria-current="page"':'')+'>'+esc(l.nav[k])+'</a>').join('');
 const langLinks=locales.map(k=>'<a href="/'+k+'/catalog/" lang="'+k+'" dir="'+data.locales[k].dir+'"'+(k===locale?' aria-current="page"':'')+'>'+esc(data.locales[k].autonym)+'</a>').join('');
 const header='<header class="site-header">'+
 '<a class="brand" href="/'+locale+'/" aria-label="NOVA Atelier — '+esc(l.nav.home)+'"><span class="brand-mark" aria-hidden="true">✳</span><bdi lang="en" dir="ltr">NOVA ATELIER</bdi></a>'+
 '<button class="menu-toggle" type="button" hidden aria-expanded="false" aria-controls="primary-nav" data-open-label="'+esc(l.ui.menuOpen)+'" data-close-label="'+esc(l.ui.menuClose)+'">'+esc(l.ui.menuOpen)+'</button>'+
 '<nav class="site-nav" id="primary-nav" aria-label="'+esc(l.ui.primaryNavigation)+'">'+nav+'</nav>'+
 '<nav class="locale-switch" aria-label="'+esc(l.nav.languages)+'">'+langLinks+'</nav></header>';
 const footer='<footer class="site-footer"><span><bdi lang="en" dir="ltr">NOVA Atelier</bdi> · '+esc(l.ui.demo)+'</span>'+
 '<nav class="footer-nav" aria-label="'+esc(l.ui.footerNavigation)+'">'+keys.map(k=>a(navTarget(locale,k),l.nav[k])).join('')+'</nav>'+
 a('#main-content',l.ui.backToTop,'back-to-top')+'</footer>';
 return {header,footer};
}
const detail=(label,text)=>'<div class="kit-detail"><dt>'+v(label,'label')+'</dt><dd>'+v(text,'text')+'</dd></div>';
function card(locale,l,id,index){
 const item=l.catalogDetail.items[id],base=l.products[id],u=l.catalogDetail.labels;
 if(!base||!item||item.category!==classes[index]||!data.serviceIds.includes(item.serviceId)||item.unit!=='DEMO_CREDIT'||!Number.isSafeInteger(item.credits)||item.credits<=0)throw Error('S12 invalid metadata '+locale+'/'+id);
 const phrase=[base.title,base.description,item.categoryLabel,item.use,item.audience,item.deliverable,item.included,item.excluded].join(' ');
 return '<article class="kit-item" id="kit-'+id+'" data-kit="'+id+'" data-category="'+item.category+'" data-search="'+esc(phrase)+'" aria-labelledby="kit-title-'+id+'">'+
 '<figure class="kit-art"><img src="/assets/img/s12-'+id+'.svg" alt="'+v(base.alt,id+'.alt')+'" width="1200" height="690" decoding="async" loading="lazy">'+
 '<figcaption>'+esc(l.ui.demo)+' · '+v(item.categoryLabel,'category')+'</figcaption></figure>'+
 '<div class="kit-body"><div class="kit-head"><div><p class="eyebrow">'+esc(item.categoryLabel)+'</p><h2 id="kit-title-'+id+'">'+v(base.title,'title')+'</h2></div>'+
 '<span class="kit-sequence" aria-hidden="true"><bdi dir="ltr">'+String(index+1).padStart(2,'0')+'</bdi></span></div>'+
 '<p class="kit-summary">'+v(base.description,'summary')+'</p>'+
 '<p class="kit-value"><span>'+esc(u.fictionalValue)+'</span><strong><bdi dir="ltr">'+item.credits+'</bdi></strong><span>'+esc(u.creditLabel)+'</span></p>'+
 '<p class="kit-code"><bdi dir="ltr">DEMO_CREDIT</bdi></p>'+
 '<dl class="kit-quick">'+detail(u.useLabel,item.use)+detail(u.audienceLabel,item.audience)+detail(u.deliverLabel,item.deliverable)+'</dl>'+
 '<details class="kit-details"><summary>'+v(u.detailsLabel,'details')+'</summary><dl>'+detail(u.includedLabel,item.included)+detail(u.excludedLabel,item.excluded)+'</dl>'+
 '<p>'+esc(u.demoDisclaimer)+'</p></details>'+
 '<div class="kit-actions">'+a('/'+locale+'/services/#service-'+item.serviceId,u.relatedService,'kit-service-link')+'</div></div></article>';
}
function build(locale){
 const l=data.locales[locale],ui=l?.ui,view=l?.views?.catalog,t=l?.catalogDetail?.labels;
 if(!l||!ui||!view||!t)throw Error('S12 locale missing '+locale);
 const {header,footer}=chrome(locale,l);
 const options=['all','web','design','audit'].map(k=>'<option value="'+k+'">'+esc(ui[k])+'</option>').join('');
 const filter='<form class="s12-controls" id="catalog-filters" role="search" hidden>'+
 '<div class="s12-control-heading"><p class="eyebrow">NOVA / EXPLORE</p><h2>'+esc(t.filtersHeading)+'</h2></div>'+
 '<div class="s12-control-row"><div class="s12-control"><label for="kit-search">'+esc(ui.search)+'</label>'+
 '<input id="kit-search" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="'+esc(ui.searchPlaceholder)+'"></div>'+
 '<div class="s12-control"><label for="kit-category">'+esc(ui.filter)+'</label><select id="kit-category" name="category">'+options+'</select></div>'+
 '<button class="btn btn-primary s12-search-submit" type="submit">'+esc(ui.search)+'</button>'+
 '<button class="btn btn-secondary s12-reset" type="reset" id="kit-clear">'+esc(ui.clearFilters)+'</button></div></form>';
 const results='<section class="s12-results section" aria-labelledby="catalog-result-title">'+
 '<div class="s12-results-top"><div><p class="eyebrow">'+esc(t.optionsHeading)+'</p><h2 id="catalog-result-title">'+esc(t.kitCount)+'</h2></div>'+
 '<p class="s12-count" id="kit-count" role="status" aria-live="polite" aria-atomic="true"><bdi dir="ltr">6</bdi> '+esc(t.countSuffix)+'</p></div>'+
 '<div class="s12-grid" id="kit-grid">'+ids.map((id,i)=>card(locale,l,id,i)).join('')+'</div>'+
 '<div class="s12-empty" id="kit-empty" role="status" hidden><h3>'+esc(t.emptyHeading)+'</h3><p>'+esc(t.emptyHint)+'</p>'+
 '<button type="button" class="btn btn-primary" id="kit-empty-reset">'+esc(t.showAll)+'</button></div></section>';
 const bottom='<section class="s12-next section" aria-labelledby="s12-next-title"><div><p class="eyebrow">NOVA / DEMO</p>'+
 '<h2 id="s12-next-title">'+esc(t.relatedConcepts)+'</h2><p>'+esc(ui.noPayment)+'</p><p>'+esc(t.notYetCart)+'</p>'+
 '<p>'+esc(t.privacy)+'</p></div><div class="s12-next-actions">'+
 a('/'+locale+'/services/',t.backServices,'btn btn-primary')+a('/'+locale+'/work/',l.nav.work,'btn btn-secondary')+'</div></section>';
 return ['<!DOCTYPE html>','<html lang="'+locale+'" dir="'+l.dir+'">','<head>',
 '<meta charset="utf-8">','<meta name="viewport" content="width=device-width, initial-scale=1">',
 '<meta name="robots" content="noindex,nofollow">',
 '<meta name="description" content="'+v(view.description,'description')+'"><title>'+v(view.title,'title')+'</title>',
 '<link rel="stylesheet" href="/assets/css/tokens.css">',
 '<link rel="stylesheet" href="/assets/css/base.css">',
 '<link rel="stylesheet" href="/assets/css/components.css">',
 '<link rel="stylesheet" href="/assets/css/s12-catalog.css">',
 '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
 '<script type="module" src="/assets/js/main.js"></script>',
 '</head>','<body class="s12-page" data-page="catalog">',
 '<a class="skip-link" href="#main-content">'+esc(ui.skip)+'</a>',
 '<div class="shell">',header,'<main id="main-content" tabindex="-1">',
 '<nav class="s12-breadcrumb" aria-label="'+esc(l.nav.home)+'">'+a('/'+locale+'/',l.serviceWork.labels.backHome)+
 '<span aria-hidden="true">/</span><span aria-current="page">'+esc(l.nav.catalog)+'</span></nav>',
 '<section class="s12-hero" aria-labelledby="s12-heading"><div class="s12-hero-copy"><p class="eyebrow">'+esc(t.kicker)+'</p>'+
 '<h1 id="s12-heading">'+v(view.h1,'h1')+'</h1><p>'+v(view.lead,'lead')+'</p><p class="s12-hero-note">'+esc(t.lead)+'</p></div>'+
 '<div class="s12-hero-symbol" aria-hidden="true"><span class="s12-symbol-square"><span>✳</span></span><span class="s12-orbit-one"></span><span class="s12-orbit-two"></span></div></section>',
 '<aside class="s12-demo-boundary"><strong>'+esc(ui.demo)+'</strong><p>'+esc(t.notYetCart)+'</p><p>'+esc(ui.noPayment)+'</p></aside>',
 filter,'<noscript><p class="s12-noscript">'+esc(t.demoDisclaimer)+' '+esc(t.showAll)+'</p></noscript>',
 results,bottom,'</main>',footer,'</div>','</body>','</html>',''].join('\n');
}
for(const locale of locales){
 const output=join(site,locale,'catalog','index.html');
 await mkdir(dirname(output),{recursive:true});
 const html=build(locale);
 await writeFile(output,html,'utf8');
 console.log('S12_CATALOG '+locale+' '+Buffer.byteLength(html,'utf8')+' bytes');
}
