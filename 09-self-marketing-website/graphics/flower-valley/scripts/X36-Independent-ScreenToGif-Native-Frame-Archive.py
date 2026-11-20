#!/usr/bin/env python3
"""Independent X36 original ScreenToGif on-disk frame provenance + owner-only archival.
Read only original cache. No vendor image pixels or footage uploaded to GitHub.
"""
from pathlib import Path
import os,json,hashlib,shutil,struct,time,datetime,re
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X36-CURRENT"
P=R/"01-private-captures"/"X36"/"SCREEN-TO-GIF-REAL-FRAMES"
L=D/"X36-NEW-90S-LIVE-PUBLIC-WEBGL-AND-NATIVE-ROI-OBSERVATION.json"
live=json.loads(L.read_text(encoding="utf8"))
start=datetime.datetime.fromisoformat(live["startUTC"].replace("Z","+00:00")).timestamp()
locations=[Path(os.environ["TEMP"])/"ScreenToGif",Path(os.environ["LOCALAPPDATA"])/"ScreenToGif"]
candidates=[]
for location in locations:
 if not location.is_dir():continue
 for dir in [location]+[x for x in location.rglob("*") if x.is_dir()]:
  if "X36" in str(dir):continue
  try:
   files=[x for x in dir.iterdir() if x.is_file() and x.suffix.lower() in [".png",".bmp",".jpg",".jpeg"]]
  except OSError:continue
  if len(files)<10:continue
  newest=max(x.stat().st_mtime for x in files)
  if newest>=start-180:candidates.append((len(files),newest,dir,files))
if not candidates:
 raise SystemExit("X36_NATIVE_FRAMES_NOT_FOUND: ScreenToGif cache folders missing or recorder failed; no claim of recording success")
candidates.sort(key=lambda x:(x[1],x[0]),reverse=True)
num,mt,source,files=candidates[0]
def numeric(p):
 m=re.search(r"(\d+)(?=\.[^.]+$)",p.name)
 return int(m.group(1)) if m else 999999999
frames=sorted(files,key=lambda p:(numeric(p),p.name))
meta=[]
for n,p in enumerate(frames):
 dest=P/("X36_NATIVE_"+str(n).zfill(5)+p.suffix.lower())
 if not dest.is_file() or dest.stat().st_size!=p.stat().st_size:shutil.copy2(p,dest)
 b=dest.read_bytes()
 w=h=None
 if b[:8]==b"\x89PNG\r\n\x1a\n":w,h=struct.unpack_from(">II",b,16)
 meta.append({"index":n,"originalCacheName":p.name,"sourceBytes":len(b),"SHA256":hashlib.sha256(b).hexdigest(),
 "width":w,"height":h,"capturedFileMtimeUTC":datetime.datetime.fromtimestamp(p.stat().st_mtime,datetime.timezone.utc).isoformat(),
 "pcOwnerCopy":dest.name})
unique=len(set(x["SHA256"] for x in meta))
extra=[]
for f in source.iterdir():
 if f.is_file() and f.suffix.lower() in [".json",".xml",".txt",".stg",".project",".bin"] and f.stat().st_size<10000000:
  target=P/("X36_NATIVE_CACHE_"+f.name)
  shutil.copy2(f,target)
  extra.append({"name":f.name,"bytes":f.stat().st_size,"sha256":hashlib.sha256(target.read_bytes()).hexdigest()})
out={"stage":"X36","recorder":"ScreenToGif FULL portable 2.43.2 native screen recorder, independently persisted to real on-disk image files",
 "captureProvenance":"original ScreenToGif cache directory selected by actual post-observation file time and frame count",
 "observedStartUTC":live["liveStartedUTC"],"siteObservedSeconds":live["observedSeconds"],
 "sourceCacheFolderPrivateOnly":True,"ownerFrameFolder":"01-private-captures/X36/SCREEN-TO-GIF-REAL-FRAMES",
 "frameCount":num,"uniqueFrameHashCount":unique,
 "imageWidth":meta[0]["width"],"imageHeight":meta[0]["height"],
 "requestedMaxFPS":live["nativeCaptureConfigured"]["maxFPS"],
 "requestedTimeLimitSeconds":live["nativeCaptureConfigured"]["limitSeconds"],
 "noExactCapturePTSClaim":True,
 "frameFirstSourceMtimeUTC":meta[0]["capturedFileMtimeUTC"],
 "frameLastSourceMtimeUTC":meta[-1]["capturedFileMtimeUTC"],
 "sumBytes":sum(x["sourceBytes"] for x in meta),
 "firstSHA256":meta[0]["SHA256"],"lastSHA256":meta[-1]["SHA256"],
 "frameMetadata":meta,"projectExtraMetadata":extra,
 "limits":["NTFS modification timestamps reflect cache write timing, not guaranteed video presentation timestamps; use native ScreenToGif frame metadata only if available",
 "Native screen capture is independent of Playwright screenshot code but does not expose camera matrices",
 "All original screen image pixels and video remain private on owner PC"]}
(D/"X36-ORIGINAL-SCREENTOGIF-REAL-NATIVE-FRAMES-SANITIZED-PROVENANCE.json").write_text(json.dumps(out,indent=2)+"\n",encoding="utf8")
print("X36_NATIVE_FRAME_ARCHIVE",json.dumps({"status":"PASS" if num>=30 and unique>4 else "QUALIFIED",
"count":num,"unique":unique,"dimensions":[out["imageWidth"],out["imageHeight"]],"firstSHA":out["firstSHA256"],
"recordedSpanFileMtime":[out["frameFirstSourceMtimeUTC"],out["frameLastSourceMtimeUTC"]],
"extra":extra,"privateCopied":num},ensure_ascii=False))
