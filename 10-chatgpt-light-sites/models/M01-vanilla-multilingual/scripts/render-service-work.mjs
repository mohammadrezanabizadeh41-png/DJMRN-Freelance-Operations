// S11: deterministic five-language Services / Work pages with original concept artwork.
// Single content authority: content/i18n.v1.json. Static, no remote runtime requests.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=join(root,'site');
const source=JSON.parse(await readFile(join(root,'content','i18n.v1.json'),'utf8'));
const localeOrder=['fa','en','ar','tr','de'];
const pageKinds=['home','services','work','catalog','contact','demo-checkout'];
if(JSON.stringify(source.localeOrder)!==JSON.stringify(localeOrder)||JSON.stringify(source.pageKinds)!==JSON.stringify(pageKinds))throw Error('S11 invalid locale/route registry');
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&#34;').replace(/'/g,'&#39;');
const safe=(s,ref)=>{
 if(typeof s!=='string'||s.trim().length<2)throw Error('Missing copy: '+ref);
 return e(s);
};
const link=(href,text,cls)=>'<a'+(cls?' class="'+cls+'"':'')+' href="'+href+'">'+e(text)+'</a>';
const relatedCase={
 'company-websites':'corporate-presence','landing-pages':'corporate-presence',
 'ui-accessibility':'digital-catalog','mobile-performance':'digital-catalog',
 'seo-localization':'corporate-presence','visual-identity':'creative-portfolio'
};
const art={ 'corporate-presence':'s11-corporate-presence.svg','creative-portfolio':'s11-creative-portfolio.svg','digital-catalog':'s11-digital-catalog.svg' };
function header(locale,type,l) {
 const nav=['home','services','work','catalog','contact'].map(k=>{
  const href=k==='home'?'/'+locale+'/':(k==='services'||k==='work'||k==='catalog'?'/'+locale+'/'+k+'/':'/'+locale+'/#'+k);
  return '<a href="'+href+'"'+(k===type?' aria-current="page"':'')+'>'+e(l.nav[k])+'</a>';
 }).join('');
 const switcher=localeOrder.map(code=>
  '<a href="/'+code+'/'+type+'/" lang="'+code+'" dir="'+source.locales[code].dir+'"'+
  (code===locale?' aria-current="page"':'')+'>'+e(source.locales[code].autonym)+'</a>').join('');
 return '<header class="site-header">'+
 '<a class="brand" href="/'+locale+'/" aria-label="NOVA Atelier — '+e(l.nav.home)+'">'+
 '<span class="brand-mark" aria-hidden="true">✳</span><bdi lang="en" dir="ltr">NOVA ATELIER</bdi></a>'+
 '<button class="menu-toggle" type="button" hidden aria-expanded="false" aria-controls="primary-nav" data-open-label="'+e(l.ui.menuOpen)+'" data-close-label="'+e(l.ui.menuClose)+'">'+e(l.ui.menuOpen)+'</button>'+
 '<nav class="site-nav" id="primary-nav" aria-label="'+e(l.ui.primaryNavigation)+'">'+nav+'</nav>'+
 '<nav class="locale-switch" aria-label="'+e(l.nav.languages)+'">'+switcher+'</nav></header>';
}
function footer(locale,l){
 const links=['home','services','work','catalog','contact'].map(k=>{
  const href=k==='home'?'/'+locale+'/':(k==='services'||k==='work'||k==='catalog'?'/'+locale+'/'+k+'/':'/'+locale+'/#'+k);
  return link(href,l.nav[k]);
 }).join('');
 return '<footer class="site-footer"><span><bdi lang="en" dir="ltr">NOVA Atelier</bdi> · '+e(l.ui.demo)+'</span>'+
 '<nav class="footer-nav" aria-label="'+e(l.ui.footerNavigation)+'">'+links+'</nav>'+
 link('#main-content',l.ui.backToTop,'back-to-top')+'</footer>';
}
function detail(label,value) {
 return '<div class="s11-fact"><dt>'+safe(label,'label')+'</dt><dd>'+safe(value,'value')+'</dd></div>';
}
function serviceArticle(locale,l,id,i){
 const b=l.services[id],d=l.serviceWork.services[id],labels=l.serviceWork.labels;
 if(!b||!d||!Array.isArray(d.process)||d.process.length!==3)throw Error('S11 service '+locale+'/'+id);
 return '<article class="s11-service" id="service-'+id+'" aria-labelledby="service-heading-'+id+'">'+
 '<div class="s11-service-lead"><span class="s11-index" aria-hidden="true"><bdi dir="ltr">'+String(i+1).padStart(2,'0')+'</bdi></span>'+
 '<div><p class="eyebrow">'+e(labels.scope)+'</p><h2 id="service-heading-'+id+'">'+safe(b.title,id+'.title')+'</h2>'+
 '<p class="s11-service-description">'+safe(b.description,id+'.description')+'</p></div></div>'+
 '<dl class="s11-facts">'+detail(labels.audience,d.audience)+detail(labels.inputs,d.inputs)+
 detail(labels.included,d.included)+detail(labels.excluded,d.excluded)+detail(labels.deliverable,d.deliverable)+'</dl>'+
 '<div class="s11-process"><h3>'+e(labels.process)+'</h3><ol>'+d.process.map(x=>'<li>'+safe(x,'process')+'</li>').join('')+'</ol></div>'+
 '<div class="s11-inline-actions">'+link('/'+locale+'/work/#case-'+relatedCase[id],labels.openCase,'s11-text-link')+
 link('/'+locale+'/#contact',labels.nextContact,'s11-text-link s11-muted-link')+'</div></article>';
}
function workArticle(locale,l,id,i) {
 const c=l.cases[id],d=l.serviceWork.cases[id],labels=l.serviceWork.labels;
 if(!c||!d||!source.serviceIds.includes(d.serviceId)||!art[id])throw Error('S11 concept '+locale+'/'+id);
 const asset='/assets/img/'+art[id];
 return '<article class="s11-case" id="case-'+id+'" aria-labelledby="case-heading-'+id+'">'+
 '<div class="s11-case-head"><div><p class="eyebrow">'+e(labels.concept)+' <bdi dir="ltr">0'+(i+1)+'</bdi> · '+e(l.ui.demo)+'</p>'+
 '<h2 id="case-heading-'+id+'">'+safe(c.title,id+'.title')+'</h2><p>'+safe(c.description,id+'.summary')+'</p></div>'+
 '<span class="s11-concept-chip">'+e(l.ui.concept)+'</span></div>'+
 '<figure class="s11-art"><img src="'+asset+'" alt="'+safe(c.alt,id+'.alt')+'" width="1200" height="690" loading="lazy" decoding="async">'+
 '<figcaption>'+e(labels.artLabel)+' · '+e(labels.concept)+'</figcaption></figure>'+
 '<dl class="s11-story">'+detail(labels.problem,d.problem)+detail(labels.approach,d.approach)+
 detail(labels.artifact,d.artifact)+detail(labels.learning,d.learning)+'</dl>'+
 '<div class="s11-inline-actions">'+link('/'+locale+'/services/#service-'+d.serviceId,labels.related+': '+l.services[d.serviceId].title,'s11-text-link')+
 link('/'+locale+'/#contact',labels.nextContact,'s11-text-link s11-muted-link')+'</div></article>';
}
function faq(l){
 const b=l.serviceWork.labels,qs=[[b.faqOne,b.answerOne],[b.faqTwo,b.answerTwo],[b.faqThree,b.answerThree]];
 return '<section class="s11-faq section" aria-labelledby="faq-heading"><div class="s11-heading-row">'+
 '<p class="eyebrow">NOVA / FAQ</p><h2 id="faq-heading">'+e(b.faq)+'</h2></div>'+
 '<div class="s11-faq-list">'+qs.map(([q,a])=>'<details><summary>'+e(q)+'</summary><p>'+e(a)+'</p></details>').join('')+'</div></section>';
}
function page(locale,type){
 const l=source.locales[locale],labels=l?.serviceWork?.labels,v=l?.views[type];
 if(!v||!labels||!['rtl','ltr'].includes(l.dir))throw Error('S11 locale '+locale);
 for(const id of source.serviceIds)if(!l.serviceWork.services[id])throw Error('Missing localized service '+locale+'/'+id);
 for(const id of source.caseIds)if(!l.serviceWork.cases[id])throw Error('Missing localized concept '+locale+'/'+id);
 const isServices=type==='services';
 const cards=isServices
 ?'<div class="s11-service-list">'+source.serviceIds.map((id,i)=>serviceArticle(locale,l,id,i)).join('')+'</div>'+faq(l)
 :'<div class="s11-case-list">'+source.caseIds.map((id,i)=>workArticle(locale,l,id,i)).join('')+'</div>';
 const next=isServices?link('/'+locale+'/work/',labels.exploreWork,'btn btn-primary'):link('/'+locale+'/services/',labels.exploreServices,'btn btn-primary');
 return ['<!DOCTYPE html>','<html lang="'+locale+'" dir="'+l.dir+'">','<head>','<meta charset="utf-8">',
 '<meta name="viewport" content="width=device-width, initial-scale=1">',
 '<meta name="robots" content="noindex,nofollow">',
 '<meta name="description" content="'+safe(v.description,'meta')+'">',
 '<title>'+safe(v.title,'title')+'</title>',
 '<link rel="stylesheet" href="/assets/css/tokens.css">',
 '<link rel="stylesheet" href="/assets/css/base.css">',
 '<link rel="stylesheet" href="/assets/css/components.css">',
 '<link rel="stylesheet" href="/assets/css/s11-detail.css">',
 '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
 '<script type="module" src="/assets/js/main.js"></script>',
 '</head>','<body class="s11-page" data-page="'+type+'">',
 '<a class="skip-link" href="#main-content">'+e(l.ui.skip)+'</a>',
 '<div class="shell">',header(locale,type,l),
 '<main id="main-content" tabindex="-1">',
 '<nav class="s11-crumb" aria-label="'+e(l.nav.home)+'">'+link('/'+locale+'/',labels.backHome)+
 '<span aria-hidden="true">/</span><span aria-current="page">'+e(l.nav[type])+'</span></nav>',
 '<section class="s11-hero" aria-labelledby="s11-hero-title">',
 '<div class="s11-hero-copy"><p class="eyebrow">NOVA ATELIER / '+e(l.ui.demo)+'</p>',
 '<h1 id="s11-hero-title">'+safe(v.h1,'H1')+'</h1>',
 '<p>'+safe(v.lead,'lead')+'</p>',
 '<div class="s11-hero-actions">'+next+link('/'+locale+'/#contact',labels.contactHome,'btn btn-secondary')+'</div></div>',
 '<div class="s11-hero-art" aria-hidden="true"><span class="s11-orbit s11-orbit-a"></span>'+
 '<span class="s11-orbit s11-orbit-b"></span><span class="s11-orbit-core">✳</span>'+
 '<span class="s11-hero-number"><bdi dir="ltr">'+(isServices?source.serviceIds.length:source.caseIds.length)+'</bdi></span></div>',
 '</section>',
 '<aside class="s11-boundary"><strong>'+e(l.ui.demo)+'</strong><p>'+e(labels.noSend)+'</p></aside>',
 cards,
 '<section class="s11-next section" aria-labelledby="next-heading"><div><p class="eyebrow">NOVA / NEXT</p>'+
 '<h2 id="next-heading">'+e(labels.nextContact)+'</h2><p>'+e(l.ui.noPersonalData)+'</p></div>'+
 link('/'+locale+'/#contact',labels.contactHome,'btn btn-primary')+'</section>',
 '</main>',footer(locale,l),'</div>','</body>','</html>',''].join('\n');
}
for(const locale of localeOrder){
 for(const kind of ['services','work']){
  const file=join(site,locale,kind,'index.html');
  await mkdir(dirname(file),{recursive:true});
  const html=page(locale,kind);
  await writeFile(file,html,'utf8');
  console.log('S11_RENDERED '+locale+'/'+kind+' '+Buffer.byteLength(html,'utf8')+' bytes');
 }
}
