from pathlib import Path
import json,os,zipfile,hashlib,datetime,sys
root=Path(os.environ["LOCALAPPDATA"])/"DJMRN-Website-Toolkit"/"04-Runtimes"/"ArchiveBox-X11"
src=root/"sources-python"
report_dir=root/"reports"
report_dir.mkdir(exist_ok=True)
def sha(path):
 h=hashlib.sha256()
 with path.open('rb') as f:
  for chunk in iter(lambda:f.read(1<<20),b''):h.update(chunk)
 return h.hexdigest()
sources=[
 ("ArchiveBox JS 0.1.0 source",root/"archivebox-js-main.zip","https://github.com/ArchiveBox/archivebox-js","2026-11-19 download of main; upstream later resolved as commit 5a90961db5c5fca4eca0eaef129fc674aaf27420"),
 ("Original ArchiveBox 0.9.77 source",src/"ArchiveBox-0.9.77-official-source.zip","https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.77","older original; Docker/WSL Windows runtime blocked"),
 ("abx-dl 1.13.369 source",src/"abx_dl-1.13.369.tar.gz","https://pypi.org/project/abx-dl/1.13.369/","pinned Python-only alternative; native Windows CLI blocked"),
 ("abx-plugins 1.13.776 source",src/"abx_plugins-1.13.776.tar.gz","https://pypi.org/project/abx-plugins/1.13.776/","matching pinned installed plugin package, not latest GitHub release"),
 ("abxpkg 1.13.101 source",src/"abxpkg-1.13.101.tar.gz","https://pypi.org/project/abxpkg/1.13.101/","native Windows pwd/fcntl blocker"),
 ("abxbus 2.5.91 exact commit source",src/"abxbus-2.5.91-git-02f2800d.zip","https://github.com/ArchiveBox/abxbus/commit/02f2800dade5526c72092ef412134c70016605d7","PyPI sdist download attempt failed; full GitHub codeload source archive exists, commit ID verified via GitHub"),
 ("Chrome for Testing 157.0.8103.78",root/"ChromeForTesting-157.0.8103.78-win64.zip","https://storage.googleapis.com/chrome-for-testing-public/157.0.8103.78/win64/chrome-win64.zip","browser binary not an ArchiveBox source; official Google separate compatible test browser"),
]
records=[]
for name,p,url,notes in sources:
 r={"name":name,"relative_path":str(p.relative_to(root)).replace("\\","/"),"source_url":url,"notes":notes,"exists":p.exists()}
 if p.exists():
  r.update({"bytes":p.stat().st_size,"sha256":sha(p)})
  if p.suffix==".zip":
   try:
    with zipfile.ZipFile(p) as z:
     r["zip_entries"]=len(z.infolist())
     # test all entry CRC; bounded to local archives, <=220MB
     r["zip_first_bad_entry"]=z.testzip()
     r["zip_integrity"]="PASS" if r["zip_first_bad_entry"] is None else "FAIL"
     if name.startswith("abxbus"):
      r["zip_root"]=z.namelist()[0]
   except Exception as e:
    r["zip_integrity"]="ERROR";r["exception"]=str(e)
 records.append(r)
print("SOURCES",len(records),flush=True)
for r in records:
 print("SOURCE",r["name"],r["exists"],r.get("bytes"),r.get("sha256","NOT_PRESENT"),r.get("zip_integrity","tarball/not ZIP"),flush=True)
original=report_dir/"X11-python-pinned-source-downloads-2026-11-19.json"
status={"status":"ALL_PINNED_ARCHIVEBOX_FAMILY_SOURCE_ARCHIVES_PRESENT" if all(r["exists"] for r in records) else "SOURCE_GAPS","abi":"source availability does not mean every plugin operational on Windows","source_archives_checked_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"provenance":"Pinned installed Python dependencies and official ArchiveBox JS/Chrome for Testing; GitHub ZIP for abxbus accepted as canonical source when PyPI sdist request failed","initial_pypi_attempt_report":str(original),"records":records}
p=report_dir/"X11-all-upstream-source-and-hash-index-2026-11-19.json"
p.write_text(json.dumps(status,ensure_ascii=False,indent=2)+"\n",encoding='utf-8')
print("INDEX",p)
print("OVERALL_STATUS",status["status"])
