#!/usr/bin/env python3
"""DJMRN X29 — offline Khronos GLB/OBJ/ZIP independent parse of REAL owner-created WebGLRipper export.
No network and no third-party originals. Outputs derived statistics, not copyrighted third-party meshes.
"""
import json, struct, zipfile, pathlib, hashlib, collections, math
ROOT=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
OUT=ROOT/"02-reviewed-derived"/"X29-CURRENT"
PRIVATE=ROOT/"01-private-captures"/"X29"/"own-fixture-export"
OWNER=json.loads((OUT/"X29-OWN-RIPPER-REAL-CHROME-EXPORT-INDEX.json").read_text())
files=list(PRIVATE.glob("webglripper_*.zip"))
if len(files)!=1:raise RuntimeError("Expected exactly one owner fixture ZIP, found "+str(len(files)))
zipf=files[0]
binary=zipf.read_bytes()
def sha(b):return hashlib.sha256(b).hexdigest()
with zipfile.ZipFile(zipf) as z:
    names=z.namelist()
    entries=[{"path":f.filename,"bytes":f.file_size,"sha256":sha(z.read(f))} for f in z.infolist()]
    glbs=[n for n in names if n.lower().endswith(".glb")]
    objnames=[n for n in names if n.lower().endswith(".obj")]
    mtl=[n for n in names if n.lower().endswith(".mtl")]
    pngs=[n for n in names if n.lower().endswith(".png")]
    if not glbs:raise RuntimeError("OWN GLB MISSING")
    glb=z.read(glbs[0])
    magic,version,length=struct.unpack_from("<4sII",glb)
    if magic!=b"glTF" or version!=2 or length!=len(glb):raise RuntimeError("INVALID_GLB2_HEADER")
    json_len,json_magic=struct.unpack_from("<I4s",glb,12)
    if json_magic!=b"JSON":raise RuntimeError("INVALID_JSON_CHUNK")
    gltf=json.loads(glb[20:20+json_len])
    bin_off=20+json_len
    if bin_off>=len(glb):raise RuntimeError("GLB_BIN_MISSING")
    bin_len,bin_magic=struct.unpack_from("<I4s",glb,bin_off)
    if bin_magic!=b"BIN\x00":raise RuntimeError("INVALID_BIN_CHUNK")
    dat=glb[bin_off+8:bin_off+8+bin_len]
    types={5120:('b',1),5121:('B',1),5122:('h',2),5123:('H',2),5125:('I',4),5126:('f',4)}
    comps={"SCALAR":1,"VEC2":2,"VEC3":3,"VEC4":4,"MAT4":16}
    def decode_accessor(idx):
        a=gltf["accessors"][idx];view=gltf["bufferViews"][a["bufferView"]]
        fmt,unit=types[a["componentType"]];num=comps[a["type"]]
        start=view.get("byteOffset",0)+a.get("byteOffset",0)
        stride=view.get("byteStride",num*unit)
        return [struct.unpack_from("<"+fmt*num,dat,start+i*stride) for i in range(a["count"])]
    primitives=[]
    for mi,mesh in enumerate(gltf.get("meshes",[])):
        for j,p in enumerate(mesh.get("primitives",[])):
            pos=decode_accessor(p["attributes"]["POSITION"])
            idx=decode_accessor(p["indices"]) if "indices" in p else None
            uv=decode_accessor(p["attributes"]["TEXCOORD_0"]) if "TEXCOORD_0" in p["attributes"] else None
            mode=p.get("mode",4)
            primitives.append({"meshIndex":mi,"primitiveIndex":j,"meshName":mesh.get("name"),
                "glTFMode":mode,"vertices":len(pos),"indices":len(idx) if idx is not None else None,
                "triangles":(len(idx) if idx is not None else len(pos))//3 if mode==4 else 0,
                "uvCount":len(uv) if uv is not None else 0,
                "normalCount":gltf["accessors"][p["attributes"]["NORMAL"]]["count"] if "NORMAL" in p["attributes"] else 0,
                "materials":p.get("material"),
                "positionBounding":[[round(min(v[k] for v in pos),4) for k in range(3)],
                                    [round(max(v[k] for v in pos),4) for k in range(3)]],
                "uvWithin01":all(all(-.001<=c<=1.001 for c in value) for value in uv) if uv else None,
                "finitePositions":all(all(math.isfinite(x) for x in v) for v in pos)})
    objrows=[]
    for n in objnames:
        lines=z.read(n).decode("utf-8-sig").splitlines()
        v=sum(l.startswith("v ") for l in lines)
        vt=sum(l.startswith("vt ") for l in lines)
        vn=sum(l.startswith("vn ") for l in lines)
        faces=sum(l.startswith("f ") for l in lines)
        objrows.append({"file":n,"vertices":v,"uvPairs":vt,"normals":vn,"faces":faces})
    pngrows=[]
    for n in pngs:
        raw=z.read(n)
        if raw[:8]!=b"\x89PNG\r\n\x1a\n":raise RuntimeError("PNG_HEADER_INVALID")
        w,h=struct.unpack_from(">II",raw,16)
        pngrows.append({"file":n,"bytes":len(raw),"width":w,"height":h})
    infofiles=[n for n in names if n.endswith("rip-info.json")]
    ripinfo={}
    if infofiles:
        src=json.loads(z.read(infofiles[0]))
        ripinfo={"topLevelKeys":sorted(src.keys()),"sourceDrawCounts":{}}
        for k,v in src.items():
            if isinstance(v,(str,int,float,bool)) and ("count" in k.lower() or "mesh" in k.lower() or "draw" in k.lower()):
                ripinfo["sourceDrawCounts"][k]=v
