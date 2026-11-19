import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const der=path.join(root,'02-reviewed-derived');
const run=process.argv[2]||'X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z';
const read=(n)=>JSON.parse(fs.readFileSync(path.join(der,n),'utf8').replace(/^\uFEFF/,''));
const timeline=read(run+'-temporal-observation.json');
const visual=read(run+'-visual-frame-change-and-X11-comparison.json');
const graph=read('X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json');
const params=read('X12-13-scene-parameter-labels-to-X01-raw-JS-crosswalk-2026-11-19.json');
const old=read('X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json');
const oldManifest=JSON.parse(fs.readFileSync(path.join(root,'01-private-captures/X01-REDO/X01-R2-2026-11-18T18-01-09-463Z/private-capture-manifest.json'),'utf8'));
const norm=(raw)=>{try{const u=new URL(raw);return u.origin+u.pathname}catch{return null}};
const pastFirstParty=new Set();
for(const row of old.rows||[]){if(row.firstParty&&row.host){pastFirstParty.add('https://'+row.host+row.path)}}
for(const row of oldManifest.responses||[]){if(row.url){const n=norm(row.url);if(n)pastFirstParty.add(n)}}
const ticks=timeline.ticks||[];
const currentResources=[...new Set(ticks.flatMap(t=>t.page?.resources?.map(r=>r.url)||[]).filter(Boolean))].sort();
const firstParty=currentResources.filter(u=>u.startsWith('https://www.gladeye.com/')||u.startsWith('https://gladeye.com/'));
const thirdParty=currentResources.filter(u=>!firstParty.includes(u));
const onlyNewFirstParty=firstParty.filter(u=>!pastFirstParty.has(u));
const existingFirstParty=firstParty.filter(u=>pastFirstParty.has(u));
const newInTime=ticks.map(t=>({plannedSecond:t.plannedSecond,actualSecond:t.actualSecond,reportedResourceEvents:t.page?.resourceCount??null,newURLPaths:t.firstSeenResourcePaths?.length||0,canvases:t.page?.canvas?.length??null,controlSignature:t.controlSignature,resourceSignature:t.resourceSignature,screenshot:!!t.screenshot}));
const uniqueControls=[...new Set(ticks.map(t=>t.controlSignature).filter(Boolean))];
const uniqueResourceSets=[...new Set(ticks.map(t=>t.resourceSignature).filter(Boolean))];
const screenshotHashes=ticks.filter(t=>t.screenshot).map(t=>t.screenshot.sha256);
const scope={
 completed180:timeline.status==='COMPLETE_180_SECONDS'&&timeline.elapsedSeconds>=180&&ticks.length===13,
 fullPageSamplingIntervalSeconds:15,
 screenshotSamplingIntervalSeconds:30,
 coverageLimitation:'Thirteen samples and seven screenshots are NOT every 3D frame. WebGL internal camera matrices, shaders/uniform values and GPU draw commands were not captured by this X12 temporal instrument. X11 was its own 180-second WARC+visual observer.',
 noNewNetworkResourceObservedAfter15Seconds:ticks.slice(2).every(t=>(t.firstSeenResourcePaths||[]).length===0),
 previouslyKnownSceneParameterNames:params.alreadyInEarlierRawJS,
 numericDefaultsFromEarlierScript:params.entries.filter(e=>e.defaultSetting!==null).length,
 numericSliderRangesFromEarlierScript:params.entries.filter(e=>e.uiSliderMin!==null&&e.uiSliderMax!==null).length
};
const result={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X12',run,verdict:'TRUE180_OBSERVER_COMPLETE__CONTENT_NOVELTY_DEDUPED',sources:{timeline:run+'-temporal-observation.json',visual:run+'-visual-frame-change-and-X11-comparison.json',graph:'X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json',priorX11:'X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json',priorX01:'X01-REDO first-party response manifest',sceneParameterCrosswalk:'X12-13-scene-parameter-labels-to-X01-raw-JS-crosswalk-2026-11-19.json'},scope,statistics:{actualObservationSeconds:timeline.elapsedSeconds,samples:ticks.length,screenCaptures:screenshotHashes.length,distinctScreenshotHashes:new Set(screenshotHashes).size,meanSampled30SecPixelChangePct:visual.averageChangedPercent,sampleGestureCount:timeline.interactions.length,successfulGestureCount:timeline.interactions.filter(x=>x.ok).length,tickErrors:timeline.errors.length,distinctObservedControlSignatures:uniqueControls.length,distinctResourceSetSignatures:uniqueResourceSets.length,uniqueResourceURLPaths:currentResources.length,firstPartyResourceURLPaths:firstParty.length,thirdPartyResourceURLPaths:thirdParty.length,firstPartyPreviouslyKnownByX01OrX11:existingFirstParty.length,firstPartyAbsentFromX01AndX11RawWarcIndex:onlyNewFirstParty.length,priorFirstPartyURLIndexSize:pastFirstParty.size,priorX12GraphStates:graph.states?.length,priorX12GraphEdges:graph.edges?.length,parameterNamesIndexed:params.entries.length,parameterNamesAlreadyInX01Raw:params.alreadyInEarlierRawJS},
 potentiallyNovelURLPaths:onlyNewFirstParty,
 thirdPartyURLPaths:thirdParty,
 timelineSummary:newInTime,
 classifications:[
 {type:'NEW_METHOD_DERIVED_STRUCTURED_EVIDENCE',evidence:'PinchTab 13 timestamped live browser snapshots + 7 screenshot SHA refs + 7 input gestures + sampled resource timing; complement to X11 WACZ, but not additional downloaded assets'},
 {type:'RESTRUCTURED_ALREADY_CAPTURED_SOURCE',evidence:'13 GUI parameter names from WebGraph, all 13 present in existing X01 raw JS; new index linked to prior SHA, numeric defaults and UI slider ranges; old JS not copied'},
 {type:'NAVIGATION_GRAPH_NEW_DATA_TYPE',evidence:'Previously verified 4 states/8 edges/content collections; nested case-study route absent from 53 earlier scoped derived report index, not a novel 3D texture'},
 {type:'NO_PROVEN_NEW_3D_BINARY',evidence:'No independently downloaded new GLB/GLTF, textures or compiled shader source; compare this no-delta observation with X11 180s archive'}
 ],limits:['Performance entries may be cached, truncated by browser buffer, or omit non-resource GPU events; transferSize 0 does not mean the asset did not load.','Screenshot pixel changes are not attribution of animation cause or unique asset discovery.','Screenshots and source bodies remain only in private desktop capture folder, not published to GitHub.','A state graph of navigation and DOM cannot infer canvas-only GPU state.','URL absence in two indexed baseline source lists is not proof an asset was never seen in any earlier stage.']};
const out=path.join(der,run+'-X01-X12-dedupe-and-value-report.json');
fs.writeFileSync(out,JSON.stringify(result,null,2));
console.log('DJMRN_X12_180_NOVELTY',JSON.stringify({file:out,stats:result.statistics,scope,paths:onlyNewFirstParty}));