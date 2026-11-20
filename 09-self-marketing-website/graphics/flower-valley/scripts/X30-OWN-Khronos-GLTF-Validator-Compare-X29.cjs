'use strict';
// Original DJMRN X30 independent OFFLINE glTF2 conformance comparison.
// Uses the installed open-source gltf-validator; ONLY owner-created X29/X30 fixtures.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const cp=require('child_process');
const TK=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X30-CURRENT');
const validator=require(path.join(TK,'04-Specialists','Sources','WebGLModelExtractor','webgl-model-extractor-main','node_modules','gltf-validator'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const x29Zip=path.join(R,'01-private-captures','X29','own-fixture-export','webglripper_127.0.0.1_20261120-205751.zip');
const x30GLB=path.join(R,'01-private-captures','X30','OWN-GLB-EXPORT','X30-OWN-binbuf-WebGLModelExtractor-0.7.0-EXACT-REAL-OUTPUT.glb');
const source=String.raw`import sys,zipfile
with zipfile.ZipFile(sys.argv[1]) as z:
 names=[x for x in z.namelist() if x.endswith(".glb")]
 assert len(names)>=1
 sys.stdout.buffer.write(z.read(names[0]))`;
const py=cp.spawnSync('py',['-3','-c',source,x29Zip],{encoding:null,maxBuffer:24000000,timeout:15000});
if(py.status!==0||!py.stdout?.length)throw Error('X29_OWNER_ZIP_GLB_READ_FAIL '+py.stderr?.toString('utf8').slice(0,300));
const inputs=[['X29_WebGLRipper_1_3_2_OWN_GLTF',Buffer.from(py.stdout)],
              ['X30_WebGLModelExtractor_0_7_0_OWN_GLTF',fs.readFileSync(x30GLB)]];
async function run(){
 const result={stage:'X30',scope:'ONLY_OWNER_ORIGINAL_FIXTURE',tool:'Khronos gltf-validator (local previously installed dependency)',records:[]};
 for(const [label,buf] of inputs){
   const a=await validator.validateBytes(new Uint8Array(buf),{uri:label+'.glb'});
   result.records.push({name:label,sha256:sha(buf),bytes:buf.length,
    glTFVersion:a.asset?.version||null,errors:a.issues?.numErrors,warnings:a.issues?.numWarnings,
    info:a.issues?.numInfos,hints:a.issues?.numHints,
    issueCodes:(a.issues?.messages||[]).map(x=>({code:x.code,severity:x.severity,pointer:x.pointer||null})).slice(0,30),
    validatorResources:a.resources?.length??null});
 }
 fs.writeFileSync(path.join(D,'X30-OWN-X29-vs-X30-KHRONOS-GLTF-COMPLIANCE.json'),JSON.stringify(result,null,2)+'\n');
 console.log('X30_OFFICIAL_GLTF_VALIDATOR '+JSON.stringify(result.records));
}
run().catch(e=>{console.error('X30_VALIDATION_FAILURE '+e.stack);process.exitCode=1});
