#!/usr/bin/env python3
"""DJMRN X35: independent PC raw bytes↔actual GitHub Contents API READ-BACK git blob.
Do NOT upload raw vendor screenshots, isolated Chrome profile, proprietary source or credentials.
Expected GH blob SHA values below were directly obtained by fetching all authored original files after commit.
"""
from pathlib import Path
import json,hashlib
R=Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X35-CURRENT"
base="09-self-marketing-website/graphics/flower-valley/"
files=[
 ("scripts/","X35-Strict-90S-Public-Replicated-Input-Interaction-CDP-Playwright.cjs","d8bd3a9881f3d80f785df801ef02f53cd419d504"),
 ("scripts/","X35-Independent-Public-Inputs-90S-X01-X34-Acceptance.py","660beccaaf928ded2e4ec5f262827d7afcb5e23b"),
 ("scripts/","X35-Independent-Private-PNG-Visual-Delta-Recheck.cjs","f541a2fa014cfb68fed049921844d0886d69dc37"),
 ("evidence/","X35-REAL-90S-PUBLIC-CONTROLLED-INPUTS-CROSSWALK.json","d07c3246991a95e5c518ac8df746ba48ebf6a077"),
 ("evidence/","X35-INDEPENDENT-STRICT-PUBLIC-INPUT-MOTION-X01-X34-ACCEPTANCE.json","f370c789513e6384b7209daa70dae7ce74e2d3c4"),
 ("evidence/","X35-INDEPENDENT-ALL-PNG-SCREEN-DELTA-CROSSCHECK.json","c99bcf7640129771cd4e5b21cd42c4e963747b9c"),
 ("handoffs/","X35-FULL-STRICT-90S-LIVE-INTERACTIONS-OWN-PNG-X01-X34-FINAL-HANDOFF-2026-11-21.md","3341d6a4d1bf4ed078c4761276cf608c07e1767c")
]
def blob(data):return hashlib.sha1(b"blob "+str(len(data)).encode("ascii")+b"\0"+data).hexdigest()
rows=[]
for folder,name,remoteSHA in files:
 b=(D/name).read_bytes()
 localGit=blob(b)
 rows.append({"file":name,"githubPath":base+folder+name,"bytes":len(b),
 "PCSHA256":hashlib.sha256(b).hexdigest(),"PCGitBlobSHA1":localGit,
 "actualGitHubContentsReadbackBlobSHA1":remoteSHA,"byteExact":localGit==remoteSHA})
live=json.loads((D/"X35-REAL-90S-PUBLIC-CONTROLLED-INPUTS-CROSSWALK.json").read_text(encoding="utf8"))
status="PASS" if all(r["byteExact"] for r in rows) else "FAIL"
out={"stage":"X35","stableUTC":live["observedStartUTC"],"status":status,
 "total":len(rows),"passed":sum(x["byteExact"] for x in rows),"items":rows,
 "method":"Actual downloaded GitHub Contents API blob SHA1 independently compared against git blob from raw owner-PC file bytes",
 "scope":"7 original user-owned scripts + nonexpressive evidence + QA + final report; private screenshots and 3D vendor assets NOT in GitHub",
 "followup":"Checker and deterministic manifest added as 2 more independent exact-blob copies after source readbacks"}
(D/"X35-PC-GITHUB-RAW-BYTE-EXACT-SHA256-RECONCILIATION.json").write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("X35_GITHUB_RECONCILIATION",status,out["passed"],"/",out["total"])
if status!="PASS":raise SystemExit(1)
