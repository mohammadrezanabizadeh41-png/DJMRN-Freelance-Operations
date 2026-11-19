// DJMRN X18: preserve the full 26-plugin audit; rerun two HTMLPivot-expanded routes with other 25 plugins.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';
const dir=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION','02-reviewed-derived','X18-PREFLIGHT');
const src=path.join(dir,'X18-Bounded-FirstParty-Main-Scan-v2.mjs'),dest=path.join(dir,'X18-Focused-HTMLPivot-Gap-Closure.mjs');
if(fs.existsSync(dest))throw Error('NO_OVERWRITE');
let text=fs.readFileSync(src,'utf8');
const change=(a,b)=>{if(text.split(a).length!==2)throw Error('UNEXPECTED_MATCH_COUNT '+a.slice(0,70));text=text.replace(a,b)};
change("const out=path.join(root,'02-reviewed-derived','X18-CURRENT');","const out=path.join(root,'02-reviewed-derived','X18-FOCUSED-RETRY');");
change("const priv=path.join(root,'01-private-captures','X18');","const priv=path.join(root,'01-private-captures','X18-FOCUSED-RETRY');");
change("const indexes=mode==='pilot'?[0]:","const indexes=mode==='pilot'?[0,1]:");
change("await scan({url:target,concurrency:3,","await scan({url:target,excludePlugins:['HTMLPivotPlugin'],concurrency:3,");
fs.writeFileSync(dest,text);console.log('X18_GAP_CLOSURE_SCRIPT_READY '+JSON.stringify({path:dest,bytes:fs.statSync(dest).size,plan:'retry 2 paths, 25 plugins, no HTML pivot cross-page expansion'}));
