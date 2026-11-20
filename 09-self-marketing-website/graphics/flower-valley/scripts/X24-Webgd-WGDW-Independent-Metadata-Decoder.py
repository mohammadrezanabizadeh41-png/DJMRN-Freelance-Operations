#!/usr/bin/env python3
"""DJMRN X24 owner-authored *read-only* decoder of official webgd WGDW wire captures.
Metadata only; raw third-party GPU bytes remain private and are NEVER published.
Format authority: Snowapril/webgd/docs/wire-format.md and extension/hook.js.
"""
import struct,sys,json,pathlib,hashlib,collections
MAX_CALLS=500000
def decode_bytes(data):
 mv=memoryview(data);at=0
 def take(n):
  nonlocal at
  if n<0 or at+n>len(mv):raise ValueError(f"TRUNCATED offset={at} requested={n} total={len(mv)}")
  x=mv[at:at+n];at+=n;return x
 def u8():return take(1)[0]
 def u32():return struct.unpack_from("<I",take(4))[0]
 def f64():return struct.unpack_from("<d",take(8))[0]
 def string():
  n=u32()
  if n>100000:raise ValueError("UNTRUSTED_TOO_LONG_STRING")
  return bytes(take(n)).decode("utf-8",errors="replace")
 def value(depth=0):
  if depth>35:raise ValueError("RECURSION_TOO_DEEP")
  t=u8()
  if t in(0,1):return None
  if t==2:return False
  if t==3:return True
  if t==4:return f64()
  if t in(5,6,11,12):return {"ref":u32()} if t in(6,11) else {"stringId":u32()}
  if t==7:return {"kind":u8(),"blobId":u32()}
  if t==8:
   n=u32()
   if n>100000:raise ValueError("ARRAY_TOO_LARGE")
   return [value(depth+1) for _ in range(n)]
  if t==9:
   n=u32()
   if n>100000:raise ValueError("DICT_TOO_LARGE")
   return [{"id":u32(),"value":value(depth+1)} for _ in range(n)]
  if t==10:return {"w":u32(),"h":u32(),"blobId":u32()}
  raise ValueError("UNKNOWN_VALUE_TAG "+str(t))
 if bytes(take(4))!=b"WGDW":raise ValueError("WRONG_MAGIC")
 version=u32()
 if version!=1:raise ValueError("UNSUPPORTED_FORMAT "+str(version))
 url=string()
 strings={};objects=[];blobs=[];sections={"setup":[],"snapshot":[],"frame":[]};tagCounts=collections.Counter();shaderDigests=[];uniformLocationNames=[]
 while at<len(mv):
  tag=u8();tagCounts[str(tag)]+=1
  if tag==255:break
  if tag==1:
   id=u32();s=string();strings[id]=s
  elif tag==2:
   id=u32();cls=u32();par=u32();objects.append((id,cls,par))
  elif tag==3:
   id=u32();n=u32();take(n);blobs.append({"id":id,"bytes":n})
  elif tag==4:
   section=u8();this=u32();method=u32();argc=u32()
   if argc>100000:raise ValueError("TOO_MANY_ARGS")
   args=[value() for _ in range(argc)];result=value()
   if section not in (0,1,2):raise ValueError("UNKNOWN_SECTION")
   sec=("setup","snapshot","frame")[section]
   sections[sec].append((strings.get(method,"#"+str(method)),args,this))
   if strings.get(method)=="shaderSource" and len(args)>=2 and isinstance(args[1],dict) and "stringId" in args[1]:
    sh=strings.get(args[1]["stringId"],"")
    shaderDigests.append({"sha256":hashlib.sha256(sh.encode("utf-8")).hexdigest(),"utf8Bytes":len(sh.encode("utf-8"))})
   if strings.get(method)=="getUniformLocation" and len(args)>=2 and isinstance(args[1],dict) and "stringId" in args[1]:
    uniformLocationNames.append(strings.get(args[1]["stringId"],""))

   if sum(len(a) for a in sections.values())>MAX_CALLS:raise ValueError("TOO_MANY_CALLS")
  else:raise ValueError("UNKNOWN_RECORD_TAG "+str(tag)+" at "+str(at))
 if at!=len(mv):raise ValueError("TRAILING_BYTES "+str(len(mv)-at))
 per={}
 for sec,calls in sections.items():
  hist=collections.Counter(x[0] for x in calls)
  draws=[{"name":n,"mode":a[0] if a else None,
          "count":a[1] if n.startswith("drawElements") and len(a)>1 else a[2] if len(a)>2 else None}
      for n,a,_ in calls if n.startswith("draw")]
  per[sec]={"callCount":len(calls),"drawCount":len(draws),"drawSignatures":draws,
   "methodHistogram":dict(sorted(hist.items())),"objectCallCount":sum(1 for _,_,id in calls if id!=0)}
 classes=collections.Counter(strings.get(cls,"unknown") for _,cls,_ in objects)
 return {"magic":"WGDW","version":version,"recordedUrlOrigin":url.split("?")[0].split("#")[0],
  "byteLength":len(mv),"sha256":hashlib.sha256(mv).hexdigest(),
  "recordCountByTag":dict(tagCounts),"stringTableSize":len(strings),
  "objectCount":len(objects),"objectClasses":dict(classes),
  "blobCount":len(blobs),"blobByteTotal":sum(x["bytes"] for x in blobs),
  "largestBlobBytes":max([x["bytes"] for x in blobs],default=0),
  "sections":per,"shaderSourceCount":len(shaderDigests),"shaderSourceFingerprints":shaderDigests,"uniqueShaderSourceSHA256":sorted(set(z["sha256"] for z in shaderDigests)),"uniformLocationNameCount":len(uniformLocationNames),"uniqueUniformNames":sorted(set(uniformLocationNames)),"complete":True}
if __name__=="__main__":
 p=pathlib.Path(sys.argv[1])
 d=decode_bytes(p.read_bytes())
 # URL host path can be from a local or public page, output no private query details.
 print("X24_WIRE_DECODE "+json.dumps({k:v for k,v in d.items() if k!="sections"},ensure_ascii=False)[:2000])
 print("X24_WIRE_SECTIONS "+json.dumps({k:{"callCount":v["callCount"],"drawCount":v["drawCount"],"draws":v["drawSignatures"][:5],"sampleMethods":list(v["methodHistogram"])[:22]} for k,v in d["sections"].items()},ensure_ascii=False)[:3000])
 if len(sys.argv)>2:pathlib.Path(sys.argv[2]).write_text(json.dumps(d,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
