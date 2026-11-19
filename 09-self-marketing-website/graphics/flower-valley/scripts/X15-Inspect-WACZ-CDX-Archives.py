#!/usr/bin/env python3
"""DJMRN X15: verify locally stored WACZ/HTZ containers without network or third-party packages."""
import os, json, hashlib, zipfile, glob
from pathlib import Path
from urllib.parse import urlsplit

root = Path.home() / "Desktop" / "DJMRN-Website-Reference-Evidence" / "fernhollow-gladeye-20261118-NEW-EXTRACTION"
cap = root / "01-private-captures"
der = root / "02-reviewed-derived"
out_dir = der / "X15-AUDIT-CURRENT"
out_dir.mkdir(parents=True, exist_ok=True)
expected_sha = {
    "20261118200912959.htz":"49ac45afa4cda9ea3dbc2b639ae2250c31b82fa8137b42279ff26e0ad9a01f22",
    "DJMRN-Gladeye-X10-20261118221034088.wacz":"df5b9e55e4e18419784a9f4479d9f4b0a65d99589ed1ab682e2b0f1ae0498bf2",
    "gladeye-true180-archivebox.wacz":"75c0e48927bfd77bf8de7a43747d79cea6e0b9445b4e8e3d9a9581ddae60a106",
}
def win_long(p):
    s=os.path.abspath(str(p))
    prefix=chr(92)*2 + '?' + chr(92)
    if os.name=='nt' and len(s)>240 and not s.startswith(prefix):
        return prefix+s
    return s

def sha256_file(f):
    h=hashlib.sha256()
    with open(win_long(f),"rb") as fp:
        while True:
            b=fp.read(1024*1024)
            if not b: break
            h.update(b)
    return h.hexdigest()
def canonical_url(url):
    try:
        u=urlsplit(url)
        if not u.scheme in ("http","https"):return None
        if u.hostname not in ("www.gladeye.com","gladeye.com"):return None
        p=u.path or "/"
        return f"{u.scheme}://{u.netloc}"+(p if p=="/" else p.rstrip("/"))
    except Exception:return None

paths=[]
for stage in ("X08","X10","X11"):
    folder=cap/stage
    if not folder.is_dir():continue
    paths.extend(Path(f) for f in glob.glob(str(folder/"**"/"*.wacz"),recursive=True))
    paths.extend(Path(f) for f in glob.glob(str(folder/"**"/"*.htz"),recursive=True))
archives=[]; x10_index=[]
for filepath in sorted(set(paths)):
    relative=filepath.relative_to(root).as_posix()
    stage="X"+relative.split("/")[1][1:3]
    out={"stage":stage,"relativePath":relative,"size":os.stat(win_long(filepath)).st_size,"sha256":sha256_file(filepath),"expectedSHA256":expected_sha.get(filepath.name),"expectedHashMatches":None,"isZip":zipfile.is_zipfile(win_long(filepath)),"zipMemberCount":None,"crcValid":None,"cdxjRecordCount":0,"cdxjFirstPartyPathCount":0,"cdxjFirstPartyPathRecords":[],"zipContentSuffixCounts":{},"errors":[]}
    if out["expectedSHA256"]:out["expectedHashMatches"]=out["sha256"]==out["expectedSHA256"]
    if out["isZip"]:
        try:
            with zipfile.ZipFile(win_long(filepath),"r") as z:
                names=z.namelist();out["zipMemberCount"]=len(names)
                suffixes={}
                for name in names:
                    extension=Path(name).suffix.lower() or "[none]"
                    suffixes[extension]=suffixes.get(extension,0)+1
                out["zipContentSuffixCounts"]=suffixes
                bad=z.testzip()
                out["crcValid"]=bad is None
                if bad:out["errors"].append("ZIP_CRC_FAILED_MEMBER_REDACTED")
                for name in names:
                    if name.lower().endswith(".cdxj"):
                        raw=z.read(name).decode("utf-8",errors="replace")
                        for line in raw.splitlines():
                            split=line.split(" ",2)
                            if len(split)<3:continue
                            try:datum=json.loads(split[2])
                            except Exception:continue
                            out["cdxjRecordCount"]+=1
                            u=canonical_url(str(datum.get("url") or ""))
                            if u is not None:
                                status=datum.get("status")
                                out["cdxjFirstPartyPathRecords"].append({"url":u,"status":status,"mime":str(datum.get("mime") or "")[:80],"sourceArchiveMember":name})
                                if stage=="X10":x10_index.append({"url":u,"status":status,"archiveSHA256":out["sha256"],"archive":relative})
                        out["cdxjFirstPartyPathCount"]=len({r["url"] for r in out["cdxjFirstPartyPathRecords"]})
                        # Do not preserve CDXJ querystrings, original response headers, cookies or payloads.
        except Exception as exc:out["errors"].append(type(exc).__name__+": "+str(exc)[:170])
    archives.append(out)
summary={
 "totalArchiveFiles":len(archives),
 "validZipContainers":sum(bool(x["isZip"]) for x in archives),
 "zipCrcPass":sum(x["crcValid"] is True for x in archives),
 "expectedSHA256Pass":sum(x["expectedHashMatches"] is True for x in archives),
 "expectedSHA256Fail":sum(x["expectedHashMatches"] is False for x in archives),
 "x10FirstPartyCDXRecords":len(x10_index),
 "x10UniqueFirstPartyCDXURLPaths":len(set(r["url"] for r in x10_index)),
 "x10WARCStatusCounts":{str(s):sum(1 for x in x10_index if str(x["status"])==str(s)) for s in sorted(set(str(x["status"]) for x in x10_index))},
 "archiveProvenance":"All evidence read from owner Desktop local ZIP containers, no additional internet crawl or original third-party raw content published"
}
output={"stage":"X15","method":"Python 3.14 standard-library zipfile/sha256 introspection","status":"LOCAL_CONTAINER_AUDIT_COMPLETE" if summary["expectedSHA256Fail"]==0 else "EXPECTED_HASH_MISMATCH_REVIEW","archives":archives,"x10CdxFirstPartyUrlRows":x10_index,"summary":summary,"limitations":["CDXJ reflects archive index entries, not every possible site URL or camera frame","Archive ZIP checksum does not imply browser WebGL replay fidelity","WARC record bodies are embedded inside the archived compressed WARC files, and no raw site bodies were extracted or published by this test","Some local fixtures were intentionally captured from an owner-authored page; do not treat them as live Gladeye references"]}
p=out_dir/"X15-archive-container-and-X10-CDX-index.json"
p.write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding="utf-8")
print("X15_ARCHIVE_INDEX_DONE",json.dumps({"output":str(p),"summary":summary,"selected":[{"stage":v["stage"],"filename":Path(v["relativePath"]).name,"bytes":v["size"],"zipMembers":v["zipMemberCount"],"cdxRecords":v["cdxjRecordCount"],"firstPartyPaths":v["cdxjFirstPartyPathCount"],"crcValid":v["crcValid"],"expectedSHA":v["expectedHashMatches"]} for v in archives if v["expectedSHA256"] or (v["stage"]=="X10" and v["cdxjRecordCount"]>0)]},ensure_ascii=False))
if summary["expectedSHA256Fail"]!=0:raise SystemExit(4)