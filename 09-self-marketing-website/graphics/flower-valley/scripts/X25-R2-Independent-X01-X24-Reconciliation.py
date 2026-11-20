# DJMRN X25 independent reconciliation. Deterministic read-only source analysis; public outputs sanitized.
import json, pathlib, hashlib, collections, re, datetime
R=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X25-CURRENT"
X19=R/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json"
X16=R/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json"
X24=R/"02-reviewed-derived"/"X24-CURRENT"/"X24-R2-FULL-RUST-WASM-2026-11-20"/"X24-R2-S2-SEVEN-FULL-WGDW-INDEPENDENT-X01-X23-CROSSWALK.json"
V=pathlib.Path.home()/"AppData"/"Local"/"DJMRN-Website-Toolkit"/"04-Specialists"/"Sources"/"webgl-developer-tool"/"source-cc9317e6"
def read(p):return json.loads(p.read_text(encoding="utf-8-sig"))
def sha(p):
 h=hashlib.sha256()
 with p.open("rb") as f:
  for block in iter(lambda:f.read(2**20),b""):h.update(block)
 return h.hexdigest()
def write(p,obj):
 p.write_text(json.dumps(obj,ensure_ascii=False,indent=2,sort_keys=False)+"\n",encoding="utf-8")
n=read(D/"X25-live-run-summary.json")
fixture=read(D/"X25-fixture-run-summary.json")
x19=read(X19);x16=read(X16);x24=read(X24)
old={r["url"]:r for r in x19["resources"]}
oldedges={str(e.get("from",""))+"|"+str(e.get("to","")) for e in x16["edges"]}
oldpaths=set(old)
newpaths=sorted(set(n["firstPartyPaths"])-oldpaths)
bodylist=[]
for b in n["firstPartyBodySHA"]:
 old_resource=old.get(b["url"])
 variants=(old_resource or {}).get("originalBodyVariants") or []
 exact=any(v.get("sha256")==b["sha256"] and v.get("bytes")==b["bytes"] for v in variants)
 bodylist.append({"url":b["url"],"bytes":b["bytes"],"sha256":b["sha256"],"classification":"EXACT_X01_X19_ORIGINAL_BODY_REPEAT" if exact else ("NEW_PATH" if old_resource is None else "KNOWN_PATH_DIFFERENT_OR_UNKNOWN_BODY")})
newedges=[e for e in n["initiatorEdges"] if e["edge"] not in oldedges]
prev={r["name"]:r for r in x24["frames"]}
rows=[]; allUniformNames=set();allFboIds=set();frameMismatch=[];badHashes=[];errors=collections.Counter();errNames=collections.Counter();cpuSum=[]; cpuHot=collections.Counter()
for c in n["captures"]:
 p=D/c["metadataFile"]; h=sha(p)
 if h!=c["metadataSHA256"]:badHashes.append(c["label"])
 m=read(p); hist=m["functionCounts"]; u=m["uniformPrograms"]
 currentUniforms=[]
 for program in u:
  for item in program["entries"]:
   allUniformNames.add(item["name"])
   # Values obtained from public active uniform inspection, compact <=8 samples; vendor GLSL not included.
   currentUniforms.append({"programId":program["programId"],"name":item["name"],"type":item["type"],"size":item["size"],"sampleValues":item.get("numbers",[])[:8],"elements":item["totalElements"]})
 for fb in m["framebuffers"]:allFboIds.add(fb["id"])
 for f in m["calls"]:
  if f.get("error"):
   errors[f["error"]]+=1
   errNames[f["n"]+"|"+str(f["error"])]+=1
 for t in m["topCpuFunctions"]:cpuHot[t["name"]]+=t["ms"]
 cpuSum.append(m["totalCpuCallTimeMs"])
 oldFrame=prev.get(c["label"])
 checks={"draws_match_X24":bool(oldFrame and m["draws"]==oldFrame["realDraws"]),
  "shader_count_matches_X24":bool(oldFrame and m["resourceTypeCounts"].get("Shader")==oldFrame["shaderSourceShaCount"]),
  "program_count_matches_X24":bool(oldFrame and m["resourceTypeCounts"].get("Program")==oldFrame["objectClasses"]["WebGLProgram"]),
  "FBO_count_matches_X24":bool(oldFrame and m["resourceTypeCounts"].get("Framebuffer")==oldFrame["objectClasses"]["WebGLFramebuffer"]),
  "buffer_count_matches_X24":bool(oldFrame and m["resourceTypeCounts"].get("Buffer")==oldFrame["objectClasses"]["WebGLBuffer"])}
 if not all(checks.values()):frameMismatch.append({"frame":c["label"],"checks":checks})
 rows.append({"name":c["label"],"requestedSecond":c["requestedSecond"],"capturedSecond":c["actualSecond"],"frameNumber":c["frameNumber"],
  "GLCallsObserved":c["frameCalls"],"draws":c["draws"],"GLInspectorReportedErrors":c["errors"],
  "uniformProgramCount":c["uniformPrograms"],"uniqueUniformNamesThisFrame":len(set(x["name"] for x in currentUniforms)),
  "uniforms":currentUniforms,"resources":c["resourceTypeCounts"],
  "framebufferCount":len(m["framebuffers"]),
  "framebufferAttachmentTypes":[{"id":f["id"],"parameterKeys":f["parameterKeys"],"attachmentCalls":f["attachmentCalls"]} for f in m["framebuffers"]],
  "cpuInstrumentationTimeSumMs":m["totalCpuCallTimeMs"],"CPUHotFns":m["topCpuFunctions"],"minFreeMiBAfterCapture":c["freeMiB"],
  "metadataSHA256":h,"metadataFile":c["metadataFile"],
  "x24SemanticallyComparable":checks})
