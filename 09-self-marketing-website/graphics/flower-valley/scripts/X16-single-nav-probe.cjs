const os=require('os'),path=require('path');
const root=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes');
const chrome=path.join(root,'ArchiveBox-X11','ChromeForTesting-157','chrome-win64','chrome.exe');
const puppeteer=require(path.join(root,'X14-Wappalyzer','wappalyzer-httparchive-source','node_modules','puppeteer'));
(async()=>{
 let browser,stop=false;const mem=setInterval(()=>{if(os.freemem()<100*1048576)stop=true},1000);
 try{
  console.log('PROBE_START');
  browser=await puppeteer.launch({executablePath:chrome,headless:true,ignoreHTTPSErrors:true,acceptInsecureCerts:true,timeout:20000,args:['--headless=new','--disable-extensions','--no-first-run','--no-default-browser-check']});
  console.log('CHROME_LAUNCH_PASS');
  const page=await browser.newPage(), errors=[];let domEvent=false,requestCt=0;
  page.on('domcontentloaded',()=>{domEvent=true;console.log('DOM_CONTENT_LOADED_EVENT')});
  page.on('request',()=>requestCt++);
  page.on('requestfailed',r=>{if(new URL(r.url()).hostname.endsWith('gladeye.com')&&errors.length<10)errors.push({path:new URL(r.url()).pathname,type:r.failure()?.errorText})});
  const started=Date.now();let navStatus=null,err=null;
  try{const res=await page.goto('https://www.gladeye.com/',{waitUntil:'domcontentloaded',timeout:65000});navStatus=res?.status()||null;}
  catch(e){err=e.name+':'+e.message.slice(0,140)}
  console.log('RESULT '+JSON.stringify({navStatus,elapsedSec:Math.round((Date.now()-started)/1000),domEvent,requestCt,errors,err,stop,freeMiB:Math.round(os.freemem()/1048576)}));
 }catch(e){console.log('FATAL '+e.name+' '+e.message.slice(0,150))}
 finally{clearInterval(mem);if(browser)await browser.close().catch(()=>{});}
})()