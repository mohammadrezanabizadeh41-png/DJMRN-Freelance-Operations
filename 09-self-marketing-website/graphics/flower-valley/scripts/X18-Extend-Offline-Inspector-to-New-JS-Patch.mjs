// DJMRN X18: extend the saved X16 corpus with 3 independently SHA-verified novel live JS.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
const dir=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION','02-reviewed-derived','X18-PREFLIGHT');
const from=path.join(dir,'X18-Offline-Jsdj-All-Verified-Bundles.mjs');
const to=path.join(dir,'X18-Offline-Jsdj-All-34-Verified-Bundles.mjs');
if(fs.existsSync(to))throw Error('NO_OVERWRITE');
let s=fs.readFileSync(from,'utf8');
const old='const evidence=[],errors=[],found=new Map(),probes=new Map();';
const neu="const newest=JSON.parse(fs.readFileSync(path.join(dest,'X18-NEW-JS-ORIGINAL-BODIES-MANIFEST.json'),'utf8')).items;\n"+
 "for(const x of newest){if(!x.sha256||!x.privateRelativePath)throw Error('NEW_JS_NOT_SHA_VERIFIED');"+
 "if(!files.some(v=>canon(v.url)===canon(x.url)))files.push({url:x.url,sha:x.sha256,relative:x.privateRelativePath})}\n"+old;
if(s.split(old).length!==2)throw Error('MATCH_COUNT_BAD');
s=s.replace(old,neu);
const oldOut='X18-OFFLINE-JSDJ-PLUGIN-AUDIT.json';
if(s.split(oldOut).length!==2)throw Error('OUTPUT_MATCH_BAD');
s=s.replace(oldOut,'X18-OFFLINE-ALL-34-JSDJ-PLUGIN-AUDIT.json');
fs.writeFileSync(to,s);
console.log('X18_34_INPUT_SCRIPT_READY '+JSON.stringify({sourceChars:s.length,destination:to}));
