// S10: deterministic editorial Home blocks, sourced only from content/i18n.v1.json.
// The result is plain semantic HTML; no runtime JavaScript dependency.
export function makeHomeBlocks(locale, source, escapeHTML) {
  const l = source.locales[locale];
  const e = l?.homeExperience;
  if (!e || !l) throw new Error('Missing homeExperience for '+locale);
  const esc = escapeHTML;
  const text = value => {
    if (typeof value !== 'string' || value.trim().length < 2)
      throw new Error('Missing editorial copy in '+locale);
    return esc(value);
  };
  for (const key of ['kicker','audience','heroNote','visualLabel','introKicker','introTitle','introLead',
    'methodKicker','methodTitle','methodLead','nextKicker','nextTitle','nextLead',
    'nextPrimary','nextSecondary','sampleNotice']) text(e[key]);
  if (!Array.isArray(e.principles) || e.principles.length !== 3 ||
      !Array.isArray(e.steps) || e.steps.length !== 3 ||
      !Array.isArray(e.stats) || e.stats.length !== 3)
    throw new Error('S10 lists must have 3 entries for '+locale);
  for (const group of [e.principles,e.steps])
    for (const entry of group) { text(entry.title);text(entry.description); }

  const heroContext =
    '<p class="home-audience">'+text(e.audience)+'</p>'+
    '<p class="home-hero-note"><span class="home-star" aria-hidden="true">✦</span>'+text(e.heroNote)+'</p>';

  const visualLabel =
    '<div class="hero-visual-heading" aria-hidden="true">'+
      '<span class="orbit-dot"></span><span>'+text(e.visualLabel)+'</span>'+
    '</div>';

  const stats = '<section class="home-stats" aria-label="'+text(e.statsLabel)+'">'+
    '<div class="stats-intro"><span aria-hidden="true" class="stats-spark">✳</span>'+
    '<span>'+text(e.sampleNotice)+'</span></div>'+
    '<dl class="stat-grid">'+e.stats.map((label,index)=>
      '<div class="stat"><dt>'+text(label)+'</dt><dd><bdi dir="ltr">'+
      [source.serviceIds.length,source.caseIds.length,source.productIds.length][index]+
      '</bdi></dd></div>').join('')+'</dl></section>';

  const intro = '<section class="home-intro" aria-labelledby="home-intro-title">'+
    '<div class="intro-heading"><p class="eyebrow">'+text(e.introKicker)+'</p>'+
    '<h2 id="home-intro-title">'+text(e.introTitle)+'</h2>'+
    '<p>'+text(e.introLead)+'</p></div>'+
    '<div class="principles-grid">'+e.principles.map((p,index)=>
      '<article class="principle"><span class="principle-index" aria-hidden="true"><bdi dir="ltr">0'+(index+1)+'</bdi></span>'+
      '<h3>'+text(p.title)+'</h3><p>'+text(p.description)+'</p></article>').join('')+
    '</div></section>';

  const process = '<section class="section home-process" id="process" aria-labelledby="process-title" tabindex="-1">'+
    '<div class="process-lead"><p class="eyebrow">'+text(e.methodKicker)+'</p>'+
    '<h2 id="process-title">'+text(e.methodTitle)+'</h2>'+
    '<p>'+text(e.methodLead)+'</p></div>'+
    '<ol class="process-list">'+e.steps.map((step,index)=>
      '<li class="process-step"><span class="process-number" aria-hidden="true"><bdi dir="ltr">0'+(index+1)+'</bdi></span>'+
      '<div><h3>'+text(step.title)+'</h3><p>'+text(step.description)+'</p></div></li>').join('')+
    '</ol></section>';

  const closing = '<section class="home-closing" aria-labelledby="home-closing-title">'+
    '<div><p class="eyebrow">'+text(e.nextKicker)+'</p>'+
    '<h2 id="home-closing-title">'+text(e.nextTitle)+'</h2>'+
    '<p>'+text(e.nextLead)+'</p></div>'+
    '<div class="closing-actions"><a class="btn btn-primary" href="#services">'+text(e.nextPrimary)+'</a>'+
    '<a class="btn btn-secondary" href="#work">'+text(e.nextSecondary)+'</a></div>'+
    '</section>';
  return {heroContext,visualLabel,stats,intro,process,closing,kicker:text(e.kicker)};
}
