#!/usr/bin/env python3
"""DJMRN X28: deterministically derive independent X28-only runners from owner-tested X22/X23 sources.
No remote fetch. Does not modify historical scripts. Runs one browser inspector at a time.
"""
from pathlib import Path
import re
ROOT=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"
DEST=D/"X28-CURRENT"
SRC22=D/"X22-CURRENT"/"X22-LIVE-90S"/"X22-Full-90s-Spector-GPU-Network-Probe.cjs"
SRC23=D/"X23-CURRENT"/"X23-RERUN-1GB-2026-11-20"/"X23-R2-Full-90s-Ispettore-1GB-100MiB-RAM-Runner.cjs"
PHASES="""const schedule=[
 [6,'normal_baseline',async()=>{}],
 [18,'hover_left',async()=>pwPage.mouse.move(350,370,{steps:8})],
 [30,'hover_right',async()=>pwPage.mouse.move(940,410,{steps:10})],
 [42,'dispersal_candidate_sweep',async()=>{await pwPage.mouse.move(1120,500,{steps:12});await pwPage.mouse.move(120,300,{steps:15})}],
 [54,'dispersal_candidate_scroll',async()=>pwPage.mouse.wheel(0,480)],
 [66,'return_scroll_up',async()=>pwPage.mouse.wheel(0,-480)],
 [78,'return_pointer_out',async()=>pwPage.mouse.move(0,0,{steps:10})],
 [86,'return_idle',async()=>{}]];
"""
PW_REQUIRE="""const playwright=require(path.join(tk,'03-WebGL','WebGL-Toolchain','node_modules','playwright-core'));
let pwBrowser,pwPage;
"""
PW_CONNECT="""pwBrowser=await playwright.chromium.connectOverCDP(browser.wsEndpoint());
pwPage=pwBrowser.contexts().flatMap(c=>c.pages()).find(p=>p.url().includes('www.gladeye.com'));
if(!pwPage)throw Error('X28_PLAYWRIGHT_CDP_PAGE_NOT_FOUND');
"""
SPECT_GRAPH=r"""function x28RenderGraph(raw){
 const commands=Array.isArray(raw?.commands)?raw.commands:[],render=[],textureOps=[],fboBinds=[],clears=[];
 let curFbo=null;
 for(let ix=0;ix<commands.length;ix++){const cmd=commands[ix],op=cmd.name||'unknown',a=cmd.commandArguments||[];
  const scalar=a.slice(0,10).map(x=>typeof x==='number'&&Number.isFinite(x)?x:null);
  if(op==='bindFramebuffer'){const id=a[1]?.__SPECTOR_Object_TAG?.id??null;curFbo=id;fboBinds.push({ordinal:ix,target:scalar[0],fbo:id})}
  if(op==='clear')clears.push({ordinal:ix,mask:scalar[0],fbo:curFbo});
  if(/^draw(Arrays|Elements)/.test(op)){
   const draw=cmd.DrawCall||{};
   render.push({ordinal:ix,op,mode:scalar[0],count:op.startsWith('drawElements')?scalar[1]:scalar[2],
    frameBuffer:draw.frameBuffer?.frameBuffer?.__SPECTOR_Object_TAG?.id??curFbo,
    program:draw.programStatus?.program?.__SPECTOR_Object_TAG?.id??null,
    blend:cmd.BlendState?.BLEND??null,depthTest:cmd.DepthState?.DEPTH_TEST??null,
    uniformNames:(draw.uniforms||[]).map(u=>u.name).filter(x=>typeof x==='string').slice(0,95)})
  }
  if(['texImage2D','texImage3D','texStorage2D','texStorage3D','renderbufferStorage',
   'framebufferTexture2D','framebufferRenderbuffer','drawBuffers'].includes(op))
    textureOps.push({ordinal:ix,op,scalarArguments:scalar});
 }
 return {drawSequence:render,renderTargetBinds:fboBinds,clears,
  textureAndAttachmentCalls:textureOps,resourceFormatOnlyNoPixels:true,
  warning:'GL enum hints; no proof of true GPU cost or same physical resource across separate captures'};
}
"""
ISPET_GRAPH=r"""function x28RenderGraph(raw){
 const commands=Array.isArray(raw?.commands)?raw.commands:[],draws=[],attachments=[],passes=[];
 for(let ix=0;ix<commands.length;ix++){const c=commands[ix],op=c.op||'',a=Array.isArray(c.args)?c.args:[];
  const scalar=a.slice(0,12).map(v=>typeof v==='number'&&Number.isFinite(v)?v:null);
  if(op.startsWith('draw'))draws.push({ordinal:ix,op,mode:scalar[0],count:op.startsWith('drawElements')?scalar[1]:scalar[2],
   semanticType:typeof c.semantic?.type==='string'?c.semantic.type:null,
   semanticPass:typeof c.semantic?.pass==='string'?c.semantic.pass:null,hasPreview:!!c.preview});
  if(['texImage2D','texStorage2D','texStorage3D','renderbufferStorage','framebufferTexture2D','framebufferRenderbuffer','drawBuffers','bindFramebuffer'].includes(op))
    attachments.push({ordinal:ix,op,scalarArguments:scalar});
  if(op==='clear'||op==='bindFramebuffer')passes.push({ordinal:ix,op,scalarArguments:scalar});
 }
 return {drawSequence:draws,attachmentFormatHints:attachments,passEvents:passes,
  resourceFormatOnlyNoPixels:true,warning:'Vendor Ispettore semantic labels from instrumented journal; no independently proven user-visible dispersal'};
}
"""
def once(src,old,new,label):
    count=src.count(old)
    if count!=1:raise ValueError(f"{label}: expected once, got {count}")
    return src.replace(old,new,1)