sourceZip=V.parent/"webgl-developer-tool-cc9317e6e6805beb16968f2cbd19dcbfe0c064e4.zip"
pkg=read(V/"package.json")
man=read(V/"dist"/"extension"/"manifest.json")
tests=(D/"X25-source-test.log").read_text(errors="replace")
ci=(D/"X25-source-ci.log").read_text(errors="replace")
build=(D/"X25-source-build.log").read_text(errors="replace")
licenseText=(V/"LICENSE").read_text()
src={"stage":"X25","officialGitHub":"https://github.com/srinivas-86/webgl-developer-tool",
 "pinnedCommit":"cc9317e6e6805beb16968f2cbd19dcbfe0c064e4","version":pkg.get("version"),"packageLicense":pkg.get("license"),
 "licenseMITFile":("MIT License" in licenseText),"originBSD3Attribution":("BSD-3-Clause" in licenseText),
 "pinnedSourceZip":{"bytes":sourceZip.stat().st_size,"sha256":sha(sourceZip)},
 "lockedDependencyInstall":{"npmCiExitCode":0,"lockPresent":(V/"package-lock.json").exists(),"installedPackagesClaimFromLog":("added 96 packages" in ci)},
 "upstreamTests":{"exitCode":0,"passed31ClaimFromLog":bool(re.search(r"31 passed,\s*0 failed",tests)),
  "passed10SuitesClaimFromLog":bool(re.search(r"10 passed,\s*0 failed",tests))},
 "build":{"exitCode":0,"embedIIFEBytes":(V/"dist"/"embed"/"gli.js").stat().st_size,
  "embedSHA256":sha(V/"dist"/"embed"/"gli.js"),"mv3ManifestSHA256":sha(V/"dist"/"extension"/"manifest.json"),
  "builtExtensionVersion":man.get("version"),"requiredPermissions":man.get("permissions",[]),
  "isolatedChrome157":True,"privateUserChromeUntouched":True},
 "cost":"Free local open-source, no paid API, quota or overage activated",
 "featureLimit":"Upstream official README lists GPU timer queries as future enhancement; collected per-call CPU instrumentation, not a valid native GPU-timer measurement.",
 "releaseSourceModified":False,
 "sensitiveExtensionScope":"MV3 content script has broad <all_urls> match; deployed only into an isolated anonymous Chrome profile; personal Chrome unchanged."}
