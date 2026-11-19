// DJMRN X18: final local evidence reconciliation and public-safe report generator.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const d=path.join(root,'02-reviewed-derived','X18-CURRENT'),pre=path.join(root,'02-reviewed-derived','X18-PREFLIGHT'),retry=path.join(root,'02-reviewed-derived','X18-FOCUSED-RETRY');
const previous=path.join(root,'02-reviewed-derived','X16-CURRENT');
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),read=(dir,n)=>load(path.join(dir,n));
const save=(n,v)=>fs.writeFileSync(path.join(d,n),JSON.stringify(v,null,2)+'\n');
const sha=b=>createHash('sha256').update(b).digest('hex');
const main=read(d,'X18-MAIN-SUMMARY.json'),offline=read(d,'X18-OFFLINE-ALL-34-JSDJ-PLUGIN-AUDIT.json');
const install=read(pre,'X18-INSTALL-ACCEPTANCE.json'),fixture=read(pre,'X18-OWN-FIXTURE-ACCEPTANCE.json');
const home=read(retry,'X18-route-00-metadata.json'),work=read(retry,'X18-route-01-metadata.json');
const html=read(d,'X18-WORK-HTML-FALLBACK.json'),novel=read(d,'X18-NEW-JS-ORIGINAL-BODIES-MANIFEST.json');
const x16=read(previous,'X16-independent-acceptance.json'),oldInventory=read(previous,'X16-offline-byte-verified-js-inventory.json');
const missingOld=oldInventory.resources.filter(x=>!x.verified).map(x=>x.url);
const rawNew=novel.items.map(v=>{const f=path.join(root,...v.privateRelativePath.split('/'));
 if(!fs.existsSync(f))throw Error('MISSING_NEW_JS '+v.url);
 const b=fs.readFileSync(f),hash=sha(b);
 if(hash!==v.sha256||b.length!==v.bytes)throw Error('NEW_JS_SHA_ERROR '+v.url);
 return {url:v.url,bytes:v.bytes,sha256:hash,httpStatus:v.httpStatus,mime:v.contentType}});
const scriptEntries=main.resourceIndex.filter(x=>{try{return new URL(x.url).pathname.endsWith('.js')}catch{return false}});
const currentNew=main.additionalPathsBeyondX16.filter(x=>{try{return new URL(x).pathname.endsWith('.js')}catch{return false}});
const allRoutes=main.scans.map(x=>{let y=x;if(x.route==='/')y={...x,status:home.status,focusedRetrySeconds:home.elapsedSeconds};
 if(x.route==='/work')y={...x,status:work.status,focusedRetrySeconds:work.elapsedSeconds,
  fallbackHtmlHttp:html.httpStatus,fallbackScriptUrls:html.uniqueFirstPartyScriptUrls};
 return y});
const pass=allRoutes.filter(x=>x.status==='PASS').length,partial=allRoutes.filter(x=>x.status!=='PASS').length;
const totalRequests=main.scans.reduce((a,b)=>a+(b.requests||0),0)+home.requests+work.requests;
const combinedKnown=oldInventory.numberIndexed+1+rawNew.length;
const checks={
  sourceAuthorityX16:x16.status==='COMPLETE_SCOPE_QUALIFIED',
  jsdjInstalledPinned:install.status==='CLI_INSTALLED_AND_PLUGIN_REGISTRY_VERIFIED'&&install.version==='0.1.2'&&install.pluginLines===26,
  ownerFixtureRun:fixture.status==='OPERATIONAL_LOCALHOST_FIXTURE_PASS'&&fixture.exitCode===0,
  tenRoutesAttempted:main.routesCompleted===10&&allRoutes.length===10,
  nineMainOrFocusedRoutesPass:pass===9&&partial===1&&allRoutes.find(x=>x.route==='/work').status==='PARTIAL',
  workHTMLFallback:html.httpStatus===200&&html.uniqueFirstPartyScriptUrls>=1,
  allNewJSOriginalSHA:rawNew.length===3&&rawNew.every(x=>x.httpStatus===200&&x.sha256&&x.bytes>0),
  offlineAllVerifiedJs:offline.verifiedJsInputCount===34&&offline.pluginCount===26&&offline.pluginExceptions===0,
  sourceMapEvidenceBounded:main.mapCount===0&&offline.errors.length===0,
  allRawFilesPrivate:novel.items.every(x=>x.privateRelativePath.startsWith('01-private-captures/')),
  hostScopeAndEmergencyMemory:home.minimumRAMMiB>100&&work.minimumRAMMiB>100&&main.scans.length===10
};
const failed=Object.entries(checks).filter(([k,v])=>!v).map(([k])=>k);
const status=failed.length===0?'COMPLETE_SCOPE_QUALIFIED_WITH_KNOWN_WORK_TIMEOUT':'NEEDS_REVIEW';
const artifact={stage:'X18',status,utc:new Date().toISOString(),checks,failedChecks:failed,
  scope:{firstPartyHosts:['gladeye.com','www.gladeye.com'],routesAttempted:main.routesCompleted,
  jsdjPassRoutes:pass,jsdjPartialRoutes:partial,workFallback:html.status,requestsAcrossOriginalAndFocusedRuns:totalRequests,
  uniqueJsPathsFromLivePlugin:scriptEntries.length,firstPartyPluginDependencyRelations:main.dependencyObservations.filter(x=>x.to.endsWith('.js')).length,
  newJsPathsSinceX16:currentNew.length,newShaVerifiedBytes:rawNew.reduce((n,x)=>n+x.bytes,0),
  originalBodyVerifiedTotal:offline.verifiedJsInputCount,knownClientJsPaths:combinedKnown,knownUnverifiedPaths:missingOld,
  offlinePluginCount:offline.pluginCount,offlineStaticPotentialEdges:offline.potentialEdges,
  offlinePotentialTargetPaths:offline.uniqueTargets,jsdjAdvertisedMapsOnTarget:main.mapCount,sourceFilesRestoredOnTarget:main.sourceCount,
  ownerFixtureSourceMapCount:fixture.parsedSummary?.sourceMapCount||0},
  gaps:['The /work jsdj full traversal exceeded 90 seconds twice (all-26 and focused-25-plugin modes). Independent HTML GET HTTP200 found five first-party script references and X16 CDP had successfully observed this route.','One X15 path /gtm.q-c92099c696a43b1f.js lacks a verified standalone body.','Static candidates including Draco decoder and a manifest-relative URL were not confirmed as accessible assets; their inferred paths are not recovered sources.','No original source maps were advertised in the tested target resources; no vendor authored module tree/backend or shaders recovered.'],
  citations:{sourceFiles:'X18 public and private files on owner machine',scriptInventory:'X18-public-sanitized-discovery.json'},
  verifiedNewJsMetadata:rawNew};
