#!/usr/bin/env python3
"""DJMRN X34: independent binary glTF/owner animation/90.01s public timeline and X01..X33 historical acceptance.
Never publish original vendor glb, its raw keyframes, complete third-party frame captures or screenshot pixels.
"""
from pathlib import Path
import json,struct,hashlib,math,datetime,os,collections
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X34-CURRENT"
PR=R/"01-private-captures"/"X34"/"OWN-GLTF-CAMERA-ANIMATION"
ref=R/"01-private-captures"/"X01-REDO"/"X01-R2-2026-11-18T18-01-09-463Z"/"first-party-response-bodies"/"dab4459358d8d22ec63315.glb"
own=PR/"X34-OWN-original-camera-24fps-200-keys.glb"
mesh=R/"01-private-captures"/"X31"/"OWN-GLB-EXPORT"/"X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb"
gltf=json.loads((D/"X34-GLTF-TRANSFORM-KHRONOS-OWNER-ANIMATION-CAMERA-AND-PRIVATE-REFERENCE-STRUCTURE.json").read_text(encoding="utf8"))
viewer=json.loads((D/"X34-OWN-THREEJS-GLTFLOADER-ANIMATIONMIXER-LOCAL-GPU-VIEWER-RESULT.json").read_text(encoding="utf8"))
live=json.loads((D/"X34-90S-LIVE-CAMERA-RESOURCE-PUBLIC-READONLY-X01-X33-TIMELINE.json").read_text(encoding="utf8"))
checks={}
def C(k,v):checks[k]=bool(v)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def glbparse(p):
 b=p.read_bytes()
 if b[:4]!=b"glTF":raise ValueError("missing glTF magic: "+p.name)
 n,sz=struct.unpack_from("<II",b,4)
 offs=12;chunks=[]
 while offs+8<=len(b):
  l,t=struct.unpack_from("<II",b,offs);offs+=8
  raw=b[offs:offs+l];offs+=l
  chunks.append((t,raw,l))
 out=json.loads(chunks[0][1].decode("utf8"))
 return {"version":n,"length":sz,"actual":len(b),"chunks":chunks,"gltf":out,"end":offs}
rr=glbparse(ref);oo=glbparse(own);mm=glbparse(mesh)
C("X34_real_reference_10132_bytes",len(ref.read_bytes())==10132)
C("X34_real_reference_original_SHA",sha(ref)=="dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e")
C("X34_real_reference_glTF2",rr["version"]==2 and rr["length"]==rr["actual"]==rr["end"])
C("X34_real_reference_two_valid_chunks",len(rr["chunks"])==2 and [x[0] for x in rr["chunks"]]==[0x4E4F534A,0x004E4942])
C("X34_real_reference_authoring_generator",rr["gltf"]["asset"]["generator"]=="Khronos glTF Blender I/O v3.2.43")
C("X34_real_reference_no_flower_mesh",len(rr["gltf"].get("meshes",[]))==0)
C("X34_real_reference_one_perspective_camera",len(rr["gltf"].get("cameras",[]))==1 and rr["gltf"]["cameras"][0]["type"]=="perspective")
C("X34_reference_one_scene_one_node",len(rr["gltf"].get("scenes",[]))==1 and len(rr["gltf"].get("nodes",[]))==1)
C("X34_real_reference_animation_exists",len(rr["gltf"].get("animations",[]))==1)
rchan=rr["gltf"]["animations"][0]["channels"];rsamp=rr["gltf"]["animations"][0]["samplers"]
C("X34_original_reference_three_channels_three_samplers",len(rchan)==len(rsamp)==3)
C("X34_original_reference_paths_correct",sorted(x["target"]["path"] for x in rchan)==["rotation","scale","translation"])
C("X34_original_reference_linear",all(x["interpolation"]=="LINEAR" for x in rsamp))
C("X34_original_reference_accessors_4",len(rr["gltf"]["accessors"])==4)
C("X34_original_camera_aspect_16_by_9",math.isclose(rr["gltf"]["cameras"][0]["perspective"]["aspectRatio"],16/9,rel_tol=1e-6))
C("X34_original_camera_yfov_exact",math.isclose(rr["gltf"]["cameras"][0]["perspective"]["yfov"],.39959648408210363,rel_tol=1e-6))
C("X34_original_camera_near_far",rr["gltf"]["cameras"][0]["perspective"]["znear"]>.09 and rr["gltf"]["cameras"][0]["perspective"]["zfar"]==1000)
for typ in ("publicCameraStructuralAnalysis","ownedCamera","ownedMesh"):
 x=gltf["results"][typ]
 C(typ+"_validator_errors_zero",x["errors"]==0)
 C(typ+"_validator_warnings_zero",x["warnings"]==0)
 C(typ+"_validator_sha_identical",x["sha256"]==sha({"publicCameraStructuralAnalysis":ref,"ownedCamera":own,"ownedMesh":mesh}[typ]))
 C(typ+"_validator_gltf_version_2",x.get("gltfVersion") in (None,"2.0"))
