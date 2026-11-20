#!/usr/bin/env python3
"""Independent X36: review true ScreenToGif native image files, 90s Chrome, and X01..X35 prior.
Do not use hardcoded expected success; failed checks remain visible.
"""
from pathlib import Path
import os,json,hashlib,math,collections
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X36-CURRENT"
P=R/"01-private-captures"/"X36"/"SCREEN-TO-GIF-REAL-FRAMES"
site=json.loads((D/"X36-NEW-90S-LIVE-PUBLIC-WEBGL-AND-NATIVE-ROI-OBSERVATION.json").read_text(encoding="utf8"))
record=json.loads((D/"X36-ORIGINAL-SCREENTOGIF-REAL-NATIVE-FRAMES-SANITIZED-PROVENANCE.json").read_text(encoding="utf8"))
rgb=json.loads((D/"X36-INDEPENDENT-NATIVE-FRAME-TEMPORAL-RGB-X35-CROSSWALK.json").read_text(encoding="utf8"))
checks={}
def C(name,condition):checks[name]=bool(condition)
events=site.get("events",[])
label={x["phase"]:x for x in events}
def tr(n,t):return label.get(n,{}).get("meta",{}).get("trustedEventCounts",{}).get(t,0)
def draws(n):return label.get(n,{}).get("meta",{}).get("totalDraws",-1)
C("real_site_gladeye",site["site"]=="https://www.gladeye.com/")
C("real_90s_stop",site.get("stopReason")=="COMPLETED_90_S_LIMIT")
C("real_90s_actual_duration",89.9<=site.get("observedSeconds",0)<=91)
C("real_new_run_has_observation_start",bool(site.get("liveStartedUTC")))
C("no_live_runtime_errors",not site.get("issues"))
C("native_recorder_separate_program_requested",site.get("captureTool","").startswith("Official native ScreenToGif 2.43.2"))
C("native_record_is_not_playwright_screenshot",site.get("captureIsNativeScreenToGifNotPlaywrightScreenshot") is True)
C("no_vendor_gpu_inspector",site.get("noRenderDocOrGPUInspector") is True)
C("third_party_pixels_private",site.get("thirdPartyImagesPrivatePCOnly") is True)
C("no_vendor_shaders_glb_export",site.get("noShadersOrRawGLBBodiesSaved") is True)
C("global_proxy_unchanged",site.get("systemProxyUnchanged") is True)
C("owner_RAM_100_guard",site.get("hardStopRamMiB")==100)
C("free_RAM_above_100",site.get("minFreeMiB",0)>100)
C("public_new_session_10plus_phases",len(events)>=10)
C("public_events_monotonic_timestamp",all(a["actualSecond"]<b["actualSecond"] for a,b in zip(events,events[1:])))
C("public_all_WebGL2",all(x["meta"]["webgl2"] for x in events))
C("public_all_three_154",all(x["meta"]["threeRevision"]=="154" for x in events))
C("public_all_onsite_origin",all(x["meta"]["hostname"]=="www.gladeye.com" for x in events))
C("public_draws_monotonic",all(draws(a["phase"])<=draws(b["phase"]) for a,b in zip(events,events[1:])))
C("public_draws_later_positive",bool(events) and draws(events[-1]["phase"])>0)
C("public_three_distinct_signature_types_later",bool(events) and len(events[-1]["meta"]["signatures"])>=3)
C("real_site_trusted_pointer_left",tr("pointer_left","mousemove")>0)
C("real_site_pointer_left_hold_no_new_mouse",tr("pointer_left_hold","mousemove")==tr("pointer_left","mousemove"))
C("real_site_continuous_render_hold",draws("pointer_left_hold")>draws("pointer_left"))
C("real_site_trusted_pointer_right",tr("pointer_right","mousemove")>tr("pointer_left","mousemove"))
C("real_site_right_hold_without_new_pointer",tr("pointer_right_hold","mousemove")==tr("pointer_right","mousemove"))
C("real_site_continuous_render_right_hold",draws("pointer_right_hold")>draws("pointer_right"))
C("real_scroll_positive_trusted",tr("scroll_positive","wheel")>0)
C("real_scroll_reverse_trusted",tr("scroll_negative","wheel")>tr("scroll_positive","wheel"))
C("real_screenRecorder_pid_positive",site.get("nativeScreenToGifPID",0)>0)
C("real_record_started_inside_session",9<=site.get("nativeStartSecond",0)<17)
C("real_record_limit32_seconds",site["nativeCaptureConfigured"]["limitSeconds"]==32)
C("real_record_framerate6",site["nativeCaptureConfigured"]["maxFPS"]==6)
C("native_archive_contains_30plus_real_files",record.get("frameCount",0)>=30)
C("native_frame_count_matches_metadata",record.get("frameCount")==len(record.get("frameMetadata",[])))
C("native_frame_count_matches_temporal",record.get("frameCount")==rgb.get("frameCount"))
C("native_frame_hashes_not_all_identical",record.get("uniqueFrameHashCount",0)>5)
C("native_images_valid_dimensions",record.get("imageWidth",0)>100 and record.get("imageHeight",0)>100)
C("native_frame_pixels_stay_PC_only",record.get("sourceCacheFolderPrivateOnly") is True)
C("native_temporal_source_independent_from_browser",rgb.get("source","").find("ScreenToGif native")>=0)
C("native_RGB_independent_checks_passed",rgb.get("status")=="PASS")
C("native_RGB_all_frames_verified",rgb.get("metrics",{}).get("framesDecoded")==record.get("frameCount"))
C("native_RGB_23plus_pair_comparisons",rgb.get("metrics",{}).get("adjacentPairCount",0)>=29)
C("native_RGB_pair_Nminus1",rgb.get("metrics",{}).get("adjacentPairCount")==record.get("frameCount",0)-1)
C("native_RGB_variation_genuine",rgb.get("metrics",{}).get("pairsWithMAEGt1",0)>2)
C("historical_X35_24_screenshots",rgb.get("x35Comparison",{}).get("X35OriginalInputSnapshots")==24)
C("historical_X35_23_pairs",rgb.get("x35Comparison",{}).get("X35ConsecutivePairs")==23)
C("historical_Gladeye_paths",site.get("knownFirstPartyPaths",0)>=30)
C("historical_resource_bodies_all_sha_match",site.get("exactHistoricalBodyCount",0)==len(site.get("resources",[])) and len(site.get("resources",[]))>10)
C("historical_paths_no_new",not site.get("novelFirstPartyPaths"))
C("historical_network_edges_no_new",not site.get("novelEdges"))
C("historical_camera_path_unchanged",site.get("liveCameraHashExactX34") is True)
base=R/"02-reviewed-derived"
for n in range(1,36):
 pref=f"X{n:02d}"
 C("previous_"+pref+"_derived_exists",any(x.name.startswith(pref) for x in base.iterdir()))
