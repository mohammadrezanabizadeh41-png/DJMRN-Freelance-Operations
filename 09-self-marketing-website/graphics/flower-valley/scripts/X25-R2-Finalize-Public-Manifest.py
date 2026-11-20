# DJMRN X25 byte-for-byte source identity verifier, comparing original files to GitHub connector-fetched blob IDs.
# Usage: py -3 X25-R2-Finalize-Public-Manifest.py <this-script-current-github-blob-sha1>
import pathlib,hashlib,json,sys,re
D=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"/"02-reviewed-derived"/"X25-CURRENT"
M=D/"X25-R2-PUBLIC-SOURCE-AND-RECEIPT-SHA256-MANIFEST.json"
x=json.loads(M.read_text(encoding="utf-8-sig"))
SELF="X25-R2-Finalize-Public-Manifest.py"
if len(sys.argv)!=2 or re.fullmatch(r"[0-9a-f]{40}",sys.argv[1]) is None:
 raise SystemExit("EXPECTED_SELF_GITHUB_BLOB_SHA1_REQUIRED")
for row in x["rows"]:
 if row["path"].endswith("/X25-R2-WEBGL-DEVELOPER-TOOL-135S-FULL-X01-X24-HANDOFF-2026-11-20.md"):
  row["githubCurrentBlobSha1"]="3e689e89cb741a3df5cf4a7476a916ddbd9ec28f"
if not any(r["path"].endswith("/"+SELF) for r in x["rows"]):
 x["rows"].append({"path":"09-self-marketing-website/graphics/flower-valley/scripts/"+SELF,
  "githubCurrentBlobSha1":sys.argv[1],"privateVendorContentPublished":False})
for row in x["rows"]:
 p=D/pathlib.Path(row["path"]).name
 if not p.is_file():raise SystemExit("FILE_MISSING "+p.name)
 content=p.read_bytes()
 row["bytes"]=len(content)
 row["sha256"]=hashlib.sha256(content).hexdigest()
 row["gitBlobSha1"]=hashlib.sha1(b"blob "+str(len(content)).encode("ascii")+bytes([0])+content).hexdigest()
 row["verifiedGitBlobByteIdentity"]=row["gitBlobSha1"]==row["githubCurrentBlobSha1"]
 if not row["verifiedGitBlobByteIdentity"]:raise SystemExit("GITHUB_BLOB_MISMATCH "+p.name+" PC="+row["gitBlobSha1"]+" GITHUB="+row["githubCurrentBlobSha1"])
x["records"]=len(x["rows"])
x["passed"]=sum(r["verifiedGitBlobByteIdentity"] for r in x["rows"])
x["allPass"]=x["passed"]==x["records"]
x["status"]="VERIFIED_EXACT_LOCAL_PC_BYTES_MATCH_GITHUB_BLOBS"
assert x["allPass"] and x["records"]==8
M.write_text(json.dumps(x,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"status":x["status"],"passed":x["passed"],"total":x["records"],"manifest":M.name,"blobs":[{"file":pathlib.Path(r["path"]).name,"sha256":r["sha256"],"gitBlob":r["gitBlobSha1"]} for r in x["rows"]]}))