for x in gltf["results"]["publicCameraStructuralAnalysis"]["animationSampling"]:
 C("X34_reference_"+x["path"]+"_200_frames",x["keyframes"]==x["outputSamples"]==200)
 C("X34_reference_"+x["path"]+"_linear",x["interpolation"]=="LINEAR")
 C("X34_reference_"+x["path"]+"_24hz",x["keyframesPerSecond"]==24)
 C("X34_reference_"+x["path"]+"_duration",math.isclose(x["durationSeconds"],199/24,abs_tol=0.0001))
 C("X34_reference_"+x["path"]+"_fully_finite",x["outputAllFinite"])
C("X34_reference_scale_unchanged",all(x["minMaxRangeOnly"]["min"]==[1,1,1] and x["minMaxRangeOnly"]["max"]==[1,1,1] for x in gltf["results"]["publicCameraStructuralAnalysis"]["animationSampling"] if x["path"]=="scale"))
C("X34_original_owner_camera_not_vendor_binary",sha(own)!=sha(ref))
C("X34_owner_GLb_2_and_valid_length",oo["version"]==2 and oo["length"]==oo["actual"]==oo["end"])
C("X34_owner_original_camera_one_camera",len(oo["gltf"].get("cameras",[]))==1)
C("X34_owner_200_keyframes",len(oo["gltf"]["animations"][0]["channels"])==3 and gltf["results"]["ownedCamera"]["timeSteps"]==200)
C("X34_owner_24Hz",gltf["results"]["ownedCamera"]["frequencyHz"]==24)
C("X34_owner_3_channel_linear",sorted(x["target"]["path"] for x in oo["gltf"]["animations"][0]["channels"])==["rotation","scale","translation"] and all(x["interpolation"]=="LINEAR" for x in oo["gltf"]["animations"][0]["samplers"]))
C("X34_mesh_only_owner_real_SHA",sha(mesh)=="c69bd5f61c6d02c320d83439f0f9058b64b7e9a99970ef2aa571ecd918f37b30")
C("X34_mesh_only_one_primitive",len(mm["gltf"].get("meshes",[]))==1 and len(mm["gltf"]["meshes"][0]["primitives"])==1)
C("X34_mesh_only_no_camera_no_animation",len(mm["gltf"].get("cameras",[]))==len(mm["gltf"].get("animations",[]))==0)
C("X34_mesh_owner_512_vertices_2790_indices",gltf["results"]["ownedMesh"]["geometryPositions"]==[512] and gltf["results"]["ownedMesh"]["geometryIndices"]==[2790])
C("X34_owner_viewer_actual_pass",viewer["status"]=="PASS" and viewer["viewer"]["ready"] is True)
C("X34_viewer_real_ANGLE_vega8", "Vega 8" in viewer["viewer"]["renderer"] and "D3D11" in viewer["viewer"]["renderer"])
C("X34_owner_animation_one_clip",len(viewer["viewer"]["animationClips"])==1)
C("X34_owner_animation_three_tracks",viewer["viewer"]["animationClips"][0]["trackCount"]==3)
C("X34_owner_threejs_camera_moved",viewer["viewer"]["cameraActuallyMoved"] is True and viewer["viewer"]["initialPosition"]!=viewer["viewer"]["advancedPosition"])
C("X34_owner_render_screenshots_differ",viewer["screenshotsDiffer"] is True)
C("X34_viewer_no_runtime_errors",not viewer["errors"])
C("X34_viewer_memory_above_100",viewer["minFreeMiB"]>100)
for t in viewer["screenshotMetadata"]:
 file=PR/("X34-OWN-VIEWER-"+("BEFORE" if t["label"].endswith("before") else "AFTER")+".png")
 C("X34_OWN_ViewerScreenshot_"+t["label"]+"_exists",file.is_file())
 C("X34_OWN_ViewerScreenshot_"+t["label"]+"_SHA",file.is_file() and sha(file)==t["sha256"])
 C("X34_OWN_ViewerScreenshot_"+t["label"]+"_bytes",file.is_file() and file.stat().st_size==t["bytes"])
