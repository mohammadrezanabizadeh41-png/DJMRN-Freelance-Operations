#!/usr/bin/env python3
"""X23 R2 allowlisted source-to-public GitHub publication with SHA256 and exact Git blob SHA1; raw vendor GPU/GLSL/preview/PNG excluded."""
from pathlib import Path
import hashlib,json,datetime,re
home=Path.home()
root=home/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
d=root/"02-reviewed-derived"/"X23-CURRENT"/"X23-RERUN-1GB-2026-11-20"
dest=home/"Downloads"/"DJMRN-GitHub-Publish-X23-R2"
prefix="09-self-marketing-website/graphics/flower-valley"
allow=[
 ("X23-R2-1GB-RAM100-FULL-90S-AND-X01-X22-CROSSWALK-2026-11-20.md","handoffs"),
 ("X23-R2-90S-15FRAMES-3SCENES-SANITIZED-RECONCILIATION.json","evidence"),
 ("X23-R2-INDEPENDENT-ACCEPTANCE.json","evidence"),
 ("X23-R2-90S-SANITIZED-ISPETTORE-GPU-TIMELINE.json","evidence"),
 ("X23-R2-RELEASE-INSTALL-1GB-RAM100-RECEIPT.json","evidence"),
 ("X23-R2-Full-90s-Ispettore-1GB-100MiB-RAM-Runner.cjs","scripts"),
 ("X23-R2-Independent-Reconciliation-and-Acceptance.py","scripts"),
 ("X23-R2-Build-Public-Handoff.py","scripts"),
 ("X23-R2-Prepare-GitHub-Publication.py","scripts")
]
def sha(b):return hashlib.sha256(b).hexdigest()
def gitblob(b):return hashlib.sha1(b"blob "+str(len(b)).encode()+b"\x00"+b).hexdigest()
dest.mkdir(parents=True,exist_ok=True)
items=[]
for fname,folder in allow:
 p=d/fname
 if not p.is_file():raise RuntimeError("MISSING "+str(p))
 data=p.read_bytes()
 if b"\x00" in data:raise RuntimeError("RAW_BINARY_FORBIDDEN "+fname)
 text=data.decode("utf-8-sig").replace("\r\n","\n").replace("\r","\n")
 if fname!="X23-R2-Prepare-GitHub-Publication.py" and re.search(
      r"C:\\Users\\|C:/Users/|Bearer\s+[A-Za-z0-9._-]{24,}|BEGIN [^\n]+PRIVATE KEY",text,re.I):
  raise RuntimeError("PRIVATE_TEXT_BLOCKED "+fname)
 output=text.encode("utf-8")
 # Explicit user cap applies to GPU packets. This public artifact allowlist has no lower size-based truncation.
 if len(output)>1_000_000_000:raise RuntimeError("PUB_FILE_EXCEEDS_USER_1GB_LIMIT "+fname)
 name=f"{prefix}/{folder}/{fname}"
 target=dest/name;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(output)
 items.append({"path":name,"ownerOriginRelative":str(p.relative_to(root)).replace("\\","/"),
  "source_sha256":sha(data),"source_bytes":len(data),
  "published_sha256":sha(output),"published_bytes":len(output),
  "gitBlobSHA1":gitblob(output),"newlineOrUtf8Normalized":data!=output,
  "class":"OWNER_AUTHORED_SCRIPT" if folder=="scripts" else "SANITIZED_DERIVED_METADATA_OR_HANDOFF"})
assert len(items)==9
manifest={"stage":"X23-R2","generatedUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "repo":"mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations","branch":"main",
 "originalX23R1":"HISTORICAL preserved 114/114",
 "previousX24":"PRESERVED 66/66",
 "authorizedTransferLimitBytes":1000000000,
 "RAMStopFreeMiB":100,
 "ownerPublicFiles":len(items),"entries":items,
 "canonicalOriginalResources":"X01–X19 original 78-path URL+SHA index; unchanged",
 "privateExcluded":["15 original GPU JSON packets with GLSL","3 original full scene texture data JSON packets","3 source site PNG screenshots","private official unit-test output"],
 "note":"Each source SHA is measured from laptop bytes. Public Git SHA is exact Git blob SHA1. Raw original-site graphics and shaders remain on PC; no circular manifest self hash."
}
mp=dest/prefix/"evidence"/"X23-R2-PUBLIC-SOURCE-TO-GIT-SHA256-MANIFEST.json"
mp.parent.mkdir(parents=True,exist_ok=True)
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
for x in items:
 b=(dest/x["path"]).read_bytes()
 assert sha(b)==x["published_sha256"] and gitblob(b)==x["gitBlobSHA1"]
print("X23_R2_PUBLISH_READY "+json.dumps({"files":len(items),"bytes":sum(x["published_bytes"] for x in items),
 "normalized":sum(x["newlineOrUtf8Normalized"] for x in items),
 "manifestSHA256":sha(mp.read_bytes()),"filenames":[x["path"] for x in items]},ensure_ascii=False))
