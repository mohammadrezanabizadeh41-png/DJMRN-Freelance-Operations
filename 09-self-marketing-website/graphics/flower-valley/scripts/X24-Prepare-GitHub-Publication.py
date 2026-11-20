#!/usr/bin/env python3
"""X24 owner-controlled public publication allowlist, source-to-Git SHA integrity. NEVER publish original WGDW raw GPU data."""
from pathlib import Path
import json,hashlib,datetime,re
home=Path.home()
root=home/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
source=root/"02-reviewed-derived"/"X24-CURRENT"
destination=home/"Downloads"/"DJMRN-GitHub-Publish-X24"
repo="09-self-marketing-website/graphics/flower-valley"
allow=[
 ("X24-WEBGD-FEASIBILITY-90S-GPU-X01-X23-CROSSWALK-2026-11-20.md","handoffs"),
 ("X24-INDEPENDENT-ACCEPTANCE.json","evidence"),
 ("X24-INDEPENDENT-X01-X23-RECONCILIATION.json","evidence"),
 ("X24-TOOL-SOURCE-INSTALL-AND-ACCESS-CONFIG.json","evidence"),
 ("X24-OWN-FIXTURE-WEBGD-JS-HOOK-RESULT.json","evidence"),
 ("X24-OWN-FIXTURE-INDEPENDENT-WIRE-DECODE.json","evidence"),
 ("X24-LIVE-90S/X24-LIVE-90S-SANITIZED-CAPTURE-TIMELINE.json","evidence"),
 ("X24-ONE-FRAME-SAFE-LIMIT/X24-ONE-FRAME-SANITIZED-RESULT.json","evidence"),
 ("X24-ONEFRAME-INDEPENDENT-WIRE-DECODE.json","evidence"),
 ("X24-Own-Loopback-Webgd-Hook-Probe.cjs","scripts"),
 ("X24-Full-90s-Webgd-JS-Hook-Live-Runner.cjs","scripts"),
 ("X24-OneFrame-Webgd-140MiB-Safe-Size-Gate.cjs","scripts"),
 ("X24-Webgd-WGDW-Independent-Metadata-Decoder.py","scripts"),
 ("X24-Independent-CrossStage-X01-X23-Acceptance.py","scripts"),
 ("X24-Prepare-GitHub-Publication.py","scripts")
]
def sha(b):return hashlib.sha256(b).hexdigest()
def blob(b):return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\x00"+b).hexdigest()
destination.mkdir(parents=True,exist_ok=True)
records=[]
for relative,kind in allow:
 p=source/relative
 if not p.is_file():raise RuntimeError("MISSING_SOURCE "+str(p))
 original=p.read_bytes()
 if b"\x00" in original:raise RuntimeError("BINARY_CANNOT_BE_PUBLISHED "+relative)
 content=original.decode("utf-8-sig").replace("\r\n","\n").replace("\r","\n")
 # Strip ephemeral loopback port when exporting the *owned* synthetic fixture's metadata.
 if relative=="X24-OWN-FIXTURE-INDEPENDENT-WIRE-DECODE.json":
  content=re.sub(r"http://127\.0\.0\.1:\d+/test\.html", "http://127.0.0.1/<owner-fixture>", content)
 # Never include absolute user path, auth tokens or original large vendor binaries in public materials.
 if relative!="X24-Prepare-GitHub-Publication.py" and re.search(
  r"C:\\Users\\|C:/Users/|Bearer\s+[A-Za-z0-9._-]{24,}|BEGIN [^\n]+PRIVATE KEY",content,re.I):
  raise RuntimeError("SENSITIVE_TEXT_BLOCKED "+relative)
 b=content.encode("utf-8")
 if len(b)>350000:raise RuntimeError("OVERSIZED_NONRAW_PUBLIC_FILE "+relative+" "+str(len(b)))
 remote=repo+"/"+kind+"/"+p.name
 dst=destination/remote;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(b)
 records.append({"path":remote,"originalLaptopRelativePath":str(p.relative_to(root)).replace("\\","/"),
  "source_sha256":sha(original),"source_bytes":len(original),
  "published_sha256":sha(b),"published_bytes":len(b),"published_git_blob_sha1":blob(b),
  "contentNormalizedOrSanitized":original!=b,
  "evidenceClass":"OWNER_SCRIPT" if kind=="scripts" else ("OWNER_HANDOFF" if kind=="handoffs" else "SANITIZED_DERIVED_METADATA")})
assert len(records)==15
manifest={
 "schemaVersion":1,"stage":"X24","createdUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "repository":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations","branch":"main",
 "sourceAuthority":"Original vendor site resources canonical only in prior X01-X19 78-path ledger, unchanged",
 "thisStageEvidence":"SCOPE_QUALIFIED: webgd JavaScript-only capture verified; Rust UI/WASM replay BLOCKED",
 "ownerPublicArtifacts":15,"entries":records,
 "explicitExclusions":["PRIVATE original full site WGDW binary (137151592 bytes)","PRIVATE owner-fixture WGDW bytes",
   "Any original vendor shader source, GPU raw blobs/textures or tokens",
   "X24-LIVE-90S-LOCAL-PRIVATE-INDEX.json","X24-ONE-FRAME-LOCAL-PRIVATE-INDEX.json"],
 "noSelfHashToAvoidCircularity":True
}
mp=destination/repo/"evidence"/"X24-PUBLIC-ARTIFACT-SHA256-MANIFEST.json"
mp.parent.mkdir(parents=True,exist_ok=True)
mp.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
for z in records:
 b=(destination/z["path"]).read_bytes()
 assert sha(b)==z["published_sha256"] and blob(b)==z["published_git_blob_sha1"]
print("X24_READY "+json.dumps({"stage":"X24","files":len(records),
 "bytes":sum(r["published_bytes"] for r in records),
 "normalizedOrSanitized":sum(r["contentNormalizedOrSanitized"] for r in records),
 "manifestSHA256":sha(mp.read_bytes()),
 "paths":[{"path":r["path"],"bytes":r["published_bytes"],"blobSha":r["published_git_blob_sha1"]} for r in records]},ensure_ascii=False))
