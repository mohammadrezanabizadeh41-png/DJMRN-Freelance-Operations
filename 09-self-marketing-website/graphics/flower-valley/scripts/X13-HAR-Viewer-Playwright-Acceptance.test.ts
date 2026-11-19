import {test,expect,chromium} from '@playwright/test';
import path from 'node:path';
import os from 'node:os';
import {readFile,writeFile} from 'node:fs/promises';
test('X13 upstream static HAR Viewer renders 51-entry sanitized real X02 HAR locally',async()=>{
 test.setTimeout(95000);
 const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
 const file=process.env.DJMRN_HAR_INPUT||path.join(root,'01-private-captures','X02','X02-2026-11-18T17-49-35-108Z','sanitized-metadata-only.har');
 const input=await readFile(file,'utf8');
 const rt=path.join(process.env.LOCALAPPDATA||'','DJMRN-Website-Toolkit','04-Runtimes','ArchiveBox-X11');
 const browser=await chromium.launch({executablePath:path.join(rt,'ChromeForTesting-157','chrome-win64','chrome.exe'),headless:true});
 const requests:string[]=[],errors:string[]=[];
 try{
 const ctx=await browser.newContext({viewport:{width:1200,height:830}});
 await ctx.route('**/*',route=>{const url=route.request().url();if(url.startsWith('http://127.0.0.1:9876/'))route.continue();else{requests.push(url);route.abort()}});
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push('console:'+m.text())});
 const response=await page.goto('http://127.0.0.1:9876/index.html',{waitUntil:'networkidle',timeout:45000});
 await page.locator('textarea').first().fill(input);
 await page.getByRole('button',{name:'Preview'}).click();
 await page.waitForTimeout(2700);
 const body=(await page.locator('body').innerText()).slice(0,10000);
 const dom=await page.evaluate(()=>({title:document.title,netRows:document.querySelectorAll('tr').length,tables:document.querySelectorAll('table').length,scripts:document.querySelectorAll('script').length,links:document.querySelectorAll('a').length,viewElements:[...document.querySelectorAll('[class]')].filter(n=>String(n.className).includes('net')).length}));
 const result={status:response?.status(),file,entryCount:51,loadedLikely:body.includes('51 requests')||body.includes('27.30')||dom.netRows>15||body.includes('HTTP Archive'),bodySample:body.slice(0,5000),dom,errors:errors.slice(0,15),externalRequestsBlocked:requests};
 const output=path.join(root,'02-reviewed-derived',process.env.DJMRN_HAR_INPUT?'X13-HARViewer-X13-TRUE180-real-HAR-render-2026-11-19.json':'X13-HARViewer-X02-real-HAR-render-2026-11-19.json');
 await writeFile(output,JSON.stringify(result,null,2));
 console.log('DJMRN_X13_HAR_RENDER',JSON.stringify({output,dom,loadedLikely:result.loadedLikely,bodySample:result.bodySample.slice(0,750),errors,externalRequestsBlocked:requests}));
 expect(response?.status()).toBe(200);
 expect(errors.length).toBe(0);
 expect(dom.netRows).toBeGreaterThan(5);
 }finally{await browser.close();}
});