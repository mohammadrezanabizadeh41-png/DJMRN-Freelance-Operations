#!/usr/bin/env python3
"""DJMRN X32: independently recompute PC original bytes and compare to GitHub Connector read-back SHA."""
from pathlib import Path
import hashlib,json,datetime
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X32-CURRENT"
base="09-self-marketing-website/graphics/flower-valley/"
recs=[
("scripts/","X32-OWN-RenderDoc-Native-D3D11-Grid-Points-Instancing.cpp","97bd02fba36bb04027cb4930cadb0219df526d6b"),
("scripts/","X32-Build-90S-Public-ReadOnly-Runner.cjs","a8e79a7360c8e0b506e95d44e66ba33d5f6dfcec"),
("scripts/","X32-Native-RenderDoc-Feasibility-90s-Public-ReadOnly.cjs","693c6763f96c18053f6c5d2e5c7f49f386d6444e"),
("scripts/","X32-OWN-Chrome157-ANGLE-D3D11-WebGL2-Feasibility.cjs","fe4acdd1a094a231d2c7dd4b8a38dee1b073d819"),
("scripts/","X32-Independent-Owner-RenderDoc-90S-Live-X01-X31-Acceptance.py","4f748defb82d6686c62c5ef7a0a7992e1e829fac"),
("scripts/","X32-Official-RenderDoc-Source-Local-Preflight.py","35942a1c9f55200af8f4686c22ac2c41612d50eb"),
("evidence/","X32-90S-LIVE-READONLY-RENDERDOC-NO-VENDOR-INJECTION-X01-X31-TIMELINE.json","45d55f3de16e6b90d98e38a3015e7b20485ddbb4"),
("evidence/","X32-OWN-CHROME157-ANGLE-D3D11-WEBGL2-FEASIBILITY.json","5838305d70862fc3e9091842fac52a3a4590bd69"),
("evidence/","X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json","a41c5018ef2a5815f721f460bd1e18a585f67394"),
("evidence/","X32-OFFICIAL-RENDERDOC-1.47-SOURCE-LOCAL-PREFLIGHT-AND-OWNER-RECEIPT.json","9ae2139a51cc7e199c28cc1215a9f9a2f8dd2930"),
("handoffs/","X32-FULL-RENDERDOC-NATIVE-OWN-VEGA8-90S-LIVE-X01-X31-FINAL-HANDOFF-2026-11-20.md","6b806814d81502ac43ade85149d179808d233434")
]
results=[]
for folder,name,blob in recs:
 data=(D/name).read_bytes()
 computed=hashlib.sha1(b"blob "+str(len(data)).encode("ascii")+b"\0"+data).hexdigest()
 results.append({"name":name,"githubPath":base+folder+name,"size":len(data),
  "localSHA256":hashlib.sha256(data).hexdigest(),
  "localGitBlob":computed,"githubConnectorReadbackGitBlob":blob,
  "exactPCtoGithub":computed==blob})
out={"stage":"X32","generatedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "repo":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations",
 "branch":"main","method":"PC original raw bytes Git blob independently computed vs GitHub connected contents API read-back SHA",
 "scope":"only owner-authored scripts and sanitized evidence; proprietary vendor frames and raw RDC/XML/images never mirrored",
 "total":len(results),"passed":sum(x["exactPCtoGithub"] for x in results),
 "status":"PASS" if all(x["exactPCtoGithub"] for x in results) else "FAIL","files":results}
(D/"X32-PC-GITHUB-BYTE-EXACT-SHA256-MANIFEST.json").write_text(json.dumps(out,indent=2)+"\n",encoding="utf-8")
print("X32_RAW_PC_GITHUB_BYTE_EQUAL",out["status"],out["passed"],"/",out["total"])
for f in results:print(("PASS" if f["exactPCtoGithub"] else "FAIL"),f["name"],f["size"],f["localGitBlob"])
if out["status"]!="PASS":raise SystemExit(1)
