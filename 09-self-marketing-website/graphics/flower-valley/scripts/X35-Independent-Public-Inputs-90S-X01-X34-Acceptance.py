#!/usr/bin/env python3
"""DJMRN X35: independent original PNG hashes, input dispatch, true WebGL draws, x19/x16 and X01–X34 continuity.
One 90-second controlled, non-randomized site session. Do not infer exact authored camera pose or causal camera response.
"""
from pathlib import Path
import json,hashlib,math,collections,statistics
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X35-CURRENT"
P=R/"01-private-captures"/"X35"/"PUBLIC-STRICT-BEHAVIOR-90S"
s=json.loads((D/"X35-REAL-90S-PUBLIC-CONTROLLED-INPUTS-CROSSWALK.json").read_text(encoding="utf8"))
items=s.get("events",[]);by={x["label"]:x for x in items}
checks={}
def C(n,v):checks[n]=bool(v)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def obs(name):return by[name]["screen"] if name in by else {}
def tr(name,kind):return obs(name).get("trustedCounts",{}).get(kind,0)
def ct(name,kind):return obs(name).get("inputCounts",{}).get(kind,0)
def draw(name):return obs(name).get("webgl",{}).get("draws",-1)
def changed(name):return (by.get(name) or {}).get("imageMetrics",{}).get("fromPrevious",{})
plan=[("idle_A","control"),("idle_B","control"),("pointer_left_A","pointer"),
 ("pointer_left_hold","hold"),("pointer_right_A","pointer"),("pointer_right_hold","hold"),
 ("pointer_left_B","replicate"),("pointer_right_B","replicate"),("center_reset","reset"),
 ("drag_press","drag"),("drag_move","drag"),("drag_release","drag"),
 ("canvas_click","click"),("wheel_down","scroll"),("wheel_up","scroll"),
 ("keyboard_focus","focus"),("pointer_exit","exit"),("resize_960x600","resize"),
 ("resize_restore","resize"),("reduced_motion_on","media"),("reduced_motion_off","media"),
 ("mobile_emulation","mobile"),("mobile_touch_tap","mobile"),("mobile_touch_swipe","mobile")]