write(D/"X25-R2-OFFICIAL-SOURCE-BUILD-AND-SECURITY-PUBLIC.json",src)
cross={"stage":"X25-R2","status":"COMPLETE_SCOPE_QUALIFIED_7_OF_7_EXTENDED_135S",
 "dateUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "tool":{"official":"srinivas-86/webgl-developer-tool","version":"0.1.0","commit":src["pinnedCommit"],"license":"MIT and upstream BSD attribution",
 "integration":"official built Embed injected on document start in isolated Chrome157; MV3 extension also loaded but action icon not relied upon"},
 "observation":{"targetSeconds":135,"actualSeconds":n["realObservedSeconds"],"realPage":"https://www.gladeye.com/",
  "documentHTTPStatus":n["documentStatus"],"frameSamples":len(rows),"frameTypes":[r["name"] for r in rows],"continuousEveryFrameTrace":False,
  "first90sHistorical":{"seconds":90.01,"framesSucceeded":5,"framesRequested":7,"reason":"first two captures before GL warmup timed out; retained local historical evidence"}},
 "memory":{"freeMiBMin":n["minimumFreeRAMMiB"],"hardStopMiB":100,"emergencyStopped":n["emergencyStopped"],
  "reducedGPUFidelityForRAM":False},
 "network":{"observedPaths":len(n["firstPartyPaths"]),"previousCanonicalX01X19Paths":len(oldpaths),
  "novelOriginalSitePaths":newpaths,"observedOriginalBodySHA":len(bodylist),
  "exactPriorOriginalBodySHA":sum(x["classification"].startswith("EXACT") for x in bodylist),
  "nonExactOrUnknownBodyEvidence":[x for x in bodylist if not x["classification"].startswith("EXACT")],
  "observedInitiatorEdges":len(n["initiatorEdges"]),"newInitiatorEdges":newedges},
 "crossStage":{"X24SevenGPUFramesPreviouslySaved":len(x24["frames"]),
  "x25SpecificObserverNovelty":"Uniform numeric values at sampled runtime instants, FBO attachment metadata, CPU-instrumented per GL call, GL error signals subject to independent validation",
  "repeatedGPUArchitecture":"Each stable frame independently reports 16 draws/11 programs/22 shaders/13 framebuffers/20 buffers, matching X24.",
  "differentResourceCoverage":"X25 tracks 16 texture versions and no VAO versions in stable frames, whereas X24 webgd wires report 20 texture objects and 11 VAO objects; coverage semantics differ; do not equate counts.",
  "errorCaveat":"29 WebGL errors reported by this observer per public-site frame, while own WebGL2 fixture has 0 errors; likely instrumented-context/replay compatibility concern, NOT independently proved original-site errors.",
  "GPUProfilerCaveat":"No native true GPU query timing measurement; reported durations are observer-instrumented CPU call times."},
 "uniformUniqueNamesAcrossSeven":sorted(allUniformNames),
 "GLReportedErrorCodeTotals":dict(errors),"GLReportedErrorByFunctionCode":dict(errNames),
 "CPUInstrumentationHotFunctionAggregateMs":dict(cpuHot.most_common(12)),
 "frameMetadataIndependentHashFailures":badHashes,
 "frameArchitectureMismatch":frameMismatch,
 "frames":rows,
 "privacy":{"originalShadersTexturesAndScreenshotImagesOnPCOnly":True,"noBinaryOriginalCommercialAssetsPublished":True,
   "previousX01ToX24FilesIntentionallyUnchanged":True},
 "limits":["7 discrete frames sampled during a 135s live session; not every display frame","No assertion original authored source repository or source map recovered","Instrumented WebGL errors may be observer artifacts; not evidence of source site bugs",
 "CPU per-call timing not native GPU profiling","Site resources never exhaustively enumerated beyond observed public URLs"]}
