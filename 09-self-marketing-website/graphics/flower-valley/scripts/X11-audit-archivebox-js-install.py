from pathlib import Path
from collections import Counter
import json, zipfile, hashlib, os, sys, re, datetime, shutil, subprocess
root=Path(os.environ["LOCALAPPDATA"])/"DJMRN-Website-Toolkit"/"04-Runtimes"/"ArchiveBox-X11"
source=root/"archivebox-js-main"
bundle=source/".output"/"chrome-mv3"
plugins=source/"abx-plugins"/"abx_plugins"/"plugins"
report_dir=root/"reports"
report_dir.mkdir(parents=True,exist_ok=True)
def sha256(path, chunk=1024*1024):
 h=hashlib.sha256()
 with open(path,"rb") as f:
  for b in iter(lambda:f.read(chunk),b""):h.update(b)
 return h.hexdigest()
def jsonfile(p):
 try: return json.loads(p.read_text(encoding="utf-8-sig"))
 except Exception as e: return {"PARSE_ERROR":str(e)}
def file_info(p):
 if not p.exists():return {"exists":False,"path":str(p)}
 return {"exists":True,"path":str(p),"bytes":p.stat().st_size,"sha256":sha256(p) if p.is_file() and p.stat().st_size < 300*1024*1024 else None}
stamp=datetime.datetime.now(datetime.timezone.utc).isoformat()
pkg=jsonfile(source/"package.json")
manifest=jsonfile(bundle/"manifest.json")
pl=[]
for folder in sorted(plugins.iterdir()) if plugins.is_dir() else []:
 if not folder.is_dir():continue
 cfg=folder/"config.json"
 conf=jsonfile(cfg) if cfg.exists() else None
 browser=folder/"browser"
 hooks=list(browser.glob("on_*.ts")) if browser.exists() else []
 sub=sorted(x.name for x in browser.iterdir()) if browser.exists() else []
 pl.append({"id":folder.name,"config_present":cfg.exists(),"title":conf.get("title") if isinstance(conf,dict) else None,"description":conf.get("description") if isinstance(conf,dict) else None,
 "requires":(conf.get("required_plugins") or []) if isinstance(conf,dict) else [],"required_binaries":(conf.get("required_binaries") or []) if isinstance(conf,dict) else [],
 "browser_present":browser.exists(),"browser_hooks":[x.name for x in hooks],"browser_entry_count":len(sub),"browser_entry_examples":sub[:6],
 "source_files":sum(1 for x in folder.rglob("*") if x.is_file()),"status":"source-only until functional verification"})
extension_paths=[]
for r,dirs,files in os.walk(bundle):
 for fn in files:
  f=Path(r)/fn
  extension_paths.append((str(f.relative_to(bundle)).replace("\\","/"),f.stat().st_size))
extension_paths.sort()
manifest_checks={}
for area in ("background","action","options_page","side_panel"):
 node=manifest.get(area)
 if isinstance(node,dict):
  fp=node.get("service_worker") or node.get("default_popup") or node.get("page") or node.get("default_path")
  if fp:manifest_checks[area]={"target":fp,"exists":(bundle/fp).is_file()}
 elif isinstance(node,str):manifest_checks[area]={"target":node,"exists":(bundle/node).is_file()}
for area in ("content_scripts",):
 manifest_checks[area]=[]
 for node in manifest.get(area,[]):
  for kind in ("js","css"):
   for fp in node.get(kind,[]):manifest_checks[area].append({"target":fp,"exists":(bundle/fp).is_file()})
mem_assets=sorted(((p,n) for p,n in extension_paths if p.lower().endswith((".wasm",".whl",".zip",".tgz",".bin"))),key=lambda x:-x[1])
zip_src=root/"archivebox-js-main.zip"
cftzip=root/"ChromeForTesting-157.0.8103.78-win64.zip"
browser=root/"ChromeForTesting-157"/"chrome-win64"/"chrome.exe"
cmd=root/"Launch-ArchiveBox-JS.cmd"
pnpm=root/"pnpm-runtime"/"node_modules"/"pnpm"/"package.json"
package_dirs=list((source/"node_modules"/".pnpm").iterdir()) if (source/"node_modules"/".pnpm").is_dir() else []
srczip_entry_count=None
srczip_error=None
if zip_src.exists():
 try:
  with zipfile.ZipFile(zip_src) as z:
   srczip_entry_count=len(z.namelist())
   # check archive headers without decompressing: early detection for missing source entries
   srczip_error=z.testzip()
 except Exception as e:srczip_error=str(e)