for n,filename,num in [
 ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),
 ("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
 ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
 ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96),
 ("X31","X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json",121),
 ("X32","X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json",128),
 ("X33","X33-INDEPENDENT-X01-X32-MCP-REPLAY-AND-LIVE-ACCEPTANCE.json",123),
 ("X34","X34-INDEPENDENT-GLTF-CAMERA-GPU-VIEWER-LIVE90-X01-X33-ACCEPTANCE.json",143),
 ("X35","X35-INDEPENDENT-STRICT-PUBLIC-INPUT-MOTION-X01-X34-ACCEPTANCE.json",391)]:
 j=json.loads((base/(n+"-CURRENT")/filename).read_text(encoding="utf8"))
 C("historical_"+n+"_independent_acceptance",j.get("total",j.get("checksTotal"))==num and j.get("passed",j.get("checksPassed"))==num and not j.get("failed"))
for item in record["frameMetadata"]:
 C("native_original_frame_SHA_"+str(item["index"]),hashlib.sha256((P/item["pcOwnerCopy"]).read_bytes()).hexdigest()==item["SHA256"])
 C("native_original_frame_bytes_"+str(item["index"]),(P/item["pcOwnerCopy"]).stat().st_size==item["sourceBytes"])
times=json.loads((D/"X36-ORIGINAL-SCREENTOGIF-NATIVE-108-FRAME-DURATIONS.json").read_text(encoding="utf8"))
C("native_original_Project_json_SHA",times["sourceSHA256"]==record["projectExtraMetadata"][0]["sha256"])
C("native_Project_json_exact_108_frames",times["nativeFrameCount"]==record["frameCount"]==108)
C("native_Project_json_108_positive_delays",len(times["actualFrameTimingMs"])==108 and all(v>0 for v in times["actualFrameTimingMs"]))
C("native_Project_json_18s_frame_sum",sum(times["actualFrameTimingMs"])==17962)
C("native_Project_json_17point962s",times["clipDurationSeconds"]==17.962)
C("native_Project_json_median_166ms",times["medianFrameDelayMs"]==166)
C("native_Project_json_6fps_effective",5.7<times["equivalentAverageFPS"]<6.3)
C("native_Project_json_120DPI",times["reportedDPI"]==120)
C("native_Project_json_w875_h512",times["screenRecorderRecordedWidth"]==875 and times["screenRecorderRecordedHeight"]==512)
C("native_Project_json_108_real_files",times["fileCount"]==108)
C("native_screen_capture_retaken_not_same_browser90s",bool("retake" in times["limits"][0]))
result={"stage":"X36","stableObservationUTC":site.get("liveStartedUTC"),"status":"PASS" if all(checks.values()) else "FAIL",
 "total":len(checks),"passed":sum(checks.values()),"failed":[k for k,v in checks.items() if not v],
 "checks":checks,"facts":{
  "siteSeconds":site.get("observedSeconds"),"phases":len(events),"nativeFrames":record.get("frameCount"),
  "nativeUniqueFrames":record.get("uniqueFrameHashCount"),"maxFPSConfigured":6,
  "nativeROI":[record.get("imageWidth"),record.get("imageHeight")],
  "nativePairwiseMAD_Median":rgb.get("metrics",{}).get("medianAdjFrameMAE"),
  "x35SparseFrames":24,"x35SparsePairs":23,
  "realOriginalThirdPartyPixelsPublished":False,
  "siteFrameRecordingDoesNotShowPrecise3DCameraPose":True,
  "freeRAM_MinMiB":site.get("minFreeMiB"),
  "X19OriginalBodiesMatch":site.get("exactHistoricalBodyCount"),
  "X16KnownNetworkEdges":site.get("edgesTotal"),
  "notes":"One user-visible sequence, no independent causal camera proof. ScreenToGif file cache write timestamps are NOT exact frame PTS."}}
out=D/"X36-INDEPENDENT-NATIVE-SCREENTOGIF-90S-LIVE-X01-X35-ACCEPTANCE.json"
out.write_text(json.dumps(result,indent=2)+"\n",encoding="utf8")
print("X36_INDEPENDENT_QA",json.dumps({"status":result["status"],"total":result["total"],"passed":result["passed"],
"failed":result["failed"][:30],"nativeFrames":record.get("frameCount"),"seconds":site.get("observedSeconds")}))
if result["status"]!="PASS":raise SystemExit(1)
