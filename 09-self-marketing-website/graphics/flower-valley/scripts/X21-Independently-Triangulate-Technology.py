#!/usr/bin/env python3
"""DJMRN X21: offline, read-only triangulation from previously observed, hashed public evidence.
Creates sanitized technology/factory matrix, independent acceptance, and a local handoff.
No external-site code is executed; no new network requests or paid dependencies.
"""
import json, pathlib, hashlib, struct, collections, math, re, datetime, os, sys

ROOT=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
DER=ROOT/"02-reviewed-derived"
OUT=DER/"X21-CURRENT"
OUT.mkdir(parents=True, exist_ok=True)
PRIV=ROOT/"01-private-captures"
def load(p):
    return json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
def sha(p):
    return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def canon(x):
    return x
now=datetime.datetime.now(datetime.timezone.utc).isoformat()

# Direct first-party / local evidence.
original_manifest=load(DER/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
modules=load(DER/"X19-CURRENT"/"X19-ALL-MODULES-PUBLIC-METADATA.json")
url_ledger=load(DER/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
scene_candidates=load(DER/"X19-CURRENT"/"X19-SCENE-STRUCTURAL-CANDIDATES.json")
fingerprints=load(DER/"X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-technology-timeline.json")
fp_details=load(DER/"X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-fingerprint-evidence.json")
live=load(OUT/"X21-LIVE-READONLY-TECH-AND-WEBGL-STATE.json")
x20=load(DER/"X20-CURRENT"/"X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json")
rsc=load(PRIV/"X20"/"wakaru"/"x20-work-route-rsc-decoded.json")
ast=load(DER/"X20-CURRENT"/"X20-AST-GREP-PUBLIC-SANITIZED-SEMANTIC-PATTERN-METADATA.json")

checks={}
def ck(name, val):
    checks[name]=bool(val)

# Every original X19 file must still have its declared SHA, independent of JSON metadata.
originals=[]
for item in original_manifest["items"]:
    f=ROOT/item["relative"]
    if not f.exists(): raise RuntimeError(f"Missing old original path: {item['url']}")
    originals.append({"url":item["url"],"sha256":item["sha256"],"verified":sha(f)==item["sha256"],"bytes":f.stat().st_size})
ck("all_34_original_js_sha_verified", len(originals)==34 and all(i["verified"] for i in originals))
ck("legacy_78_path_authority_retained", len(url_ledger["resources"])==78)
ck("prior_x20_34_acceptance_pass", x20["checks_passed"]==x20["checks_total"]==34)

origin_by_url={x["url"]:x for x in original_manifest["items"]}
def original_text_part(url_part):
    matches=[x for x in original_manifest["items"] if url_part in x["url"]]
    if len(matches)!=1: raise RuntimeError(f"ambiguous prior source {url_part}: {len(matches)}")
    item=matches[0]
    return item,(ROOT/item["relative"]).read_text(encoding="utf-8",errors="replace")
next_entry,next_source=original_text_part("/123-3b7f3df3cc5866d7.js")
ck("next_13_4_19_version_direct_original",bool(re.search(r'window\.next\s*=\s*\{\s*version\s*:\s*["\']13\.4\.19["\']\s*,\s*appDir\s*:',next_source)))

MOD_DIR=PRIV/"X19"/"full-verified-js-unpack"
target=[
 ("889","06-5f164d7403807a"),("9169","06-5f164d7403807a"),
 ("6375","00-80bf95efc81512"),("4863","03-f808e878ce520d"),
 ("4059","03-f808e878ce520d")
]
extract={}
for mid,folder in target:
    p=MOD_DIR/folder/"static"/(mid+".js")
    digest=sha(p)
    matches=[m for m in modules["modules"] if str(m["moduleId"])==mid and m["sha256"]==digest]
    extract[mid]={"url":matches[0]["url"] if len(matches)==1 else None,"sha256":digest,
                  "sha_verified":len(matches)==1,"bytes":p.stat().st_size,"text":p.read_text(encoding="utf-8",errors="replace")}
ck("five_scene_module_origins_sha_verified",all(x["sha_verified"] for x in extract.values()))
three=extract["6375"]["text"]
ck("three_internal_revision_154_in_verified_module",bool(re.search(r'window\.__THREE__\s*=\s*["\']154["\']',three)))
shader_counts={}
for mid in ("889","4059","6375"):
    s=extract[mid]["text"]
    shader_counts[mid]={name:len(re.findall(regex,s)) for name,regex in {
        "vertexShader_property":r'\bvertexShader\s*:',
        "fragmentShader_property":r'\bfragmentShader\s*:',
        "gl_Position":r'\bgl_Position\b',
        "gl_FragColor":r'\bgl_FragColor\b',
        "uniform_glsl_declarations":r'\buniform\s+(?:float|vec[234]|sampler2D|mat[234])\b',
        "bloom_literal":r'[Bb]loom',
        "instancing_support":r'InstancedMesh|InstancedBuffer|instanceMatrix'}.items()}
ck("custom_vertex_and_fragment_shader_blocks",shader_counts["4059"]["vertexShader_property"]>=3 and shader_counts["4059"]["fragmentShader_property"]>=3 and shader_counts["4059"]["gl_Position"]>=1 and shader_counts["4059"]["gl_FragColor"]>=1)
ck("three_engine_instancing_support",shader_counts["6375"]["instancing_support"]>=10)
ck("scene_effect_bloom_candidate",shader_counts["4059"]["bloom_literal"]>=5 and shader_counts["889"]["bloom_literal"]>=5)
ck("gltf_draco_loader_reference",bool(re.search(r'DRACOLoader',extract["889"]["text"])) and len(re.findall(r'draco',extract["4863"]["text"],re.I))>=10)

# Dynamic read-only state, no executable site bundle in Python.
snaps=live.get("snapshots",[])
home=[x for x in snaps if x.get("route")=="/"]
work=[x for x in snaps if x.get("route")=="/work"]
ck("five_usable_browser_checkpoints",len(home)==3 and len(work)==2 and not live.get("issues") and live.get("stopReason")=="ALL_FIVE_CHECKPOINTS_COMPLETED")
ck("all_home_three_revision_154",all(x["observation"]["htmlFrameworkMarkers"].get("threeInternalRevision")=="154" for x in home))
ck("all_five_next_version_13_4_19",all(x["observation"]["htmlFrameworkMarkers"].get("nextRuntimeVersion")=="13.4.19" and x["observation"]["htmlFrameworkMarkers"].get("nextRuntimeAppDir") for x in snaps))
ck("all_five_webpack_chunk_present",all(x["observation"]["htmlFrameworkMarkers"].get("webpackChunkNE") is True for x in snaps))
ck("home_three_webgl2_contexts",all(x["observation"]["webgl"]["status"]=="CONFIRMED_WEBGL2_CONTEXT" for x in home))
ck("home_glsl_es_3_context",all("GLSL ES 3.00" in x["observation"]["webgl"].get("glslVersion","") for x in home))
ck("work_no_sampled_canvas",all(x["observation"]["canvasCount"]==0 for x in work))
ck("home_canvas_1280_720",all(x["observation"]["webgl"]["drawingBuffer"]==[1280,720] for x in home))
ck("animation_count_changed_with_scroll",home[-1]["observation"]["animationCount"]>home[0]["observation"]["animationCount"])
ck("browser_ram_above_100mb",live["ramMinMiB"]>100 and live["elapsedSeconds"]<=60)
ck("home_next_rsc_present",all(x["observation"]["htmlFrameworkMarkers"]["nextRscPushArray"] for x in home))

# Verified X14 provenance, distinguish Wappalyzer fingerprint from direct browser proof.
named={r["name"]:r for r in fingerprints["detections"]}
for name in ("Next.js","Three.js","React","Webpack","Tailwind CSS","Vercel","Node.js","Module Federation"):
    ck("wappalyzer_reports_"+name.replace(" ","_").replace(".","_"),name in named)
ck("x14_three_version_154",str(named.get("Three.js",{}).get("version"))=="154")
ck("x14_next_version_13_4_19",str(named.get("Next.js",{}).get("version"))=="13.4.19")
head=[x for x in fp_details["headersByUrl"] if x["url"]=="https://www.gladeye.com/" and x["status"]==200]
ck("x14_vercel_and_next_header",bool(head) and any(x.get("allowHeaders",{}).get("server")=="Vercel" and x["allowHeaders"].get("x-powered-by")=="Next.js" for x in head))

# Actual glTF 2.0 JSON and typed binary animation accessor analysis. No source GLB bytes copied.
glb_candidates=list((PRIV/"X01-REDO").rglob("*.glb"))
ck("one_prior_gltf_camera_file",len(glb_candidates)==1)
glb=glb_candidates[0]
b=glb.read_bytes()
magic,version,size=struct.unpack_from("<4sII",b,0)
jlen,jtype=struct.unpack_from("<I4s",b,12)
doc=json.loads(b[20:20+jlen])
bin_offset=20+jlen
bin_offset+=(-bin_offset)%4
bin_len,bin_type=struct.unpack_from("<I4s",b,bin_offset)
raw=b[bin_offset+8:bin_offset+8+bin_len]
ck("glb_v2_valid_header",magic==b"glTF" and version==2 and size==len(b) and jtype==b"JSON" and bin_type==b"BIN\x00")
known_glb=next(r for r in url_ledger["resources"] if r["url"].endswith("/valley/camera-path07.glb"))
ck("gltf_body_matches_canonical_source",sha(glb)==known_glb["currentBodySHA256"])
generator=doc.get("asset",{}).get("generator")
ck("verified_blender_gltf_exporter",generator=="Khronos glTF Blender I/O v3.2.43")
ck("one_camera_one_animation",len(doc.get("cameras",[]))==1 and len(doc.get("animations",[]))==1 and len(doc.get("nodes",[]))==1)
format_map={5126:("f",4),5125:("I",4),5123:("H",2)}
comps={"SCALAR":1,"VEC2":2,"VEC3":3,"VEC4":4}
def data_accessor(index):
    a=doc["accessors"][index];v=doc["bufferViews"][a["bufferView"]]
    fmt,unit=format_map[a["componentType"]]
    cols=comps[a["type"]]
    off=v.get("byteOffset",0)+a.get("byteOffset",0)
    stride=v.get("byteStride",unit*cols)
    items=[struct.unpack_from("<"+fmt*cols,raw,off+i*stride) for i in range(a["count"])]
    return a,items
channels=[]
for ani in doc.get("animations",[]):
    for ch in ani["channels"]:
        s=ani["samplers"][ch["sampler"]]
        _,keyframes=data_accessor(s["input"])
        _,values=data_accessor(s["output"])
        channels.append({"target":ch["target"]["path"],"sampling":s.get("interpolation","LINEAR"),
           "keyframes":len(keyframes),
           "duration_sec":round(keyframes[-1][0]-keyframes[0][0],6),
           "output_range":{ "min":[round(min(a[k] for a in values),4) for k in range(len(values[0]))],
                            "max":[round(max(a[k] for a in values),4) for k in range(len(values[0]))] }})
ck("camera_three_linear_channels",sorted(x["target"] for x in channels)==["rotation","scale","translation"] and all(x["sampling"]=="LINEAR" for x in channels))
ck("camera_all_channels_200_frames",len(channels)==3 and all(x["keyframes"]==200 for x in channels))
ck("camera_timeline_8_29_seconds",all(8.29<x["duration_sec"]<8.30 for x in channels))
cam=doc["cameras"][0]["perspective"]
ck("camera_perspective_and_fov",doc["cameras"][0]["type"]=="perspective" and 0.39<cam["yfov"]<0.41)

# RSC work route cross-check vs prior corpus, preserve no authored source claims.
ck("rsc_work_24_rows_0_problems",len(rsc["rows"])==24 and len(rsc["problems"])==0)
ck("rsc_assets_and_scripts_28",len(rsc["assets"])==23 and len(rsc["scripts"])==5)
ck("x20_no_new_website_url_paths",x20["live"]["new_site_paths"]==0 and x20["live"]["initiator_edges_new_vs_x16"]==0)
ck("ast_patterns_8",len(ast["cases"])==8)
# 38+ independent checks expected; no hard-coded count.

# Per-claim matrix. A CONFIRMED claim is narrowly framed to exactly what was measured.
def claim(id,layer,value,status,observations,counterevidence,implication,scope):
    return {"id":id,"layer":layer,"technology_or_behavior":value,"status":status,
        "supporting_observations":observations,"limits_or_counterevidence":counterevidence,
        "rebuild_implication":implication,"scope":scope}

claims=[
claim("framework_next","frontend","Next.js 13.4.19 / App Router","CONFIRMED",
 ["X21 live window.next.version=13.4.19 and appDir=true in 5/5 samples",
  "X19 SHA-verified original /_next/static/chunks/123-...js embeds Next 13.4.19 appDir flag",
  "X14 HTTP header x-powered-by: Next.js and Wappalyzer independent fingerprint"],
 ["App Router/visible version says nothing about private build configuration or server deployment"],
 "Design an original Next.js/React page hierarchy, but pin dependencies only when implementation/testing needs the version.","public delivered frontend"),
claim("three_bundle","renderer-library","Three.js r154 delivered and present in home browser","CONFIRMED",
 ["X21 home window.__THREE__=154 in 3/3 samples","X19 SHA-verified module 6375 sets the 154 marker","X14 native Wappalyzer JS+DOM signal reports version 154"],
 ["Browser marker confirms library presence, not every GPU draw attributable to it"],
 "Three.js is the strongest verified implementation reference for an original scene.","public delivered client"),
claim("active_webgl2","renderer-context","Active WebGL 2.0 context on home Canvas","CONFIRMED",
 ["X21 same 3/3 home Canvas returned WebGL2 context, GLSL ES 3.00; 1280x720 drawingBuffer","X14 independent home WebGL2 observation"],
 ["GLSL ES 3.00 reports browser context shading language, not authored shader version","/work samples had no Canvas"],
 "Build WebGL2/Three scene with mobile fallback; reserve GPU pass analysis for X22.","live home view"),
claim("react_runtime","framework","React client dependency and RSC payload","CONFIRMED",
 ["X14 React signature and Next.js App Router","X20 Wakaru work RSC 24 rows 23 assets 5 scripts, 0 parser issues","X21 home next_f array and webpack chunk array seen live"],
 ["Exact React package version, custom component source and backend component boundaries not recovered"],
 "Implement original React components and responsive routes; do not infer server-component tree directly.","public frontend"),
claim("webpack","bundler","Webpack 5-style bundle/chunks","CONFIRMED",
 ["X20 Wakaru strict Webpack5 detected 22 original-page module IDs matching X19 webcrack","X21 webpackChunk_N_E global in 5/5 checks","X19 457 derived Webpack module files and static import index"],
 ["Does not establish Module Federation or exact build plugins/config"],
 "Bundler-specific output is evidence of shipping architecture, not reason to clone its config.","public built bundles"),
claim("shader_vertex_fragment","shader stages","Vertex and fragment GLSL source patterns present","CONFIRMED",
 ["X19 SHA-verified non-vendor-private author script modules 4059 contains GLSL vertex/fragment properties and position/color statements","Three runtime engine 6375 includes vertex/fragment shader templates"],
 ["No X22 framebuffer/call trace to show which exact shaders executed per pass"],
 "Use custom original shaders where needed; evaluate active shader programs with X22.","client-bundle static evidence"),
claim("bloom_effect","postprocessing","Bloom/ray-style postprocessing candidate in scene modules","PROBABLE",
 ["X19 scene modules 4059 and 889 both contain repeated bloom literals and shader/uniform code"],
 ["Could include library-provided effect implementations without proof of live use; X22 GPU pass evidence pending"],
 "Prototype an original bloom/glow pipeline, then tune against observed visuals and frame metrics.","inference based on delivered code"),
claim("gltf_draco","assets-loader","glTF/Draco loader infrastructure exists","CONFIRMED",
 ["X19 SHA-verified module 889 exposes DRACOLoader string and module 4863 multiple Draco tokens","X01 camera-path07.glb delivered and SHA-verified"],
 ["Camera GLB has no extensionsUsed field; not evidence that its contents are Draco-compressed"],
 "For scene rebuild, use glTF camera-path concepts and load Draco only if own models need it.","loader support, not active compression"),
claim("camera_gltf","authoring-asset","glTF 2.0 camera animation exported with Blender glTF I/O v3.2.43","CONFIRMED",
 ["The original 10132-byte X01 asset matches the canonical GLB SHA and asset.generator metadata",
  "One perspective camera, one glTF animation, translation/rotation/scale tracks each with 200 LINEAR keys over 8.291667 s"],
 ["Export addon version != installed Blender application version; no proof other artwork shared this pipeline",
  "Client runtime remapping/scroll synchronization of camera animation not directly observed"],
 "Use a separately authored camera path and approximate motion; retained metadata provides reproducible ranges.","one delivered GLB file"),
claim("instanced_renderer","renderer capability","Instancing support inside delivered Three.js engine","CONFIRMED",
 ["X19 module 6375 contains InstancedMesh/InstancedBuffer and instanceMatrix code"],
 ["No evidence yet that active flower meshes use a particular instancing strategy"],
 "Consider instanced meshes for mobile performance only after validating scene count.","engine capability; not proven active scene"),
claim("css_tailwind","styles","Tailwind CSS-like generated CSS","PROBABLE",
 ["X14 Wappalyzer native full CSS fingerprint matches Tailwind token family"],
 ["Token family can occur in copied CSS; exact Tailwind version and own design tokens not recovered"],
 "Original utility CSS is an optional implementation choice, not a requirement.","public CSS fingerprint"),
claim("animation_system","motion","DOM animation and client animation scheduling","CONFIRMED",
 ["X21 observed document.getAnimations() 7 -> 42 on home after scroll",
  "X19/X20 syntax evidence of requestAnimationFrame and setAnimationLoop in delivered client modules"],
 ["Exact authoring timeline, GSAP usage, scroll-camera coupling or per-frame GPU draw order unknown"],
 "Use one native RAF/render loop plus explicit route/scroll/pointer state; test against real behavior.","observable DOM activity + static client API"),
claim("hosting_headers","delivery","Vercel response header and Next.js powered-by header","CONFIRMED",
 ["X14 public first-party 200 main-page response: server Vercel and x-powered-by Next.js"],
 ["Header only confirms response path/edge characteristics; does not identify private infrastructure or compute origin"],
 "No Vercel account or deployment required to reproduce frontend locally.","HTTP delivery headers"),
claim("backend_runtime","backend","Actual server process/runtime/API implementation","UNKNOWN",
 ["Public Next.js frontend and x-powered-by response header"],
 ["Node.js detection is implied by Wappalyzer rule; Node/Edge functions, code, data stores, auth and secrets unseen"],
 "Do not create a server stack, DB or APIs based only on header fingerprints.","private backend out of scope"),
claim("react_version","frontend","Exact React package version","UNKNOWN",
 ["React framework signatures and existing Next App Router markup"],
 ["No direct reliable public React version value in inspected artifacts; a package inferred from Next isn't proof of deployment version"],
 "Choose supported React version for own site after tests; avoid guessed pin.","version provenance missing"),
claim("module_federation","bundler extension","Module Federation/microfrontend topology","UNKNOWN",
 ["X14 heuristic Module Federation pattern"],
 ["Generic Webpack data-webpack signatures can false-positive; no verified remote module manifests"],
 "Do not build microfrontends without a real use case.","unverified signal"),
claim("react_three_fiber","renderer orchestration","react-three/fiber or react-three/drei as a specific dependency","UNKNOWN",
 ["React and Three.js are both present in delivered frontend"],
 ["No authenticated dependency manifest/version or direct package identity established"],
 "Choose simplest Three integration based on own codebase and measured performance.","unsupported inference"),
claim("gsap_animation","animation framework","GSAP or another named authoring timeline engine","UNKNOWN",
 ["Pointer/wheel events and animation activity observed"],
 ["No directly verified GSAP global or named bundle package signature; bundled/minified aliases may hide it"],
 "Avoid unnecessarily installing GSAP until specific motion behavior requires it.","unsupported exact tool attribution"),
claim("authoring_app_version","3d authoring","Exact Blender desktop version or other DCC package","UNKNOWN",
 ["Camera file export generator says Khronos glTF Blender I/O v3.2.43"],
 ["Export plugin version cannot prove Blender application version or original production workflow"],
 "Use current free Blender if authoring new models later; no reason to install now for X21.","only one asset exporter known"),
claim("actual_gpu_passes","gpu pipeline","Precise active shader program, draw pass, FBO, blend and depth sequence","UNKNOWN",
 ["WebGL2 live context and shader templates available"],
 ["X21 does not capture GPU draw-call/program evidence; X22 Spector required"],
 "Perform first-party-owner synthetic GPU fixture validation then bounded public frame capture in X22.","explicit next-stage boundary")
]

# Output sanitized public-safe facts. Never include raw JS, full site DOM or decoded RSC.
profile={
 "stage":"X21","generated_utc":now,"status":"COMPLETE_SCOPE_QUALIFIED" if all(checks.values()) else "PARTIAL",
 "scope":"client framework, WebGL renderer, shader families, animation system, bundler, route/component architecture, exported asset authoring, hosting-vs-backend distinction",
 "tool_readiness":{
   "new_install_required":False,"new_tool_installed":False,"new_permission_granted":False,"new_paid_usage":False,
   "existing":{"HTTPArchive_Wappalyzer":"GPL-3.0 fork pinned 35b0847c01c118055c42596d5c6d01f60f15d706",
     "Chromium":"Chrome for Testing 157","Puppeteer":"25.16.0","REA":"6.9.0","Wakaru":"1.17.0",
     "ast-grep":"0.51.3","webcrack":"2.16.0"},
   "roles":{"Wappalyzer":"heuristic independent technology fingerprints",
     "Chrome_CDPRuntime":"read-only live public page state",
     "X19_original_source_and_GLB":"SHA authority for previously downloaded public bodies",
     "REA_astgrep_Wakaru":"offline semantic/matcher/decompiler observer, not authority",
     "X14_X20":"cross-stage provenance"},
   "settings":{"chrome_profile":"isolated ephemeral anonymous","gpu":"enabled","extensions":"disabled",
     "tls_validation":"enabled","physical_ram_emergency_mib":100,"max_parallel_browsers":1,
     "new_MCP_registration":"disabled","vendor_JS_import_execution":"disabled","credentials":"none"} },
 "source_provenance":{
    "canonical_url_paths":78,"original_X19_JS_SHA_verified":sum(x["verified"] for x in originals),
    "X19_original_JS_count":len(originals),"scene_module_sha_verified":sum(x["sha_verified"] for x in extract.values()),
    "blender_camera_glb_sha256":sha(glb),
    "blender_camera_glb_url":"https://www.gladeye.com/valley/camera-path07.glb",
    "next_original_js_url":next_entry["url"],"next_original_js_sha256":next_entry["sha256"],
    "three_module_source_url":extract["6375"]["url"],"three_module_sha256":extract["6375"]["sha256"],
    "camera_glb":{"generator":generator,"gltf_version":doc["asset"]["version"],"bytes":len(b),
      "camera_count":len(doc.get("cameras",[])),"animations":len(doc.get("animations",[])),
      "camera_perspective":{"vertical_fov_radians":round(cam["yfov"],8),"vertical_fov_degrees":round(math.degrees(cam["yfov"]),5),
       "aspect_ratio":cam.get("aspectRatio"),"z_near":cam["znear"],"z_far":cam["zfar"]},
      "channels":channels,"extensionsUsed":doc.get("extensionsUsed",[])},
    "shader_pattern_counts_per_module":shader_counts},
 "runtime":{"checkpoints":len(snaps),"home_webgl2_checkpoints":len(home),"work_no_canvas_checkpoints":sum(x["observation"]["canvasCount"]==0 for x in work),
   "glsl_context_version":home[0]["observation"]["webgl"]["glslVersion"] if home else None,
   "three_version_home":[x["observation"]["htmlFrameworkMarkers"].get("threeInternalRevision") for x in home],
   "next_version":[x["observation"]["htmlFrameworkMarkers"].get("nextRuntimeVersion") for x in snaps],
   "max_browser_elapsed_sec":live["elapsedSeconds"],"minimum_free_ram_mib":live["ramMinMiB"],"browser_cleaned":live["stopReason"]=="ALL_FIVE_CHECKPOINTS_COMPLETED"},
 "claims":claims,"counts_by_status":dict(collections.Counter(x["status"] for x in claims)),
 "tests":{"checks":checks,"passed":sum(checks.values()),"total":len(checks)},
 "next_stage":"X22 Spector.js GPU program/pass/texture metadata, subject to separate fixture validation",
 "limitations":["X21 does not extract server source or recover proprietary authoring repository",
 "Live WebGL2 GLSL version is the current rendering context's capability, not per-program shader provenance",
 "Blender exporter version belongs to one GLB, not the desktop application's exact version",
 "The 78-path original X01-X19 authority is unchanged. No claim that all assets or original source recovered.",
 "No inferred semantic or technology label is considered an additional original site file."]
}
mat=OUT/"X21-TECHNOLOGY-AND-FACTORY-EVIDENCE-MATRIX.json"
mat.write_text(json.dumps(profile,ensure_ascii=False,indent=2),encoding="utf-8")
accept={
  "stage":"X21","status":profile["status"],"generated_utc":now,"pass":sum(checks.values()),"total":len(checks),
  "checks":checks,"confidence_claim_counts":profile["counts_by_status"],
  "raw_source_files_published":False,"new_laptop_software_installed":False,
  "material_unknowns":[x["id"] for x in claims if x["status"]=="UNKNOWN"],
  "source_evidence_sha256":{"X21_live":sha(OUT/"X21-LIVE-READONLY-TECH-AND-WEBGL-STATE.json"),
    "X14_fingerprint":sha(DER/"X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-fingerprint-evidence.json"),
    "X19_manifest":sha(DER/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json"),
    "X20_acceptance":sha(DER/"X20-CURRENT"/"X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json"),
    "X21_matrix":sha(mat)}
}
out=OUT/"X21-INDEPENDENT-ACCEPTANCE.json"
out.write_text(json.dumps(accept,ensure_ascii=False,indent=2),encoding="utf-8")
print("X21_STATUS",profile["status"],"ACCEPT",accept["pass"],"/",accept["total"],"CLASS_COUNTS",profile["counts_by_status"])
print("X21_GLTF",json.dumps(profile["source_provenance"]["camera_glb"],ensure_ascii=False)[:1050])
print("X21_MAT",mat,"X21_ACCEPTANCE",out)
if profile["status"]!="COMPLETE_SCOPE_QUALIFIED":print("FAILURES",[k for k,v in checks.items() if not v])
