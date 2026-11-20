#!/usr/bin/env python3
"""X30 independent, standard-library only GLB2 decoder for original OWN WebGL fixture.
No site models imported. Raw OWN export retained locally. Public derived report numeric only.
"""
import pathlib,struct,json,hashlib,math
ROOT=pathlib.Path.home()/'Desktop'/'DJMRN-Website-Reference-Evidence'/'fernhollow-gladeye-20261118-NEW-EXTRACTION'
D=ROOT/'02-reviewed-derived'/'X30-CURRENT'
P=ROOT/'01-private-captures'/'X30'/'OWN-GLB-EXPORT'
RUN=json.loads((D/'X30-REAL-OFFICIAL-EXTENSION-OWN-GLB-CAPTURE-INDEX.json').read_text('utf8'))
X29=json.loads((ROOT/'02-reviewed-derived'/'X29-CURRENT'/'X29-OWN-REAL-GLB-OBJ-INDEPENDENT-DECODED-GEOMETRY.json').read_text('utf8'))
GT=X29['originalFixtureGroundTruth']
fp=P/RUN['realGLB']['name']
b=fp.read_bytes()
sha=lambda v:hashlib.sha256(v).hexdigest()
assert len(b)==RUN['realGLB']['bytes'] and sha(b)==RUN['realGLB']['sha256']
magic,version,declared=struct.unpack_from('<4sII',b,0)
assert magic==b'glTF' and version==2 and declared==len(b)
n,kind=struct.unpack_from('<I4s',b,12)
assert kind==b'JSON'
doc=json.loads(b[20:20+n])
offset=20+n
bin_bytes=b''
if offset<len(b):
  bn,bkind=struct.unpack_from('<I4s',b,offset)
  assert bkind==b'BIN\x00'
  bin_bytes=b[offset+8:offset+8+bn]
fmt={5120:('b',1),5121:('B',1),5122:('h',2),5123:('H',2),5125:('I',4),5126:('f',4)}
comps={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT2':4,'MAT3':9,'MAT4':16}
def access(index):
    a=doc['accessors'][index]
    view=doc['bufferViews'][a['bufferView']]
    typ,size=fmt[a['componentType']]
    ncomp=comps[a['type']]
    at=a.get('byteOffset',0)+view.get('byteOffset',0)
    stride=view.get('byteStride',ncomp*size)
    return [struct.unpack_from('<'+typ*ncomp,bin_bytes,at+i*stride) for i in range(a['count'])]
meshes=[]
for m_index,m in enumerate(doc.get('meshes',[])):
  for p in m.get('primitives',[]):
    att=p['attributes']
    positions=access(att['POSITION']) if 'POSITION' in att else []
    normals=access(att['NORMAL']) if 'NORMAL' in att else []
    uv=access(att['TEXCOORD_0']) if 'TEXCOORD_0' in att else []
    inds=access(p['indices']) if 'indices' in p else []
    mode=p.get('mode',4)
    meshes.append({
     'mesh':m_index,'meshName':m.get('name'),'mode':mode,
     'positionCount':len(positions),'normalCount':len(normals),'uvCount':len(uv),
     'indexCount':len(inds),'triangleCount':(len(inds) if inds else len(positions))//3 if mode==4 else 0,
     'pointCount':(len(inds) if inds else len(positions)) if mode==0 else 0,
     'boundingBox':[[round(min(row[i] for row in positions),5) for i in range(3)],[round(max(row[i] for row in positions),5) for i in range(3)]] if positions else None,
     'positionSample':[[round(x,5) for x in row] for row in positions[:4]],
     'UVSample':[[round(x,5) for x in row] for row in uv[:4]],
     'materialIndex':p.get('material'),
     'finitePosition':all(math.isfinite(x) for r in positions for x in r)
    })
nodes=[]
for i,node in enumerate(doc.get('nodes',[])):
  nodes.append({'index':i,'mesh':node.get('mesh'),'name':node.get('name'),
   'translation':node.get('translation'),'rotation':node.get('rotation'),
   'scale':node.get('scale'),'matrix':node.get('matrix'),
   'childrenCount':len(node.get('children',[]))})
refs={}
for n in nodes:
 if n['mesh'] is not None:refs[n['mesh']]=refs.get(n['mesh'],0)+1
modes={}
for x in meshes:modes[str(x['mode'])]=modes.get(str(x['mode']),0)+1
report={
 'stage':'X30','scope':'OWN_LAB_FIXTURE_ONLY','tool':'binbuf/webgl-model-extractor v0.7.0',
 'realGLB':{'file':fp.name,'bytes':len(b),'sha256':sha(b),'validGLB2':True},
 'geometry':meshes,'nodes':nodes,'meshNodeReferenceCounts':refs,
 'structure':{'meshes':len(doc.get('meshes',[])),'nodes':len(nodes),'sceneCount':len(doc.get('scenes',[])),'materialCount':len(doc.get('materials',[])),'textureCount':len(doc.get('textures',[])),'imageCount':len(doc.get('images',[])),'modes':modes,'extensionsUsed':doc.get('extensionsUsed',[])},
 'ownerGroundTruth':GT,
 'comparisonToX29':{
  'X29TrianglesModes':[(p['vertices'],p['triangles']) for p in X29['geometryPrimitives']],
  'X29PointPrimitives':X29['observed']['GLPOINTSPrimitives'],
  'X29NodeCount':X29['GLBStructure']['nodeCount'],
  'X29TextureCount':X29['GLBStructure']['textureCount'],
  'X30PointPrimitiveCount':modes.get('0',0),
  'X30InstanceBaseTriangleCopies':refs.get(1),
 },
 'limitations':['Draw capture is synthetic OWN original only; site geometry never exported',
                'A single glTF mesh referenced by multiple nodes preserves instancing as hierarchy; not duplicate vertex buffer',
                'A missing source 2x2 texture or UV is reported, not excused',
                'X29 and X30 draws may differ in capture time. Full site source is not part of comparison']
}
(D/'X30-INDEPENDENT-OWN-GLB-GEOMETRY-TRANSFORM-AND-X29-COMPARISON.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n',encoding='utf8')
print(json.dumps({'structure':report['structure'],'primitives':report['geometry'],'nodes':nodes,'X29':report['comparisonToX29']},ensure_ascii=False))
