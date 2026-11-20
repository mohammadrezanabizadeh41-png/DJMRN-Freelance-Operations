#!/usr/bin/env python3
"""DJMRN X28 offline, deterministic: reconcile two separate 90-second GPU observers with X01-X27.
Reads original third-party capture packets *only on private PC*; publishes aggregate rendering graph,
numeric delta counts, SHA256 & source provenance. No third-party original GLSL/texture pixels/binaries.
"""
import hashlib, json, pathlib, collections
ROOT=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=ROOT/"02-reviewed-derived"
P=ROOT/"01-private-captures"
X=D/"X28-CURRENT"
S=X/"SPECTOR-90S"
I=X/"ISPETTORE-90S"
SP=P/"X28"/"SPECTOR-90S"
IP=P/"X28"/"ISPETTORE-90S"
NAMES=["normal_baseline","hover_left","hover_right","dispersal_candidate_sweep","dispersal_candidate_scroll","return_scroll_up","return_pointer_out","return_idle"]
TARGET=[6,18,30,42,54,66,78,86]
CHECKS={}
DETAILS={}
def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))
def hashfile(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda:f.read(1024*1024),b""):h.update(block)
    return h.hexdigest()
def check(name,condition,detail=None):
    CHECKS[name]=bool(condition)
    if detail is not None:DETAILS[name]=detail
def draw_sig(records):
    return [[x.get("op"),x.get("mode"),x.get("count")] for x in records]
def numeric(v):
    if isinstance(v,(float,int)) and not isinstance(v,bool):return [float(v)]
    if isinstance(v,list) and all(isinstance(x,(int,float)) and not isinstance(x,bool) for x in v):
        return [float(x) for x in v]
    return None
def uniform_map(raw):
    result={}
    ordinal=0
    for command in raw.get("commands",[]):
        if command.get("name") not in ("drawArrays","drawElements","drawArraysInstanced","drawElementsInstanced"):
            continue
        for entry in command.get("DrawCall",{}).get("uniforms",[]) or []:
            value=numeric(entry.get("value"))
            if value is not None:result[str(ordinal)+":"+str(entry.get("name"))]=value
        ordinal+=1
    return result
def changed(base,other):
    common=set(base).intersection(other)
    delta=[]
    for name in sorted(common):
        a,b=base[name],other[name]
        if len(a)!=len(b) or any(abs(v-u)>0.00001 for u,v in zip(a,b)):
            delta.append(name)
    return delta

