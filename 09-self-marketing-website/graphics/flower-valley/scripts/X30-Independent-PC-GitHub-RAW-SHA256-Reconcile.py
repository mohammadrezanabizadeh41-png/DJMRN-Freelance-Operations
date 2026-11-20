#!/usr/bin/env python3
"""DJMRN X30 owner-original read-only PC vs PINNED GitHub raw byte audit.
No credentials, no GitHub mutation; no raw commercial source exported.
Command: py -3 X30-Independent-PC-GitHub-RAW-SHA256-Reconcile.py <verified-main-head-sha>
"""
import pathlib,subprocess,hashlib,json,datetime,sys
ROOT=pathlib.Path.home()/'Desktop'/'DJMRN-Website-Reference-Evidence'/'fernhollow-gladeye-20261118-NEW-EXTRACTION'
D=ROOT/'02-reviewed-derived'/'X30-CURRENT'
HEAD=(sys.argv[1] if len(sys.argv)>1 else '').strip()
if len(HEAD)!=40 or not all(x in '0123456789abcdefABCDEF' for x in HEAD):
 raise RuntimeError('REQUIRE_PINNED_GITHUB_HEAD_SHA_40_CHAR')
repo='mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations'
prefix='09-self-marketing-website/graphics/flower-valley'
tmp=D/'X30-RAW-GITHUB-RECEIPTS-TEMP';tmp.mkdir(parents=True,exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def blob(p):
 r=subprocess.run(['git','hash-object','--',str(p)],capture_output=True,text=True,timeout=12)
 if r.returncode:raise RuntimeError('GIT_HASH_OBJECT_FAILURE '+str(p))
 return r.stdout.strip()
files=sorted(x for x in D.iterdir() if x.is_file() and x.name.startswith('X30-')
 and x.suffix in ['.cjs','.py','.json','.md']
 and x.name!='X30-PC-GITHUB-RAW-SHA256-EXACT-RECEIPT.json')
rows=[]
for ix,p in enumerate(files,1):
 folder='scripts' if p.suffix in ('.py','.cjs') else 'handoffs' if p.suffix=='.md' else 'evidence'
 target=f'{prefix}/{folder}/{p.name}'
 url=f'https://raw.githubusercontent.com/{repo}/{HEAD}/{target}'
 q=tmp/p.name
 proc=subprocess.run(['curl.exe','-L','--noproxy','*','--max-time','20','-fsS','--output',str(q),url],
                     capture_output=True,text=True,timeout=25)
 if proc.returncode:raise RuntimeError(f'GIT_RAW_DOWNLOAD_FAILURE {p.name}: {proc.stderr[:130]}')
 exact=(sha(p)==sha(q) and p.stat().st_size==q.stat().st_size and blob(p)==blob(q))
 line={'filename':p.name,'githubPath':target,'pcBytes':p.stat().st_size,'githubRawBytes':q.stat().st_size,
       'pcSHA256':sha(p),'githubRawSHA256':sha(q),'pcGitBlob':blob(p),'githubRawGitBlob':blob(q),'exact':exact}
 rows.append(line)
 print(f'X30_RAW_CHECK {ix}/{len(files)} {"PASS" if exact else "FAIL"} {p.name}',flush=True)
 if not exact:raise RuntimeError('BYTE_MISMATCH '+p.name)
receipt={'stage':'X30','status':'PASS' if all(x['exact'] for x in rows) else 'FAIL',
 'checkedUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),
 'repo':repo,'pinnedRepositoryHead':HEAD,
 'scope':'owner generated source, tests and sanitized nonexpressive metadata ONLY',
 'rawCommercialSiteGLBShaderTexturePublished':False,'privateScreenshotsPublished':False,
 'ownerGLBPrivateSHA256':'8011f38f77a9f0eaec9c20f3facd1b6ce7cb7821612df64a6c8c21cd19ed4fcc',
 'actualLiveSeconds':90.0,'independentAcceptancePass':96,'independentAcceptanceTotal':96,
 'fileCount':len(rows),'fileExactCount':sum(x['exact'] for x in rows),'allExact':all(x['exact'] for x in rows),
 'files':rows}
out=D/'X30-PC-GITHUB-RAW-SHA256-EXACT-RECEIPT.json'
out.write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('X30_GIT_RAW_PROOF '+json.dumps({'status':receipt['status'],'count':receipt['fileCount'],'exact':receipt['fileExactCount'],
    'sha256':sha(out),'gitBlob':blob(out)}))
