// DJMRN X19: owner-authored, no-network Webpack-shaped static fixture.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {pathToFileURL} from 'node:url';
import crypto from 'node:crypto';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X19-PREFLIGHT');
const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X19-webcrack');
const pkg=JSON.parse(fs.readFileSync(path.join(rt,'node_modules','webcrack','package.json'),'utf8'));
if(pkg.version!=='2.16.0'||pkg.license!=='MIT')throw Error('PACKAGE_IDENTITY');
if(os.freemem()<350*1048576)throw Error('RAM_LT_350_MIB');
if(!fs.existsSync(path.join(rt,'package-lock.json')))throw Error('LOCK_MISSING');
fs.mkdirSync(dir,{recursive:true});
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const fixture='(()=>{"use strict";var __webpack_modules__={101:(module)=>{module.exports={flower:"OWN_X19_FIXTURE",count:3}},102:(module,exports,__webpack_require__)=>{var x=__webpack_require__(101);module.exports=x.flower}};var __webpack_module_cache__={};function __webpack_require__(id){var cached=__webpack_module_cache__[id];if(cached!==undefined)return cached.exports;var module=__webpack_module_cache__[id]={exports:{}};__webpack_modules__[id](module,module.exports,__webpack_require__);return module.exports};console.log(__webpack_require__(102))})();\n';
const input=path.join(dir,'X19-OWN-webpack-fixture.js');
if(fs.existsSync(input)&&sha(fs.readFileSync(input))!==sha(Buffer.from(fixture)))throw Error('OWN_FIXTURE_CHANGED');
if(!fs.existsSync(input))fs.writeFileSync(input,fixture,{flag:'wx'});
const out=path.join(dir,'X19-OWN-webcrack-unpack');
if(fs.existsSync(out))throw Error('EXISTING_OUTPUT_REVIEW_FIRST');
const {webcrack}=await import(pathToFileURL(path.join(rt,'node_modules','webcrack','dist','index.js')).href);
const timeout=setTimeout(()=>{console.error('X19_PRECHECK_TIMEOUT_30S');process.exit(124)},30000);
let result;
try{result=await webcrack(fixture,{deobfuscate:false,unminify:true,unpack:true,jsx:false});await result.save(out)}
finally{clearTimeout(timeout)}
const files=fs.readdirSync(out,{recursive:true}).filter(n=>fs.statSync(path.join(out,n)).isFile())
  .map(n=>({name:n,bytes:fs.statSync(path.join(out,n)).size}));
const accepted={stage:'X19',status:result.code?.length>0&&files.length>0?'STATIC_TOOL_OPERATIONAL':'FAILED',
 type:'OWNER_SYNTHETIC_ONLY',webcrackVersion:pkg.version,
 nativeSandbox:'NOT_INSTALLED_UNNECESSARY_FOR_STATIC_GATE',
 fixtureSha256:sha(Buffer.from(fixture)),fixtureBytes:Buffer.byteLength(fixture),
 resultCodeBytes:Buffer.byteLength(result.code||''),bundleType:result.bundle?.type||null,
 moduleCount:result.bundle?.modules?.size||0,outputFiles:files,
 ramFreeMiB:Math.round(os.freemem()/1048576),testedUtc:new Date().toISOString(),
 limitations:['Owner synthetic bundle does not prove target source recovery','No untrusted code evaluation',
 'No source map or proprietary code restored']};
fs.writeFileSync(path.join(dir,'X19-OWN-FIXTURE-ACCEPTANCE.json'),JSON.stringify(accepted,null,2)+'\n');
console.log('X19_OWNER_RESULT '+JSON.stringify(accepted));
if(accepted.status!=='STATIC_TOOL_OPERATIONAL')process.exitCode=2;