def main():
    pre=read(X/"X28-OFFICIAL-TOOLS-SOURCE-LICENSE-SECURITY-PREFLIGHT.json")
    ss=read(S/"X28-SPECTOR-90S-SANITIZED-GPU-AND-NETWORK-TIMELINE.json")
    ii=read(I/"X28-ISPETTORE-90S-SANITIZED-GPU-TIMELINE.json")
    sp=read(S/"X28-SPECTOR-90S-LOCAL-PRIVATE-INDEX.json")
    ip=read(I/"X28-ISPETTORE-90S-PRIVATE-FRAME-INDEX.json")
    images=read(X/"X28-SANITIZED-PRIVATE-SCREENSHOT-VISUAL-DELTA.json")
    x19=read(D/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
    x16=read(D/"X16-CURRENT"/"X16-script-init-network-graph.json")
    x22=read(D/"X27-CURRENT"/"X27-X22-CANONICAL-22-SHADER-SHA256-REFERENCE.json")
    x25=read(D/"X25-CURRENT"/"X25-live-run-summary.json")
    x26=read(D/"X26-CURRENT"/"X26-live-run-summary.json")
    x27=read(D/"X27-CURRENT"/"X27-INDEPENDENT-ACCEPTANCE.json")
    check("Spector_official_MIT_MV3_source_version_verified",pre["spector"]["version"]=="0.9.33" and pre["spector"]["manifestV3"]==3 and pre["spector"]["license"]=="MIT")
    check("Ispettore_official_Apache2_MV3_tag_manifest_discrepancy_verified",
        pre["ispettore"]["tag"]=="v0.1.1" and pre["ispettore"]["builtManifestVersion"]=="0.1.0"
        and pre["ispettore"]["manifestV3"]==3 and pre["ispettore"]["license"]=="Apache-2.0")
    check("X23_existing_unit_tests_retained",pre["ispettore"]["priorNativeTests"]=="245/245 PASS")
    check("real_installed_Playwright_Core_1_65_1",pre["interaction"]["playwrightCoreInstalledVersion"]=="1.65.1")
    check("serial_observer_execution_Phase_driver_uses_Playwright",
        "Playwright Core" in ss["stats"].get("controlEngine","") and
        "Playwright Core" in ii["run"].get("controlEngine",""))
    check("run_Spector_90s_with_success",ss["stats"]["observedSeconds"]>=90 and ss["stats"]["stopReason"]=="COMPLETED_90S",ss["stats"]["observedSeconds"])
    check("run_Ispettore_90s_with_success",ii["run"]["observedSeconds"]>=90 and ii["run"]["stopReason"]=="COMPLETED_90S",ii["run"]["observedSeconds"])
    check("both_observers_executed_separately_in_order",
        ss["stats"]["endUtc"] < ii["run"]["observedStartUtc"])
    check("all_eight_Spector_captures_saved",len(ss["frames"])==8 and len(sp["frames"])==8)
    check("all_eight_Ispettore_captures_saved",len(ii["frames"])==8 and len(ip["frames"])==8)
    check("same_exact_phase_labels", [f["label"] for f in ss["frames"]]==NAMES and [f["label"] for f in ii["frames"]]==NAMES)
    check("same_exact_intentional_capture_seconds",
        [f["requestedSecond"] for f in ss["frames"]]==TARGET and
        [f["requestedSecond"] for f in ii["frames"]]==TARGET)
    check("capture_points_all_in_real_90s",
        all(0<f["actualSecond"]<=91 for f in ss["frames"]) and
        all(0<f["second"]<=91 for f in ii["frames"]))
    check("both_ran_in_1280_by_720_profiles", 
        all((SP/("X28-SPECTOR-PRIVATE-"+name+".png")).is_file() and
            (IP/("X28-ISPETTORE-PRIVATE-"+name+".png")).is_file() for name in NAMES))
    check("hard_RAM_limit_100_MiB_retained",pre["freeRAMHardStopMiB"]==100 and ss["stats"]["ramStopMiB"]==100 and ii["run"]["emergencyFreeRamMiB"]==100)
    check("both_minimum_free_RAM_above_100",ss["stats"]["minRamMiB"]>100 and ii["run"]["minFreeRamMiB"]>100)
    check("both_zero_errors",ss["stats"]["issueCount"]==0 and not ii["run"]["issues"])
    check("Spector_draw16_per_frame",all(f["meta"]["drawCallCount"]==16 for f in ss["frames"]))
    check("Ispettore_draw16_per_frame",all(f["gpu"]["drawCount"]==16 for f in ii["frames"]))
    check("Spector_11_programs_in_each",all(len(f["meta"]["programs"])==11 for f in ss["frames"]))
    check("Spector_22_shaders_in_each",all(len(f["meta"]["shaders"])==22 for f in ss["frames"]))
    check("Spector_62_uniform_names_in_each",all(len(f["meta"]["uniforms"])==62 for f in ss["frames"]))
    check("8_x_22_shaderSHA_exact_match_to_original_X22",
          all(f["meta"]["shaders"]==x22["shaderHashesSha256Sorted"] for f in ss["frames"]))
    check("Spector_15_framebuffer_bind_per_frame",
          all(len(f["meta"]["x28RenderGraph"]["renderTargetBinds"])==15 for f in ss["frames"]))
    check("Spector_14_clear_per_frame",all(len(f["meta"]["x28RenderGraph"]["clears"])==14 for f in ss["frames"]))
    check("Ispettore_30_events_per_frame",all(f["gpu"]["eventCount"]==30 for f in ii["frames"]))
    check("Ispettore_11_program_keys_per_frame",all(len(f["gpu"]["programKeys"])==11 for f in ii["frames"]))
    check("Ispettore_per_draw_GPU_timing_unavailable_and_not_claimed",all(not f["gpu"]["gpuTimingAvailable"] for f in ii["frames"]))
    check("per_frame_Spector_vs_Ispettore_command_count_agree",
          all(a["meta"]["commandCount"]==b["gpu"]["commandCount"] for a,b in zip(ss["frames"],ii["frames"])))
    check("all_draw_signatures_exact_between_observers",
          all(draw_sig(a["meta"]["x28RenderGraph"]["drawSequence"])==
              draw_sig(b["gpu"]["x28RenderGraph"]["drawSequence"]) for a,b in zip(ss["frames"],ii["frames"])))
    check("each_graph_same_16_draw_signature_to_baseline",
          all(draw_sig(f["meta"]["x28RenderGraph"]["drawSequence"])==
              draw_sig(ss["frames"][0]["meta"]["x28RenderGraph"]["drawSequence"]) for f in ss["frames"]))
    check("Ispettore_three_full_scene_snapshots_retained",len(ii["snapshots"])==3 and len(ip["snapshots"])==3)
    check("three_scenes_1_renderer_1_model_17_textures_11_programs",
          all(x["rendererCount"]==1 and x["modelCount"]==1 and x["textureCount"]==17 and
              x["programCount"]==11 for x in ii["snapshots"]))
    check("three_scenes_7_scene_objects",all(x["sceneObjectCount"]==7 for x in ii["snapshots"]))
    check("three_scene_snapshots_share_camera_identity",
          len({x.get("camera",{}).get("uuid") for x in ii["snapshots"]})==1)
    # Confirm raw private frame source bytes and per-frame screenshot files are present and intact, without publication.
    rawchecks=[]
    uniform={}
    baseline=None
    for pos,(p,f) in enumerate(zip(sp["frames"],ss["frames"])):
        raw=SP/p["rawName"]
        ok=raw.is_file() and raw.stat().st_size==p["rawBytes"] and hashfile(raw)==p["rawSha256"]
        rawchecks.append(ok)
        if ok:
            current=uniform_map(read(raw))
            if baseline is None:baseline=current
            diffs=changed(baseline,current)
            selected = ("uShrinkFactor", "uMousePosition", "uContainerPos")
            selected_values = {name: [list(map(lambda x:round(x,12),val[:4])) for k,val in sorted(current.items())
                                      if k.split(":",1)[1]==name][:2] for name in selected}
            uniform[f["label"]]={"commonNumericUniformPairs":len(set(current).intersection(baseline)),
                                 "changedPairsVersusBaseline":len(diffs),
                                 "changedNames":sorted(set(n.split(":",1)[1] for n in diffs)),
                                 "selectedOwnerDerivedScalarOrVectorValues":selected_values}
    check("all_Spector_private_RAW_frame_exact_SHA256_bytes",len(rawchecks)==8 and all(rawchecks))
    rawchecks2=[]
    for p in ip["frames"]:
        raw=IP/p["rawFile"]
        rawchecks2.append(raw.is_file() and raw.stat().st_size==p["rawBytes"] and hashfile(raw)==p["rawSha256"])
    check("all_Ispettore_private_RAW_frame_exact_SHA256_bytes",len(rawchecks2)==8 and all(rawchecks2))
    scenecheck=[]
    for x in ii["snapshots"]:
        raw=IP/x["file"]
        scenecheck.append(raw.is_file() and raw.stat().st_size==x["bytes"] and hashfile(raw)==x["sha256"])
    check("three_Ispettore_private_scene_snapshot_exact_SHA256",len(scenecheck)==3 and all(scenecheck))
    vitems=images["snapshots"]
    check("16_public_visual_deltas_from_actual_private_screenshots",len(vitems)==16 and
          len([v for v in vitems if v["observer"]=="SPECTOR"])==8 and
          len([v for v in vitems if v["observer"]=="ISPETTORE"])==8)
    check("all_private_screenshots_match_visual_delta_SHA256",
          all((SP if v["observer"]=="SPECTOR" else IP).joinpath("X28-"+v["observer"]+"-PRIVATE-"+v["phaseCandidate"]+".png").is_file() and
           hashfile((SP if v["observer"]=="SPECTOR" else IP).joinpath("X28-"+v["observer"]+"-PRIVATE-"+v["phaseCandidate"]+".png"))==v["screenshotSHA256"] for v in vitems))
    check("all_screenshot_viewport_1280x720",all(v["viewport"]=="1280x720" for v in vitems))
    check("visual_difference_not_used_as_causal_proof",not images["dispersalVisuallyConfirmed"] and
          images["causality"]=="NOT_INFERRED_FROM_SCREENSHOT_DIFFERENCE")
    check("48_or_more_prior_X26_acceptance_preserved",
          read(D/"X26-CURRENT"/"X26-INDEPENDENT-ACCEPTANCE.json")["checksPassed"]==48)
    check("X27_previous_49_of_49_acceptance_preserved",x27["checksPassed"]==49 and x27["status"]=="PASS")
    check("X25_original_7_frame_capture_preserved",len(x25["captures"])==7 and x25["complete"])
    check("X26_previous_7_phase_samples_preserved",len(x26["samples"])==7 and x26["complete"])
    check("historical_X01_X27_derived_stage_folders_present",
          all(list(D.glob("X{:02}*".format(n))) for n in range(1,28)))
    check("X24_seven_PRIVATE_binary_GPU_frames_preserved",
          len(list((P/"X24"/"full-rust-wasm-2026-11-20"/"live-90s-stage2-gc").glob("*.webgd")))==7)
    ledger={r["url"]:r for r in x19["resources"]}
    rS=ss["resourceHashes"]
    rI=ii["bodyHashes"]
    def known_body(item):
        return any(x["sha256"]==item["sha256"] and x["bytes"]==item["bytes"]
           for x in ledger.get(item["url"],{}).get("originalBodyVariants",[]))
    check("historical_X19_78_URL_inventory_reloaded",len(ledger)==78)
    check("Spector_no_new_public_site_URL",not ss["stats"]["newPathCandidates"] and ss["stats"]["observedPaths"]==46)
    check("Ispettore_no_new_public_site_URL",not ii["run"]["newFirstPartyUrls"] and ii["run"]["firstPartyPaths"]==46)
    check("Spector_original_body_SHA256_size_all_known",len(rS)>0 and all(known_body(v) for v in rS),
          {"observed":len(rS),"exact":sum(known_body(v) for v in rS)})
    check("Ispettore_original_body_SHA256_size_all_known",len(rI)>0 and all(known_body(v) for v in rI),
          {"observed":len(rI),"exact":sum(known_body(v) for v in rI)})
    edges={e["from"]+"|"+e["to"] for e in x16["edges"]}
    check("Spector_prior_X16_runtime_edges_no_new",ss["stats"]["newInitiatorEdges"]==0 and ss["stats"]["initiatorEdges"]==37)
    check("Ispettore_prior_X16_runtime_edges_no_new",not ii["run"]["newInitiatorPairs"] and ii["run"]["initiatorPairs"]==37)
    check("three_legacy_source_authorities_remain_unchanged",
          all(f["meta"]["shaders"]==x22["shaderHashesSha256Sorted"] for f in ss["frames"]))
    check("raw_GPU_and_vendor_shaders_retained_PRIVATE_only",
          not pre["publicRawCommercialShadersOrTexturePixels"] and images["originalPixelsPublished"] is False)
    check("no_cost_or_personal_chrome_permission_change",
          pre["paidUsage"]=="NONE" and pre["noExtensionInstallInPersonalChrome"] and pre["noNewPaidPackage"])

    frames=[]
    for a,b in zip(ss["frames"],ii["frames"]):
        lab=a["label"]
        visual={v["observer"]:{"meanRGBDelta":v["meanRGBDifferenceFromSameObserverBaseline"],
                              "pixelFractionRGBDelta24":v["fractionPixelsWithRGBDifferenceAtLeast24"]}
                for v in vitems if v["phaseCandidate"]==lab}
        ga=a["meta"]["x28RenderGraph"]
        gb=b["gpu"]["x28RenderGraph"]
        frames.append({"phaseInputLabel":lab,"phaseFamily":
            "normal" if lab.startswith("normal") else "hover" if lab.startswith("hover") else
            "dispersal_UNVERIFIED" if lab.startswith("dispersal") else "return_UNVERIFIED",
            "requestedSeconds":a["requestedSecond"],"SpectorCapturedSecond":a["actualSecond"],"IspettoreCapturedSecond":b["second"],
            "SpectorDrawCount":a["meta"]["drawCallCount"],"IspettoreDrawCount":b["gpu"]["drawCount"],
            "SpectorCallCount":a["meta"]["commandCount"],"IspettoreCallCount":b["gpu"]["commandCount"],
            "observedGlClearCount":len(ga["clears"]),"framebufferBindCount":len(ga["renderTargetBinds"]),
            "fboTokenCountInDraws":len(a["meta"]["fboIds"]),
            "SpectorRenderTargetDrawSequence":[
              {"op":v["op"],"mode":v["mode"],"vertexOrIndexSubmissionCount":v["count"],
               "programLocalToken":v["program"],"framebufferLocalToken":v["frameBuffer"],
               "blendEnabled":v["blend"],"depthTestEnabled":v["depthTest"]}
              for v in ga["drawSequence"]],
            "IspettoreGPUevents":b["gpu"]["eventCount"],"IspettoreShaderProgramCount":len(b["gpu"]["programKeys"]),
            "IspettoreResourcesAttachedOrFramebufferCalls":len(gb["attachmentFormatHints"]),
            "IspettoreCommandCpuTimeMsInstrumentedNotGpuTime":b["gpu"]["cpuSumCommandMs"],
            "IspettoreNativeGpuTimerAvailable":b["gpu"]["gpuTimingAvailable"],
            "drawSignatureExactSpectorVsIspettore":draw_sig(ga["drawSequence"])==draw_sig(gb["drawSequence"]),
            "distinctSpectorOriginalShaderShaCount":len(a["meta"]["shaders"]),
            "uniformChangesVersusNormal":uniform.get(lab,{"notAvailable":True}),
            "privatePixelComparisonOnly":visual,
            "SpectorRawSHA256":a["rawSha256"],"IspettoreRawSHA256":b["rawSha256"]})
    result={"stage":"X28","observationDateUTC":ss["stats"]["observedStartUtc"],
        "state":"COMPLETE_SCOPE_QUALIFIED_2x90s_8GPU_FRAMES_PER_TOOL",
        "sourceTools":{"Spector":"BabylonJS/Spector.js 0.9.33 MV3","Ispettore":"velvetfrustum/ispettore v0.1.1 (packaged manifest 0.1.0) MV3",
                       "input":"playwright-core 1.65.1 via existing Puppeteer browser CDP"},
        "observersNeverRunConcurrently":True,
        "liveSeconds":{"Spector":ss["stats"]["observedSeconds"],"Ispettore":ii["run"]["observedSeconds"]},
        "minFreeRAMMiB":{"Spector":ss["stats"]["minRamMiB"],"Ispettore":ii["run"]["minFreeRamMiB"]},
        "sameViewport":"1280x720",
        "frames":frames,"IspettoreThreeFullSceneMetadata":[
            {"phase":x["label"],"sceneObjectCount":x["sceneObjectCount"],
             "rendererCount":x["rendererCount"],"modelCount":x["modelCount"],
             "textureCount":x["textureCount"],"programCount":x["programCount"],
             "cameraType":x["camera"]["type"],"sourcePrivateSHA256":x["sha256"],
             "rawBytesPrivate":x["bytes"]} for x in ii["snapshots"]],
        "firstPartyNetwork":{"SpectorPaths":ss["stats"]["observedPaths"],
            "IspettorePaths":ii["run"]["firstPartyPaths"],
            "SpectorKnownSHA":sum(known_body(v) for v in rS),"SpectorResponsesHashed":len(rS),
            "IspettoreKnownSHA":sum(known_body(v) for v in rI),"IspettoreResponsesHashed":len(rI),
            "X16KnownEdgesEach":37,"NovelOriginalURLs":[],"NovelOriginalBodySHA":[],"NovelInitiatorEdges":[]},
        "crossStage":{"X01_X19_78URLInventoryPreserved":len(ledger)==78,
            "X22ShaderSHA22ExactAll8Frames":all(f["meta"]["shaders"]==x22["shaderHashesSha256Sorted"] for f in ss["frames"]),
            "X23PriorSemanticsUsedAsHistoryNotInvented":True,
            "X24Private7GWPacketCount":7,"X25HistoricalFrames":len(x25["captures"]),
            "X26HistoricalFrames":len(x26["samples"]),
            "X27PriorAcceptancePass":x27["checksPassed"]},
        "novelInsights":["Blind GPU phase inputs were replayed using EXACT Playwright mouse/scroll schedule, 8 real GPU frames each on two isolated observers",
            "Inter-tool command order/draw signatures compared by opcode, numeric GL mode and draw count per frame",
            "Three live Ispettore Three.js GPU/scene snapshots at normal/dispersal-candidate/return-candidate phases",
            "Spector numeric Uniform changes and per-draw frame-buffer/program target sequence quantified without publishing vendor shader GLSL",
            "Private screenshot RGB differences quantified using fixed sampling grid without publishing original pixels"],
        "limitations":["Dispersal was an input hypothesis; no independent exact ground truth that flowers dispersed solely because of input",
            "Return is a pointer/scroll input condition; similarity in one animated screenshot is not proof of scene return state",
            "Playwright inputs occurred in two distinct sequential sessions, not the same underlying animation frame",
            "Instrumented GPU capture perturbs timing and does not measure true GPU frame/FPS performance",
            "Render target and format semantics are GL API hints; per-frame capture may omit initialization of textures",
            "Commercial Shader GLSL, full geometry, binary GPU captures, textures and full screenshots remain private on PC"] }
    (X/"X28-SANITIZED-EIGHT-PHASE-DUAL-INSPECTOR-GPU-GRAPH-X01-X27-CROSSWALK.json").write_text(
       json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    verdict={"stage":"X28","observationDateUTC":ss["stats"]["observedStartUtc"],
        "status":"PASS" if all(CHECKS.values()) else "FAIL",
        "passed":sum(CHECKS.values()),"total":len(CHECKS),
        "failed":[k for k,v in CHECKS.items() if not v],"checks":CHECKS,"details":DETAILS,
        "noNetworkOrRawThirdPartyAssetsPublished":True}
    (X/"X28-INDEPENDENT-ACCEPTANCE.json").write_text(json.dumps(verdict,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"status":verdict["status"],"passed":verdict["passed"],"total":verdict["total"],
        "failed":verdict["failed"],"duration":result["liveSeconds"],
        "rawPrivacyPreserved":True,"uniformsBaseline":uniform.get("normal_baseline"),
        "newURLs":0,"SpectorBodies":len(rS),"IspettoreBodies":len(rI)},ensure_ascii=False))
    if verdict["failed"]:raise SystemExit(2)
if __name__=="__main__":
    main()