tested=[]
for n in ("local-dom-pass-001","local-multiplugin-pass-001","local-multiplugin-pass-002"):
 dir=report_dir/n
 j=jsonfile(dir/"dom-contract.json")
 tested.append({"run":n,"exists":dir.exists(),"wacz":file_info(dir/"dom-contract.wacz"),"json":file_info(dir/"dom-contract.json"),
 "state":j.get("capture",{}).get("state"),"plugins":j.get("capture",{}).get("plugins"),
 "resources":j.get("capture",{}).get("resourceCount"),
 "hook_statuses":[{"plugin":x.get("plugin"),"status":x.get("status")} for x in j.get("capture",{}).get("hooks",[])]})
paths={
 "source_zip":file_info(zip_src),"source_dir_exists":source.exists(),"source_zip_entries":srczip_entry_count,"source_zip_first_bad_member":srczip_error,
 "chrome_for_testing_zip":file_info(cftzip),"chrome_for_testing_exe":file_info(browser),
 "archivebox_js_manifest":file_info(bundle/"manifest.json"),"archivebox_js_launch_cmd":file_info(cmd),
 "pnpm_runtime_package":file_info(pnpm),
 "abx_dl_venv_python":file_info(root/"abx-dl-venv"/"Scripts"/"python.exe"),
 "abx_dl_venv_binary":file_info(root/"abx-dl-venv"/"Scripts"/"abx-dl.exe")}
flags={
 "plugin_count":len(pl),"all_plugin_configs_present":all(p["config_present"] for p in pl),
 "all_plugin_dirs_have_browser":all(p["browser_present"] for p in pl),
 "no_missing_manifest_references":all(x["exists"] for k,v in manifest_checks.items() for x in (v if isinstance(v,list) else [v])),
 "source_zip_integrity_ok":srczip_error is None,
 "extension_output_files":len(extension_paths),
 "extension_output_total_bytes":sum(n for p,n in extension_paths),
 "extension_wasm_files":sum(1 for p,n in extension_paths if p.endswith(".wasm")),
 "installed_pnpm_store_package_dirs":len(package_dirs),
 "source_plugin_ids":[p["id"] for p in pl],
 "source_required_external_binaries":[{"plugin":p["id"],"requires":p["required_binaries"]} for p in pl if p["required_binaries"]],
 "plugin_no_browser_dir":[p["id"] for p in pl if not p["browser_present"]],
 "source_configs_missing":[p["id"] for p in pl if not p["config_present"]]}
report={"audit_type":"SOURCE_DEPENDENCY_BUNDLE_EXISTENCE_NOT_ALL_PLUGIN_FUNCTIONAL_PASS","date_utc":stamp,
 "paths":paths,"package":{"name":pkg.get("name"),"version":pkg.get("version"),"packageManager":pkg.get("packageManager"),
 "node":pkg.get("engines",{}).get("node"),"dependencies_declared":len(pkg.get("dependencies",{})),"dev_dependencies_declared":len(pkg.get("devDependencies",{}))},
 "manifest":{"name":manifest.get("name"),"version":manifest.get("version"),"manifest_version":manifest.get("manifest_version"),
 "permissions":manifest.get("permissions",[]),"host_permissions":manifest.get("host_permissions",[]),"checks":manifest_checks},
 "flags":flags,"plugins":pl,"largest_bundled_files":sorted(extension_paths,key=lambda z:-z[1])[:30],
 "bundled_auxiliary_assets":mem_assets[:60],"local_tests":tested}
out=report_dir/"X11-archivebox-js-install-audit-2026-11-19.json"
out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("AUDIT_FILE",out)
print("PACKAGE",report["package"])
print("SUMMARY",json.dumps({k:v for k,v in flags.items() if k not in ("source_plugin_ids","source_required_external_binaries")},ensure_ascii=False))
print("PLUGIN_IDS",",".join(flags["source_plugin_ids"]))
print("REQUIRES_EXTERNAL_BINARIES",json.dumps(flags["source_required_external_binaries"],ensure_ascii=False)[:1500])
print("BUNDLE_LARGEST",report["largest_bundled_files"][:8])
print("MANIFEST_CHECKS",report["manifest"]["checks"])
print("LOCAL_TESTS",[(r["run"],r["state"],r["resources"],len(r["plugins"] or [])) for r in tested])
print("KEY_PATHS",json.dumps({k:{"exists":v.get("exists"),"bytes":v.get("bytes")} if isinstance(v,dict) else v for k,v in paths.items() if k in ("source_zip","chrome_for_testing_zip","chrome_for_testing_exe","archivebox_js_manifest","archivebox_js_launch_cmd","pnpm_runtime_package","abx_dl_venv_binary")},ensure_ascii=False))