def regex_once(src,pat,new,label):
    new_src,count=re.subn(pat,lambda _:new,src,count=1,flags=re.S)
    if count!=1:raise ValueError(f"{label}: match failed")
    return new_src

def shared(src):
    src=once(src,"puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));",
        "puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));\n"+PW_REQUIRE,"playwright require")
    src=once(src,"await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:",
        "await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:","navigation present")
    # Add link after await page.goto line; all sources have only a single page.goto.
    src=regex_once(src,r"( await page\.goto\('https://www\.gladeye\.com/',\{waitUntil:'domcontentloaded',timeout:\d+\}\);)",
                   lambda_dummy if False else r"\1\n"+PW_CONNECT,"connect Playwright") if False else src
    find=re.search(r"( await page\.goto\('https://www\.gladeye\.com/',\{waitUntil:'domcontentloaded',timeout:\d+\}\);)",src)
    if not find:raise ValueError("no goto")
    src=src[:find.end()]+"\n "+PW_CONNECT+src[find.end():]
    src=once(src,"const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit')",
             "const tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit')","toolkit declaration")
    return src

def build_spector():
    s=SRC22.read_text(encoding='utf-8')
    s=once(s,"path.join(root,'02-reviewed-derived','X22-CURRENT','X22-LIVE-90S')",
             "path.join(root,'02-reviewed-derived','X28-CURRENT','SPECTOR-90S')","Spector dir")
    s=once(s,"path.join(root,'01-private-captures','X22','live-90s')",
             "path.join(root,'01-private-captures','X28','SPECTOR-90S')","Spector private")
    s=once(s,"const stat={stage:'X22',","const stat={stage:'X28-SPECTOR',","stage")
    s=once(s,"goal:'90s full live homepage GPU frame and first-party network observation'",
             "goal:'X28 independent 90s same-viewport phase-candidate GPU frames via Spector MV3 + Playwright 1.65.1'","goal")
    s=once(s,"function processBody(id){",SPECT_GRAPH+"\nfunction processBody(id){","gpu graph")
    s=once(s,"const meta=summary(raw);const row=", "const meta=summary(raw);meta.x28RenderGraph=x28RenderGraph(raw);const row=","graph attach")
    s=once(s,"samples.push(row);",
      """const image=await page.screenshot({type:'png',captureBeyondViewport:false});
  const shot='X28-SPECTOR-PRIVATE-'+label+'.png';
  fs.writeFileSync(path.join(privateDir,shot),image);
  row.privateImageSHA256=sha(image);row.privateImageBytes=image.length;
  row.phaseCandidate=label.startsWith('normal')?'normal':label.startsWith('hover')?'hover':
     label.startsWith('dispersal')?'dispersal_UNVERIFIED':'return_UNVERIFIED';
  samples.push(row);""","spector snapshot")
    s=once(s,"const name='X22-90S-","const name='X28-SPECTOR-","raw prefix")
    s=once(s,"userDataDir:path.join(dir,'X22-90S-Isolated-Anonymous-Browser')",
             "userDataDir:path.join(dir,'X28-SPECTOR-ISOLATED-CHROME')","profile")
    s=shared(s)
    s=regex_once(s,r" const steps=\[.*?\];\n for\(const \[t,label,action\] of steps\)",
        " "+PHASES+" for(const [t,label,action] of schedule)","spector phase")
    s=s.replace("X22_90S_","X28_SPECTOR_")
    s=s.replace("X22-90S-LOCAL-PRIVATE-INDEX.json","X28-SPECTOR-90S-LOCAL-PRIVATE-INDEX.json")
    s=s.replace("X22-90S-SANITIZED-GPU-AND-NETWORK-TIMELINE.json","X28-SPECTOR-90S-SANITIZED-GPU-AND-NETWORK-TIMELINE.json")
    s=s.replace("stat.stopReason=stopReason;stat.minRamMiB=minFree;", "stat.stopReason=stopReason;stat.minRamMiB=minFree;stat.controlEngine='Playwright Core via CDP, inspected by standalone Spector.js';")
    (DEST/"X28-Spector-Playwright-90s-Phase-Capture.cjs").write_text(s,encoding="utf-8")
    return {"script":"X28-Spector-Playwright-90s-Phase-Capture.cjs","bytes":len(s.encode())}

