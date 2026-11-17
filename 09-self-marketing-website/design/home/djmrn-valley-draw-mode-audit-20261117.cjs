"use strict";
/* Independent DJMRN instrument: counts GPU draw-mode/count; NO original asset or code persistence. */
const fs=require("fs"),path=require("path"),os=require("os");
const ROOT=path.join(os.homedir(),"Desktop","DJMRN-Website-Reference-Evidence","fernhollow-gladeye-20261117");
const pw=require(path.join(os.homedir(),"Desktop","DJMRN-ChatGPT-Downloads","installed","playwright-mcp","node_modules","playwright-core"));
(async()=>{
 const browser=await pw.chromium.launch({channel:"msedge",headless:true,args:["--disable-extensions","--mute-audio"],timeout:25000});
 try{
  const ctx=await browser.newContext({viewport:{width:1280,height:800}});
  await ctx.addInitScript(()=>{
   const S=window.__djDrawModes={summary:{},initial:[],errors:[]};
   try{
    const P=WebGL2RenderingContext.prototype;
    for(const fn of ["drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced"]){
     const orig=P[fn];if(typeof orig!=="function")continue;
     P[fn]=function(...a){
      const mode=a[0],count=a[fn.startsWith("drawArrays")?2:1],key=fn+":"+mode+":"+count;
      S.summary[key]=(S.summary[key]||0)+1;
      if(S.initial.length<48)S.initial.push({fn,mode,count,instances:fn.endsWith("Instanced")?a[fn.startsWith("drawArrays")?3:4]:1});
      return orig.apply(this,a);
     };
    }
   }catch(e){S.errors.push(String(e))}
  });
  const p=await ctx.newPage();
  const resp=await p.goto("https://www.gladeye.com/",{waitUntil:"commit",timeout:35000});
  await p.waitForTimeout(8000);
  const before=await p.evaluate(()=>window.__djDrawModes);
  const cta=p.getByText("Explore our work",{exact:true});
  if(await cta.count()){await cta.first().hover(); await p.waitForTimeout(1100)}
  const after=await p.evaluate(()=>window.__djDrawModes);
  const out={source:"public gladeye original scene, in-memory instrumentation",date:new Date().toISOString(),
   note:"MODE point count empirical; no shader contents/code/images/audio copied",http:resp?.status(),before,after};
  const f=path.join(ROOT,"djmrn-valley-draw-mode-audit-20261117.json");
  fs.writeFileSync(f,JSON.stringify(out,null,2));
  console.log("DJMRN_DRAW_MODE "+JSON.stringify({file:f,http:out.http,before:before?.summary,firstFrame:before?.initial?.slice(0,20),after:after?.summary,errors:after?.errors}));
  await ctx.close();
 }finally{await browser.close()}
})().catch(e=>{console.error("DJMRN_DRAW_MODE_FAIL "+String(e.stack||e).slice(0,900));process.exitCode=1});
