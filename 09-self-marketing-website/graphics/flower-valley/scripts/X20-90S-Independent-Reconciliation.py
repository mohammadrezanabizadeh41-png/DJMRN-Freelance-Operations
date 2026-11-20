#!/usr/bin/env python3
"""DJMRN X20 owner-authored provenance and independent reconciliation; offline only."""
import json,hashlib,pathlib,datetime,collections,sys,urllib.parse,re
root=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
derived=root/"02-reviewed-derived"/"X20-CURRENT"
priv=root/"01-private-captures"/"X20"
load=lambda p:json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
sha=lambda p:hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
baseline=load(root/"02-reviewed-derived"/"X19-CURRENT"/"X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
prior={r["url"]:r for r in baseline["resources"]}
run=load(derived/"X20-LIVE-90S-PRIVATE-INDEX.json")
oldEdges=load(root/"02-reviewed-derived"/"X16-CURRENT"/"X16-script-init-network-graph.json")["edges"]
ast=load(derived/"X20-AST-GREP-PUBLIC-SANITIZED-SEMANTIC-PATTERN-METADATA.json")
oldRea=load(derived/"X20-INDEPENDENT-LOCAL-ACCEPTANCE.json")
rsc=load(priv/"wakaru"/"x20-work-route-rsc-decoded.json")
wks=load(priv/"wakaru"/"app-page-strict"/"provenance.json")
wmods=sorted(x.stem.replace("module-","") for x in (priv/"wakaru"/"app-page-strict").glob("module-*.js"))
x19mods=sorted(x.stem for x in (root/"01-private-captures"/"X19"/"full-verified-js-unpack"/"06-5f164d7403807a"/"static").glob("*.js") if x.stem!="deobfuscated")
checks={}
def check(key,val):checks[key]=bool(val)
check("baseline_78_paths",len(prior)==78)
check("browser_completed_90s",run["stats"]["stopReason"]=="COMPLETED_90S" and run["stats"]["observationElapsedSeconds"] in (90,91,92))
check("browser_8_samples",len(run["samples"])==8)
check("browser_52_known_paths",run["stats"]["uniqueObservedFirstPartyPaths"]==52 and all(x in prior for x in set(run["knownPathsObserved"])))
check("browser_zero_new_paths",len(run["newPathCandidates"])==0)
check("browser_response_count_169",sum(run["stats"]["networkStatuses"].values())==169)
check("browser_50_initiator_edges",len(run["initiatorEdges"])==50)
ed16={(e["from"],e["to"]) for e in oldEdges}
ed20={(e["from"],e["to"]) for e in run["initiatorEdges"]}
check("all_x20_edges_repeat_x16",len(ed16)==130 and len(ed20)==50 and len(ed20-ed16)==0)
check("no_new_script_sourcemap",run["stats"]["jsWithDeclaredSourceMaps"]==0)
check("memory_guard_passed",run["stats"]["minFreeMemoryMiB"]>100)
check("observed_two_routes",{x["url"] for x in run["samples"]}=={"https://www.gladeye.com/","https://www.gladeye.com/work"})
check("home_canvas_seen",any(x["url"]=="https://www.gladeye.com/" and x.get("dom",{}).get("canvasCount")==1 for x in run["samples"]))
check("work_canvas_absent_sampled",all(x.get("dom",{}).get("canvasCount")==0 for x in run["samples"] if x["url"].endswith("/work")))
bodies=run["bodies"]
checks_for_files=[]
for rec in bodies:
 f=priv/"live-90s"/rec["privateFilename"]
 checks_for_files.append(f.is_file() and sha(f)==rec["sha256"] and f.stat().st_size==rec["bytes"] and rec["url"] in prior)
check("all_46_body_files_sha_and_sizes",len(bodies)==46 and all(checks_for_files))
types=collections.Counter(x["classification"] for x in bodies)
check("44_exact_known_sha",types.get("KNOWN_PATH_SAME_SHA",0)==44)
check("one_known_url_changed_body",types.get("KNOWN_PATH_NEW_BODY_VARIANT_CANDIDATE",0)==1)
check("one_first_captured_body_known_url",types.get("KNOWN_PATH_FIRST_VERIFIED_BODY_CANDIDATE",0)==1)
route=next(x for x in bodies if x["url"]=="https://www.gladeye.com/work")
prevRoute=prior[route["url"]]
check("work_html_variant_sha_diff",route["bytes"]==957351 and all(x["sha256"]!=route["sha256"] for x in prevRoute.get("originalBodyVariants",[])))
image=next(x for x in bodies if x["url"]=="https://www.gladeye.com/_next/image")
imageFile=priv/"live-90s"/image["privateFilename"];img=imageFile.read_bytes()
width=int.from_bytes(img[26:28],"little") & 0x3fff
height=int.from_bytes(img[28:30],"little") & 0x3fff
check("webp_20x15_valid_riff",img[:4]==b"RIFF" and img[8:16]==b"WEBPVP8 " and (width,height)==(20,15) and len(img)==182)
check("webp_renamed_correctly",imageFile.suffix==".webp")
check("wakaru_22_matches_x19",len(wmods)==22 and wmods==x19mods)
check("wakaru_provenance_file",isinstance(wks,dict) and (priv/"wakaru"/"app-page-strict"/"provenance.json").stat().st_size>100)
check("rsc_24_rows_zero_problems",len(rsc.get("rows",[]))==24 and not rsc.get("problems"))
check("rsc_23_assets_5_scripts",len(rsc.get("assets",[]))==23 and len(rsc.get("scripts",[]))==5)
refs=[]
for kind in ("assets","scripts"):
 for item in rsc.get(kind,[]):
  if not isinstance(item,str):continue
  u=urllib.parse.urlsplit(urllib.parse.urljoin("https://www.gladeye.com/work",item))
  if u.netloc not in ("gladeye.com","www.gladeye.com"):continue
  full=f"{u.scheme}://{u.netloc}{u.path}"
  resolved=full if full in prior else f"{u.scheme}://{u.netloc}/_next{u.path}" if u.path.startswith("/static/") else None
  refs.append((kind,full,resolved, bool(resolved in prior)))
check("all_28_rsc_references_resolved_to_x19",len(refs)==28 and all(v[3] for v in refs))
astFiles=list((priv/"ast-grep").glob("*.jsonl"))
moduleOnly=0;rawMatchCount=0;differentPaths=set()
for f in astFiles:
 for line in f.read_text(encoding="utf-8",errors="replace").splitlines():
  if not line.strip():continue
  item=json.loads(line);rawMatchCount+=1
  p=pathlib.Path(str(item.get("file","")))
  if p.name!="deobfuscated.js":moduleOnly+=1;differentPaths.add(str(p))
check("ast_8_sweeps_executed",len(ast["cases"])==8 and len(astFiles)==8)
check("ast_301_raw_hits",rawMatchCount==301)
check("ast_150_module_only_hits",moduleOnly==150)
check("ast_zero_scan_errors",all(x["status"]=="EXITED" and x["exit_code"] in (0,1) and not x["bad_json_records"] for x in ast["cases"]))
check("prior_rea_23_gates_pass",oldRea["checks_total"]==23 and oldRea["checks_passed"]==23)
check("rea_five_verified_candidates",len(oldRea["modules"])==5 and all(x["parsed_files"]==1 for x in oldRea["modules"]))
check("rea_heavy_module_limits_declared",any(x["module_id"]=="6375" and x["semantic_truncated"] for x in oldRea["modules"]))
check("one_audio_body_read_issue_disclosed",len(run["issues"])==1 and run["issues"][0]["kind"]=="BODY_READ_UNAVAILABLE")
check("no_secret_export",all("?" not in item["url"] and urllib.parse.urlsplit(item["url"]).netloc=="www.gladeye.com" for item in bodies))
detail={
 "stage":"X20","date_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "scope":"owner-directed 90s anonymous first-party site observation and offline X19 structural reconciliation",
 "prior_canonical":{"stage":"X01-X19","paths":len(prior),"network_observed_paths":72,"offline_derived_only_paths":6,"original_body_verified_paths":69},
 "live":{"observation_window_seconds":90,"elapsed_including_cleanup_rounded_seconds":run["stats"]["observationElapsedSeconds"],"response_events":sum(run["stats"]["networkStatuses"].values()),"distinct_site_paths":52,"repeated_site_paths":52,"new_site_paths":0,"downloaded_bytes_private_total":run["stats"]["storedNewPrivateBytes"],"body_hashes_checked":len(bodies),"prior_sha_matches":types.get("KNOWN_PATH_SAME_SHA",0),"initiator_edges_observed":len(ed20),"initiator_edges_repeated_x16":len(ed20&ed16),"initiator_edges_new_vs_x16":len(ed20-ed16),"source_map_declarations":0,"samples":len(run["samples"]),"min_sampled_ram_mib":run["stats"]["minFreeMemoryMiB"],"stop_reason":run["stats"]["stopReason"],"issues":run["issues"]},
 "body_deltas":[
  {"url":route["url"],"category":"SUPPLEMENTARY_KNOWN_ROUTE_HTML_BYTE_VARIANT","sha256":route["sha256"],"bytes":route["bytes"],"prior_observed_shas":[x["sha256"] for x in prevRoute.get("originalBodyVariants",[])],"prior_observed_sizes":[x["bytes"] for x in prevRoute.get("originalBodyVariants",[])],"assertion":"new observed CDP-decoded HTML body on an already-known URL, not a new asset URL or necessarily new authored component"},
  {"url":image["url"],"category":"SUPPLEMENTARY_FIRST_CDP_BODY_FOR_PREVIOUSLY_KNOWN_QUERY_SENSITIVE_ENDPOINT","sha256":image["sha256"],"bytes":image["bytes"],"format":"WEBP VP8","dimensions":[width,height],"assertion":"new body evidence on an existing URL path; exact request query intentionally not captured, no URL-level path novelty or raw-wire equivalence assumed"}],
 "semantic":{"prior_rea":"5/5 candidate modules analyzed, 23/23 prior independent acceptance; module 6375 intentionally truncated","wakaru_version":"1.17.0","wakaru_webpack5_page_modules":len(wmods),"wakaru_corresponding_x19_modules":len(wmods),"wakaru_net_new_orig_modules":0,"wakaru_rsc_rows":len(rsc["rows"]),"wakaru_rsc_assets":len(rsc["assets"]),"wakaru_rsc_scripts":len(rsc["scripts"]),"wakaru_rsc_issues":len(rsc["problems"]),"wakaru_rsc_known_url_references":len(refs),"ast_grep_version":"0.51.3","ast_patterns":len(ast["cases"]),"ast_raw_hits_with_top_level_duplicates":rawMatchCount,"ast_derived_module_hits":moduleOnly,"ast_distinct_derived_module_paths_hit":len(differentPaths)},
 "canonical_update":{"x01_x19_original_canonical_path_count_unchanged":78,"new_network_path_count":0,"new_original_js_file_paths":0,"new_original_glb_or_texture_url_paths":0,"new_initiator_pairs":0,"reason":"Only same-path supplemental observed byte variants and new semantic views; no evidence to promote original path denominator, and query-sensitive image endpoint lacks exact request-key identity."},
 "constraints":["Site-issued JS executed only in an isolated, anonymous Chrome browsing context as normal site behavior; no imported vendor JS evaluated in REA/Node.","No credentials, cookies, request-header values, query-string values, private backend or third-party analytics bodies captured.","Network response bytes are CDP-decoded content, not proven wire-exact HTTP bodies.","X20 observed page state does not expose genuine GPU render commands or unpublished source.","No private source, decoded RSC, vendor body or transformed JS will be published to GitHub.","The 90-second window does not assert exhaustive coverage of the reference site.","One original MP3 body read was unavailable; the known MP3 URL is not a new asset.","Six offline-derived legacy paths remain distinct from verified network paths."],
 "checks":checks,"checks_passed":sum(checks.values()),"checks_total":len(checks),"result":"COMPLETE_SCOPE_QUALIFIED" if all(checks.values()) else "PARTIAL_REVIEW_REQUIRED"}
out=derived/"X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json"
out.write_text(json.dumps(detail,indent=2,ensure_ascii=False),encoding="utf-8")
print("FINAL_ACCEPTANCE",detail["result"],f"{detail['checks_passed']}/{detail['checks_total']}")
print("DELTA",json.dumps({"new_paths":detail["live"]["new_site_paths"],"matched":detail["live"]["prior_sha_matches"],"supplemental":[d["category"] for d in detail["body_deltas"]],"edges_new":detail["live"]["initiator_edges_new_vs_x16"],"semantic_hits":moduleOnly}))
print("FILE",out)