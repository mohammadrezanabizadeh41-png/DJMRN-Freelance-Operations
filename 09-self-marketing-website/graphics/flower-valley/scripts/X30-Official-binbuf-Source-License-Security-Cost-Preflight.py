#!/usr/bin/env python3
"""X30 official tool/source/license/build/security/cost read-only preflight. No installs, no privileges."""
import pathlib,json,hashlib,subprocess,re,datetime
TK=pathlib.Path.home()/'AppData'/'Local'/'DJMRN-Website-Toolkit'
S=TK/'04-Specialists'/'Sources'/'WebGLModelExtractor'/'webgl-model-extractor-main'
R=pathlib.Path.home()/'Desktop'/'DJMRN-Website-Reference-Evidence'/'fernhollow-gladeye-20261118-NEW-EXTRACTION'
D=R/'02-reviewed-derived'/'X30-CURRENT'
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def blob(p):return subprocess.run(['git','hash-object','--',str(p)],capture_output=True,text=True).stdout.strip()
p=json.loads((S/'package.json').read_text('utf8'))
m=json.loads((S/'dist'/'chrome'/'manifest.json').read_text('utf8'))
official={"README.md":"fe9474bddebbc004235c72e2d952d7b36e86d82c",
"package.json":"2df124ae5af4463b5f80818428589d7e3a8efd03",
"build.mjs":"3b6740bb77e74b05c4b80c90d86955cd83b5ab00",
"src/main/index.js":"549094a33271a2008ce2a0479fbf56901aed0fb9",
"test/harness/driver.mjs":"df2ab6d5015dd88ff55a4f5d85397768ef218c3e"}
check={k:{"filename":k,"localGitBlob":blob(S/k),"GitHubCanonicalBlob":v,
              "byteExact":blob(S/k)==v} for k,v in official.items()}
log=(D/'X30-OFFICIAL-SOURCE-UNIT-TEST-LOCAL.txt').read_text(encoding='utf-16')
found=dict(re.findall(r'(?m)^\N{INFORMATION SOURCE}\s+(tests|pass|fail|cancelled|skipped)\s+(\d+)',log))
if not found:
 found=dict(re.findall(r'(?m)^\s*[^\w\s]+\s+(tests|pass|fail|cancelled|skipped)\s+(\d+)',log))
unit={"result":"PASS" if found.get('tests')==found.get('pass')=='54' and found.get('fail')=='0' else "UNVERIFIED",
      "counts":found,"logSHA256":digest(D/'X30-OFFICIAL-SOURCE-UNIT-TEST-LOCAL.txt')}
out={"stage":"X30","preflightUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "canonical":"https://github.com/binbuf/webgl-model-extractor","officialHeadObservedInGitHubConnector20261120":"458c5890b85c9fccf193e6f72e9ab15914196d3f",
 "sourceSnapshot":"Previously installed ZIP checkout, .git absent; selected 5 canonical source files independently byte-identical to official GitHub; do not claim entire source tree pinned to head",
 "sourceMatches":check,"allSelectedExact":all(x['byteExact'] for x in check.values()),
 "localSource":str(S),"officialLicense":"MIT",
 "licensePresent":(S/'LICENSE').read_text('utf8').startswith('MIT License'),
 "packageVersion":p['version'],"manifestVersion":m['manifest_version'],
 "extensionVersion":m['version'],"manifestPermissions":m.get('permissions',[]),
 "hostPermissions":m.get('host_permissions',[]),
 "contentScripts":[{"world":x.get('world'),"matches":x.get('matches'),"runAt":x.get('run_at')} for x in m.get('content_scripts',[])],
 "bundledDistMainWorldSHA256":digest(S/'dist'/'chrome'/'main-world.js'),
 "bundledDistMainWorldBytes":(S/'dist'/'chrome'/'main-world.js').stat().st_size,
 "dependenciesAlreadyPresent":(S/'node_modules'/'@playwright'/'test').exists() and (S/'node_modules'/'gltf-validator').exists(),
 "browserChrome157Present":(TK/'04-Runtimes'/'ArchiveBox-X11'/'ChromeForTesting-157'/'chrome-win64'/'chrome.exe').exists(),
 "officialUnitTests":unit,
 "testE2E":"WebGL owner-original real MV3 Chrome157 capture performed separately; official Playwright browser unavailable; no unnecessary new download",
 "permissionsPolicy":"Only isolated throwaway Chrome157 profile, not personal Chrome; all_urls broad host permission confined to test browser; vendor live page READ ONLY",
 "price":"Free local MIT; no provider billing, upgrade or API credits",
 "role":"Alternative independent geometry-recovery analyzer on OWN source, not commercial site asset authority",
 "mutation":"No new source install or permission changes; used existing built dist and dependencies"}
(D/'X30-OFFICIAL-binbuf-SOURCE-LICENSE-SECURITY-FREE-PREFLIGHT.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n',encoding='utf8')
print(json.dumps({"selectedExact":sum(x["byteExact"] for x in check.values()),"selectedTotal":len(check),
    "unit":unit['counts'],"version":out["packageVersion"],"distSha":out["bundledDistMainWorldSHA256"],"license":out["officialLicense"]}))