names=[x[0] for x in plan]
C("session_site_gladeye",s.get("site")=="https://www.gladeye.com/")
C("real_90s_completes",s.get("stopReason")=="COMPLETED_90S_LIMIT")
C("actual_session_bound_with_tolerance",89.95<=s.get("actualObservedSeconds",0)<=91.0)
C("scheduled_24_exact_input_states",[(x["name"],x["kind"]) for x in s.get("schedule",[])]==plan)
C("captured_all_24_phases",[x["label"] for x in items]==names)
C("all_samples_clock_ascending",all(a["actualSecond"]<b["actualSecond"] for a,b in zip(items,items[1:])))
C("first_sample_after_1second",bool(items) and items[0]["actualSecond"]>=1)
C("last_sample_before_91seconds",bool(items) and items[-1]["actualSecond"]<=91)
C("all_24_actions_within_4s_of_target",all(abs(x["actualSecond"]-x["targetSecond"])<4.0 for x in items))
C("no_reported_observation_errors",not s.get("issues"))
C("public_isolated_no_vendor_gpu_injection",s.get("noVendorNativeGpuInjection") is True)
C("no_proprietary_gpu_source_or_texture_export",s.get("noThirdPartyGeometryOrShaderOrTexturesSaved") is True)
C("public_data_screenshots_local_only",s.get("screenshotsPrivatePCOnly") is True)
C("system_proxy_unchanged",s.get("systemProxyNotChanged") is True)
C("no_forms_submitted",s.get("unsupervisedSiteClicksFormSubmissions") is False)
C("RAM_hard_stop_100",s.get("ownerRAMHardStopMiB")==100)
C("RAM_min_above_stop",s.get("minFreeRamMiB",0)>100)
C("live_pages_all_origin",all(x["screen"]["hostname"]=="www.gladeye.com" for x in items))
C("live_all_webgl2_true",all(x["screen"]["webgl2"] for x in items))
C("live_all_three154",all(x["screen"]["threeRevision"]=="154" for x in items))
C("live_all_canvas_present",all(x["screen"]["canvas"] for x in items))
C("draws_monotonic",all(draw(a["label"])<=draw(b["label"]) for a,b in zip(items,items[1:])))
C("draws_positive_last",bool(items) and draw(items[-1]["label"])>0)
C("live_3_webgl_signatures",len(obs("pointer_left_hold").get("webgl",{}).get("signatures",[]))==3)
C("WebGL_points960000_signature",any(t["mode"]==0 and t["count"]==960000 for t in obs("pointer_right_A").get("webgl",{}).get("signatures",[])))
C("two_idle_windows_no_trusted_mouse",tr("idle_A","mousemove")==tr("idle_B","mousemove")==0)
C("one_hold_drawing_continued",draw("pointer_left_hold")>draw("pointer_left_A"))
C("second_hold_drawing_continued",draw("pointer_right_hold")>draw("pointer_right_A"))
C("left_hold_no_new_mousemove",tr("pointer_left_hold","mousemove")==tr("pointer_left_A","mousemove"))
C("right_hold_no_new_mousemove",tr("pointer_right_hold","mousemove")==tr("pointer_right_A","mousemove"))
C("pointer_left_A_dispatch_trusted",tr("pointer_left_A","mousemove")>0)
C("pointer_right_A_dispatch_trusted",tr("pointer_right_A","mousemove")>tr("pointer_left_A","mousemove"))
C("pointer_left_B_replicated_dispatch",tr("pointer_left_B","mousemove")>tr("pointer_right_A","mousemove"))
C("pointer_right_B_replicated_dispatch",tr("pointer_right_B","mousemove")>tr("pointer_left_B","mousemove"))
C("center_reset_dispatch",tr("center_reset","mousemove")>tr("pointer_right_B","mousemove"))
C("drag_mousedown_trusted",tr("drag_press","pointerdown")>=1)
C("drag_move_after_press_trusted",tr("drag_move","mousemove")>tr("drag_press","mousemove"))
C("drag_up_trusted",tr("drag_release","pointerup")>=1)
C("click_trusted",tr("canvas_click","click")>=1)
C("wheel_down_dispatch",tr("wheel_down","wheel")>=1)
C("wheel_up_dispatch",tr("wheel_up","wheel")>tr("wheel_down","wheel"))
C("keyboard_Tab_trusted",tr("keyboard_focus","keydown")>=1)
C("pointer_exit_motion",tr("pointer_exit","mousemove")>tr("keyboard_focus","mousemove"))
C("resize_960_width",obs("resize_960x600").get("win",{}).get("width")==960)
C("resize_600_height",obs("resize_960x600").get("win",{}).get("height")==600)
C("resize_restore_width",obs("resize_restore").get("win",{}).get("width")==1280)
C("resize_restore_height",obs("resize_restore").get("win",{}).get("height")==720)
C("reduced_motion_true_event",obs("reduced_motion_on").get("reducedMotion") is True)
C("reduced_motion_restored",obs("reduced_motion_off").get("reducedMotion") is False)
C("mobile_emulated_width",obs("mobile_emulation").get("win",{}).get("width",0)<=400)
C("mobile_emulated_touch_capable",obs("mobile_emulation").get("touchCapable") is True)
C("mobile_tap_event_trusted",tr("mobile_touch_tap","touchstart")>=1)
C("mobile_swipe_input_started",tr("mobile_touch_swipe","touchstart")>=2)
C("mobile_swipe_move_event",tr("mobile_touch_swipe","touchmove")>=1)
C("mobile_end_event_trusted",tr("mobile_touch_swipe","touchend")>=2)
for x in items:
 name=x["label"]
 p=P/x["privateScreenshot"]["name"]
 C("screenshot_exists_"+name,p.is_file())
 C("screenshot_sha_"+name,p.is_file() and sha(p)==x["privateScreenshot"]["sha256"])
 C("screenshot_bytes_"+name,p.is_file() and p.stat().st_size==x["privateScreenshot"]["bytes"])
 C("screenshot_png_magic_"+name,p.is_file() and p.read_bytes()[:8]==b"\x89PNG\r\n\x1a\n")
 if name!="idle_A":
  diff=changed(name)
  C("screen_comparison_finite_"+name,
    isinstance(diff.get("meanAbsoluteRGB"),(float,int)) and math.isfinite(diff["meanAbsoluteRGB"]) and
    0<=diff.get("changedRGBComponentsOver15Pct",-1)<=100)
 C("phase_valid_timestamp_"+name,0<x["actualSecond"]<91)
old=R/"02-reviewed-derived"
for n in range(1,35):
 nm=f"X{n:02d}"
 C("stage_"+nm+"_PC_exists",any(q.name.startswith(nm) for q in old.iterdir()))
for n,filename,expect in [
 ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),
 ("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
 ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
 ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96),
 ("X31","X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json",121),
 ("X32","X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json",128),
 ("X33","X33-INDEPENDENT-X01-X32-MCP-REPLAY-AND-LIVE-ACCEPTANCE.json",123),
 ("X34","X34-INDEPENDENT-GLTF-CAMERA-GPU-VIEWER-LIVE90-X01-X33-ACCEPTANCE.json",143)]:
 oldQA=json.loads((old/(n+"-CURRENT")/filename).read_text(encoding="utf8"))
 C(n+"_old_gate",oldQA.get("total",oldQA.get("checksTotal"))==expect and
   oldQA.get("passed",oldQA.get("checksPassed"))==expect and not oldQA.get("failed"))
