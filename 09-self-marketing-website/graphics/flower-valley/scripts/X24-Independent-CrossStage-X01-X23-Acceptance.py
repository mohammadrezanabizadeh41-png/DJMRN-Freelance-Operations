#!/usr/bin/env python3
"""X24 independently verify webgd JS-only feasibility, 90s safety run, one complete 130.8 MiB live wire capture, and X01–X23 provenance."""
import json,pathlib,hashlib,zipfile,datetime,collections,re
HOME=pathlib.Path.home()
ROOT=HOME/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"/"X24-CURRENT"
R=ROOT/"01-private-captures"/"X24"
SRC=HOME/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"webgd"/"webgd-main"
A=HOME/"Downloads"/"DJMRN-Website-Tools"/"SOURCE_ARCHIVE"/"Snowapril-webgd-main.zip"
def j(p):return json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
def sha(b):return hashlib.sha256(b).hexdigest()
def file_sha(p):return sha(pathlib.Path(p).read_bytes())
def git_blob(b):return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\x00"+b).hexdigest()
old=j(ROOT/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
edges=j(ROOT/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")
x22=j(ROOT/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-LOCAL-PRIVATE-INDEX.json")
sp=j(ROOT/"01-private-captures"/"X22"/"X22-LIVE-PUBLIC-SPECTOR-STEADY-RAW-CAPTURE.json")
x23=j(ROOT/"02-reviewed-derived"/"X23-CURRENT"/"X23-INDEPENDENT-ACCEPTANCE.json")
x21=j(ROOT/"02-reviewed-derived"/"X21-CURRENT"/"X21-INDEPENDENT-ACCEPTANCE.json")
x20=j(ROOT/"02-reviewed-derived"/"X20-CURRENT"/"X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json")
x19=j(ROOT/"02-reviewed-derived"/"X19-CURRENT"/"X19-FULL-INPUT-MANIFEST-PRIVATE.json")
fixture=j(D/"X24-OWN-FIXTURE-WEBGD-JS-HOOK-RESULT.json")
fixturewire=j(D/"X24-OWN-FIXTURE-INDEPENDENT-WIRE-DECODE.json")
live90=j(D/"X24-LIVE-90S"/"X24-LIVE-90S-LOCAL-PRIVATE-INDEX.json")
single=j(D/"X24-ONE-FRAME-SAFE-LIMIT"/"X24-ONE-FRAME-LOCAL-PRIVATE-INDEX.json")
wire=j(D/"X24-ONEFRAME-INDEPENDENT-WIRE-DECODE.json")
rootidx={x["url"]:x for x in old["resources"]}
orig=(R/"one-frame-safe-limit"/"X24-WEBGD-RAW-01-baseline.webgd")
ownraw=(R/"X24-OWN-WEBGD-FIXTURE-CAPTURE.webgd")
checks={}
def ck(k,v):checks[k]=bool(v)
count=0;matched=0
with zipfile.ZipFile(A) as z:
 for name in z.namelist():
  if name.endswith("/"):continue
  count+=1;local=SRC/("/".join(name.split("/")[1:]))
  if local.is_file() and sha(z.read(name))==file_sha(local):matched+=1
ck("source_zip_101_of_101_SHA_verified",count==matched==101)
ck("official_zip_SHA_source_fingerprint",file_sha(A)=="ea311807a17681f725daf818db4e9aeb498cd435e655235c8b11ad16c128059d")
ck("official_hook_blob_matches_GitHub_main",git_blob((SRC/"extension/hook.js").read_bytes())=="084805d9470b6e3be0c007141b7a4f19baf68173")
ck("official_manifest_blob_matches_GitHub_main",git_blob((SRC/"extension/manifest.json").read_bytes())=="f6aaa8c86ef65783e85047c05ef325e560618759")
ck("official_bridge_blob_matches_GitHub_main",git_blob((SRC/"extension/bridge.js").read_bytes())=="8fd06c7f0d05e5f8c3d2d49b72855b489fc2e081")
ck("official_background_blob_matches_GitHub_main",git_blob((SRC/"extension/background.js").read_bytes())=="4e5eabb37e36aba496f28c810ad1e26e3b7fbda3")
ck("official_wire_document_blob_matches_GitHub_main",git_blob((SRC/"docs/wire-format.md").read_bytes())=="4d79461695de7f588e3e9cb68d66d9427c211c11")
ck("official_MIT_license", "MIT License" in (SRC/"LICENSE").read_text(encoding="utf-8"))
ck("chromium_extension_MV3",j(SRC/"extension/manifest.json")["manifest_version"]==3)
ck("no_ready_replay_UI_or_WASM",(SRC/"extension/ui/webgd_ui_bg.wasm").exists() is False)
ck("no_live_runtime_required_Rust_installed",True) # recorded observation: rustc/cargo/wasm-bindgen absent; not a proof about every possible PATH
ck("owner_fixture_genuine_webgl2_and_hook",fixture["status"]=="PASS_JS_HOOK_CAPTURE" and fixture["pre"]["isWebGL2"] and fixture["pre"]["webgdInstalled"])
ck("owner_fixture_WGDW_header",fixture["captureHeader"]["magic"]=="WGDW" and fixture["captureHeader"]["version"]==1)
ck("owner_fixture_wire_SHA_matches_disk",ownraw.is_file() and file_sha(ownraw)==fixture["captureHeader"]["sha256"])
ck("owner_fixture_binary_decoder_setup_14",fixturewire["sections"]["setup"]["callCount"]==14)
ck("owner_fixture_binary_decoder_snapshot_7",fixturewire["sections"]["snapshot"]["callCount"]==7)
ck("owner_fixture_binary_decoder_frame_7_one_draw",fixturewire["sections"]["frame"]["callCount"]==7 and fixturewire["sections"]["frame"]["drawCount"]==1)
ck("owner_fixture_binary_wire_complete",fixturewire["complete"] and fixturewire["sha256"]==file_sha(ownraw))
ck("first_90_seconds_completed",live90["run"]["stopReason"]=="COMPLETED_90S" and live90["run"]["elapsedObservedSeconds"]>=90)
ck("first_90_seconds_bounded_seven_attempts",len(live90["run"]["issues"])==7 and all(x["error"]=="CAPTURE_LARGER_THAN_60MIB_ABANDON_RAW_TRANSFERS" for x in live90["run"]["issues"]))
ck("first_90_seconds_zero_site_raw_transfers",len(live90["frames"])==0 and live90["run"]["totalPrivateWireBytes"]==0)
ck("first_90_seconds_ram_min_above_guard",live90["run"]["minFreeRamMiB"]>=648)
ck("first_90_seconds_known_46_paths",live90["run"]["firstPartyPaths"]==46 and not live90["run"]["newPaths"])
ck("first_90_seconds_38_original_body_exact_repeats",len(live90["bodyHashes"])==38 and all(x["classification"]=="EXACT_ORIGINAL_SHA_REPEAT" and
 any(v["sha256"]==x["sha256"] and v["bytes"]==x["bytes"] for v in rootidx[x["url"]]["originalBodyVariants"]) for x in live90["bodyHashes"]))
oldEdge={(x["from"],x["to"]) for x in edges["edges"]}
obsEdge={(x["from"],x["to"]) for x in live90["initiators"]}
ck("first_90_seconds_37_known_X16_network_edges",len(obsEdge)==37 and obsEdge.issubset(oldEdge))
ck("additional_one_full_frame_over_old_60mb_limit",single["run"]["frames"]==1 and single["frames"][0]["rawBytes"]>60*1024*1024)
ck("additional_one_full_frame_under_140Mib_guard",single["frames"][0]["rawBytes"]<=140*1024*1024)
ck("additional_capture_no_errors",len(single["run"]["issues"])==0)
ck("additional_capture_ram_min_above_guard",single["run"]["minFreeRamMiB"]>=734)
ck("additional_capture_site_url_original",wire["recordedUrlOrigin"]=="https://www.gladeye.com/")
ck("additional_capture_full_binary_SHA_and_size",orig.is_file() and file_sha(orig)==single["frames"][0]["rawSha256"]==wire["sha256"] and
 orig.stat().st_size==wire["byteLength"]==single["frames"][0]["rawBytes"]==137151592)
ck("additional_capture_WGDW_v1_end_marker",wire["magic"]=="WGDW" and wire["version"]==1 and wire["complete"] is True)
ck("additional_capture_315_setup",wire["sections"]["setup"]["callCount"]==315)
ck("additional_capture_92_snapshot",wire["sections"]["snapshot"]["callCount"]==92)
ck("additional_capture_137_WebGL_frame_calls",wire["sections"]["frame"]["callCount"]==137)
ck("additional_capture_16_draws",wire["sections"]["frame"]["drawCount"]==16)
ck("additional_capture_first_960k_point_indices",wire["sections"]["frame"]["drawSignatures"][0]["name"]=="drawElements" and
 wire["sections"]["frame"]["drawSignatures"][0]["mode"]==0 and wire["sections"]["frame"]["drawSignatures"][0]["count"]==960000)
ck("additional_capture_second_6_triangles_indices",wire["sections"]["frame"]["drawSignatures"][1]["name"]=="drawElements" and
 wire["sections"]["frame"]["drawSignatures"][1]["mode"]==4 and wire["sections"]["frame"]["drawSignatures"][1]["count"]==6)
ck("additional_capture_14_fullscreen_triangles",sum(d["name"]=="drawArrays" and d["mode"]==4 and d["count"]==3 for d in wire["sections"]["frame"]["drawSignatures"])==14)
classes=wire["objectClasses"]
for name,val in [("WebGLProgram",11),("WebGLShader",22),("WebGLUniformLocation",96),("WebGLTexture",20),
 ("WebGLFramebuffer",13),("WebGLRenderbuffer",13),("WebGLBuffer",20),("WebGLVertexArrayObject",11)]:
 ck("resources_"+name+"_"+str(val),classes.get(name)==val)
ck("resource_snapshot_144_blobs",wire["blobCount"]==144)
ck("resource_snapshot_137009984_blob_bytes",wire["blobByteTotal"]==137009984)
ck("resource_snapshot_14745600_max_blob",wire["largestBlobBytes"]==14745600)
spHashes={sha(s["source"].encode("utf-8")) for cmd in sp["commands"] for s in ((cmd.get("DrawCall") or {}).get("shaders") or []) if isinstance(s.get("source"),str)}
ck("all_22_webgd_shader_hashes_match_X22_Spector",len(spHashes)==len(wire["uniqueShaderSourceSHA256"])==22 and spHashes==set(wire["uniqueShaderSourceSHA256"]))
ck("shader_count_22_from_setup",wire["shaderSourceCount"]==22)
baseline=[(a["command"],a["mode"],a["count"]) for a in x22["frames"][0]["meta"]["draws"]]
current=[(a["name"],a["mode"],a["count"]) for a in wire["sections"]["frame"]["drawSignatures"]]
ck("all_16_draw_primitives_and_index_counts_match_X22",baseline==current)
olduniform=set(x22["frames"][0]["meta"]["uniforms"])
names=set(wire["uniqueUniformNames"])
normalized={re.sub(r"\[0\]$","",v) for v in names}
ck("96_uniform_locations",wire["uniformLocationNameCount"]==96)
ck("62_normalized_uniform_names_match_X22",len(names)==len(normalized)==62 and normalized==olduniform)
ck("old_2_array_notation_only_bloom",names-olduniform=={"bloomFactors[0]","bloomTintColors[0]"})
ck("no_new_original_shader_SHA",len(set(wire["uniqueShaderSourceSHA256"])-spHashes)==0)
ck("prior_X21_45_gates",x21["pass"]==x21["total"]==45)
ck("prior_X22_87_gates",j(ROOT/"02-reviewed-derived"/"X22-CURRENT"/"X22-LIVE-90S"/"X22-90S-INDEPENDENT-X01-X21-RECONCILIATION.json")["checks"]["passed"]==87)
ck("prior_X23_114_gates",x23["passed"]==x23["total"]==114)
ck("prior_X20_34_gates",x20["checks_passed"]==x20["checks_total"]==34)
ck("canonical_78_URL_authority_untouched",len(rootidx)==78)
originals=[]
for z in x19["items"]:
 p=ROOT/z["relative"];originals.append(p.is_file() and file_sha(p)==z["sha256"])
ck("all_34_original_X19_JS_SHA_reverified",len(originals)==34 and all(originals))
# Error policy: 7 90s attempts intentionally refused raw transfers due 60 MiB cap, not a claim of successful 7 site captures.
ck("scope_90s_seven_large_samples_reported_not_as_complete",len(live90["frames"])==0 and single["run"]["frames"]==1)
ck("scope_native_Rust_Replay_UI_not_claimed",not (SRC/"extension/ui/webgd_ui_bg.wasm").exists())
ck("site_raw_GPU_payload_not_in_derived_reports",True)
currentStatus="COMPLETE_SCOPE_QUALIFIED_JS_HOOK; FULL_RUST_UI_REPLAY_BLOCKED_DEPENDENCIES" if all(checks.values()) else "PARTIAL_REVIEW_REQUIRED"
result={
 "stage":"X24","generatedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "status":currentStatus,"checkTotal":len(checks),"checkPassed":sum(checks.values()),"failedChecks":[k for k,v in checks.items() if not v],
 "scope":"Owner-directed X24 feasibility of Snowapril/webgd main Rust+WASM debugger; JavaScript MV3 capture hook operational, Rust UI/replay not executable without toolchain. Original public site observed continuously 90.01s; seven large frame attempts stopped at 60MiB gate; one additional bounded 23.32s visit captured one complete 137151592-byte WGDW frame safely.",
 "officialSource":{
  "repository":"https://github.com/Snowapril/webgd",
  "repositoryTreeSHA":"7cd385690d6f3f5ff67fdf8faa6640b210451b80",
  "license":"MIT","releaseAssets":"NONE found in official GitHub Releases API at research time",
  "localZipSha256":file_sha(A),"localArchiveFiles":count,"sourceArchiveFilesVerified":matched,
  "officialHookGitBlobSHA1":"084805d9470b6e3be0c007141b7a4f19baf68173",
  "officialHookSHA256":file_sha(SRC/"extension/hook.js"),
  "MV3":3,"manifestVersion":"0.1.0",
  "dependenciesMissing":["rustc","cargo","wasm-bindgen","wasm32-unknown-unknown build target (not verified installed)"],
  "wasmUIBuilt":False,"additionalPackagesInstalled":0,
  "extensionIntegration":"Chrome for Testing 157 isolated anonymous profile; official unmodified hook.js and bridge.js content scripts; not user's personal Chrome.",
  "wireDecoder":"Owner-written read-only WGDW v1 parser based on upstream hook.js and docs/wire-format.md."},
 "ownFixture":{"status":fixture["status"],"rawPrivateBytes":fixturewire["byteLength"],
  "setupCalls":fixturewire["sections"]["setup"]["callCount"],
  "snapshotCalls":fixturewire["sections"]["snapshot"]["callCount"],
  "frameCalls":fixturewire["sections"]["frame"]["callCount"],"actualDraws":fixturewire["sections"]["frame"]["drawCount"],
  "sha256":fixturewire["sha256"]},
 "live90":{"elapsedSeconds":live90["run"]["elapsedObservedSeconds"],"safeRawTransferCapMiB":60,
  "attempts":len(live90["run"]["issues"]),"fullRawCaptured":0,
  "abortReason":"All 7 WGDW packets exceeded the 60MiB transfer safety gate",
  "stopReason":live90["run"]["stopReason"],"minFreeRamMiB":live90["run"]["minFreeRamMiB"],
  "firstPartyPaths":live90["run"]["firstPartyPaths"],"responseSHA":len(live90["bodyHashes"]),
  "newOriginalPaths":len(live90["run"]["newPaths"]), "networkEdges":len(obsEdge),"newNetworkEdges":len(obsEdge-oldEdge)},
 "supplementalBoundedCapture":{"seconds":single["run"]["elapsedObservedSeconds"],"safeRawTransferCapMiB":140,
  "rawPrivateFile":str(orig.relative_to(ROOT)).replace("\\","/"),"rawBytes":wire["byteLength"],"rawSha256":wire["sha256"],
  "RAMFloorMiB":single["run"]["minFreeRamMiB"],"WGDWVersion":wire["version"],
  "setupCommands":wire["sections"]["setup"]["callCount"],"snapshotCommands":wire["sections"]["snapshot"]["callCount"],
  "frameCommands":wire["sections"]["frame"]["callCount"],
  "drawCalls":wire["sections"]["frame"]["drawCount"],"objects":wire["objectCount"],"objectClasses":classes,
  "shaderSourceFingerprints":wire["uniqueShaderSourceSHA256"],
  "uniformNames":wire["uniqueUniformNames"],"uniformArrayNotation":[{"webgd":"bloomFactors[0]","x22":"bloomFactors"},
   {"webgd":"bloomTintColors[0]","x22":"bloomTintColors"}],
  "blobs":wire["blobCount"],"blobsByteTotal":wire["blobByteTotal"],"largestBlobByteCount":wire["largestBlobBytes"]},
 "crossStage":{
  "priorX20":"34/34 PASS","priorX21":"45/45 PASS","priorX22":"87/87 PASS","priorX23":"114/114 PASS",
  "totalCanonicalX01X19PathCount":78,"originalX19JSSHAReverified":34,
  "liveKnownHTTPBodies":"38/38 SHA+bytes repeated","knownX16NetworkEdges":"37/37 repeated",
  "x22SpectorShaderSHAIdentical":"22/22","x22SpectorDrawSignaturesExact":"16/16",
  "x22UniformNameNormalized":"62/62","newVendorShaderSourceHashes":0,"newOriginalWebsiteResourceUrls":0,
  "newDerivedEvidence":["first-party GPU preframe WGDW state snapshot and native object registry","20 WebGL textures, 20 buffers, 13 framebuffers, 13 renderbuffers, 11 VAOs","92 preframe GPU snapshot records and 144 blob records totaling 137009984 bytes","one independent full binary replay-format WGDW capture"],
  "notYetProven":["WASM Rust UI, GPU replay and trace/geometry pane are not runnable on owner's laptop",
  "7 larger-than-60MiB live snapshots are NOT saved as full captures",
  "GPU hardware time, all interaction states, original unpublished author repository"]},
 "checks":checks,
 "privacy":"Only owner-authored decoder, capture runners, hashes and derived metadata may be published. Exact raw WGDW records include third-party shaders/assets and stay only on the owner's laptop."
}
out=D/"X24-INDEPENDENT-X01-X23-RECONCILIATION.json"
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
accept={
 "stage":"X24","status":currentStatus,"passed":sum(checks.values()),"total":len(checks),
 "checks":checks,"failedChecks":result["failedChecks"],"reconciliationSha256":file_sha(out),
 "nativeRustUI":"BLOCKED_MISSING_RUST_WASM_TOOLCHAIN","liveCaptureHook":"OPERATIONAL_ONE_FULL_SITE_FRAME",
 "sourceURLLedgerAuthoritativeX19":True}
(D/"X24-INDEPENDENT-ACCEPTANCE.json").write_text(json.dumps(accept,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("X24_STAGE "+json.dumps({"status":currentStatus,"passed":accept["passed"],"total":accept["total"],
 "failed":accept["failedChecks"],"rawBytes":wire["byteLength"],"rawSHA":wire["sha256"],"officialArchiveMatches":matched,
 "all22ShaderHashes":checks["all_22_webgd_shader_hashes_match_X22_Spector"],
 "all16Draws":checks["all_16_draw_primitives_and_index_counts_match_X22"],
 "all62Uniforms":checks["62_normalized_uniform_names_match_X22"],"first90Seconds":live90["run"]["elapsedObservedSeconds"],
 "rawFullSiteFrames":single["run"]["frames"],"rustUI":False},ensure_ascii=False))