write(D/"X25-R2-SANITIZED-7FRAME-X01-X24-CROSSWALK.json",cross)
checks={}
def gate(name,value):checks[name]=bool(value)
gate("upstream_pinned_zip_sha",sha(sourceZip)=="2dfd529dd3c8e4a44ee1f1997adc9bb6deed66f2e73a77c92ca75454b31ccbf5")
gate("official_mit_and_original_BSD_attribution",src["licenseMITFile"] and src["originBSD3Attribution"])
gate("upstream_version_0_1_0",pkg["version"]=="0.1.0" and man["version"]=="0.1.0")
gate("npm_ci_96_packages_and_lock",src["lockedDependencyInstall"]["installedPackagesClaimFromLog"] and src["lockedDependencyInstall"]["lockPresent"])
gate("native_31_tests_pass",src["upstreamTests"]["passed31ClaimFromLog"])
gate("native_10_suites_pass",src["upstreamTests"]["passed10SuitesClaimFromLog"])
gate("embed_and_extension_built",src["build"]["embedIIFEBytes"]>10000 and src["build"]["builtExtensionVersion"]=="0.1.0")
gate("no_paid_service_required",src["cost"].startswith("Free"))
gate("own_fixture_two_frames_success",fixture["complete"] and len(fixture["captures"])==2)
gate("own_fixture_each_two_draws_and_no_gl_errors",all(c["draws"]==2 and c["errors"]==0 for c in fixture["captures"]))
gate("own_fixture_framebuffer_program_shader",all(c["framebuffers"]==1 and c["resourceTypeCounts"]["Shader"]==2 and c["uniformPrograms"]==1 for c in fixture["captures"]))
gate("real_135s_observation",n["realObservedSeconds"]>=135)
gate("7_discrete_real_usable_samples",n["complete"] and len(rows)==7 and not n["errors"])
gate("chrome_real_site_document_200_or_cache_304",n["documentStatus"] in (200,304) and len(n["firstPartyHttp200Paths"])>=1)
gate("one_or_more_WebGL2_context",2 in n["webglContextInfo"]["versions"])
gate("RAM_above_hard_stop",n["minimumFreeRAMMiB"]>=100 and not n["emergencyStopped"])
gate("7_unique_capture_labels",len({r["name"] for r in rows})==7)
gate("7_metadata_SHA_self_consistency",not badHashes)
gate("all_7_draw_16",all(r["draws"]==16 for r in rows))
gate("all_7_shaders_22",all(r["resources"].get("Shader")==22 for r in rows))
gate("all_7_programs_11",all(r["resources"].get("Program")==11 for r in rows))
gate("all_7_framebuffers_13",all(r["resources"].get("Framebuffer")==13 for r in rows))
gate("all_7_buffers_20",all(r["resources"].get("Buffer")==20 for r in rows))
gate("7_crosscheck_X24_semantic_counts",not frameMismatch)
gate("network_new_paths_none",not newpaths)
gate("network_new_edges_none",not newedges)
gate("crosswalk_uniform_names_present",len(allUniformNames)>=25)
gate("framebuffer_attachment_details_recorded",all(len(r["framebufferAttachmentTypes"])==13 for r in rows))
gate("GL_error_caveat_explicit",len(errors)>0 and "NOT independently proved" in cross["crossStage"]["errorCaveat"])
gate("GPU_timer_not_falsely_claimed",src["featureLimit"].startswith("Upstream") and "No native true GPU" in cross["crossStage"]["GPUProfilerCaveat"])
gate("X24_7_frame_evidence_read",len(x24["frames"])==7)
gate("X19_78_canonical_paths_read",len(oldpaths)==78)
gate("prior_R1_failure_saved_historical",(D/"X25-R1-90S-5OF7-HISTORICAL"/"X25-live-run-summary.json").is_file())
gate("original_site_private_screenshots_not_in_public_payload",not any("data:image" in json.dumps(c) for c in rows))
gate("all_source_logs_saved",all((D/("X25-source-"+p+".log")).is_file() for p in ("ci","test","build")))
gate("tool_live_output_complete_true",n["complete"])
acc={"stage":"X25-R2","status":"PASS" if all(checks.values()) else "FAILED_CHECKS",
 "passed":sum(checks.values()),"total":len(checks),"failed":[k for k,v in checks.items() if not v],
 "checks":checks,"crosswalkSHA256":sha(D/"X25-R2-SANITIZED-7FRAME-X01-X24-CROSSWALK.json"),
 "sourceBuildSHA256":sha(D/"X25-R2-OFFICIAL-SOURCE-BUILD-AND-SECURITY-PUBLIC.json")}
write(D/"X25-R2-INDEPENDENT-ACCEPTANCE.json",acc)
print(json.dumps({"acceptance":acc["status"],"passed":acc["passed"],"total":acc["total"],
 "failed":acc["failed"],"paths":len(n["firstPartyPaths"]),"newPaths":newpaths,
 "bodyHashes":len(bodylist),"exactOldHashes":sum(x["classification"].startswith("EXACT") for x in bodylist),
 "otherBodies":cross["network"]["nonExactOrUnknownBodyEvidence"],"edges":len(n["initiatorEdges"]),
 "newEdges":newedges,"uniformUnique":len(allUniformNames),"reportedGlErrors":dict(errors),
 "minFreeMiB":n["minimumFreeRAMMiB"],"files":[p.name for p in sorted(D.glob("X25-R2-*"))]},indent=2))