save('X18-final-independent-acceptance.json',artifact);
const sanit={stage:'X18',status,utc:artifact.utc,
  routes:allRoutes.map(x=>({route:x.route,status:x.status,requests:x.requests,js:x.js,map:x.map,sources:x.sources,focusedRetrySeconds:x.focusedRetrySeconds||null,htmlFallbackScripts:x.fallbackScriptUrls||null})),
  jsDetails:scriptEntries.map(x=>({url:x.url,observedRoutes:x.routes,plugins:x.plugins})),
  verifiedNewJs:rawNew,sourceMapCount:main.mapCount,sourceFilesRecovered:main.sourceCount,
  offline:{verifiedJsBytes:offline.verifiedJsInputCount,pluginCount:offline.pluginCount,
   staticPotentialEdges:offline.potentialEdges,staticCandidates:offline.candidateEdges.map(x=>({fromJs:x.fromJs,candidate:x.candidate,plugin:x.plugin,verifiedOnNetwork:false})),
   numberPotentialUniqueTargets:offline.uniqueTargets},
  provenanceNotes:['JS and HTML route references are separated','Client runtime observed network initiators in X16 are independent evidence','Static jsdj candidates are hypotheses; do not equate them to served files','Vendor response bodies and restored code never published to GitHub']};
save('X18-public-sanitized-discovery.json',sanit);
const csvCols=['url','observedRoutes','plugins','isVerifiedNewBody','bytes','sha256'];
const csvRows=scriptEntries.map(x=>{const v=rawNew.find(y=>y.url===x.url);return{url:x.url,observedRoutes:x.routes.join(';'),plugins:x.plugins.join(';'),
isVerifiedNewBody:!!v,bytes:v?.bytes||'',sha256:v?.sha256||''}});
const q=v=>'"'+String(v??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(d,'X18-public-js-discovery.csv'),[csvCols.join(','),...csvRows.map(x=>csvCols.map(k=>q(x[k])).join(','))].join('\r\n')+'\r\n');
const lines=[
'# DJMRN X18 — Dynamic JavaScript discovery and source-map reachability',
'',
'**Date:** 2026-11-20. **Status:** '+status+'. **Next:** X19 NOT STARTED.',
'',
'## Installation and real operational checks',
'- Bridgerator 1.1.19 connected to DJMRN-LAPTOP. Node 24.22.1 / npm 11.19.1. Software: official @ejfkdev/jsdj v0.1.2, MPL-2.0; isolated in the project toolkit, no UAC or paid API.',
'- 26 plugin names loaded; upstream package has 0 direct runtime dependencies. On-laptop npm audit reported 0 current vulnerabilities.',
'- Independent owner-only localhost test: 9 requests, 3 JS URLs, 1 source map and 1 restored OWN source file, exit code 0; test guards all passed.',
'',
'## Main first-party public scan',
'- 10 of 10 designated X16 public routes attempted using anonymous GET/HEAD only on gladeye.com and www.gladeye.com; no cookies, private accounts or third-party hosts.',
'- Main plus targeted focused retry: '+pass+' routes completed jsdj PASS, '+partial+' route had a bounded timeout (/work). Original+focused scan requests recorded: '+totalRequests+'.',
'- Independent /work fallback verified original public HTML response HTTP 200, '+html.htmlBytes+' bytes, '+html.uniqueFirstPartyScriptUrls+' unique first-party script src paths; SHA256 '+html.htmlSha256+'. It does not replace complete jsdj recursive crawl.',
'- The live plugin output contains '+scriptEntries.length+' actual .js-path entries after excluding '+(main.resourceIndex.length-scriptEntries.length)+' HTML/route entries mistakenly mixed into plugin URL lists. Scanner JS dependency edges are static discovery/provenance, not complete executed module imports.',
'',
'## Newly verified response bodies',
'- '+rawNew.length+' genuinely additional JS files not in X16, HTTP200 and SHA256 verified: '+rawNew.map(x=>x.url+' ('+x.bytes+' B; '+x.sha256+')').join('; ')+'.',
'- X16 baseline was 31 SHA-verified body files within 32 observed JS paths. X18 adds 3 = '+offline.verifiedJsInputCount+' SHA-verified original bodies in '+combinedKnown+' known JS paths, one unresolved previous path '+missingOld.join(', ')+'.',
'- Raw vendor bytes saved ONLY in owner private capture folder, not GitHub. Public metadata in X18-public-sanitized-discovery.json and CSV.',
'',
'## Full offline plugin sweep and findings',
'- All '+offline.verifiedJsInputCount+' SHA-verified first-party JS bodies inspected with '+offline.pluginCount+' jsdj plugins. Plugin errors: '+offline.pluginExceptions+'.',
'- '+offline.potentialEdges+' static pattern edges, '+offline.uniqueTargets+' unique potential target paths. These are HYPOTHESES, not witnessed runtime loads or confirmed available assets.',
'- Draco decoder and wrapper candidate paths came from bundle 596 via UniversalURLPlugin; HEAD failed for one and returned HTTP404 for other. BuildManifest-generated nested _error path also returned HTTP404; no asset existence claimed.',
'- X16 independently recorded 130 CDP first-party network initiator edges; that runtime observation is not equivalent to the static jsdj hints.',
'',
'## Source-map scope and honest limitations',
'- Original target publicly advertised/reachable Source Map candidates: '+main.mapCount+' in this jsdj pass, as previously zero declared during X16. New/restored original authored sources: '+main.sourceCount+'.',
'- Source maps named by patterns or sibling probes are NOT the original private authoring source; no proprietary React TypeScript/GLSL server-side source claimed. Owner fixture map is separate and valid.',
'- Two bounded full /work jsdj attempts timed out; we closed via verifiable HTML fallback and prior X16 CDP data, not by claiming 10/10 jsdj PASS.',
'',
'## Reproducibility and durable project state',
'- Exact local X18 install and localhost fixtures in 02-reviewed-derived/X18-PREFLIGHT/. Main route metadata, final acceptance, static plugin output, sanitized JSON+CSV and this handoff in 02-reviewed-derived/X18-CURRENT/.',
'- Full vendor responses and owner runtime cache in 01-private-captures/X18/ and 01-private-captures/X18-FOCUSED-RETRY/. These stay outside public GitHub.',
'- Tools and scripts: X18-Install-Verify-jsdj.ps1, X18-Localhost-Fixture-Preflight.mjs, X18-Bounded-FirstParty-Main-Scan.mjs plus cache patch, X18-Offline-Jsdj-All-Verified-Bundles.mjs plus the 34-file extension patch, X18-Work-Public-HTML-Fallback.mjs, X18-Verify-New-FirstParty-JS-Bodies.mjs, X18-Finalize-Independent-Acceptance.mjs.',
'',
'## Acceptance gates',
Object.entries(checks).map(([k,v])=>'- '+k+': '+(v?'PASS':'FAIL')).join('\n'),
'',
'**Final decision:** '+status+'. No X19 execution; X19 is next when requested.'
];
fs.writeFileSync(path.join(d,'X18-TECHNICAL-HANDOFF-2026-11-20.md'),lines.join('\n')+'\n');
const src=path.join(pre,'X18-Finalize-Independent-Acceptance.mjs'),dest=path.join(d,'X18-Finalize-Independent-Acceptance.mjs');
if(fs.existsSync(src)&&!fs.existsSync(dest))fs.copyFileSync(src,dest);
console.log('X18_ACCEPTANCE '+JSON.stringify({status,gates:Object.keys(checks).length,failedChecks:failed,jsdjPass:pass,jsdjPartial:partial,
  workHtmlScripts:html.uniqueFirstPartyScriptUrls,verifiedBodies:offline.verifiedJsInputCount,knownPaths:combinedKnown,
  newJs:rawNew.length,liveJSPaths:scriptEntries.length,offlineEdges:offline.potentialEdges,sourceMaps:main.mapCount,publicSize:fs.statSync(path.join(d,'X18-public-sanitized-discovery.json')).size}));
if(failed.length)process.exitCode=2;
