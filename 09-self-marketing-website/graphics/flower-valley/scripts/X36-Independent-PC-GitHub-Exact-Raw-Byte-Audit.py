#!/usr/bin/env python3
"""X36 independent exact raw PC bytes vs actual GitHub Contents API returned original blob SHA1.
No vendor native images or privacy-sensitive browser profile ever uploaded.
"""
import hashlib,json
from pathlib import Path
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X36-CURRENT"
base="09-self-marketing-website/graphics/flower-valley/"
files=[
 ("scripts/","X36-Independent-Visible-Chrome-ScreenToGif-90S-Site-Runner.cjs","a657fd291dbe8505b0c11968c950e6f476e86917"),
 ("scripts/","X36-Independent-ScreenToGif-Native-Frame-Archive.py","5f52d73741e653914664701f0259fa8d00b87350"),
 ("scripts/","X36-Independent-Native-ScreenToGif-Frame-Temporal-RGB.cjs","76cd26ab9f919360dc6bf55e6022eea3d7bf6a38"),
 ("scripts/","X36-Independent-Native-ScreenToGif-Project-Frame-Timings.py","6f709920eed7d77d1c88c4c0c5b983c43202d882"),
 ("scripts/","X36-Independent-Native-Video-Site-X01-X35-Acceptance.py","fac20700b77d9bf6b1e6c5e4ee7325bdd24833e5"),
 ("evidence/","X36-NEW-90S-LIVE-PUBLIC-WEBGL-AND-NATIVE-ROI-OBSERVATION.json","55b8fbb14b4ba14a17d0a64a0de66a1204377e10"),
 ("evidence/","X36-ORIGINAL-SCREENTOGIF-REAL-NATIVE-FRAMES-SANITIZED-PROVENANCE.json","245aab206c8aebfb9df2c358b9ed5b8025f2b2f6"),
 ("evidence/","X36-INDEPENDENT-NATIVE-FRAME-TEMPORAL-RGB-X35-CROSSWALK.json","7c390c8c5115cd7cf6b499abe6552fe36f8cf8ef"),
 ("evidence/","X36-ORIGINAL-SCREENTOGIF-NATIVE-108-FRAME-DURATIONS.json","3dac405d75d0003b3f7334f6c1f46c055aa4081a"),
 ("evidence/","X36-INDEPENDENT-NATIVE-SCREENTOGIF-90S-LIVE-X01-X35-ACCEPTANCE.json","2ac43d550832f7177e689f19ca9dd4234f1cae5c"),
 ("handoffs/","X36-FULL-REAL-NATIVE-SCREENTOGIF-ROI-FRAMES-TIMECODES-90S-LIVE-X01-X35-FINAL-HANDOFF-2026-11-21.md","93b555545b6a2200fd79ed33f3e3dcff677fcdfd")
]
def gitsha(x):return hashlib.sha1(b"blob "+str(len(x)).encode("ascii")+b"\0"+x).hexdigest()
rows=[]
for folder,name,remote in files:
 buf=(D/name).read_bytes()
 rows.append({"name":name,"path":base+folder+name,"bytes":len(buf),"pcSHA256":hashlib.sha256(buf).hexdigest(),
  "pcGitBlobSHA1":gitsha(buf),"gitHubActuallyReadBackBlobSHA1":remote,"byteExact":gitsha(buf)==remote})
live=json.loads((D/"X36-NEW-90S-LIVE-PUBLIC-WEBGL-AND-NATIVE-ROI-OBSERVATION.json").read_text(encoding="utf8"))
out={"stage":"X36","stableUTC":live["liveStartedUTC"],"authority":"owner PC authored bytes + GitHub actual Contents API blob readback",
 "status":"PASS" if all(x["byteExact"] for x in rows) else "FAIL",
 "total":len(rows),"passed":sum(x["byteExact"] for x in rows),"items":rows,
 "scope":"11 owner authored scripts / safe numerical metadata / QA / final handoff. Native ScreensToGif original screenshot frames and Project.json kept private.",
 "extra":"Checker source + this deterministic manifest independently added to GitHub as separate extra pair; count them separately once their GitHub SHA verified."}
(D/"X36-PC-GITHUB-SANITIZED-RAW-BYTE-EXACT-MANIFEST.json").write_text(json.dumps(out,indent=2)+"\n",encoding="utf8")
print("X36_PC_GITHUB_EXACT",out["status"],out["passed"],"/",out["total"])
if out["status"]!="PASS":raise SystemExit(1)
