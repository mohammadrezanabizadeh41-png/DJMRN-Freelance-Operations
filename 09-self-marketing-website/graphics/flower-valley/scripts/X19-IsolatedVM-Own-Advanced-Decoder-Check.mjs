// DJMRN X19 native addon + webcrack advanced decoder OWN-only acceptance.
// No site source enters the native sandbox. No system permissions or network needed.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const root=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const out=path.join(root,'02-reviewed-derived','X19-PREFLIGHT');
const rt=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Runtimes','X19-webcrack');
const req=createRequire(path.join(rt,'__djmrn_own_test__.cjs'));
const ivm=req('isolated-vm-6');
const {webcrack}=await import(pathToFileURL(path.join(rt,'node_modules','webcrack','dist','index.js')).href);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
if(os.freemem()<250*1048576)throw Error('FREE_RAM_UNDER_250MIB');
const raw='function _0x4b82(){var _0x19ac=["DJMRN_NATIVE_OWN_FIXTURE","hello"];_0x4b82=function(){return _0x19ac;};return _0x4b82();}\n'+
'function _0x168d(_0x31dd){var _0x2aa7=_0x4b82();return _0x168d=function(_0x51a2){_0x51a2=_0x51a2-0x0;var _0x1f3e=_0x2aa7[_0x51a2];return _0x1f3e;},_0x168d(_0x31dd);}\n'+
'const ownResult=_0x168d(0x0);console.log(ownResult);\n';
const source=path.join(out,'X19-OWN-native-decode-fixture.js');
if(fs.existsSync(source)&&sha(fs.readFileSync(source))!==sha(Buffer.from(raw)))throw Error('OWNER_INPUT_ALREADY_CHANGED');
if(!fs.existsSync(source))fs.writeFileSync(source,raw,{flag:'wx'});
let sandboxCallCount=0;let sandboxFailures=[];
async function ownerSandbox(code){
 sandboxCallCount++;
 const isolate=new ivm.Isolate({memoryLimit:24});
 const context=await isolate.createContext();
 try{return await context.eval(code,{timeout:1200,copy:true})}
 catch(e){sandboxFailures.push({name:e.name||'Error',message:String(e.message).slice(0,120)});throw e}
 finally{context.release();isolate.dispose()}
}
let isolationResult=null;
try{isolationResult=await ownerSandbox('(()=>{const a=20;return a+22})()')}
catch(e){throw Error('OWN_NATIVE_SANDBOX_FAILED:'+String(e.message))}
if(isolationResult!==42)throw Error('OWN_NATIVE_ISOLATE_WRONG_RESULT');
const callsBefore=sandboxCallCount;
const timeout=setTimeout(()=>{console.error('X19_OWN_ADVANCED_TIMEOUT');process.exit(124)},25000);
let derived,runError=null;
try{
 derived=await webcrack(raw,{deobfuscate:true,unminify:true,unpack:false,jsx:false,sandbox:ownerSandbox});
}catch(e){runError=(e.name||'Error')+':'+String(e.message).slice(0,230)}
finally{clearTimeout(timeout)}
const decoderCalls=sandboxCallCount-callsBefore;
const transformed=derived?.code||'';
const saved=path.join(out,'X19-OWN-native-decode-transformed.js');
if(transformed&&!fs.existsSync(saved))fs.writeFileSync(saved,transformed,{flag:'wx'});
const acceptance={
 stage:'X19',type:'OWN_SYNTHETIC_ADVANCED_DECODER_TEST',utc:new Date().toISOString(),
 addonAlias:'isolated-vm-6',addonVersion:req('isolated-vm-6/package.json').version,
 nodeVersion:process.version,nodeAbi:process.versions.modules,
 nativeBinaryLoadPASS:true,isolatedVmExpressionTestPASS:isolationResult===42,
 sandboxIsolationMemoryMiB:24,sandboxTimeoutMs:1200,
 webcrackAdvancedOptionEnabled:true,webcrackReturnOk:!runError&&transformed.length>0,
 actualWebcrackSandboxInvocations:decoderCalls,ownerDecoderTextFound:transformed.includes('DJMRN_NATIVE_OWN_FIXTURE'),
 inputSha256:sha(Buffer.from(raw)),transformedSha256:transformed?sha(Buffer.from(transformed)):null,
 inputBytes:Buffer.byteLength(raw),transformedBytes:Buffer.byteLength(transformed),
 error:runError,sandboxFailures,freeRamMiB:Math.round(os.freemem()/1048576),
 status:runError?'ADVANCED_TRANSFORM_FAILED':decoderCalls>0?'ADVANCED_NATIVE_DECODER_ACTIVE':
 'ADVANCED_OPTIONS_ENABLED_BUT_NATIVE_DECODER_NOT_NEEDED_FOR_OWN_PATTERN',
 limitations:['Only owner fixture was evaluated by isolated-vm','Native binary sandbox is NOT a general security boundary for untrusted JavaScript',
 'This test does not authorize running downloaded vendor code in a Node VM',
 'No vendor original TS/GLSL source or private runtime source recovered']};
fs.writeFileSync(path.join(out,'X19-OWN-NATIVE-DEOBFUSCATOR-ACCEPTANCE.json'),JSON.stringify(acceptance,null,2)+'\n');
console.log('X19_NATIVE_OWN_FIXTURE '+JSON.stringify(acceptance));
if(runError)process.exitCode=2;
