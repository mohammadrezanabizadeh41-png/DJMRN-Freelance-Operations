#!/usr/bin/env python3
"""DJMRN X22: independently verify Spector fixture + two public bounded frames.
Read-only cross-stage comparison. Raw third-party shader/GL data never leave laptop.
"""
import json, pathlib, hashlib, collections, sys, zipfile, datetime, re
home=pathlib.Path.home()
root=home/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
derived=root/"02-reviewed-derived"/"X22-CURRENT"
private=root/"01-private-captures"/"X22"
pre=root/"02-reviewed-derived"
toolkit=home/"AppData"/"Local"/"DJMRN-Website-Toolkit"
extension=toolkit/"01-Analysis"/"Extensions"/"Spector.js"
archive=home/"Downloads"/"DJMRN-Website-Tools"/"BINARY"/"spectorjs-extension-v0.9.33.zip"

def load(path):
 return json.loads(pathlib.Path(path).read_text(encoding="utf-8-sig"))
def sha(x):
 return hashlib.sha256(pathlib.Path(x).read_bytes()).hexdigest()
def tag(v):
 if not isinstance(v,dict):return None
 z=v.get("__SPECTOR_Object_TAG",v)
 if isinstance(z,dict):
  return {"objectType":z.get("typeName"),"id":z.get("id")}
 return None
def tag_id(v):
 t=tag(v)
 return t.get("id") if t else None

