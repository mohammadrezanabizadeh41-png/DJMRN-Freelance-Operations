// DJMRN X18 — completely owner-built localhost website fixture; NOT a scan of a third-party site
import http from 'node:http';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';

const home=os.homedir();
const root=path.join(home,'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const dir=path.join(root,'02-reviewed-derived','X18-PREFLIGHT');
const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X18-jsdj');
const cli=path.join(rt,'node_modules','@ejfkdev','jsdj','dist','cli','index.js');
const sha=(data)=>createHash('sha256').update(data).digest('hex');
const manifest=path.join(dir,'X18-INSTALL-ACCEPTANCE.json');
if(!fs.existsSync(cli)||!fs.existsSync(manifest))throw Error('X18_INSTALL_NOT_VERIFIED');
if(JSON.parse(fs.readFileSync(manifest,'utf8')).status!=='CLI_INSTALLED_AND_PLUGIN_REGISTRY_VERIFIED')throw Error('INSTALL_GATE_INVALID');
if(os.freemem()<350*1024*1024)throw Error('STOP_PRECHECK_RAM_BELOW_350_MIB');
fs.mkdirSync(dir,{recursive:true});
const resultFile=path.join(dir,'X18-OWN-FIXTURE-ACCEPTANCE.json');
if(fs.existsSync(resultFile))throw Error('ACCEPTANCE_EXISTS_NO_OVERWRITE');
const site={
 '/':{type:'text/html',body:'<!doctype html><html><head><link rel="modulepreload" href="/preload.js"></head><body><script type="module" src="/main.js"></script></body></html>'},
 '/main.js':{type:'text/javascript',body:'import "./preload.js";const stage=()=>import("./lazy.js");stage();'},
 '/preload.js':{type:'text/javascript',body:'export const value=18;'},
 '/lazy.js':{type:'text/javascript',body:'export const lazy="DJMRN_X18_FIXTURE";\n//# sourceMappingURL=lazy.js.map\n'},
 '/lazy.js.map':{type:'application/json',body:JSON.stringify({version:3,file:'lazy.js',sources:['src/lazy.ts'],sourcesContent:['export const lazy="DJMRN_X18_FIXTURE";'],names:[],mappings:'AAAA'})}
};
let requests=0,stoppedForRam=false,stoppedForSize=false,timedOut=false;
const server=http.createServer((req,res)=>{
 requests++;
 if(requests>120){res.writeHead(429);res.end();return}
 const u=new URL(req.url,'http://127.0.0.1');
 const item=site[u.pathname];
 if(!item){res.writeHead(404);res.end();return}
 res.writeHead(200,{'Content-Type':item.type,'Cache-Control':'no-store'});
 res.end(req.method==='HEAD'?'':item.body);
});
const listen=()=>new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
let child=null,timeout=null,memoryGuard=null;
let stdout='',stderr='',code=null,signal=null;
try{
 await listen();
 const port=server.address().port;
 const artifact=path.join(dir,'own-fixture-cache-and-artifacts');
 const cache=path.join(artifact,'cache');
 fs.mkdirSync(cache,{recursive:true});
 const args=[cli,'scan','http://127.0.0.1:'+port+'/', '--format','json',
   '--concurrency','1','--timeout','5','--output',artifact,'--cache-dir',cache,'--no-cache'];
 await new Promise((resolve,reject)=>{
  child=spawn(process.execPath,args,{windowsHide:true,env:{...process.env}});
  child.on('error',reject);
  child.stdout.on('data',b=>{stdout+=b.toString('utf8');if(stdout.length>260000){stoppedForSize=true;child.kill()}});
  child.stderr.on('data',b=>{stderr+=b.toString('utf8');if(stderr.length>60000){stoppedForSize=true;child.kill()}});
  child.on('close',(c,s)=>{code=c;signal=s;resolve()});
  timeout=setTimeout(()=>{timedOut=true;child.kill()},45000);
  memoryGuard=setInterval(()=>{if(os.freemem()<100*1024*1024){stoppedForRam=true;child.kill()}},500);
 });
 const jsonFile=path.join(dir,'X18-OWN-FIXTURE-CLI-RESULT.json');
 const out=stdout.trim();
 let parsed=false,summary=null;
 try{const obj=JSON.parse(out);parsed=true;summary=obj.summary||null;fs.writeFileSync(jsonFile,JSON.stringify(obj,null,2)+'\n')}catch{}
 const foundMain=out.includes('/main.js'),foundLazy=out.includes('/lazy.js'),foundPreload=out.includes('/preload.js');
 const checks={commandExitZero:code===0,validJSON:parsed,mainScript:foundMain,
   lazyDynamicImport:foundLazy,preloadScript:foundPreload,ramNeverEmergency:!stoppedForRam,
   noTimeout:!timedOut,noExcessiveOutput:!stoppedForSize,withinBoundedLocalhostTraffic:requests<=120};
 const status=Object.values(checks).every(Boolean)?'OPERATIONAL_LOCALHOST_FIXTURE_PASS':'PARTIAL_TEST_FAILED';
 const report={stage:'X18',status,ownerFixtureOnly:true,
  package:'@ejfkdev/jsdj',version:'0.1.2',
  target:'127.0.0.1 random loopback port',requests,exitCode:code,signal,checks,
  parsedSummary:summary,cliResult:parsed?{relativeFile:'X18-OWN-FIXTURE-CLI-RESULT.json',sha256:sha(fs.readFileSync(jsonFile))}:null,
  stderrExcerpt:stderr.slice(0,1200),stdoutByteCount:Buffer.byteLength(stdout),
  memoryFreeAtEndMiB:Math.round(os.freemem()/1048576),
  limitations:['No non-local-site data requested','Successful static dynamic-import discovery is not a live browser execution trace','No target authoring source or unpublished maps recovered'],
  utc:new Date().toISOString()};
 fs.writeFileSync(resultFile,JSON.stringify(report,null,2)+'\n');
 console.log('X18_LOCALHOST_FIXTURE '+JSON.stringify({status,requests,exitCode:code,checks,summary}));
 if(status!=='OPERATIONAL_LOCALHOST_FIXTURE_PASS')process.exitCode=2;
}finally{
 if(timeout)clearTimeout(timeout);
 if(memoryGuard)clearInterval(memoryGuard);
 if(child&&child.exitCode===null)child.kill();
 if(server.listening)await new Promise(resolve=>server.close(resolve));
}
