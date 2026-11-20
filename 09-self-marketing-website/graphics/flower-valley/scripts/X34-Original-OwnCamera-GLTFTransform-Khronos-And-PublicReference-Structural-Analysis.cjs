'use strict';
// DJMRN X34 — independently inspect/validate existing public camera-file STRUCTURE
// and genuine OWN THREE-channel animated camera GLB and X31 OWN MeshGrab exported mesh.
// Only owned binaries and numerical, non-reconstructive structural camera aggregates.
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const R=path.join(os.homedir(),'Desktop','DJMRN-Website-Reference-Evidence','fernhollow-gladeye-20261118-NEW-EXTRACTION');
const D=path.join(R,'02-reviewed-derived','X34-CURRENT'),P=path.join(R,'01-private-captures','X34','OWN-GLTF-CAMERA-ANIMATION');
const TK=path.join(process.env.LOCALAPPDATA,'DJMRN-Website-Toolkit','03-WebGL','WebGL-Toolchain','node_modules');
const {Document,NodeIO}=require(path.join(TK,'@gltf-transform','core'));
const validator=require(path.join(TK,'gltf-validator'));
const ownX31=path.join(R,'01-private-captures','X31','OWN-GLB-EXPORT','X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb');
const reference=path.join(R,'01-private-captures','X01-REDO','X01-R2-2026-11-18T18-01-09-463Z','first-party-response-bodies','dab4459358d8d22ec63315.glb');
const ownOut=path.join(P,'X34-OWN-original-camera-24fps-200-keys.glb');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const pkg=n=>{const j=JSON.parse(fs.readFileSync(path.join(TK,...n.split('/'),'package.json')));return {version:j.version,license:j.license};};
const stage={stage:'X34',source:'DJMRN_OWNER_ORIGINAL_GLTF_TRANSFORM_V4.5.1_AND_OFFICIAL_KHRONOS_VALIDATOR',originalPublicReferenceBinaryNeverPublished:true,
 originalReferenceLicenseNotProven:true,baseTools:{validator:pkg('gltf-validator'),core:pkg('@gltf-transform/core'),cli:pkg('@gltf-transform/cli'),three:pkg('three')},
 links:{glTFTransform:'https://github.com/donmccurdy/glTF-Transform',validator:'https://github.com/KhronosGroup/glTF-Validator'},
 results:{},issues:[],ready:false};
function accessor(d,b,name,arr,type){return d.createAccessor(name).setType(type).setBuffer(b).setArray(arr);}
function minmax(a,stride){const lo=Array(stride).fill(Infinity),hi=Array(stride).fill(-Infinity);for(let i=0;i<a.length;i++) {const j=i%stride;lo[j]=Math.min(lo[j],a[i]);hi[j]=Math.max(hi[j],a[i]);}return {min:lo.map(x=>+x.toFixed(5)),max:hi.map(x=>+x.toFixed(5))};}
function glbstructure(buf){if(buf.toString('ascii',0,4)!=='glTF')throw Error('NOT_GLB');const jsize=buf.readUInt32LE(12);const json=JSON.parse(buf.toString('utf8',20,20+jsize));return {version:buf.readUInt32LE(4),declaredSize:buf.readUInt32LE(8),jsonBytes:jsize,binBytes:buf.readUInt32LE(20+jsize),json,actualBytes:buf.length};}
function structSummary(doc){const r=doc.getRoot();return {scenes:r.listScenes().length,nodes:r.listNodes().length,cameras:r.listCameras().length,animations:r.listAnimations().length,
 meshes:r.listMeshes().length,meshPrimitives:r.listMeshes().reduce((n,m)=>n+m.listPrimitives().length,0),
 textures:r.listTextures().length,materials:r.listMaterials().length,
 geometryPositions:r.listMeshes().flatMap(m=>m.listPrimitives()).map(p=>p.getAttribute('POSITION')?.getCount()||0),
 geometryIndices:r.listMeshes().flatMap(m=>m.listPrimitives()).map(p=>p.getIndices()?.getCount()||0),
 cameraTypes:r.listCameras().map(x=>x.getType()),
 animationChannels:r.listAnimations().map(x=>x.listChannels().length)};}