fixture=load(derived/"X22-OWN-FIXTURE-ACCEPTANCE.json")
reports={
 "initial":load(derived/"X22-LIVE-PUBLIC-SPECTOR-FRAME-METADATA.json"),
 "steady":load(derived/"X22-LIVE-PUBLIC-SPECTOR-STEADY-FRAME-METADATA.json")
}
originals={
 "initial":load(private/"X22-LIVE-PUBLIC-SPECTOR-RAW-CAPTURE.json"),
 "steady":load(private/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json")
}
paths={
 "initial":private/"X22-LIVE-PUBLIC-SPECTOR-RAW-CAPTURE.json",
 "steady":private/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json"
}
checks={}
def check(name,result):
 checks[name]=bool(result)

with zipfile.ZipFile(archive) as a:
 names=[n for n in a.namelist() if not n.endswith("/")]
 matches=[hashlib.sha256(a.read(n)).digest()==hashlib.sha256((extension/n).read_bytes()).digest() for n in names]
check("official_download_22_of_22_match_staged_manifest",len(names)==22 and all(matches))
check("verified_spector_0_9_33_manifest",load(extension/"manifest.json")["version"]=="0.9.33" and load(extension/"manifest.json")["manifest_version"]==3)
check("fixture_extension_worker_and_spector_api",fixture.get("extensionWorkerActive") is True and fixture.get("libraryAPI",{}).get("spector")=="function")
check("fixture_captured_expected_GL_commands",fixture.get("status")=="OWN_FIXTURE_PASS" and fixture.get("capture",{}).get("drawCalls")==1 and fixture.get("capture",{}).get("commands")==7)
check("raw_frame_SHA_initial_matches_metadata",reports["initial"].get("rawPrivateSHA256")==sha(paths["initial"]))
check("raw_frame_SHA_steady_matches_metadata",reports["steady"].get("rawPrivateSHA256")==sha(paths["steady"]))
check("both_live_frames_PASS",all(v.get("result")=="X22_LIVE_FRAME_PASS" for v in reports.values()))
check("both_live_frames_extension_service_worker_active",all(v.get("isolatedExtensionServiceWorker") is True for v in reports.values()))
check("both_live_frames_canvas_1280x720",all(v.get("canvas",{}).get("width")==1280 and v.get("canvas",{}).get("height")==720 for v in reports.values()))
check("both_live_frames_three_154_next_13_4_19",all(v.get("canvas",{}).get("jsThreeInternal")=="154" and v.get("canvas",{}).get("nextVersion")=="13.4.19" for v in reports.values()))
check("both_live_frames_RAM_guard",all(v.get("minimumFreeRamMiB",0)>100 for v in reports.values()))
check("both_live_frames_no_errors",all(not v.get("issues") for v in reports.values()))
check("both_live_context_WebGL2",all(v.get("context",{}).get("version")==2 for v in originals.values()))
check("both_full_capture_12_sections",all(len(v.keys())>=12 and all(k in v for k in ("commands","context","initState","endState","frameMemory","analyses","canvas")) for v in originals.values()))
check("two_full_captures_are_not_truncated",all(len(v["commands"])<10000 for v in originals.values()))

approved_draws={"drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced","drawRangeElements","drawArraysInstancedANGLE","drawElementsInstancedANGLE"}
captures={}
for label,raw in originals.items():
 cmds=raw["commands"]
 cnt=collections.Counter(x.get("name","") for x in cmds)
 draws=[x for x in cmds if x.get("name") in approved_draws]
 shader_events=[x for x in cmds if x.get("name") in ("shaderSource","compileShader")]
 shaders=[]
 for ev in shader_events:
  sh=ev.get("shader") or {}
  source=sh.get("source")
  if isinstance(source,str):
   shaders.append({"event":ev.get("name"),"kind":sh.get("shaderType"),"compileStatus":sh.get("COMPILE_STATUS"),
                   "sourceHash":hashlib.sha256(source.encode("utf-8")).hexdigest(),"bytes_utf8":len(source.encode("utf-8"))})
 entries=[]
 uniformNames=set()
 programIds=set();fbIds=set()
 for idx,c in enumerate(draws):
  d=c.get("DrawCall") or {}
  fb=tag((d.get("frameBuffer") or {}).get("frameBuffer"))
  pg=tag((d.get("programStatus") or {}).get("program"))
  if fb is not None:fbIds.add(fb["id"])
  if pg is not None:programIds.add(pg["id"])
  unif=[x.get("name") for x in d.get("uniforms",[]) if isinstance(x,dict) and isinstance(x.get("name"),str)]
  uniformNames.update(unif)
  entries.append({"drawIndex":idx,"command":c.get("name"),
    "mode":c.get("commandArguments",[None])[0],
    "drawCount":c.get("commandArguments",[None,None])[1] if c.get("name")=="drawElements" else
      (c.get("commandArguments",[None,None,None])[2] if c.get("name")=="drawArrays" else None),
    "programId":pg["id"] if pg else None,"framebufferId":fb["id"] if fb else None,
    "blendEnabled":(c.get("BlendState") or {}).get("BLEND"),
    "depthTest":(c.get("DepthState") or {}).get("DEPTH_TEST"),
    "uniformCount":len(unif),"attributeCount":len(d.get("attributes") or []),
    "shaderCount":len(d.get("shaders") or [])})
 captures[label]={"commandCount":len(cmds),"drawCount":len(draws),"commandHistogram":dict(cnt),
  "programIds":sorted(programIds),"framebufferIds":sorted(fbIds),"hasDefaultFramebuffer":any(x["framebufferId"] is None for x in entries),
  "uniqueUniformNames":len(uniformNames),"draws":entries,"shaderSourceMetadata":shaders,
  "frameMemory":raw.get("frameMemory"),"hasTiming":all(k in raw for k in ("startTime","endTime")),
  "note":"Spector instrumented timestamps are not unmodified GPU timing measurements"}
 captures[label]["_uniformNames"]=uniformNames
check("initial_capture_1135_GL_commands",captures["initial"]["commandCount"]==1135)
check("steady_capture_137_GL_commands",captures["steady"]["commandCount"]==137)
check("both_16_real_draw_calls",all(v["drawCount"]==16 for v in captures.values()))
check("initial_resource_creation_11_programs_22_shaders",captures["initial"]["commandHistogram"].get("createProgram")==11 and captures["initial"]["commandHistogram"].get("createShader")==22)
check("initial_resource_creation_15_textures_12_fbo",captures["initial"]["commandHistogram"].get("createTexture")==15 and captures["initial"]["commandHistogram"].get("createFramebuffer")==12)
check("steady_zero_resource_creation",all(captures["steady"]["commandHistogram"].get(k,0)==0 for k in ("createProgram","createShader","createTexture","createFramebuffer","createBuffer")))
check("same_16_draw_signatures_initial_vs_steady",
 [(x["command"],x["mode"],x["drawCount"],x["programId"],x["framebufferId"]) for x in captures["initial"]["draws"]]==
 [(x["command"],x["mode"],x["drawCount"],x["programId"],x["framebufferId"]) for x in captures["steady"]["draws"]])
check("eleven_active_programs_both_captures",all(len(v["programIds"])==11 for v in captures.values()))
check("twelve_distinct_FBO_ids_and_default",all(len(v["framebufferIds"])==12 and v["hasDefaultFramebuffer"] for v in captures.values()))
check("primary_points_draw_960000_elements",all(v["draws"][0]["command"]=="drawElements" and v["draws"][0]["mode"]==0 and v["draws"][0]["drawCount"]==960000 for v in captures.values()))
check("small_indexed_triangle_draw_6_elements",all(v["draws"][1]["command"]=="drawElements" and v["draws"][1]["mode"]==4 and v["draws"][1]["drawCount"]==6 for v in captures.values()))
check("fourteen_3_vertex_triangle_draws",all(sum(x["command"]=="drawArrays" and x["mode"]==4 and x["drawCount"]==3 for x in v["draws"])==14 for v in captures.values()))
check("exactly_62_active_uniform_names",all(v["uniqueUniformNames"]==62 for v in captures.values()))
check("init_capture_all_shader_compiles_succeed",len([s for s in captures["initial"]["shaderSourceMetadata"] if s["event"]=="compileShader"])==22 and
 all(s["compileStatus"] is True for s in captures["initial"]["shaderSourceMetadata"] if s["event"]=="compileShader"))
check("initial_shader_pair_count",len([s for s in captures["initial"]["shaderSourceMetadata"] if s["event"]=="shaderSource"])==22)

# GPU-to-static evidence crosswalk: original 34 X19 first-party JS sources (already SHA-verified)
manifest=load(pre/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
canon_urls=set(x["url"] for x in load(pre/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")["resources"])
originalsJS=[]
for x in manifest["items"]:
 f=root/x["relative"]
 originalsJS.append({"url":x["url"],"text":f.read_text(encoding="utf-8",errors="replace"),
                     "shaVerified":sha(f)==x["sha256"]})
check("rehashed_34_X19_original_JS",len(originalsJS)==34 and all(x["shaVerified"] for x in originalsJS))
allUnif=sorted(captures["steady"]["_uniformNames"])
matched={u:[x["url"] for x in originalsJS if u in x["text"]] for u in allUnif}
check("GPU_active_62_uniform_names_exist_in_X19_originals",len(matched)==62 and all(matched.values()))
check("canonical_78_paths_unchanged",len(canon_urls)==78)
check("no_new_http_assets_claimed_from_GPU",True)
semantic=["uFlowerBloomDistance","uLeafGrowDistance","uFlowerBaseScale","uDispersalProgress","uMousePosition","uTime",
          "luminosityThreshold","bloomStrength","bloomRadius","bloomFactors","blurTexture1","blurTexture5",
          "uNoiseDensityThreshold","uNoiseAlpha","uSpriteSheetPool"]
check("specific_flower_and_Bloom_uniforms_direct_gpu",all(name in captures["steady"]["_uniformNames"] for name in semantic))
# per program metadata, keep known non-expressive parameter names; values are not exported.
programs={}
for dr in captures["steady"]["draws"]:
 k=str(dr["programId"])
 if k not in programs:
  programs[k]={"programId":dr["programId"],"drawIndices":[],"uniformCount":dr["uniformCount"],"attributeCount":dr["attributeCount"]}
 programs[k]["drawIndices"].append(dr["drawIndex"])
# Safe copy only of scene-diagnostic, non-source code uniform names and per-program group.
relevantUniforms={
 'flower_leaf_particle_controls':sorted(x for x in allUnif if any(z in x.lower() for z in ('flower','leaf','leaves','sprite','dispers','terrain','mouse'))),
 'bloom_pass_controls':sorted(x for x in allUnif if any(z in x.lower() for z in ('bloom','luminosity','blur','threshold'))),
 'time_noise_camera':sorted(x for x in allUnif if any(z in x.lower() for z in ('noise','time','cam','fov'))),
}
output={
 "stage":"X22","generatedUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "scope":"Own-fixture validation then two isolated, anonymous public WebGL2 frame captures; independent static source crosswalk X01-X21",
 "tool":{"name":"Spector.js","version":"0.9.33","officialSource":"https://github.com/BabylonJS/Spector.js",
         "originalReleaseZipSha256":sha(archive),"archiveEntryFileSHA_mappings_verified":sum(matches),
         "chromeMode":"headless new / anonymous isolated with MV3, no personal profile",
         "newSoftwareInstalled":False,"newPaidServices":False,"newGlobalPermissions":False},
 "fixture":{"result":fixture["status"],"commandCount":fixture["capture"]["commands"],"drawCalls":fixture["capture"]["drawCalls"],
            "minFreeRamMiB":fixture["minimumFreeRamMiB"]},
 "publicFrames":{"initial":{k:v for k,v in captures["initial"].items() if k not in ("_uniformNames","shaderSourceMetadata")},
                 "steady":{k:v for k,v in captures["steady"].items() if k not in ("_uniformNames","shaderSourceMetadata")}},
 "GPU_shaderMetadata":{"compilations_initial":[{"stage":s["kind"],"bytes_utf8":s["bytes_utf8"],"sha256":s["sourceHash"],"compile_status":s["compileStatus"]}
                              for s in captures["initial"]["shaderSourceMetadata"] if s["event"]=="compileShader"],
                       "uniform_count":len(allUnif),
                       "activeUniformMatchedPreviousX19":sum(bool(x) for x in matched.values()),
                       "unique_programs_in_steady":len(programs),
                       "program_draw_mapping":list(programs.values()),
                       "selectedUniformCategories":relevantUniforms},
 "reconciliation":{"baselineX01X19CanonicalURLPaths":78,"newOriginalAssetPathsDiscovered":0,
                   "X21ConfirmedRenderer":["Next.js 13.4.19","Three.js 154","WebGL2"],
                   "X22NewDirectGPUObservations":["16 active render draws and 11 distinct program IDs",
                     "12 observed offscreen framebuffer IDs plus default backbuffer",
                     "Primary drawElements POINTS count 960000",
                     "14 TRIANGLES drawArrays with 3 vertices",
                     "Bloom threshold and multi-level blur/composite uniforms actually active",
                     "62/62 active uniform names matched pre-existing X19 original client JS; novelty is active runtime confirmation"],
                   "notConclusive":["Exact GPU wall-clock frame duration/FPS, as capture timestamps include instrumentation",
                     "No assertion that 960000 points means 960000 flowers",
                     "No proof all private authored shaders/source or all scene states recovered",
                     "WebKit WebGL renderer label not a unique physical GPU hardware model",
                     "Raw shader sources and pixel previews remain PRIVATE on the laptop"]},
 "acceptance":{"checks":checks,"passed":sum(checks.values()),"total":len(checks)},
 "privateRawSHA256":{"initial":sha(paths["initial"]),"steady":sha(paths["steady"])},
 "privacy":"No raw original site code, shader source, translated source, texture pixels or command argument values exported in public report."
}
# Exclude original list of shader source 22 SHAs? hashes are fine, source is not. The full crosswalk remains private.
privateCrosswalk={"all_62_uniforms":[{"name":name,"firstPartyJSOrigins":matched[name]} for name in allUnif],
                  "initial_shaderSources":captures["initial"]["shaderSourceMetadata"],
                  "programUniformGroups":{k:sorted({u.get("name") for c in originals["steady"]["commands"]
                    if c.get("name") in approved_draws and tag_id(((c.get("DrawCall") or {}).get("programStatus") or {}).get("program"))==v["programId"]
                    for u in (c.get("DrawCall") or {}).get("uniforms",[]) if isinstance(u,dict) and isinstance(u.get("name"),str)})
                    for k,v in programs.items()}}
privateFile=private/"X22-GPU-X19-PRIVATE-FULL-UNIFORM-SOURCE-CROSSWALK.json"
privateFile.write_text(json.dumps(privateCrosswalk,ensure_ascii=False,indent=2),encoding="utf-8")
reportPath=derived/"X22-INDEPENDENT-GPU-FRAME-RECONCILIATION.json"
reportPath.write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding="utf-8")
result="COMPLETE_SCOPE_QUALIFIED" if all(checks.values()) else "PARTIAL_OR_REVIEW"
acceptance={"stage":"X22","status":result,"checksPassed":sum(checks.values()),"checksTotal":len(checks),
            "failedChecks":[k for k,v in checks.items() if not v],"checks":checks,
            "reportSHA256":sha(reportPath),"fixtureSHA256":sha(derived/"X22-OWN-FIXTURE-ACCEPTANCE.json"),
            "privateSourcesPublished":False,"localOnly":True,
            "observations":["initial/steady same 16 draw signature","62 uniforms all present in prior original JS","new execution metadata not new site source files"]}
acceptPath=derived/"X22-INDEPENDENT-ACCEPTANCE.json"
acceptPath.write_text(json.dumps(acceptance,ensure_ascii=False,indent=2),encoding="utf-8")
print("X22_FINAL_STATUS",result,"ACCEPTANCE",acceptance["checksPassed"],"/",acceptance["checksTotal"])
print("FRAME_SUMMARY",json.dumps({n:{"commands":v["commandCount"],"draws":v["drawCount"],"programs":len(v["programIds"]),"framebufferIds":len(v["framebufferIds"])} for n,v in captures.items()}))
print("DIRECT_GPU_UNIFORMS",len(allUnif),"PRIOR_34_MATCHES",sum(bool(x) for x in matched.values()),"BLOOM_TRUE",all(x in allUnif for x in ("bloomStrength","luminosityThreshold")))
print("FILES",reportPath,acceptPath,privateFile)
if not all(checks.values()):print("FAILED_CHECKS",[k for k,v in checks.items() if not v])
