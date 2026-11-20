'use strict';
// DJMRN X24-R2 owner-written opt-in GUI launcher: run manually when full webgd UI is needed.
// Loads the verified compiled MIT webgd extension into a separate Chrome for Testing profile.
// Opens the public reference and the 51.8MB Rust/WASM egui debugger UI.
// No automatic capture/transfer. Emergency closes this isolated browser at <=100 MiB free.
const os=require('os'),path=require('path'),fs=require('fs');
const home=os.homedir(),tk=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const root=path.join(home,'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const d=path.join(root,'02-reviewed-derived','X24-CURRENT','X24-R2-FULL-RUST-WASM-2026-11-20');
const extension=path.join(tk,'04-Specialists','Sources','webgd','webgd-main','extension');
const chrome=path.join(tk,'04-Runtimes','ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(tk,'04-Runtimes','X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
(async()=>{
 if(!fs.existsSync(path.join(extension,'ui','webgd_ui_bg.wasm')))throw Error('FULL_RUST_WASM_UI_NOT_COMPILED');
 if(Math.floor(os.freemem()/1048576)<=100)throw Error('USER_100MIB_EMERGENCY_RAM_PRECHECK');
 const browser=await puppeteer.launch({
  executablePath:chrome,headless:false,ignoreDefaultArgs:['--disable-extensions'],
  userDataDir:path.join(d,'X24-R2-OWNER-GUI-PROFILE'),
  args:['--disable-extensions-except='+extension,'--load-extension='+extension,
        '--no-first-run','--no-default-browser-check','--disable-sync',
        '--disable-background-timer-throttling','--disable-renderer-backgrounding'],
  timeout:30000
 });
 let closing=false,minRam=Math.floor(os.freemem()/1048576);
 const guard=setInterval(()=>{
  const free=Math.floor(os.freemem()/1048576);minRam=Math.min(minRam,free);
  if(free<=100&&!closing){closing=true;console.error('X24_GUI_EMERGENCY_RAM_STOP',free);
   browser.close().catch(()=>{});}
 },250);
 browser.once('disconnected',()=>{clearInterval(guard);console.log('X24_GUI_CLOSED_MINRAM',minRam);});
 const target=await browser.newPage();
 await target.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:30000});
 const worker=await browser.waitForTarget(t=>t.type()==='service_worker'&&t.url().startsWith('chrome-extension://'),{timeout:18000});
 const id=/^chrome-extension:\/\/([^/]+)\//.exec(worker.url())?.[1];
 if(!id){await browser.close();throw Error('WEBGD_MV3_SERVICE_WORKER_ID_NOT_FOUND')}
 const ui=await browser.newPage();
 await ui.goto('chrome-extension://'+id+'/ui/index.html',{waitUntil:'domcontentloaded',timeout:30000});
 await ui.bringToFront();
 console.log('X24_FULL_WEBGD_GUI_READY','publicPage=https://www.gladeye.com/',
  'ui=chrome-extension://'+id+'/ui/index.html','ramFreeMiB',Math.floor(os.freemem()/1048576));
 console.log('Use Capture tab to capture a frame; close the Chrome windows to exit; no automatic capture is running.');
})().catch(e=>{console.error('X24_GUI_LAUNCH_FAILED',String(e.stack||e));process.exitCode=1});