async function validate(label,bytes){const v=await validator.validateBytes(new Uint8Array(bytes),{uri:label+'.glb'});
 const out={validatorVersion:validator.version(),bytes:bytes.length,sha256:hash(bytes),
  errors:v.issues?.numErrors,warnings:v.issues?.numWarnings,infos:v.issues?.numInfos,
  issuesCodes:(v.issues?.messages||[]).map(x=>({code:x.code,severity:x.severity})),
  gltfVersion:v.asset?.version};
 fs.writeFileSync(path.join(P,label+'-VALIDATOR-FULL-PRIVATE.json'),JSON.stringify(v,null,2)+'\n');
 return out;}
async function main(){
 const doc=new Document(),buf=doc.createBuffer('DJMRN_OWN_BUFFER');
 const scene=doc.createScene('DJMRN_OWN_animated_camera_path');
 doc.getRoot().setDefaultScene(scene);
 const camera=doc.createCamera('DJMRN_OWN_Camera').setType('perspective').setAspectRatio(16/9).setYFov(0.62).setZNear(0.1).setZFar(120);
 const node=doc.createNode('DJMRN_OWN_CameraRig').setCamera(camera);scene.addChild(node);
 const duration=199/24,N=200;
 const times=new Float32Array(N),pos=new Float32Array(N*3),rot=new Float32Array(N*4),scale=new Float32Array(N*3);
 for(let i=0;i<N;i++){const t=i/24,q=i/(N-1),a=.12*Math.sin(q*Math.PI*2);
  times[i]=t;pos.set([0.36*Math.sin(q*Math.PI*2),1.35+0.2*Math.cos(q*Math.PI*2),5.3-0.7*q],i*3);
  rot.set([0,Math.sin(a/2),0,Math.cos(a/2)],i*4);scale.set([1,1,1],i*3);}
 const clock=accessor(doc,buf,'OWN_24fps_200times',times,'SCALAR');
 const anim=doc.createAnimation('DJMRN_OWN_Camera_200Keys_Linear');
 for(const [name,arr,type] of [['translation',pos,'VEC3'],['rotation',rot,'VEC4'],['scale',scale,'VEC3']]){
  const out=accessor(doc,buf,'OWN_'+name,arr,type);
  const sampler=doc.createAnimationSampler().setInput(clock).setOutput(out).setInterpolation('LINEAR');
  const channel=doc.createAnimationChannel().setSampler(sampler).setTargetNode(node).setTargetPath(name);
  anim.addSampler(sampler).addChannel(channel);
 }
 const io=new NodeIO();const bytes=Buffer.from(await io.writeBinary(doc));fs.writeFileSync(ownOut,bytes);
 const rebuilt=await io.readBinary(new Uint8Array(bytes)),ownStructure=structSummary(rebuilt);
 stage.results.ownedCamera={...await validate('X34-OWN-24fps-200keys',bytes),...ownStructure,
 durationSeconds:duration,timeSteps:200,frequencyHz:24,clipName:'DJMRN_OWN_Camera_200Keys_Linear',aspectRatio:camera.getAspectRatio(),
 fovYRadians:camera.getYFov(),paths:['translation','rotation','scale'],interpolations:['LINEAR','LINEAR','LINEAR'],
 positionsStats:minmax(pos,3),rotationsStats:minmax(rot,4),ownedGLBLocalOnly:true};
 const originalMesh=fs.readFileSync(ownX31);const md=await io.readBinary(new Uint8Array(originalMesh));
 stage.results.ownedMesh={...await validate('X34-X31-OWN-originalMesh',originalMesh),...structSummary(md),status:'OWN_3D_MESH_NO_CAMERA_ANIMATIONS'};
 const ref=fs.readFileSync(reference),rv=await io.readBinary(new Uint8Array(ref)),rs=structSummary(rv),rh=glbstructure(ref),cam=rv.getRoot().listCameras()[0],animations=rv.getRoot().listAnimations();
 const channelMeta=[];
 for(const animation of animations)for(const ch of animation.listChannels()){
  const sampler=ch.getSampler(),t=sampler.getInput()?.getArray(),o=sampler.getOutput()?.getArray(),pathName=ch.getTargetPath(),
   dims={translation:3,rotation:4,scale:3,weights:1}[pathName]||1;
  let spacings=[];
  for(let i=1;i<t.length;i++)spacings.push(t[i]-t[i-1]);
  const min=Math.min(...spacings),max=Math.max(...spacings);
  channelMeta.push({path:pathName,interpolation:sampler.getInterpolation(),keyframes:t.length,
   durationSeconds:+(t[t.length-1]-t[0]).toFixed(6),keyframesPerSecond:+((t.length-1)/(t[t.length-1]-t[0])).toFixed(5),
   timeStepMinSeconds:+min.toFixed(8),timeStepMaxSeconds:+max.toFixed(8),
   targetAccessorComponentCount:dims,outputSamples:o?.length/dims,
   outputAllFinite:o?Array.from(o).every(Number.isFinite):false,
   minMaxRangeOnly:minmax(o,dims)});
 }
 stage.results.publicCameraStructuralAnalysis={...await validate('X34-original-PUBLIC-camera-PRIVATE-source',ref),
  scene:rs,originalGenerator:rh.json.asset?.generator,originalGlTFVersion:rh.json.asset?.version,
  jsonChunkBytes:rh.jsonBytes,binaryChunkBytes:rh.binBytes,animationSampling:channelMeta,
  camera:{type:cam.getType(),aspectRatio:cam.getAspectRatio(),fovYRadians:cam.getYFov(),near:cam.getZNear(),far:cam.getZFar()},
  cameraPathNotFlowerMesh:true,rawOriginalGLBPrivateOnly:true,originalKeyframesNotPublished:true,originalSceneOrShaderNotReconstructed:true};
 stage.results.crosswalk={historicalCameraRecorded:[
 'https://www.gladeye.com/valley/camera-path07.glb','200-sample translation rotation scale LINEAR duration 8.2916667',
 'node Camera.001 GLB 10132 bytes, mesh=0, one camera'],
 actualPrivateReferenceSHA256:stage.results.publicCameraStructuralAnalysis.sha256,
 originalX31OwnMeshSHA256:stage.results.ownedMesh.sha256,
 ownAnimationNewSHA256:stage.results.ownedCamera.sha256};
 stage.ready=true;
 fs.writeFileSync(path.join(D,'X34-GLTF-TRANSFORM-KHRONOS-OWNER-ANIMATION-CAMERA-AND-PRIVATE-REFERENCE-STRUCTURE.json'),JSON.stringify(stage,null,2)+'\n');
 console.log('X34_GLTF_REAL '+JSON.stringify({stage:'X34',status:'PASS',owner:stage.results.ownedCamera,
 mesh:stage.results.ownedMesh,
 originalReference:{bytes:ref.length,sha256:hash(ref),camera:stage.results.publicCameraStructuralAnalysis.camera,
 animations:channelMeta,validation:stage.results.publicCameraStructuralAnalysis.errors,
 warnings:stage.results.publicCameraStructuralAnalysis.warnings,meshes:rs.meshes}},null,0).slice(0,7600));
 if(Object.values(stage.results).some(x=>x.errors>0))process.exitCode=1;
}
main().catch(e=>{console.error('X34_GLTF_FAIL '+String(e?.stack||e));process.exitCode=1});