C("firstparty_url_count_is_at_least_prior_observed",s.get("observedFirstPartyPaths",0)>=30)
C("all_body_hashes_match_previous_X19",all(x["exactX19Body"] for x in s.get("networkBodySHAAndSize",[])))
C("previously_known_firstparty_resources",len(s.get("novelFirstPartyPaths",[]))==0)
C("previous_network_initiator_edges",len(s.get("novelInitiatorEdges",[]))==0)
C("camera_path_sha_matches_X34",s.get("liveOriginalCameraSHAIdenticalToX34") is True)
C("historical_X34_camera_SHA_file",sha(R/"01-private-captures"/"X01-REDO"/"X01-R2-2026-11-18T18-01-09-463Z"/"first-party-response-bodies"/"dab4459358d8d22ec63315.glb")=="dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e")
C("public_no_commercial_original_shader_code",s.get("noVendorSourceScriptPublication") is True)
controls=[x for x in items if x["inputKind"] in ("control","hold")]
motion=[x for x in items if x["inputKind"] in ("pointer","replicate")]
paircomparisons=[
 {"hold":"pointer_left_hold","precedingInput":"pointer_left_A",
  "newTrustedMousemove":tr("pointer_left_hold","mousemove")-tr("pointer_left_A","mousemove"),
  "additionalWebGLDrawSubmissions":draw("pointer_left_hold")-draw("pointer_left_A")},
 {"hold":"pointer_right_hold","precedingInput":"pointer_right_A",
  "newTrustedMousemove":tr("pointer_right_hold","mousemove")-tr("pointer_right_A","mousemove"),
  "additionalWebGLDrawSubmissions":draw("pointer_right_hold")-draw("pointer_right_A")}]
image_summary=[{"phase":x["label"],"t":x["actualSecond"],
 "meanAbsoluteRGBFromPrevious":x["imageMetrics"].get("fromPrevious",{}).get("meanAbsoluteRGB"),
 "changedRGBComponentsOver15PctFromPrevious":x["imageMetrics"].get("fromPrevious",{}).get("changedRGBComponentsOver15Pct"),
 "WebGLDrawsSoFar":x["screen"]["webgl"]["draws"],
 "trustedInputCounts":x["screen"]["trustedCounts"],
 "viewport":x["screen"]["win"],"reducedMotion":x["screen"]["reducedMotion"]}
 for x in items]
pixels=json.loads((D/"X35-INDEPENDENT-ALL-PNG-SCREEN-DELTA-CROSSCHECK.json").read_text(encoding="utf8"))
C("X35_independent_pixel_crosscheck_142_of_142",pixels["total"]==pixels["passed"]==142 and pixels["status"]=="PASS")
C("X35_independent_pixel_23_consecutive_pairs",len(pixels["differences"])==23)
for pixelcheck in pixels["checks"]:
 C("X35_pixel_"+pixelcheck["name"],pixelcheck["pass"])
status="PASS" if all(checks.values()) else "QUALIFIED_FAIL"
result={"stage":"X35","stableUTC":s["observedStartUTC"],"status":status,
 "total":len(checks),"passed":sum(checks.values()),"failed":[k for k,v in checks.items() if not v],
 "checks":checks,"findings":{
  "observedSeconds":s.get("actualObservedSeconds"),"phases":len(items),
  "trustedControlledInputDispatch":bool(checks.get("pointer_left_A_dispatch_trusted") and checks.get("click_trusted")),
  "renderingContinuesDuringNoMouseMotion":bool(checks.get("one_hold_drawing_continued") and checks.get("second_hold_drawing_continued")),
  "noVerifiedCameraPoseReadback":True,"noVerifiedCausalCameraReaction":True,
  "screenshotChangeIsNotProofOfCausality":True,
  "oneUnrandomizedSessionNotAReplicatedIndependentABExperiment":True,
  "repeatLeftRightInterventions":2,
  "actualWebGLDrawsLast":draw(items[-1]["label"]) if items else None,
  "referenceFirstPartyPaths":s.get("observedFirstPartyPaths"),"X19ExactSHAAndSizeCount":s.get("exactX19BodyCount"),
  "newNetworkPaths":len(s.get("novelFirstPartyPaths",[])),
  "knownX16NetworkEdges":s.get("networkOldInitiatorEdges"),"newNetworkEdges":len(s.get("novelInitiatorEdges",[])),
  "minFreeRAMMiB":s.get("minFreeRamMiB"),
  "mobileTouchIsEmulationOnly":True,
  "reducedMotionCSSMediaToggledButWebGLRespectUnverified":True,
  "actionGroupCounts":dict(collections.Counter(x["inputKind"] for x in items)),
  "holdAndDrawPairDelta":paircomparisons,
  "inputImageTrace":image_summary,
  "limitations":[
   "Different observation timestamps are confounded by autonomous animation, warming GPU and loading",
   "No synchronized randomized A/B or exact three.js camera world matrix measurement",
   "Viewport/motion changes confirm browser emulation and reported frame delta, not which authored camera keyframe was used",
   "X36 will capture human-visible temporal clips; X40 will test optical-flow drift, still without exact camera pose"
  ]}}
out=D/"X35-INDEPENDENT-STRICT-PUBLIC-INPUT-MOTION-X01-X34-ACCEPTANCE.json"
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("X35_QA",json.dumps({"status":status,"passed":result["passed"],"total":result["total"],"failed":result["failed"],
 "seconds":s.get("actualObservedSeconds"),"phases":len(items),"minFreeMiB":s.get("minFreeRamMiB")},ensure_ascii=False))
if status!="PASS":raise SystemExit(1)
