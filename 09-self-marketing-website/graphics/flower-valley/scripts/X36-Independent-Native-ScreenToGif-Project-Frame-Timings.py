#!/usr/bin/env python3
"""X36 actual ScreenToGif Project.json frame delay authoritative timing extraction.
Derived, source-licensed metadata only: no screenshot pixels, file paths or vendor content.
"""
import json,statistics,math,hashlib
from pathlib import Path
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X36-CURRENT"
P=R/"01-private-captures"/"X36"/"SCREEN-TO-GIF-REAL-FRAMES"
source=P/"X36_NATIVE_CACHE_Project.json"
project=json.loads(source.read_text(encoding="utf-8-sig"))
frames=project["Frames"]
delay=[int(f["Delay"]) for f in frames]
counts={"positive":sum(v>0 for v in delay),"zero":sum(v==0 for v in delay),"negative":sum(v<0 for v in delay)}
imagefiles=sorted(P.glob("X36_NATIVE_*.png"))
data={"stage":"X36","source":"actual original private ScreenToGif 2.43.2 Project.json",
"sourceSHA256":hashlib.sha256(source.read_bytes()).hexdigest(),
"nativeFrameCount":len(frames),"actualFrameTimingMs":delay,
"frameDurationSource":"ScreenToGif Project.json Frames[].Delay (true per-frame project duration, not NTFS mtime)",
"clipDurationMs":sum(delay),"clipDurationSeconds":round(sum(delay)/1000,3),
"medianFrameDelayMs":statistics.median(delay),"minFrameDelayMs":min(delay),"maxFrameDelayMs":max(delay),
"averageFrameDelayMs":round(statistics.mean(delay),4),
"equivalentAverageFPS":round(len(frames)/(sum(delay)/1000),4) if sum(delay)>0 else None,
"expectedMaxFPSConfigured":6,
"screenRecorderRecordedWidth":project["Width"],"screenRecorderRecordedHeight":project["Height"],"reportedDPI":project["Dpi"],
"fileCount":len(imagefiles),"frameTimingPositive":all(x>0 for x in delay),"frameNamesInOriginalProjectOnlyKeptPrivate":True,
"frameOriginalFilePathsKeptPrivate":True,"firstFrameDelayMs":delay[0],"lastFrameDelayMs":delay[-1],
"clickedFrames":sum(bool(x.get("Clicked")) for x in frames),
"limits":["One 18-second retake recording, independent from the earlier 90-second Chrome interaction run",
"Frame timestamps are native project frame delays, not independently calibrated screen presentation timestamps",
"GLB camera motion attribution remains unverified"]}
out=D/"X36-ORIGINAL-SCREENTOGIF-NATIVE-108-FRAME-DURATIONS.json"
out.write_text(json.dumps(data,indent=2)+"\n",encoding="utf8")
print("X36_NATIVE_TIMECODES",json.dumps({k:data[k] for k in ["nativeFrameCount","clipDurationMs","clipDurationSeconds","medianFrameDelayMs","minFrameDelayMs","maxFrameDelayMs","equivalentAverageFPS","screenRecorderRecordedWidth","screenRecorderRecordedHeight","reportedDPI","fileCount","frameTimingPositive"]}))
if not (len(frames)==len(imagefiles)==108 and data["frameTimingPositive"]):raise SystemExit(1)