def build_ispettore():
    s=SRC23.read_text(encoding='utf-8')
    s=once(s,"path.join(root,'02-reviewed-derived','X23-CURRENT','X23-RERUN-1GB-2026-11-20')",
             "path.join(root,'02-reviewed-derived','X28-CURRENT','ISPETTORE-90S')","Ispettore dir")
    s=once(s,"path.join(root,'01-private-captures','X23','rerun-1gb-2026-11-20')",
             "path.join(root,'01-private-captures','X28','ISPETTORE-90S')","Ispettore private")
    s=once(s,"stage:'X23-RERUN-2026-11-20'","stage:'X28-ISPETTORE'","stage")
    s=once(s,"function body(id){",ISPET_GRAPH+"\nfunction body(id){","graph")
    s=once(s,"const meta=snap(pkg);","const meta=snap(pkg);meta.x28RenderGraph=x28RenderGraph(pkg);","graph attach")
    s=once(s,"frames.push(row);","""const image=await page.screenshot({type:'png',captureBeyondViewport:false});
  const shot='X28-ISPETTORE-PRIVATE-'+label+'.png';fs.writeFileSync(path.join(privateDir,shot),image);
  row.privateImageSHA256=sha(image);row.privateImageBytes=image.length;
  row.phaseCandidate=label.startsWith('normal')?'normal':label.startsWith('hover')?'hover':
   label.startsWith('dispersal')?'dispersal_UNVERIFIED':'return_UNVERIFIED';
  frames.push(row);""","snapshot")
    s=once(s,"const rawFile='X23-ISPETTORE-RAW-","const rawFile='X28-ISPETTORE-RAW-","raw prefix")
    s=once(s,"if(['baseline','wheel_450','pointer_reverse'].includes(label)){",
             "if(['normal_baseline','dispersal_candidate_scroll','return_idle'].includes(label)){","full scene only 3")
    s=s.replace("X23-R2-FULL-SCENE-AND-TEXTURE-","X28-ISPETTORE-FULL-SCENE-AND-TEXTURE-")
    s=s.replace("X23-R2-SCREEN-","X28-ISPETTORE-FULL-SCENE-SCREEN-")
    s=once(s,"userDataDir:path.join(dir,'X23-R2-1GB-Isolated-Chrome-Profile')",
             "userDataDir:path.join(dir,'X28-ISPETTORE-ISOLATED-CHROME')","profile")
    s=shared(s)
    s=regex_once(s,r" const schedule=\[.*?\];\n for\(const \[t,label,act\] of schedule\)",
                     " "+PHASES+" for(const [t,label,act] of schedule)","Ispettore phases")
    s=s.replace("X23-R2-90S-PRIVATE-FRAME-INDEX.json","X28-ISPETTORE-90S-PRIVATE-FRAME-INDEX.json")
    s=s.replace("X23-R2-90S-SANITIZED-ISPETTORE-GPU-TIMELINE.json","X28-ISPETTORE-90S-SANITIZED-GPU-TIMELINE.json")
    s=s.replace("X23_R2_","X28_ISPETTORE_")
    s=s.replace("run.stopReason=stopReason;run.minFreeRamMiB=minFree;","run.stopReason=stopReason;run.minFreeRamMiB=minFree;run.controlEngine='Playwright Core via CDP, inspected by Ispettore MV3';")
    (DEST/"X28-Ispettore-Playwright-90s-Phase-Capture.cjs").write_text(s,encoding="utf-8")
    return {"script":"X28-Ispettore-Playwright-90s-Phase-Capture.cjs","bytes":len(s.encode())}
if __name__=="__main__":
    print(build_spector())
    print(build_ispettore())
