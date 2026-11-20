'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X31-CURRENT');
const src=path.join(R,'01-private-captures','X31','OWN-GLB-EXPORT','X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb');
const validator=require(path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','04-Specialists','Sources','WebGLModelExtractor','webgl-model-extractor-main','node_modules','gltf-validator'));
(async()=>{
 const b=fs.readFileSync(src),v=await validator.validateBytes(new Uint8Array(b),{uri:'DJMRN-X31-OWN-MeshGrab-Grid.glb'});
 const o={stage:'X31',scope:'DJMRN_OWNER_ONLY',source:'Khronos gltf-validator existing local package',
  sha256:crypto.createHash('sha256').update(b).digest('hex'),bytes:b.length,result:v,runUTC:new Date().toISOString()};
 fs.writeFileSync(path.join(D,'X31-OWN-KHRONOS-GLTF-VALIDATOR.json'),JSON.stringify(o,null,2)+'\n');
 console.log('X31_GLTF_VALIDATOR '+JSON.stringify({sha256:o.sha256,bytes:b.length,version:v.asset?.version,
 errors:v.issues?.numErrors,warnings:v.issues?.numWarnings,infos:v.issues?.numInfos,
 issueCodes:(v.issues?.messages||[]).map(x=>x.code).slice(0,20)}));
 if(v.issues?.numErrors||v.issues?.numWarnings)process.exitCode=1;
})().catch(e=>{console.error(e.stack);process.exitCode=1});
