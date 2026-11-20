#!/usr/bin/env python3
"""DJMRN X34 independent raw PC-byte vs actual GitHub read-back blob SHA receipt.
The 10 GitHub blob hashes were READ BACK from GitHub Contents API after creation.
Owner-generated source and sanitized analysis only; private vendor camera GLB stays PC-only.
"""
from pathlib import Path
import json,hashlib
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X34-CURRENT"
base="09-self-marketing-website/graphics/flower-valley/"
files=[
 ("scripts/","X34-GLTF-CAMERA-ANIMATION-90S-Public-ReadOnly.cjs","bd7ae095e16c79f4c2601976504aeb8cfe929080"),
 ("scripts/","X34-Original-OwnCamera-GLTFTransform-Khronos-And-PublicReference-Structural-Analysis.cjs","c06b32d811153f6f6501558eb7865c1099b4e750"),
 ("scripts/","X34-OWN-GltfLoader-AnimationMixer-Viewer.html","dd42d271249157632706e6b760d3426c602a49c0"),
 ("scripts/","X34-ThreeJS-OWN-Camera-Animation-and-X31-GLB-Viewer-GPU-Test.cjs","a30d6507bf729b0acb65dcec500aeed5365a8966"),
 ("scripts/","X34-Independent-Original-GLTF-Camera-Owner-GPU-and-90S-X01-X33-Acceptance.py","89f6ba5181ca68e6aee2a03afabeb7e43f504565"),
 ("evidence/","X34-90S-LIVE-CAMERA-RESOURCE-PUBLIC-READONLY-X01-X33-TIMELINE.json","9d4e7c10342b954aebf02a6194bd11507e61b37c"),
 ("evidence/","X34-GLTF-TRANSFORM-KHRONOS-OWNER-ANIMATION-CAMERA-AND-PRIVATE-REFERENCE-STRUCTURE.json","74eeac941486708b004a8370ce85eb05ed1e0040"),
 ("evidence/","X34-OWN-THREEJS-GLTFLOADER-ANIMATIONMIXER-LOCAL-GPU-VIEWER-RESULT.json","19bd031ed5983aa222a79403a7e8274924c1f123"),
 ("evidence/","X34-INDEPENDENT-GLTF-CAMERA-GPU-VIEWER-LIVE90-X01-X33-ACCEPTANCE.json","10472cd08be4855154437e1e9ddf9d9b8c6b9c96"),
 ("handoffs/","X34-FULL-GLTF-CAMERA-ANIMATION-KHRONOS-THREE-OWN-GPU-90S-LIVE-X01-X33-FINAL-HANDOFF-2026-11-21.md","0fbacf6a3d8c8a42b3f0e9b9d72779fdfed710dc")
]
def blob(buf):return hashlib.sha1(b"blob "+str(len(buf)).encode("ascii")+b"\0"+buf).hexdigest()
rows=[]
for folder,name,g in files:
 data=(D/name).read_bytes()
 local=blob(data)
 rows.append({"name":name,"githubPath":base+folder+name,
  "bytes":len(data),"localSha256":hashlib.sha256(data).hexdigest(),
  "localGitBlobSHA1":local,"githubContentsReadbackBlobSHA1":g,"exact":local==g})
live=json.loads((D/"X34-90S-LIVE-CAMERA-RESOURCE-PUBLIC-READONLY-X01-X33-TIMELINE.json").read_text(encoding="utf8"))
result={"stage":"X34","stableObservationUTC":live["startUTC"],"repo":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations",
 "method":"independent PC raw UTF8/CRLF bytes Git blob SHA1 vs actual GitHub Contents API blob SHA after all remote writes",
 "scope":"10 code/evidence/final report; raw camera GLB, vendor binary, original animation keyframes, owner GPU screenshots PRIVATE; checker+manifest separate extra pair",
 "total":len(rows),"passed":sum(x["exact"] for x in rows),"status":"PASS" if all(x["exact"] for x in rows) else "FAIL","files":rows}
(D/"X34-PC-GITHUB-RAW-BYTE-EXACT-SHA256-MANIFEST.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("X34_PC_GITHUB",result["status"],result["passed"],"/",result["total"])
for x in rows:print("X34_RECONCILE",x["name"],"PASS" if x["exact"] else "FAIL",x["localGitBlobSHA1"])
if result["status"]!="PASS":raise SystemExit(1)