C("X34_CLI_existing_tool_no_global_install",gltf["baseTools"]["cli"]["version"]=="4.5.1")
for x in ["X34-OWN-GLTF-TRANSFORM-CLI-INSPECT.txt","X34-X31-OWN-MESH-CLI-INSPECT.txt"]:
 C("X34_official_CLI_inspect_exists_"+x,(PR/x).is_file() and (PR/x).stat().st_size>2000)
C("X34_public_site_known",live["site"]=="https://www.gladeye.com/")
C("X34_public_new_90s_complete",live["stopReason"]=="COMPLETED_90_SECONDS" and 89.9<=live["actualObservedSeconds"]<=90.2)
sn=live["snapshots"]
C("X34_public_seven_real_phases",len(sn)==7 and [v["label"] for v in sn]==["initial","hover_left","hover_right","scroll_450","pointer_center","reverse_scroll","return_idle"])
C("X34_public_seven_phase_order",all(a["actualSecond"]<b["actualSecond"] for a,b in zip(sn,sn[1:])))
C("X34_public_Gladeye_WebGL2",all(s["metadata"]["webgl2"] for s in sn))
C("X34_public_Three_r154",all(s["metadata"]["ThreeRevision"]=="154" for s in sn))
C("X34_public_cameras_resource_perf_six_phases",all(len(s["metadata"]["gltfCameraResourcePerformanceEntries"])==1 for s in sn[1:]))
C("X34_public_camera_decoded_10132",all(s["metadata"]["gltfCameraResourcePerformanceEntries"][0]["decodedBodySize"]==10132 for s in sn[1:]))
C("X34_public_camera_perf_same_path",all(s["metadata"]["gltfCameraResourcePerformanceEntries"][0]["path"]=="/valley/camera-path07.glb" for s in sn[1:]))
cameras=[x for x in live["networkBodyShaAndSize"] if x["url"].endswith("/valley/camera-path07.glb")]
C("X34_live_camera_sha_matches_private_historical",len(cameras)==1 and cameras[0]["sha256"]==sha(ref))
C("X34_live_camera_size_matches_private",len(cameras)==1 and cameras[0]["bytes"]==10132)
C("X34_live_camera_sha_matches_prior_X19",len(cameras)==1 and cameras[0]["exactPreviousOriginalBodyShaSize"])
C("X34_public_first_party_46_known",live["observedFirstPartyPaths"]==46 and len(live["novelFirstPartyPaths"])==0)
C("X34_public_all_38_observed_bodies_match_X19",live["originalBodyExactCount"]==live["totalHashedResponses"]==38 and all(x["exactPreviousOriginalBodyShaSize"] for x in live["networkBodyShaAndSize"]))
C("X34_public_37_network_edges_no_delta",live["networkInitiatorEdgesObserved"]==37 and not live["newInitiatorEdges"])
C("X34_public_css_animations_7_initial",sn[0]["metadata"]["cssWebAnimationsCount"]==7)
C("X34_public_css_animations_42_subsequent",all(s["metadata"]["cssWebAnimationsCount"]==42 for s in sn[1:]))
C("X34_public_no_native_injection",live["vendorRenderDocNeverInjectedEverySnapshot"] is True)
C("X34_public_no_vendor_geometry_export",live["geometryExportOfOriginalSite"] is False and live["originalSiteGLB"] is False)
C("X34_public_no_shader_texture_payload",live["originalVertexShaderSourcesSaved"] is False and live["originalTexturePixelDataSaved"] is False)
C("X34_public_zero_errors",not live["issues"])
C("X34_public_100MiB_memory_margin",live["minFreeRamMiB"]>100 and live["ownerRamHardStopMiB"]==100)
C("X34_public_system_proxy_unchanged",live["systemProxyUnchanged"] is True)
C("X34_public_three_webgl_primitive_signatures",sn[-1]["metadata"]["renderer"]["signatureCount"]==3)
C("X34_public_point_draw_index_960000",any(x["mode"]==0 and x["count"]==960000 for x in sn[-1]["metadata"]["renderer"]["signatures"]))
C("X34_public_cumulative_draws_gt_zero",sn[-1]["metadata"]["renderer"]["totalDraws"]>0)
for s in sn:
 if "privateScreenshot" not in s:continue
 t=s["privateScreenshot"]
 path=R/"01-private-captures"/"X34"/"PUBLIC-90S-READONLY"/t["name"]
 C("public_screenshot_"+s["label"]+"_exists",path.is_file())
 C("public_screenshot_"+s["label"]+"_sha",path.is_file() and sha(path)==t["sha256"])
 C("public_screenshot_"+s["label"]+"_bytes",path.is_file() and path.stat().st_size==t["bytes"])
