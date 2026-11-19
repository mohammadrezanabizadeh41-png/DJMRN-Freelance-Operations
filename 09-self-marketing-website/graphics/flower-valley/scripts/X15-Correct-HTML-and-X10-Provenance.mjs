import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const auditDir=path.join(root,'02-reviewed-derived','X15-AUDIT-CURRENT');
const runtime=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X15-Source-Coverage-Reconciler','scripts');
const manifestFile=path.join(auditDir,'X15-six-new-work-route-response-bodies.json');
const mainFile=path.join(runtime,'x15-audit-all-captures.mjs');
const fetchFile=path.join(runtime,'x15-fetch-six-new-work-route-bodies.mjs');
const archiveFile=path.join(auditDir,'X15-archive-container-and-X10-CDX-index.json');
const report=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
const archive=JSON.parse(fs.readFileSync(archiveFile,'utf8'));
const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const assertions=[];
const amended=[];
if(archive.summary?.x10UniqueFirstPartyCDXURLPaths!==46 || archive.summary?.x10FirstPartyCDXRecords!==47 || archive.summary?.zipCrcPass!==16)throw Error('X10 archive provenance gate failed');
for(const row of report.results||[]){
 if(row.status!==200||!row.privateFile||!row.sha256)throw Error('X15 work body row incomplete');
 const isHtml=row.responseMime==='text/html'&&row.url.startsWith('https://www.gladeye.com/work/');
 let finalName=row.privateFile;
 if(isHtml){
  if(path.extname(finalName).toLowerCase()==='.ico')finalName=finalName.slice(0,-4)+'.html';
  if(path.extname(finalName).toLowerCase()!=='.html')throw Error('Expected HTML extension for '+row.url);
 }
 const oldExists=fs.existsSync(row.privateFile),newExists=fs.existsSync(finalName);
 if(!oldExists&&!newExists)throw Error('Missing preexisting private file '+row.privateFile);
 const oldBytes=fs.readFileSync(oldExists?row.privateFile:finalName);
 const actual=sha256(oldBytes);
 if(actual!==row.sha256)throw Error('Existing bytes differ from manifest hash '+row.url);
 if(isHtml && !oldBytes.subarray(0,300).toString('utf8').trimStart().match(/^(<!doctype html|<html)/i))throw Error('HTML syntax evidence missing '+row.url);
 if(oldExists&&finalName!==row.privateFile){
  if(newExists)throw Error('Destination already exists; refusal to overwrite '+finalName);
  fs.renameSync(row.privateFile,finalName);
 }
 if(sha256(fs.readFileSync(finalName))!==row.sha256)throw Error('Post-renaming hash failed '+row.url);
 const original=row.privateFile;
 row.privateFile=finalName;
 row.originalFilenameExtensionBeforeFix=isHtml?'.ico':path.extname(finalName);
 row.verifiedFileType=row.responseMime;
 if(isHtml)amended.push({url:row.url,oldRel:path.relative(root,original).replaceAll('\\','/'),newRel:path.relative(root,finalName).replaceAll('\\','/'),sha256:row.sha256});
}
if(amended.length!==4 && !report.correction?.renamedHTMLCount)throw Error('Expected exactly four HTML corrections, found '+amended.length);
report.correction={correctedUtc:new Date().toISOString(),renamedHTMLCount:4,reason:'Four original text/html bodies were mistakenly stored under .ico extension; corrected only extension, not bytes.',originalPayloadSHA256Preserved:true,files:amended.length?amended:report.correction?.files||[]};
const backupManifest=manifestFile+'.pre-X15-closure.bak';
if(!fs.existsSync(backupManifest))fs.copyFileSync(manifestFile,backupManifest);
fs.writeFileSync(manifestFile,JSON.stringify(report,null,2));
const mainPrior=fs.readFileSync(mainFile,'utf8');
let main=mainPrior;
const patches=[
 {
  anchor:"const x11=getDer('X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json');",
  change:"const x10ArchiveAudit=getDer('X15-AUDIT-CURRENT/X15-archive-container-and-X10-CDX-index.json');\nif(x10ArchiveAudit){\n const summary=x10ArchiveAudit.summary||{};\n if(summary.x10FirstPartyCDXRecords!==47||summary.x10UniqueFirstPartyCDXURLPaths!==46||summary.zipCrcPass!==16)diagnostics.push({kind:'X10_ARCHIVE_INDEX_ACCEPTANCE_FAILED',summary});\n for(const r of x10ArchiveAudit.x10CdxFirstPartyUrlRows||[]){add('X10',r.url,'WACZ_CDXJ_INDEXED_RESPONSE',null,null,r.status,'X10 Browsertrix WACZ CDXJ HTTP index; r.archiveSHA256 is archive-container SHA, NOT response body SHA');}\n}\nconst x11=getDer('X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json');"
 },
 {
  anchor:"const coverage={\n independentlyObservedNetworkFirstPartyPaths:",
  change:"const unresolvedKinds={\n 'https://www.gladeye.com/_next':{code:'DIRECTORY_REDIRECT_308',meaning:'HTTP 308 redirect endpoint, not a standalone asset body; no canonical file to download',action:'RECORD_REDIRECT_ONLY'},\n 'https://www.gladeye.com/_next/image':{code:'QUERY_DEPENDENT_IMAGE_OPTIMIZER',meaning:'Different source image and widths are selected by original query parameters stripped during path normalization; mixed 200/404/502 responses cannot be collapsed into one file',action:'MARK_UNKNOWN_UNTIL_ORIGINAL_SAFE_FULL_QUERY_AVAILABLE'},\n 'https://www.gladeye.com/favicon.ico':{code:'HTTP_404_NOT_VALID_ICON',meaning:'favicon.ico returned HTTP 404; error HTML body exists in earlier WARC but is not a valid standalone favicon binary',action:'NO_RETRY_NEEDED_FAVICON_SVG_OBSERVED_SEPARATELY'}\n};\nconst missing=independentlyNetworkObserved.filter(r=>!r.verifiedOriginalBody).map(r=>({url:r.url,stages:r.stages,statuses:r.statusSeen,evidenceTypes:r.evidenceTypes,...(unresolvedKinds[r.url]||{code:'UNCLASSIFIED_REQUIRES_REVIEW',meaning:'Unknown missing raw-body source',action:'REVIEW'})}));\nconst coverage={\n independentlyObservedNetworkFirstPartyPaths:"
 },
 {
  anchor:"networkObservedPathsWithoutStandaloneOriginalBody:independentlyNetworkObserved.filter(r=>!r.verifiedOriginalBody).length,",
  change:"networkObservedPathsWithoutStandaloneOriginalBody:independentlyNetworkObserved.filter(r=>!r.verifiedOriginalBody).length,\n remainingNetworkPathWithoutOriginalBodyReasons:missing,"
 },
 {
  anchor:"x01LocalFilesVerifiedExist:manifestVerified,x01ExactSHA256Pass:manifestSHAverified,",
  change:"x01LocalFilesVerifiedExist:manifestVerified,x01ExactSHA256Pass:manifestSHAverified,x10ArchiveEvidence:x10ArchiveAudit?.summary||null,"
 },
 {
  anchor:"'- X14 7 new downloaded response bodies include",
  change:"'- X10 original Browsertrix WACZ/CDXJ audit: **'+(x10ArchiveAudit?.summary?.x10UniqueFirstPartyCDXURLPaths??'UNVERIFIED')+'** unique first-party indexed URL paths, **'+(x10ArchiveAudit?.summary?.x10FirstPartyCDXRecords??'UNVERIFIED')+'** response index records, ZIP CRC **'+(x10ArchiveAudit?.summary?.zipCrcPass??0)+'/'+(x10ArchiveAudit?.summary?.totalArchiveFiles??0)+'**, and no claim that CDXJ archive SHA is the original response-body SHA.',\n'- Three remaining HTTP-network-observed paths without a standalone valid body are **'+missing.map(x=>x.url+' ('+x.code+')').join(', ')+'**. These are a redirect, a query-sensitive transformation service and an HTTP404 file, not three necessarily missing useful site assets.',\n'- X14 7 new downloaded response bodies include"
 },
 {
  anchor:"x15SixWorkBodiesAllPass:x15SixVerified.length===6&&x15SixVerified.every(x=>x.integrity===\"PASS_SHA256\"),",
  change:"x15SixWorkBodiesAllPass:x15SixVerified.length===6&&x15SixVerified.every(x=>x.integrity===\"PASS_SHA256\"),\n x10CdxWarcIndexImported:!!x10ArchiveAudit&&uniqueByStages.X10.observedFirstPartyPaths===46,\n allRemainingMissingRawPathsClassified:missing.length===3&&missing.every(x=>x.code!=='UNCLASSIFIED_REQUIRES_REVIEW'),\n x15FourHtmlBodiesCorrectlyTyped:(x15Six?.results||[]).filter(x=>x.responseMime==='text/html'&&x.privateFile?.endsWith('.html')&&fs.existsSync(x.privateFile)&&shaOfFile(x.privateFile)===x.sha256).length===4,"
 }
];
for(const p of patches){
 if(main.includes(p.change)){assertions.push('already_'+p.anchor.slice(0,35));continue}
 if(!main.includes(p.anchor))throw Error('Missing original X15 auditor patch anchor: '+p.anchor.slice(0,125));
 main=main.replace(p.anchor,p.change);
 assertions.push('patched_'+p.anchor.slice(0,35));
}
const originalFetch=fs.readFileSync(fetchFile,'utf8');
const oldExt="url.endsWith('.txt')?'.txt':'.ico'";
const newExt="url.endsWith('.txt')?'.txt':url.startsWith('https://www.gladeye.com/work/')?'.html':'.ico'";
if(!originalFetch.includes(oldExt)&&!originalFetch.includes(newExt))throw Error('Unexpected fetch-six extension logic');
let newFetch=originalFetch.replace(oldExt,newExt);
fs.writeFileSync(mainFile,main);
fs.writeFileSync(fetchFile,newFetch);
fs.writeFileSync(path.join(auditDir,'X15-closure-provenance-fixes.json'),JSON.stringify({run:'X15-CLOSURE-2026-11-19',correctedUtc:new Date().toISOString(),x10WaczIndex:{sourceArchiveAuditFile:'X15-archive-container-and-X10-CDX-index.json',cdxRecords:47,uniqueUrlPaths:46,crcZipPass:16,archiveSHAIsNotResponseSHA:true},htmlExtensionFix:report.correction,originalManifestBackup:path.basename(backupManifest),tools:'Node.js core file system and digest only; no new internet access',auditorPatches:assertions},null,2));
console.log('X15_PROVENANCE_FIX_COMPLETE',JSON.stringify({renamedHtml:report.correction.renamedHTMLCount,updatedX10CDXIndex:true,patches:assertions,manifest:manifestFile,mainAuditor:mainFile,fetchSix:fetchFile}));