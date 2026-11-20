#!/usr/bin/env python3
"""DJMRN X33: independent local actual bytes vs GitHub connector Contents-API readback Git blobs.
The expected GitHub SHA values below were obtained from actual create+fetch readbacks in this stage.
No client credentials / private renderdoc transcript / RDC uploaded.
"""
import json,hashlib,pathlib
R=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X33-CURRENT"
base="09-self-marketing-website/graphics/flower-valley/"
matrix=[
("scripts/","X33-RenderDoc-MCP-90s-Public-ReadOnly.cjs","7d4d23c2a70cd0684888dd1a72426fcda109e89f"),
("scripts/","X33-Real-RenderDoc-MCP-Owner-RDC-JSONRPC-Client.py","d5a728b76a9171bc6bd35b5a642ce574d56935c2"),
("scripts/","X33-Independent-Real-MCP-Private-Source-To-Public-X01-X32-Audit.py","5ea3fd32231e6f1018e42c8dead05f763c71ac97"),
("evidence/","X33-90S-LIVE-READONLY-RENDERDOC-MCP-NO-VENDOR-INJECTION-X01-X32-TIMELINE.json","6e6fce7013c7d9b501de2e000de3fbabbcb1a686"),
("evidence/","X33-SANITIZED-AUTHENTIC-MCP-REPLAY-90S-X01-X32-CROSSWALK.json","8f0e46ca916bf6ba28fa64ddc893e2c31fb4ebd8"),
("evidence/","X33-INDEPENDENT-X01-X32-MCP-REPLAY-AND-LIVE-ACCEPTANCE.json","5d209be489eafa1cee286e6cd7d3e7356b49078e"),
("handoffs/","X33-FULL-RENDERDOC-MCP-NATIVE-OWNER-REPLAY-90S-LIVE-X01-X32-FINAL-HANDOFF-2026-11-20.md","2eb3c624e252c9c3d9ec88042aa279535493e9be")
]
rows=[]
for folder,name,ghblob in matrix:
 data=(D/name).read_bytes()
 blob=hashlib.sha1(b"blob "+str(len(data)).encode("ascii")+b"\0"+data).hexdigest()
 rows.append({"filename":name,"githubPath":base+folder+name,
 "sizeBytes":len(data),"PC_SHA256":hashlib.sha256(data).hexdigest(),
 "PC_GitBlob":blob,"realGitHubContentsReadbackBlob":ghblob,"byteExact":blob==ghblob})
live=json.loads((D/"X33-90S-LIVE-READONLY-RENDERDOC-MCP-NO-VENDOR-INJECTION-X01-X32-TIMELINE.json").read_text(encoding="utf8"))
receipt={"stage":"X33","stableObservationUTC":live["startUTC"],
 "scope":"7 original owner code and numerically safe GitHub files, not the private original RDC, MCP raw transcript, screenshot, site asset",
 "method":"Independently hash PC bytes as Git blob SHA1 and compare with actual GitHub Contents API SHA readback after remote creation",
 "exact":all(x["byteExact"] for x in rows),"total":len(rows),"passed":sum(x["byteExact"] for x in rows),"items":rows}
(D/"X33-INDEPENDENT-PC-GITHUB-SHA256-BLOB-EXACT-MANIFEST.json").write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("X33_PC_GITHUB_RAW_BYTES",receipt["passed"],"/",receipt["total"],"PASS" if receipt["exact"] else "FAIL")
for x in rows:print(x["filename"],"PASS" if x["byteExact"] else "FAIL",x["PC_GitBlob"])
if not receipt["exact"]:raise SystemExit(1)