for x,name,n in [
 ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),
 ("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
 ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
 ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96),
 ("X31","X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json",121),
 ("X32","X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json",128),
 ("X33","X33-INDEPENDENT-X01-X32-MCP-REPLAY-AND-LIVE-ACCEPTANCE.json",123)]:
 j=json.loads((R/"02-reviewed-derived"/(x+"-CURRENT")/name).read_text(encoding="utf8"))
 C("X34_previous_"+x+"_QA",j.get("total",j.get("checksTotal"))==n and j.get("passed",j.get("checksPassed"))==n and not j.get("failed"))
for i in range(1,34):
 prefix=f"X{i:02d}"
 C("X34_previous_"+prefix+"_evidence_exists",any(p.name.startswith(prefix) for p in (R/"02-reviewed-derived").iterdir()))
result={"stage":"X34","stableObservationUTC":live["startUTC"],
 "status":"PASS" if all(checks.values()) else "FAIL","total":len(checks),"passed":sum(checks.values()),
 "failed":[k for k,v in checks.items() if not v],"checks":checks,
 "facts":{"validatorVersion":gltf["baseTools"]["validator"]["version"],
  "glTFTransformVersion":gltf["baseTools"]["core"]["version"],"ThreeJSVersion":gltf["baseTools"]["three"]["version"],
  "referenceCameraSHA256":sha(ref),"referenceCameraFileBytes":ref.stat().st_size,
  "referenceCameraFovYRadians":gltf["results"]["publicCameraStructuralAnalysis"]["camera"]["fovYRadians"],
  "referenceAnimationChannels":[x["path"] for x in gltf["results"]["publicCameraStructuralAnalysis"]["animationSampling"]],
  "referenceCameraKeyframes":200,"referenceSampleRateHz":24,"referenceCameraMeshCount":0,
  "ownCameraGLBSHA256":sha(own),"ownCameraGLBBytes":own.stat().st_size,
  "ownerMeshGLBSHA256":sha(mesh),"ownerGPUViewerCameraMoved":viewer["viewer"]["cameraActuallyMoved"],
  "publicLiveSeconds":live["actualObservedSeconds"],"liveNetworkExactBodies":live["originalBodyExactCount"],
  "liveCameraResourceDecodedBytes":cameras[0]["bytes"],"liveCSSAnimationCountInitial":sn[0]["metadata"]["cssWebAnimationsCount"],
  "liveCSSAnimationCountLater":sn[-1]["metadata"]["cssWebAnimationsCount"],
  "siteVendorCameraGLBRawNotPublished":True,
  "siteVendorCameraKeyframesNotPublished":True,
  "limit":"GLB camera animation is structurally validated; the live WebGL camera playback/easing/control mappings are NOT yet established. CSS animation counts are not WebGL keyframes."}}
out=D/"X34-INDEPENDENT-GLTF-CAMERA-GPU-VIEWER-LIVE90-X01-X33-ACCEPTANCE.json"
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("X34_QA",json.dumps({"status":result["status"],"passed":result["passed"],"total":result["total"],
 "failed":result["failed"],"originalCamera_SHA_matches_live":checks.get("X34_live_camera_sha_matches_private_historical"),
 "ownerViewer":viewer["status"],"siteLiveSec":live["actualObservedSeconds"]},ensure_ascii=False))
if result["status"]!="PASS":raise SystemExit(1)
