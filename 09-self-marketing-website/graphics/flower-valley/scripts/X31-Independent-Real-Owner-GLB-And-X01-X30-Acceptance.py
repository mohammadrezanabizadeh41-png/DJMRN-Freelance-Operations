#!/usr/bin/env python3
"""DJMRN X31 independent GLB2 binary validation of owner-produced MeshGrab output."""
import json, struct, hashlib, pathlib, math, datetime
R=pathlib.Path.home()/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X31-CURRENT"
P=R/"01-private-captures"/"X31"/"OWN-GLB-EXPORT"
f=P/"X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb"
j_owner=json.loads((D/"X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json").read_text(encoding="utf-8"))
b=f.read_bytes()
sha=lambda blob:hashlib.sha256(blob).hexdigest()
checks={}
def test(name, actual, expected):
    checks[name]={"pass":actual==expected,"actual":actual,"expected":expected}
test("glb_sha256",sha(b),j_owner["realOwnerGLB"]["sha256"])
test("glb_file_length",len(b),j_owner["realOwnerGLB"]["bytes"])
magic,version,total=struct.unpack_from("<III",b,0)
test("GLB_magic",magic,0x46546c67)
test("GLB_version",version,2)
test("GLB_length",total,len(b))
n_json,t_json=struct.unpack_from("<II",b,12)
test("GLB_JSON_type",t_json,0x4E4F534A)
j=json.loads(b[20:20+n_json])
bin_off=20+n_json
n_bin,t_bin=struct.unpack_from("<II",b,bin_off)
bin_blob=b[bin_off+8:bin_off+8+n_bin]
test("GLB_BIN_type",t_bin,0x004E4942)
test("GLB_BIN_length",len(bin_blob),n_bin)
test("GLB_chunk_boundary",bin_off+8+n_bin,len(b))
test("glTF_asset_version",j["asset"]["version"],"2.0")
test("one_mesh",len(j["meshes"]),1)
prim=j["meshes"][0]["primitives"][0]
test("single_primitive",len(j["meshes"][0]["primitives"]),1)
test("triangle_mode",prim.get("mode",4),4)
access=j["accessors"]
attrs=prim["attributes"]
test("POSITION_exists", "POSITION" in attrs,True)
test("NORMAL_exists", "NORMAL" in attrs,True)
test("UV_exists", "TEXCOORD_0" in attrs,True)
test("POSITION_count", access[attrs["POSITION"]]["count"],512)
test("NORMAL_count", access[attrs["NORMAL"]]["count"],512)
test("UV_count", access[attrs["TEXCOORD_0"]]["count"],512)
test("POSITION_componentType", access[attrs["POSITION"]]["componentType"],5126)
test("POSITION_type", access[attrs["POSITION"]]["type"],"VEC3")
test("index_count", access[prim["indices"]]["count"],2790)
test("triangle_count_from_index_count",access[prim["indices"]]["count"]//3,930)
test("indices_componentType",access[prim["indices"]]["componentType"],5123)
test("one_node",len(j["nodes"]),1)
test("no_points_primitive",any(p.get("mode",4)==0 for mesh in j["meshes"] for p in mesh["primitives"]),False)
test("no_instancing_extension", "EXT_mesh_gpu_instancing" in json.dumps(j),False)
test("owner_tiny_no_capture",j_owner["tinyOwner"]["capture"]["bufferCount"],0)
test("owner_tiny_calls",j_owner["tinyOwner"]["capture"]["calls"],12)
test("owner_grid_captured_buffers",j_owner["largeOwner"]["capture"]["bufferCount"],4)
test("owner_grid_summarized_vertices",j_owner["largeOwner"]["capture"]["vertexCount"],512)
test("owner_grid_summarized_triangles",j_owner["largeOwner"]["capture"]["triangleCount"],930)
test("owner_grid_ground_truth_points",j_owner["largeOwner"]["groundTruth"]["pointCount"],5)
test("owner_grid_ground_truth_instances",j_owner["largeOwner"]["groundTruth"]["instancedCopies"],3)
test("ram_min_above_hard_stop",j_owner["minFreeMiB"]>100,True)
test("private_owner_export_only",j_owner["thirdPartyGLBExported"],False)
test("execution_success",j_owner["stopReason"],"SUCCESS")
test("no_owner_runner_issues",len(j_owner["issues"]),0)
test("derived_manifest_private",j_owner.get("derivedOwnerOnlyManifest"),True)
def accessor_values(index):
    a=access[index]
    view=j["bufferViews"][a["bufferView"]]
    start=view.get("byteOffset",0)+a.get("byteOffset",0)
    count=a["count"]; comps={"VEC3":3,"VEC2":2,"SCALAR":1}[a["type"]]
    typ={5126:"f",5123:"H",5125:"I"}[a["componentType"]]
    unit=struct.calcsize("<"+typ)
    stride=view.get("byteStride",unit*comps)
    assert 0<=start<len(bin_blob), ("bad_start",start)
    assert start+stride*(count-1)+unit*comps<=len(bin_blob), ("bad_accessor_range",index)
    return [struct.unpack_from("<"+typ*comps,bin_blob,start+i*stride) for i in range(count)]
pos=accessor_values(attrs["POSITION"]);norm=accessor_values(attrs["NORMAL"])
uv=accessor_values(attrs["TEXCOORD_0"]);idx=accessor_values(prim["indices"])
test("positions_all_finite",all(math.isfinite(x) for p in pos for x in p),True)
test("positions_min_x",abs(min(p[0] for p in pos)-(-.94))<1e-5,True)
test("positions_max_x",abs(max(p[0] for p in pos)-(-.26))<1e-5,True)
test("positions_min_y",abs(min(p[1] for p in pos)-(-.76))<1e-5,True)
test("positions_max_y",abs(max(p[1] for p in pos)-(.76))<1e-5,True)
test("positions_z_zero",max(abs(p[2]) for p in pos)<1e-6,True)
test("indices_in_range",all(0<=i[0]<512 for i in idx),True)
test("indices_first_quad", [i[0] for i in idx[:6]], [0,1,33,0,33,32])
test("normals_plusZ",all(abs(p[0])<1e-5 and abs(p[1])<1e-5 and abs(p[2]-1)<1e-5 for p in norm),True)
test("uv_count_512",len(uv),512)
test("capture_summary_has_normal",j_owner["largeOwner"]["capture"]["slots"]["NORMAL"] is not None,True)
if (D/"X31-OWN-KHRONOS-GLTF-VALIDATOR.json").exists():
    k=json.loads((D/"X31-OWN-KHRONOS-GLTF-VALIDATOR.json").read_text(encoding="utf-8"))
    test("khronos_error_count",k["result"]["issues"]["numErrors"],0)
    test("khronos_warning_count",k["result"]["issues"]["numWarnings"],0)
historical={}
for stage,name,want in [
 ("X27","X27-INDEPENDENT-ACCEPTANCE.json",49),
 ("X28","X28-INDEPENDENT-ACCEPTANCE.json",58),
 ("X29","X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json",88),
 ("X30","X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json",96)]:
    h=R/"02-reviewed-derived"/f"{stage}-CURRENT"/name
    historical[stage]={"file":str(h),"exists":h.exists()}
    if h.exists():
        historical[stage]["sha256"]=sha(h.read_bytes())
result={"stage":"X31","generatedUTC":datetime.datetime.now(datetime.timezone.utc).isoformat(),
 "scope":"OFFICIAL_MESHGRAB_ON_OWNER_GENERATED_FIXTURE_ONLY; NO_COMMERCIAL_MODEL_EXPORT",
 "sourceOwnerFixtureSHA256":j_owner["ownerFixtures"],
 "glbSHA256":sha(b),"glbBytes":len(b),
 "geometry":{"positions":len(pos),"indices":len(idx),"triangles":len(idx)//3,"normals":len(norm),"uvPairs":len(uv),
 "primitives":len(j["meshes"][0]["primitives"]),"glPointsExported":False,
 "instancesExported":1, "originalOwnerInstances":3,"originalOwnerPoints":5},
 "distinctChecks":len(checks),"passed":sum(v["pass"] for v in checks.values()),
 "failed":{k:v for k,v in checks.items() if not v["pass"]},"checks":checks,"priorAcceptanceEvidence":historical}
(D/"X31-INDEPENDENT-REAL-OWNER-GLB-AND-X01-X30-ACCEPTANCE.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("X31_INDEPENDENT",json.dumps({"checks":len(checks),"passed":result["passed"],
 "failed":result["failed"],"geometry":result["geometry"],"prior":historical},ensure_ascii=False))
if result["failed"]:raise SystemExit(1)
