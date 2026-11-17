"use strict";
/**
 * DJMRN P3-H: public webpage structural inspection for ORIGINAL reimplementation.
 * Observes metadata of JS chunks, PNGs and glTF in memory, NOT original source payloads.
 * Never saves/redistributes external executable chunks, images, shaders, models or audio.
 * Requires a previously installed Playwright Core and Microsoft Edge on DJMRN-LAPTOP.
 */
const fs=require("fs"),path=require("path"),os=require("os"),crypto=require("crypto");
const root=path.join(os.homedir(),"Desktop","DJMRN-Website-Reference-Evidence","fernhollow-gladeye-20261117");
const pw=require(path.join(os.homedir(),"Desktop","DJMRN-ChatGPT-Downloads","installed","playwright-mcp","node_modules","playwright-core"));
const origin="https://www.gladeye.com";
const binaryPaths=["/valley/camera-path07.glb","/valley/flowers/pool_winter.png","/valley/flowers/pool_summer.png","/valley/terrain.png","/valley/vignette.png","/valley/rays/ray1.png","/valley/rays/ray2.png","/valley/rays/ray3.png","/valley/dust-particle.png"];
const hash=b=>crypto.createHash("sha256").update(b).digest("hex").slice(0,20);
const safeText=s=>(s||"").slice(0,90);
function decodeGLB(buffer){
 if(buffer.length<20||buffer.toString("ascii",0,4)!=="glTF")return{recognized:false};
 const version=buffer.readUInt32LE(4),declaredLength=buffer.readUInt32LE(8);
 let pos=12,parts=[];let json=null;
 while(pos+8<=buffer.length){
   const len=buffer.readUInt32LE(pos),type=buffer.readUInt32LE(pos+4);pos+=8;
   if(len<0||pos+len>buffer.length)break;
   parts.push({type:type===0x4E4F534A?"JSON":type===0x004E4942?"BIN":String(type),bytes:len});
   if(type===0x4E4F534A){try{json=JSON.parse(buffer.subarray(pos,pos+len).toString("utf8"))}catch(e){}}
   pos+=len;
 }
 let out={recognized:true,version,declaredLength,chunks:parts};
 if(json){
   out={...out,generator:safeText(json.asset?.generator),glTFVersion:json.asset?.version,
   scenes:json.scenes?.length||0,sceneNodes:(json.scenes||[]).map(s=>s.nodes?.length||0),
   cameras:(json.cameras||[]).map(c=>({name:safeText(c.name),type:c.type})),
   nodes:(json.nodes||[]).map((n,i)=>({index:i,name:safeText(n.name),mesh:n.mesh,cam:n.camera,children:n.children?.length||0})).slice(0,60),
   nodeCount:json.nodes?.length||0,meshes:json.meshes?.length||0,
   meshSummaries:(json.meshes||[]).slice(0,15).map(m=>({name:safeText(m.name),primitives:m.primitives?.length,attributes:(m.primitives||[]).map(p=>Object.keys(p.attributes||{})).slice(0,6)})),
   accessors:(json.accessors||[]).length,positionsAccessors:(json.accessors||[]).filter(a=>a.type==="VEC3").length,
   animationSummaries:(json.animations||[]).slice(0,30).map(a=>({name:safeText(a.name),channels:a.channels?.length||0,samplers:a.samplers?.length||0,paths:[...new Set((a.channels||[]).map(c=>c.target?.path))]})),
   textures:json.textures?.length||0,materials:json.materials?.length||0,buffers:json.buffers?.length||0,
   extensionsUsed:json.extensionsUsed||[]};}
 return out;
}
function binaryMetadata(p,b){
 let d={path:p,bytes:b.length,sha256_20:hash(b)};
 if(p.endsWith(".png")&&b.length>25&&b.subarray(1,4).toString()==="PNG"){
   d.png={width:b.readUInt32BE(16),height:b.readUInt32BE(20),bitDepth:b[24],colorType:b[25],interlace:b[28]};
 }else if(p.endsWith(".glb"))d.glb=decodeGLB(b);
 return d;
}
function jsReport(pathname,buffer){
 const s=buffer.toString("utf8");
 const keys=["ShaderMaterial","RawShaderMaterial","fragmentShader","vertexShader","Points","PointsMaterial",
 "BufferGeometry","EffectComposer","UnrealBloomPass","WebGLRenderTarget","AudioListener",
 "startHoverTransition","stopHoverTransition","camera-path07.glb","gl_PointCoord",
 "gl_Position","gl_FragColor","uniform","vignette","rgbShift","bloom","touchmove","pointermove","mousemove"];
 let mentions={};for(const k of keys){const n=s.split(k).length-1;if(n)mentions[k]=n;}
 return {path:pathname,bytes:buffer.length,sha256_20:hash(buffer),mentions,uniqueValleyPaths:[...new Set(s.match(/valley\/[a-zA-Z0-9_./-]{3,90}/g)||[])].slice(0,35)};
}
(async()=>{
 fs.mkdirSync(root,{recursive:true});
 const result={source:origin,date:new Date().toISOString(),type:"SOURCE-FREE STRUCTURAL METADATA ONLY",
   policy:"Inspected in memory; proprietary binaries, JS, shaders NOT stored",binary:[],jsModules:[],events:{},errors:[]};
 const browser=await pw.chromium.launch({channel:"msedge",headless:true,args:["--disable-extensions"],timeout:25000});
 try{
   const context=await browser.newContext({viewport:{width:1280,height:800}});
   const page=await context.newPage();let jsURLs=[];
   page.on("response",r=>{let u;try{u=new URL(r.url())}catch{return;}if(u.origin===origin&&u.pathname.endsWith(".js"))jsURLs.push(u.pathname)});
   await page.goto(origin+"/",{waitUntil:"domcontentloaded",timeout:30000});
   await page.waitForTimeout(8000);
   try{
     const client=await context.newCDPSession(page);await client.send("Runtime.enable");
     for(const target of ["window","document.querySelector('canvas')","document.body"]){
       let r=await client.send("Runtime.evaluate",{expression:target,returnByValue:false});
       if(r?.result?.objectId){let listeners=await client.send("DOMDebugger.getEventListeners",{objectId:r.result.objectId,depth:0});
         result.events[target]=(listeners.listeners||[]).map(x=>({event:x.type,useCapture:x.useCapture,passive:x.passive,
           script:new URL(x.url||origin).pathname.slice(-110)})).slice(0,80);}
     }
   }catch(e){result.errors.push("CDP_LISTENER_METADATA: "+e.message.slice(0,150));}
   for(const p of binaryPaths){
      try{const r=await context.request.get(origin+p,{timeout:22000});
       if(!r.ok())result.errors.push("BINARY_HTTP "+p+" "+r.status());
       else{let b=await r.body();result.binary.push(binaryMetadata(p,b));}
      }catch(e){result.errors.push("BINARY "+p+" "+e.message.slice(0,100));}
   }
   for(const p of [...new Set(jsURLs)].slice(0,45)){
      try{const r=await context.request.get(origin+p,{timeout:20000});if(r.ok()){
        const b=await r.body();if(b.length<=15*1024*1024)result.jsModules.push(jsReport(p,b));
      }}catch(e){result.errors.push("JS "+p+" "+e.message.slice(0,80));}
   }
   result.jsModules.sort((a,b)=>Object.keys(b.mentions).length-Object.keys(a.mentions).length);
   result.summary={canvas:await page.evaluate(()=>document.querySelectorAll("canvas").length),
      testedJSModules:result.jsModules.length,assetsInspected:result.binary.length,
      matchingShaders:result.jsModules.filter(x=>x.mentions.fragmentShader||x.mentions.vertexShader||x.mentions.gl_PointCoord).length};
   const output=path.join(root,"structure-metadata-NO-EXTERNAL-BINARIES.json");
   fs.writeFileSync(output,JSON.stringify(result,null,2));
   console.log("STRUCTURE_SUMMARY "+JSON.stringify({file:output,summary:result.summary,binary:result.binary,topJS:result.jsModules.slice(0,5),eventTypes:Object.fromEntries(Object.entries(result.events).map(([k,v])=>[k,v.map(x=>x.event)])),errors:result.errors.slice(0,10)}));
   await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error("STRUCTURE_INSPECTION_FAILED "+e.stack?.slice(0,750));process.exitCode=1});
