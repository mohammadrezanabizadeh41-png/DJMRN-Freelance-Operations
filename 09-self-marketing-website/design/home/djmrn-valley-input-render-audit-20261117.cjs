"use strict";
/* DJMRN original research-only audit: public site, isolated Edge; no original source/media stored. */
const fs=require("fs"),path=require("path"),os=require("os"),crypto=require("crypto");
const ROOT=path.join(os.homedir(),"Desktop","DJMRN-Website-Reference-Evidence","fernhollow-gladeye-20261117");
const pw=require(path.join(os.homedir(),"Desktop","DJMRN-ChatGPT-Downloads","installed","playwright-mcp","node_modules","playwright-core"));
const URL="https://www.gladeye.com/";
const stamp=new Date().toISOString();
const report={origin:URL,stamp,role:"independent reference behavior audit", rights:"read-only; original resources observed in memory; no copied chunks/GLB/PNG/MP3/shaders", stages:[],errors:[],requestsFailed:[], network:[], uiEvents:[]};
const h=b=>crypto.createHash("sha256").update(b).digest("hex");
const safeURL=s=>{try{const u=new URL(s);return u.origin+u.pathname}catch{return "unknown"}};
const injection=()=>{
  const A=window.__djmrn={counts:{drawArrays:0,drawElements:0,drawArraysInstanced:0,drawElementsInstanced:0,vertices:0,instances:0,programs:0,shaderSources:0,textureAllocations:0,bufferUploads:0},shaderMeta:[],programMeta:[],events:[]};
  try{
    const P=WebGL2RenderingContext.prototype;
    for(const fn of ["drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced"]){
      if(typeof P[fn]!=="function")continue;
      const orig=P[fn]; P[fn]=function(...args){
        A.counts[fn]++; A.counts.vertices+=Number(args[fn.startsWith("drawArrays")?2:1]||0);
        if(fn.endsWith("Instanced"))A.counts.instances+=Number(args[fn.startsWith("drawArrays")?3:4]||0);
        return orig.apply(this,args);
      };
    }
    for(const fn of ["texImage2D","texStorage2D","bufferData"]){
      const orig=P[fn];if(!orig)continue;
      P[fn]=function(...args){A.counts[fn==="bufferData"?"bufferUploads":"textureAllocations"]++;return orig.apply(this,args);};
    }
    const shaderOrig=P.shaderSource;
    P.shaderSource=function(shader,source){
      A.counts.shaderSources++;
      if(A.shaderMeta.length<150) A.shaderMeta.push({chars:source.length,lines:source.split("\n").length,
        isGLSL3:source.includes("#version 300 es"),usesPointCoord:source.includes("gl_PointCoord"),usesPointSize:source.includes("gl_PointSize"),
        usesTexture:source.includes("texture("),usesDepth:source.includes("gl_FragDepth"),usesNoise:/noise|simplex|snoise/.test(source),
        usesBloom:/bloom/i.test(source),usesFog:/fog/i.test(source),usesTime:/uTime|time|Time/.test(source)});
      return shaderOrig.call(this,shader,source);
    };
    const origLink=P.linkProgram;
    P.linkProgram=function(program){
      const v=origLink.call(this,program);A.counts.programs++;
      try{
        const count=this.getProgramParameter(program,this.ACTIVE_UNIFORMS);
        const attrs=this.getProgramParameter(program,this.ACTIVE_ATTRIBUTES);
        if(A.programMeta.length<80) A.programMeta.push({uniformCount:count,attributeCount:attrs,
          uniformNames:Array.from({length:Math.min(60,count)},(_,i)=>this.getActiveUniform(program,i)?.name).filter(Boolean),
          attributeNames:Array.from({length:Math.min(30,attrs)},(_,i)=>this.getActiveAttrib(program,i)?.name).filter(Boolean)});
      }catch{}
      return v;
    };
  }catch(e){A.hookError=String(e)}
  for(const type of ["pointerdown","pointerup","click","dblclick","pointermove","wheel","touchstart","touchmove"]){
    document.addEventListener(type,e=>{if(type==="pointermove"||type==="touchmove")return;
      if(A.events.length<100)A.events.push({type,tag:e.target?.tagName||"?",class:String(e.target?.className||"").slice(0,70),
        x:Math.round(e.clientX||0),y:Math.round(e.clientY||0),button:e.button,ts:Math.round(performance.now())})},{capture:true,passive:true});
  }
};
async function screenshot(page,label){
  const buf=await page.screenshot({type:"jpeg",quality:65,timeout:25000});
  const file="input-audit-"+label+".jpg";fs.writeFileSync(path.join(ROOT,file),buf);
  return {file,bytes:buf.length,sha256:h(buf)};
}
async function metrics(page){
 return await page.evaluate(()=>{
   const c=document.querySelector("canvas"),gl=c&&(c.getContext("webgl2")||c.getContext("webgl"));
   const A=window.__djmrn||{};
   let renderer={};try{const ext=gl&&gl.getExtension("WEBGL_debug_renderer_info");renderer={glVersion:gl?.getParameter(gl.VERSION),
      vendor:gl?.getParameter(ext?ext.UNMASKED_VENDOR_WEBGL:gl.VENDOR),
      renderer:gl?.getParameter(ext?ext.UNMASKED_RENDERER_WEBGL:gl.RENDERER),
      maxTextureSize:gl?.getParameter(gl.MAX_TEXTURE_SIZE),maxPointSize:gl?.getParameter(gl.ALIASED_POINT_SIZE_RANGE)?Array.from(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)):null};
   }catch(e){renderer={error:String(e)}}
   return {title:document.title,url:location.href,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio,scrollY:window.scrollY},
      canvas:c?{width:c.width,height:c.height,cssWidth:c.getBoundingClientRect().width,cssHeight:c.getBoundingClientRect().height}:null,
      renderer, counts:{...A.counts},shaderMeta:A.shaderMeta?.slice(0,65),programMeta:A.programMeta?.slice(0,45),
      eventTail:A.events?.slice(-25),motionReduced:matchMedia("(prefers-reduced-motion: reduce)").matches};
 });
}
async function frames(page,n=75){
 return page.evaluate(async (n)=>{const out=[];let last=0;await new Promise(resolve=>{
   const step=t=>{if(last)out.push(t-last);last=t;if(out.length>=n)resolve();else requestAnimationFrame(step)};requestAnimationFrame(step);
 });out.sort((a,b)=>a-b);const p=q=>Math.round(out[Math.min(out.length-1,Math.floor(q*(out.length-1)))]*100)/100;
 return {count:out.length,p50ms:p(.5),p95ms:p(.95),p99ms:p(.99),maxMs:p(1)}},n);
}
async function stage(page,label,delay=650){
  await page.waitForTimeout(delay);
  const m=await metrics(page),p=await screenshot(page,label);
  report.stages.push({label,metrics:{...m,shaderMeta:undefined,programMeta:undefined},picture:p});
}
(async()=>{
  fs.mkdirSync(ROOT,{recursive:true});
  const browser=await pw.chromium.launch({channel:"msedge",headless:true,args:["--disable-extensions","--mute-audio"],timeout:30000});
  try{
    const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
    await ctx.addInitScript(injection);
    const page=await ctx.newPage();
    page.on("pageerror",e=>report.errors.push(String(e.message).slice(0,260)));
    page.on("requestfailed",r=>report.requestsFailed.push({url:safeURL(r.url()),err:r.failure()?.errorText}));
    page.on("response",r=>{try{const u=new URL(r.url());if(u.pathname.startsWith("/valley/"))report.network.push({path:u.pathname,mime:r.headers()["content-type"],status:r.status(),len:r.headers()["content-length"]||null})}catch{}});
    const resp=await page.goto(URL,{waitUntil:"commit",timeout:30000}); await page.waitForLoadState("domcontentloaded",{timeout:12000}).catch(()=>{});
    report.http=resp?.status();
    await stage(page,"idle-start",6200);
    report.frames=await frames(page,80);
    report.initialGL=await metrics(page);
    await page.mouse.move(240,580,{steps:10});await stage(page,"pointer-left");
    await page.mouse.move(1030,560,{steps:15});await stage(page,"pointer-right");
    await page.mouse.move(450,520);await page.mouse.down();await stage(page,"pointer-held",1000);
    await page.mouse.move(740,500,{steps:16});await stage(page,"pointer-drag",600);
    await page.mouse.up();await stage(page,"pointer-release",650);
    await page.mouse.click(170,740);await stage(page,"empty-canvas-click",450);
    await page.mouse.wheel(0,590);await stage(page,"wheel-forward",1300);
    const cta=page.getByText("Explore our work",{exact:true});
    report.ctaCount=await cta.count();
    if(report.ctaCount){await cta.first().hover({timeout:6000});await stage(page,"cta-hover",850);await page.mouse.move(1000,250);await stage(page,"cta-hover-exit",950);}
    report.finalGL=await metrics(page);
    await ctx.close();
    const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
    await mobile.addInitScript(injection);
    const p=await mobile.newPage();
    p.on("pageerror",e=>report.errors.push("MOBILE "+String(e.message).slice(0,200)));
    const respM=await p.goto(URL,{waitUntil:"commit",timeout:30000}); await p.waitForLoadState("domcontentloaded",{timeout:12000}).catch(()=>{});
    report.mobileHTTP=respM?.status();await p.waitForTimeout(5500);
    report.mobileBefore=await metrics(p);report.mobilePicture=await screenshot(p,"mobile");
    await p.touchscreen.tap(195,680);await p.waitForTimeout(800);
    report.mobileAfterTap=await metrics(p);report.mobileAfterPicture=await screenshot(p,"mobile-tap");
    await mobile.close();
    const file=path.join(ROOT,"djmrn-valley-input-render-audit-20261117.json");
    fs.writeFileSync(file,JSON.stringify(report,null,2),"utf8");
    console.log("DJMRN_AUDIT_SUMMARY "+JSON.stringify({file,stageLabels:report.stages.map(x=>x.label),stages:report.stages.length,
      http:report.http,jsErrors:report.errors.length,requestFails:report.requestsFailed.length,gl:report.initialGL?.renderer,frameInterval:report.frames,
      gpu:report.finalGL?.counts,shaders:report.finalGL?.shaderMeta?.length,programs:report.finalGL?.programMeta?.length,network:report.network.length,
      inputEvents:report.finalGL?.eventTail, mobile:{http:report.mobileHTTP,gl:report.mobileBefore?.renderer?.glVersion,events:report.mobileAfterTap?.eventTail}}));
  }finally{await browser.close()}
})().catch(e=>{console.error("DJMRN_AUDIT_FAILED "+String(e.stack||e).slice(0,1200));process.exitCode=1});
