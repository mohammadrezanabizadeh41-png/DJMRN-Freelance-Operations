#!/usr/bin/env python3
"""DJMRN X23 explicit owner publication: allowlist, sanitize, SHA provenance, Git blob identities."""
from pathlib import Path
import hashlib,json,re,datetime
home=Path.home()
root=home/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
src=root/"02-reviewed-derived"/"X23-CURRENT"
stage=home/"Downloads"/"DJMRN-GitHub-Publish-X23"
repo="09-self-marketing-website/graphics/flower-valley"
allow=[
 ("X23-ISPETTORE-90S-FULL-GPU-X01-X22-CROSSWALK-2026-11-20.md","handoffs"),
 ("X23-OWN-FIXTURE-ISPETTORE-ACCEPTANCE.json","evidence"),
 ("X23-TOOL-INSTALL-CONFIG-AND-RELEASE-VERIFICATION.json","evidence"),
 ("X23-INDEPENDENT-X01-X22-RECONCILIATION.json","evidence"),
 ("X23-INDEPENDENT-ACCEPTANCE.json","evidence"),
 ("X23-LIVE-90S/X23-90S-SANITIZED-ISPETTORE-GPU-TIMELINE.json","evidence"),
 ("X23-Own-Loopback-Ispettore-Probe.cjs","scripts"),
 ("X23-LIVE-90S/X23-Full-90s-Ispettore-Live-Frame-Runner.cjs","scripts"),
 ("X23-Independent-Reconcile-X01-X22.py","scripts"),
 ("X23-Prepare-GitHub-Publication.py","scripts")
]
def sha(b):return hashlib.sha256(b).hexdigest()
def git_blob(b):return hashlib.sha1(("blob "+str(len(b))+"\0").encode()+b).hexdigest()
stage.mkdir(parents=True,exist_ok=True)
records=[]
for name,dest in allow:
 p=src/name
 if not p.exists():raise RuntimeError("MISSING "+str(p))
 old=p.read_bytes()
 if b"\0" in old:raise RuntimeError("BINARY NOT ALLOWED "+str(p))
 content=old.decode("utf-8-sig").replace("\r\n","\n").replace("\r","\n")
 # third party source binary or raw GPU packets are NOT in allowlist.
 if name != "X23-Prepare-GitHub-Publication.py" and re.search(r"C:\\Users\\|C:/Users/|Bearer\s+[-A-Za-z0-9._]{24,}|BEGIN [^\n]*PRIVATE KEY",content,re.I):
  raise RuntimeError("PRIVATE_STRING_BLOCKED "+name)
 if len(content.encode("utf-8"))>250000:raise RuntimeError("LARGE_UNVERIFIED_ARTIFACT")
 target=repo+"/"+dest+"/"+Path(name).name
 output=stage/target;output.parent.mkdir(parents=True,exist_ok=True);output.write_bytes(content.encode("utf-8"))
 b=output.read_bytes()
 records.append({"path":target,"privateOwnerOrigin":str(p.relative_to(root)).replace("\\","/"),
  "source_sha256":sha(old),"source_bytes":len(old),"published_sha256":sha(b),
  "published_bytes":len(b),"published_git_blob_sha1":git_blob(b),
  "newline_or_BOM_normalized":old!=b,"class":("OWNER_CODE" if output.suffix in (".py",".cjs") else "SANITIZED_METADATA_OR_HANDOFF")})
assert len(records)==10
manifest={
 "stage":"X23","schemaVersion":1,"createdUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "repository":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations","branch":"main",
 "ownerAuthoredArtifacts":10,"entries":records,
 "canonicalOriginalWebsiteResourceURLSHAAuthority":"X01–X19 original 78-path ledger; unchanged, no new original body for X23",
 "externalThirdPartyRawShaderAndGPUPreviews":"PRIVATE ON LAPTOP ONLY — NOT INCLUDED",
 "privateCaptureDirectory":"01-private-captures/X23/","officialSourceArchive":"VERIFIED SHA in X23-TOOL-INSTALL-CONFIG-AND-RELEASE-VERIFICATION.json",
 "note":"All SHA256 values derived directly from source bytes; Git blob SHA1 derived from exact public byte contents. This file excludes its own SHA to avoid circularity."
}
mp=stage/repo/"evidence"/"X23-PUBLIC-ARTIFACT-SHA256-MANIFEST.json"
mp.parent.mkdir(parents=True,exist_ok=True)
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
for x in records:
 b=(stage/x["path"]).read_bytes()
 assert sha(b)==x["published_sha256"]
 assert git_blob(b)==x["published_git_blob_sha1"]
print("X23_PUBLISH_PREP "+json.dumps({"allowedFiles":len(records),"manifest":str(mp),"manifestSha256":sha(mp.read_bytes()),
 "bytes":sum(x["published_bytes"] for x in records),"normalizedFiles":sum(x["newline_or_BOM_normalized"] for x in records),
 "files":[{"path":x["path"],"bytes":x["published_bytes"],"sha":x["published_sha256"]} for x in records]},ensure_ascii=False))