result={"stage":"X29","scope":"OWN Original Fixture ONLY",
    "officialSourcePinnedSHA":"7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849",
    "originalFixtureGroundTruth":OWNER.get("groundTruth",{}).get("groundTruth",{}),
    "userOwnedZip":{"fileName":zipf.name,"bytes":len(binary),"sha256":sha(binary)},
    "zipFiles":entries,"validGLB2":True,"glTFVersion":gltf.get("asset",{}).get("version"),
    "GLBStructure":{"meshCount":len(gltf.get("meshes",[])),
                    "nodeCount":len(gltf.get("nodes",[])),
                    "materials":len(gltf.get("materials",[])),
                    "textureCount":len(gltf.get("textures",[])),"cameraCount":len(gltf.get("cameras",[])),
                    "extensionsUsed":gltf.get("extensionsUsed",[])},
    "geometryPrimitives":primitives,"OBJFiles":objrows,"PNGs":pngrows,"materialFiles":mtl,
    "ripInfo":ripinfo,
    "observed":{"GLTriangles":sum(p["triangles"] for p in primitives),"GLPOINTSPrimitives":sum(p["glTFMode"]==0 for p in primitives),
        "GLTrianglesPrimitives":sum(p["glTFMode"]==4 for p in primitives),
        "instanceNodeCount":len(gltf.get("nodes",[])),
        "pointCountGroundTruth":5,"instancedDrawCountGroundTruth":3},
    "limits":[
        "GLB 2.0 header, accessors and vertices independently decoded with stdlib (no Blender assumed)",
        "POINTS are WebGL draw submissions, not necessarily a supported exported mesh primitive; GLB modes directly inspected",
        "Instanced WebGL draw has 3 instances in OWN source; export may contain a single base mesh, independently count GLB primitives/nodes",
        "A zip containing GLB and OBJ is not independent native Blender import and original source Shader behavior is not recoverable",
        "No third-party commercial content read or exported in this analysis"] }
(OUT/"X29-OWN-REAL-GLB-OBJ-INDEPENDENT-DECODED-GEOMETRY.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"ZIP":result["userOwnedZip"],"primitives":primitives,"OBJ":objrows,"PNGs":pngrows,"structure":result["GLBStructure"]},ensure_ascii=False))
