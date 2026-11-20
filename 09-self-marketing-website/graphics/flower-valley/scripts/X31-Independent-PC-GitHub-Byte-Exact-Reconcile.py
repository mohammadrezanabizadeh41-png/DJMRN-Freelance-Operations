#!/usr/bin/env python3
"""DJMRN X31 independently check local file Git blob SHA vs read-back GitHub content SHAs."""
from pathlib import Path
from hashlib import sha1,sha256
import json,datetime
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X31-CURRENT"
root="09-self-marketing-website/graphics/flower-valley/"
FILES=[
("fixtures/","X31-OWN-LargeGrid-Points-Instancing-WebGL2.html","f72823589ee516d1e40040536ec3b322802f136b"),
("scripts/","X31-Official-MeshGrab-Owner-MV3-Chrome157-Real-GLB-Capture.cjs","c904aaf020e00d382fb4fd1edd138806fb103662"),
("scripts/","X31-Build-Official-MeshGrab-Live-ReadOnly-Runner.cjs","5caab7a4108ac62750e99ff64efc73e745d3ce4c"),
("scripts/","X31-Official-MeshGrab-90s-LIVE-Public-ReadOnly.cjs","c4e347df425379f1caed6d747a635192360f3d9c"),
("scripts/","X31-Independent-Real-Owner-GLB-And-X01-X30-Acceptance.py","81994e8833907a4318fae76a7647cf927bcefcd4"),
("scripts/","X31-Own-Khronos-GLTF-Validator.cjs","56b4146bf82404cf7464e0ed6da9781aed6dcd6d"),
("scripts/","X31-Independent-X01-X30-OWN-GLB-90s-LIVE-Acceptance.py","adda86c1dc26a8bc4c56c6e4678d40d3809a0be3"),
("evidence/","X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json","83d1d3383663021391583dcaaf1d1a11e7baec4a"),
("evidence/","X31-OWN-KHRONOS-GLTF-VALIDATOR.json","6cd81179d8a3e90dfc492e35ee6e8b0aab9662f3"),
("evidence/","X31-INDEPENDENT-REAL-OWNER-GLB-AND-X01-X30-ACCEPTANCE.json","ad3db27e62c74af1a1412a4bbccd872e576c5318"),
("evidence/","X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json","aa4735e985600fc488206b0d4cb0bb08425eac98"),
("evidence/","X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json","e49aa652f598b1dab3251946b37dd662895eb386")
]
out={"stage":"X31","kind":"PC actual bytes compared to independently GitHub API read-back blob SHAs",
 "repo":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations","branch":"main",
 "verificationTimeUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),"source":"GitHub connector read-back SHAs at 2026-11-20; local PC original Python SHA1 Git object calculations",
 "files":[]}
for folder,name,expected in FILES:
 b=(D/name).read_bytes()
 gitsha=sha1(b"blob "+str(len(b)).encode()+b"\0"+b).hexdigest()
 out["files"].append({"filename":name,"githubPath":root+folder+name,
  "localBytes":len(b),"localSHA256":sha256(b).hexdigest(),
  "gitBlobPC":gitsha,"gitBlobGitHubReadBack":expected,"exactByteMatch":gitsha==expected})
out["passed"]=sum(f["exactByteMatch"] for f in out["files"])
out["total"]=len(out["files"])
out["status"]="PASS" if out["passed"]==out["total"] else "FAIL"
(D/"X31-PC-GITHUB-BYTE-EXACT-SHA256-MANIFEST.json").write_text(json.dumps(out,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print("X31_PC_GITHUB_MANIFEST",out["status"],out["passed"],"/",out["total"])
for f in out["files"]:
 print(("PASS " if f["exactByteMatch"] else "FAIL ")+f["filename"]+" "+f["gitBlobPC"])
if out["status"]!="PASS":raise SystemExit(1)
