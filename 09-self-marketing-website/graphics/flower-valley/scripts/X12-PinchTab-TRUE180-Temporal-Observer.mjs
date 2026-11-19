import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';
const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X12-PinchTab-WebGraph');
const bin=path.join(rt,'pinchtab.exe');
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const run='X12-PINCHTAB-TRUE180-'+new Date().toISOString().replaceAll(':','-').replaceAll('.','-');
const privateDir=path.join(root,'01-private-captures','X12',run);
const reviewed=path.join(root,'02-reviewed-derived');
fs.mkdirSync(privateDir,{recursive:true});
fs.mkdirSync(reviewed,{recursive:true});
const env={...process.env,PINCHTAB_CONFIG:path.join(rt,'private','pinchtab-config.json'),PINCHTAB_HINTS:'off',PYTHONUTF8:'1',PYTHONIOENCODING:'utf-8'};
function cmd(args,timeout=22000){
 const r=spawnSync(bin,args,{encoding:'utf8',env,timeout,maxBuffer:8*1024*1024,windowsHide:true});
 const stdout=(r.stdout||'').trim();
 if(r.error||r.status!==0)throw Error(args.slice(0,2).join(' ')+': '+(r.error?.message||r.stderr||stdout).slice(0,600));
 return stdout;
}
const readExpression="JSON.stringify((()=>{\nconst canvas=[...document.querySelectorAll('canvas')].map((e,i)=>{const b=e.getBoundingClientRect();return{i,width:e.width,height:e.height,clientWidth:Math.round(b.width),clientHeight:Math.round(b.height),left:Math.round(b.left),top:Math.round(b.top),visible:b.width>0&&b.height>0}});\nconst controls=[...document.querySelectorAll('button,[role=\"button\"],a,[role=\"tab\"],[aria-pressed],[aria-expanded]')].map(e=>({tag:e.tagName,role:e.getAttribute('role'),text:(e.getAttribute('aria-label')||e.innerText||'').trim().slice(0,65),selected:e.getAttribute('aria-selected'),pressed:e.getAttribute('aria-pressed'),expanded:e.getAttribute('aria-expanded'),href:e.href?new URL(e.href).origin+new URL(e.href).pathname:null})).slice(0,90);\nconst entries=performance.getEntriesByType('resource').map(e=>{let u='';try{const a=new URL(e.name);u=a.origin+a.pathname}catch{}return{url:u,kind:e.initiatorType,transferBytes:e.transferSize||0,encodedBytes:e.encodedBodySize||0,durationMs:Math.round(e.duration||0)}}).slice(0,900);\nconst h=[...document.querySelectorAll('h1,h2,h3')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.innerText.trim().slice(0,100)).slice(0,14);\nreturn{url:location.origin+location.pathname,title:document.title,readyState:document.readyState,scrollX:Math.round(scrollX),scrollY:Math.round(scrollY),viewport:{w:innerWidth,h:innerHeight,dpr:devicePixelRatio},canvas,controls,headings:h,images:document.images.length,videos:document.querySelectorAll('video').length,resources:entries,resourceCount:performance.getEntriesByType('resource').length,bodyTextLength:(document.body?.innerText||'').length,domElementCount:document.querySelectorAll('*').length,visibility:document.visibilityState,performanceMs:Math.round(performance.now())};\n})())";
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const state={mission:'DJMRN-FREELANCE-WEBSITE-001',stage:'X12',method:'PinchTab 180-sec live browser tab observation: DOM/control/canvas/performance-resource metadata, mouse/wheel and screenshots; NOT WACZ, GPU trace or new WebGraph graph',run,target:'https://www.gladeye.com/',startUtc:new Date().toISOString(),status:'RUNNING',expectedSeconds:180,tickIntervalSeconds:15,screenshotIntervalSeconds:30,interactions:[],ticks:[],errors:[],redlineMiB:100,privateCaptureDir:privateDir,priorGraph:'X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json'};
const output=path.join(reviewed,run+'-temporal-observation.json');
const startMono=performance.now();
function checkpoint(){fs.writeFileSync(output,JSON.stringify(state,null,2),'utf8')}
function safe(action,fn){try{return fn()}catch(e){state.errors.push({atSecond:Math.round((performance.now()-startMono)/1000),action,error:String(e).slice(0,500)});return null}}
const gestures={15:['mouse','move','--x','240','--y','320'],30:['mouse','move','--x','940','--y','250'],45:['mouse','move','--x','640','--y','560'],60:['mouse','wheel','--dy','350','--x','640','--y','460'],90:['mouse','wheel','--dy','-350','--x','640','--y','460'],120:['mouse','move','--x','350','--y','240'],150:['mouse','move','--x','1010','--y','430']};
let previousResources=new Set();
for(let second=0;second<=180;second+=15){
 const deadline=startMono+second*1000;
 const delay=Math.max(0,deadline-performance.now());
 if(delay>0)await new Promise(r=>setTimeout(r,delay));
 const action=gestures[second];
 if(action){const res=safe('gesture '+action.join(' '),()=>cmd(action,12000));state.interactions.push({plannedSecond:second,action:action.join(' '),ok:res!==null})}
 const raw=safe('eval page metadata',()=>cmd(['eval',readExpression],22000));
 let page=null;
 if(raw)try{page=JSON.parse(raw)}catch(e){state.errors.push({atSecond:second,action:'parse eval',error:String(e),outputHead:raw.slice(0,200)})}
 const actualSecond=+((performance.now()-startMono)/1000).toFixed(2);
 let screenshot=null;
 if(second%30===0){
  const shot=path.join(privateDir,String(second).padStart(3,'0')+'s.jpg');
  const success=safe('screenshot '+second,()=>cmd(['screenshot','--output',shot,'--format','jpeg','--quality','56','--scale','0.65'],19000));
  if(success!==null&&fs.existsSync(shot)){const b=fs.readFileSync(shot);screenshot={relativePath:path.basename(shot),bytes:b.length,sha256:sha(b)}}
 }
 let newResourcePaths=[];
 let controlSignature=null,resourceSignature=null;
 if(page){
  const present=new Set(page.resources.map(x=>x.url).filter(Boolean));
  newResourcePaths=[...present].filter(u=>!previousResources.has(u));
  previousResources=present;
  controlSignature=sha(JSON.stringify(page.controls.map(c=>[c.tag,c.role,c.text,c.selected,c.pressed,c.expanded,c.href])));
  resourceSignature=sha(JSON.stringify([...present].sort()));
 }
 state.ticks.push({plannedSecond:second,actualSecond,action:action?.join(' ')||'observe',page,controlSignature,resourceSignature,firstSeenResourcePaths:newResourcePaths,screenshot});
 checkpoint();
 console.log('DJMRN_X12_TICK',JSON.stringify({plannedSecond:second,actualSecond,url:page?.url,canvases:page?.canvas?.length,resources:page?.resourceCount,newResourcePaths:newResourcePaths.length,controlHash:controlSignature?.slice(0,10),screenshot:!!screenshot,errors:state.errors.length}));
}
const elapsedSeconds=+((performance.now()-startMono)/1000).toFixed(2);
state.elapsedSeconds=elapsedSeconds;state.endUtc=new Date().toISOString();
state.status=state.ticks.length===13&&elapsedSeconds>=180&&state.ticks.every(t=>!!t.page)?'COMPLETE_180_SECONDS':'PARTIAL_UNVERIFIED';
checkpoint();
console.log('DJMRN_X12_TRUE180_END',JSON.stringify({run,output,privateDir,status:state.status,elapsedSeconds,ticks:state.ticks.length,images:state.ticks.filter(t=>t.screenshot).length,errorCount:state.errors.length}));
if(state.status!=='COMPLETE_180_SECONDS')process.exitCode=3;