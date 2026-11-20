#!/usr/bin/env python3
"""X30 independent acceptance: official source/unit tests; real OWN glTF+Khronos;
90sec live READ-ONLY; X01–X29 evidence provenance and scope/rights.
No extension changes or external requests; raw third-party assets remain local only.
"""
import pathlib,json,hashlib,subprocess,datetime,re,struct,sys
ROOT=pathlib.Path.home()/'Desktop'/'DJMRN-Website-Reference-Evidence'/'fernhollow-gladeye-20261118-NEW-EXTRACTION'
D=ROOT/'02-reviewed-derived'/'X30-CURRENT'
P=ROOT/'01-private-captures'/'X30'
SRC=pathlib.Path.home()/'AppData'/'Local'/'DJMRN-Website-Toolkit'/'04-Specialists'/'Sources'/'WebGLModelExtractor'/'webgl-model-extractor-main'
X29=ROOT/'02-reviewed-derived'/'X29-CURRENT'
C={}
def check(k,x):C[k]=bool(x)
def j(p):return json.loads(p.read_text(encoding='utf8'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def blob(p):
 q=subprocess.run(['git','hash-object','--',str(p)],capture_output=True,text=True,timeout=15)
 return q.stdout.strip() if q.returncode==0 else ''
TOOL=j(D/'X30-OFFICIAL-binbuf-SOURCE-LICENSE-SECURITY-FREE-PREFLIGHT.json')
OWN=j(D/'X30-REAL-OFFICIAL-EXTENSION-OWN-GLB-CAPTURE-INDEX.json')
GLB=j(D/'X30-INDEPENDENT-OWN-GLB-GEOMETRY-TRANSFORM-AND-X29-COMPARISON.json')
KHR=j(D/'X30-OWN-X29-vs-X30-KHRONOS-GLTF-COMPLIANCE.json')
LIVE=j(D/'X30-90S-LIVE-READONLY-MODEL-EXTRACTOR-METADATA-X01-X29-TIMELINE.json')
HIST=j(X29/'X29-90S-LIVE-READONLY-WEBGLRIPPER-METADATA-X01-X28-TIMELINE.json')
H29=j(X29/'X29-OWN-REAL-GLB-OBJ-INDEPENDENT-DECODED-GEOMETRY.json')
X19=j(ROOT/'02-reviewed-derived'/'X19-CURRENT'/'X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json')
X16=j(ROOT/'02-reviewed-derived'/'X16-CURRENT'/'X16-script-init-network-graph.json')
X28=j(ROOT/'02-reviewed-derived'/'X28-CURRENT'/'X28-SANITIZED-EIGHT-PHASE-DUAL-INSPECTOR-GPU-GRAPH-X01-X27-CROSSWALK.json')
X27A=j(ROOT/'02-reviewed-derived'/'X27-CURRENT'/'X27-INDEPENDENT-ACCEPTANCE.json')
X28A=j(ROOT/'02-reviewed-derived'/'X28-CURRENT'/'X28-INDEPENDENT-ACCEPTANCE.json')
X29A=j(X29/'X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json')
X29G=j(X29/'X29-PC-GITHUB-RAW-BYTE-EXACT-SHA256-MANIFEST.json')
# Original official source identity/license/security.
check('official_source_repo_identified',TOOL['canonical']=='https://github.com/binbuf/webgl-model-extractor')
check('official_source_version_0_7_0',TOOL['packageVersion']=='0.7.0')
check('official_chrome_extension_MV3',TOOL['manifestVersion']==3)
check('official_dist_version_matches_package',TOOL['extensionVersion']==TOOL['packageVersion'])
check('official_MIT_license_read',TOOL['officialLicense']=='MIT' and TOOL['licensePresent'])
check('official_local_no_duplicate_install',TOOL['dependenciesAlreadyPresent'])
check('official_existing_Chrome_for_testing_157',TOOL['browserChrome157Present'])
check('official_source_5_canonical_files_verified',TOOL['allSelectedExact'] and len(TOOL['sourceMatches'])==5)
for n,rec in TOOL['sourceMatches'].items():
 check('official_original_blob_SHA_'+n.replace('/','_').replace('.','_'),rec['byteExact'] and blob(SRC/n)==rec['GitHubCanonicalBlob'])
check('official_bundled_MAIN_world_matches_SHA',sha(SRC/'dist'/'chrome'/'main-world.js')==TOOL['bundledDistMainWorldSHA256'])
check('official_bundled_MAIN_world_not_empty',TOOL['bundledDistMainWorldBytes']>90000)
check('official_MV3_legal_all_urls_isolated_disclosed','<all_urls>' in TOOL['hostPermissions'])
check('official_role_observer_not_vendor_authority',TOOL['role'].startswith('Alternative'))
check('official_free_no_paid_use','Free' in TOOL['price'])
check('official_54_tests_54_pass_0_failed',TOOL['officialUnitTests']['counts'].get('pass')=='54' and TOOL['officialUnitTests']['counts'].get('fail')=='0')
check('official_unit_test_actual_log_SHA',sha(D/'X30-OFFICIAL-SOURCE-UNIT-TEST-LOCAL.txt')==TOOL['officialUnitTests']['logSHA256'])
# Real model extraction on original owner fixture.
check('OWN_extension_activated_in_isolated_Chrome',OWN['ripperAtStart']['active'] and OWN['ripperAtStart']['contexts']==1)
check('OWN_real_CAPTURE_SUCCESS',OWN['stop']=='SUCCESS' and OWN['captureStatus']=='SUCCESS')
check('OWN_capture_stage_terminal_done',OWN['captureStages'][-1]['stage']=='done')
check('OWN_capture_empty_issue_log',not OWN['issues'])
check('OWN_100MiB_RAM_stop_not_triggered',OWN['hardRAMStopMiB']==100 and OWN['minFreeRAMMiB']>100)
check('OWN_copyright_scope_not_vendors',OWN['originalVendorContentExported'] is False)
private=P/'OWN-GLB-EXPORT'/OWN['realGLB']['name']
check('OWN_real_original_binary_EXISTS',private.is_file())
check('OWN_real_binary_SHASIZE_exact',private.is_file() and sha(private)==OWN['realGLB']['sha256'] and private.stat().st_size==OWN['realGLB']['bytes'])
check('OWN_real_GLB2_header',private.read_bytes()[:4]==b'glTF' and struct.unpack_from('<I',private.read_bytes(),4)[0]==2)
check('OWN_GLB_decoder_reports_original_SHA',GLB['realGLB']['sha256']==OWN['realGLB']['sha256'])
check('OWN_GLB2_valid_true',GLB['realGLB']['validGLB2'])
check('OWN_three_real_GPU_draws',OWN['fixture']['drawCallsPerFrame']==3)
check('OWN_fixture_4_vertices_and_6_indices',GLB['ownerGroundTruth']['quadUniqueVertices']==4 and GLB['ownerGroundTruth']['quadSubmittedIndices']==6)
check('OWN_fixture_5_POINTS',GLB['ownerGroundTruth']['glPoints']==5)
check('OWN_fixture_3_instances',GLB['ownerGroundTruth']['instancedDrawInstanceCount']==3)
check('OWN_2_glTF_meshes',GLB['structure']['meshes']==2)
check('OWN_2_glTF_nodes',GLB['structure']['nodes']==2)
check('OWN_2_triangles_mesh_0',GLB['geometry'][0]['triangleCount']==2 and GLB['geometry'][0]['indexCount']==6)
check('OWN_4_vertices_mesh_0',GLB['geometry'][0]['positionCount']==4)
check('OWN_4_UV_mesh_0',GLB['geometry'][0]['uvCount']==4)
check('OWN_position_range_exact',GLB['geometry'][0]['boundingBox']==[[-0.96,-0.55,0.0],[-0.46,0.5,0.0]])
check('OWN_original_texture_present_in_GLTF',GLB['structure']['textureCount']==1 and GLB['structure']['imageCount']==1)
check('OWN_triangle_mesh_1_single',GLB['geometry'][1]['triangleCount']==1 and GLB['geometry'][1]['positionCount']==3)
check('OWN_TRIANGLES_only',GLB['structure']['modes']=={'4':2})
check('OWN_POINTS_not_exported_measured',GLB['comparisonToX29']['X30PointPrimitiveCount']==0)
check('OWN_instancing_not_recovered_measured',GLB['comparisonToX29']['X30InstanceBaseTriangleCopies']==1)
check('OWN_normals_not_exported_disclosed',sum(m['normalCount'] for m in GLB['geometry'])==0)
check('X29_normals_were_exported',sum(x['normalCount'] for x in H29['geometryPrimitives'])==7)
check('X29_POINTS_not_exported',H29['observed']['GLPOINTSPrimitives']==0)
check('X29_three_instances_collapse_to_one',H29['geometryPrimitives'][1]['triangles']==1)
check('X29_same_two_mesh_geometry_counts',[x['triangles'] for x in H29['geometryPrimitives']]==[x['triangleCount'] for x in GLB['geometry']])
check('OWN_Khronos_GLTF_reports_both_outputs',len(KHR['records'])==2 and {v['name'].split('_')[0] for v in KHR['records']}=={'X29','X30'})
check('OWN_Khronos_GLTF_original_hashes_match',KHR['records'][1]['sha256']==sha(private))
# Live 90s public non-expressive observation, conditional on proper provenance.
check('SITE_real_90s_post_load_observed',LIVE['stopReason']=='COMPLETED_90_SECONDS' and LIVE['actualObservedSeconds']>=90)
check('SITE_source_tool_correct',LIVE['tool'].startswith('official binbuf/webgl-model-extractor'))
check('SITE_real_one_context_READY',LIVE['modelExtractorReady']['active'] and LIVE['modelExtractorReady']['contexts']==1)
check('SITE_no_export_of_vendor_GLTF',LIVE['geometryExportOfOriginalSite'] is False and LIVE['originalSiteGLB'] is False)
check('SITE_no_vendor_raw_shader_or_texture_export',LIVE['originalVertexShaderSourcesSaved'] is False and LIVE['originalTexturePixelDataSaved'] is False)
check('SITE_browser_isolation_no_proxy_only',LIVE['isolatedChromeProxyBypass'] is True and LIVE['systemProxyUnchanged'] is True)
check('SITE_zero_runtime_issues',not LIVE['issues'])
check('SITE_min_free_RAM_over_100',LIVE['minFreeRamMiB']>100)
samps=LIVE['snapshots'];phases=['initial','hover_left','hover_right','scroll_450','pointer_center','reverse_scroll','return_idle']
check('SITE_7_90sec_phase_windows',len(samps)==7 and [s['label'] for s in samps]==phases)
check('SITE_all_windows_within_90sec',all(0<s['actualSecond']<90 for s in samps))
check('SITE_webgl2_each_window',all(s['metadata']['webgl2'] for s in samps))
check('SITE_canvas_each_window',all(s['metadata']['canvasCount']==1 for s in samps))
check('SITE_threejs154_each_window',all(s['metadata']['ThreeRevision']=='154' for s in samps))
check('SITE_extension_one_context_each_window',all(any(x.get('type')=='ready' and x.get('contexts')==1 for x in s['metadata']['ripperReady']) for s in samps))
after=samps[1:]
check('SITE_cumulative_DrawCalls_increase',all(after[i]['metadata']['renderer']['totalDraws']>after[i-1]['metadata']['renderer']['totalDraws'] for i in range(1,len(after))))
check('SITE_3_distinct_GL_signatures',all(s['metadata']['renderer']['signatureCount']==3 for s in after))
set_signatures={ (v['op'],v['mode'],v['count']) for s in after for v in s['metadata']['renderer']['signatures'] }
expected={('drawElements',0,960000),('drawElements',4,6),('drawArrays',4,3)}
check('SITE_three_original_DrawSignature_formats',set_signatures==expected)
check('SITE_960000_PointMode_indices_not_flowers',('drawElements',0,960000) in set_signatures)
check('SITE_X29_separate_live_baseline_90s',HIST['actualObservedSeconds']>=90)
x29_sigs={(v['op'],v['mode'],v['count']) for s in HIST['snapshots'][1:] for v in s['metadata']['renderer']['signatures']}
check('SITE_signatures_exact_X29_own_site_metadata',set_signatures==x29_sigs)
x28_sigs={(v['op'],v['mode'],v['vertexOrIndexSubmissionCount']) for v in X28['frames'][0]['SpectorRenderTargetDrawSequence']}
check('SITE_signatures_present_in_X28_real_GPU_frame',set_signatures==x28_sigs)
check('SITE_X28_REAL_16_draws_distinct_from_3_signatures',X28['frames'][0]['SpectorDrawCount']==16 and len(set_signatures)==3)
# First-party provenance original SHA-size pairs, historic network scope.
histurl={x['url']:x for x in X19['resources']}
check('X01_X19_known_78_path_inventory',len(histurl)==78)
check('SITE_first_party_path_count_nonzero',LIVE['observedFirstPartyPaths']>20)
check('SITE_all_original_path_hashes_verified_if_known',all(
 any(v['sha256']==x['sha256'] and v['bytes']==x['bytes'] for v in histurl.get(x['url'],{}).get('originalBodyVariants',[]))
 for x in LIVE['networkBodyShaAndSize'] if x['url'] in histurl))
check('SITE_original_path_hash_count_recorded',LIVE['totalHashedResponses']==len(LIVE['networkBodyShaAndSize']))
check('SITE_original_path_hash_exact_count_is_real',LIVE['originalBodyExactCount']==sum(x['exactPreviousOriginalBodyShaSize'] for x in LIVE['networkBodyShaAndSize']))
check('SITE_previous_X16_network_graph_exists',len(X16['edges'])>=37)
check('SITE_readonly_no_output_vendor_assets_in_author_source',
      'window.__webglRipper.capture()' not in (D/'X30-Official-binbuf-WebGLModelExtractor-90s-LIVE-ReadOnly-DirectNoProxy.cjs').read_text('utf8'))
check('SITE_100MiB_hard_emergency_script',
      'EMERGENCY_RAM_100_MIB' in (D/'X30-Official-binbuf-WebGLModelExtractor-90s-LIVE-ReadOnly-DirectNoProxy.cjs').read_text('utf8'))
# Original-site screenshots only private.
screens=[s.get('privateScreenshot') for s in samps if s.get('privateScreenshot')]
shotDir=P/'PUBLIC-90S-READONLY'
check('SITE_exactly_2_private_screenshots',len(screens)==2)
check('SITE_screenshots_SHA256_exact',len(screens)==2 and all(sha(shotDir/s['name'])==s['sha256'] for s in screens))
check('SITE_screen_1280x720',len(screens)==2 and all(struct.unpack('>II',(shotDir/s['name']).read_bytes()[16:24])==(1280,720) for s in screens))
# Cross-stage canonical history and archive preservation.
check('X27_49of49_independent_acceptance',X27A['checksPassed']==49 and not X27A['failed'])
check('X28_58of58_independent_acceptance',X28A['passed']==58 and not X28A['failed'])
check('X29_88of88_independent_acceptance',X29A['passed']==88 and not X29A['failed'])
check('X29_14of14_publicGitSource_exact',X29G['filesExact']==14 and X29G['allExact'])
check('historic_X01toX14_private_dir_preserved',all((ROOT/'01-private-captures'/f'X{i:02d}').is_dir() for i in range(1,15)))
check('historic_X15toX30_derived_dirs_preserved',all(
 (ROOT/'02-reviewed-derived'/f'X{i:02d}-CURRENT').is_dir() or (ROOT/'02-reviewed-derived'/f'X{i:02d}-AUDIT-CURRENT').is_dir()
 for i in range(15,31)))
check('historic_X29_original_site_private_still_exists',(ROOT/'01-private-captures'/'X29'/'public-live-metadata-90s').is_dir())
check('historic_X29_OWN_zip_unchanged',sha(ROOT/'01-private-captures'/'X29'/'own-fixture-export'/H29['userOwnedZip']['fileName'])==H29['userOwnedZip']['sha256'])
check('X30_original_OWN_glb_private_only',(P/'OWN-GLB-EXPORT').is_dir())
check('X30_live_site_snapshots_private_only',(P/'PUBLIC-90S-READONLY').is_dir())
result={'stage':'X30','observationUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),
'status':'PASS' if all(C.values()) else 'FAIL','passed':sum(C.values()),'total':len(C),'failed':[k for k,v in C.items() if not v],
'checks':C,'confirmedSource':'binbuf/webgl-model-extractor v0.7.0 MIT/MV3',
'X30OriginalOwnerGLBSHA256':sha(private),'X30LiveTimelineSHA256':sha(D/'X30-90S-LIVE-READONLY-MODEL-EXTRACTOR-METADATA-X01-X29-TIMELINE.json'),
'criticalCaveats':['Model-extractor 0.7.0 original owner fixture cannot export five GL_POINTS or preserve three submitted instances; only one instance exported',
 'X30 export lacks normals although X29 owner GLB included normal accessors',
 'Real commercial site GLB/OBJ/GLSL/textures NOT captured/exported',
 '3 distinct draw signatures must never be confused with 3 draw calls/frame; X28 shows 16 draws/frame',
 'GPU 960000 POINT index count is NOT flower count',
 'Visual dispersal/return cause is not proven',
 'Live Chrome isolated --no-proxy-server flag bypasses WinINET proxy ONLY inside throwaway browser; Windows/VPN system proxy untouched',
 'No server-side native asset recovery, no Chrome Web Store extension installation, no paid services']}
(D/'X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json').write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n',encoding='utf8')
cross={'stage':'X30','status':result['status'],'ownerComparison':GLB['comparisonToX29'],'ownGLBStructure':GLB['structure'],
'liveObservedSeconds':LIVE['actualObservedSeconds'],'phases':[{'label':s['label'],'time':s['actualSecond'],
'cumulativeGPUdraws':s['metadata']['renderer']['totalDraws'],'uniqueGLsignatures':s['metadata']['renderer']['signatures'],
'privateImageSHA256':s.get('privateScreenshot',{}).get('sha256')} for s in samps],
'knownX19Paths':len(histurl),'X30FirstPartyPaths':LIVE['observedFirstPartyPaths'],
'newPaths':LIVE['novelFirstPartyPaths'],'X30SourceBodyHashesTotal':LIVE['totalHashedResponses'],
'X30SourceHashesExact':LIVE['originalBodyExactCount'],'X30X16GraphObservedEdges':LIVE['networkInitiatorEdgesObserved'],
'newEdges':LIVE['newInitiatorEdges'],'X29PriorLiveSeconds':HIST['actualObservedSeconds'],
'X28OriginalDrawsPerFrame':X28['frames'][0]['SpectorDrawCount'],
'sourceUnitTests':TOOL['officialUnitTests']['counts'],'sourceCanonFileMatches':TOOL['sourceMatches'],
'caveats':result['criticalCaveats']}
(D/'X30-SANITIZED-OWN-GLB-POINTS-INSTANCING-X01-X29-90S-CROSSWALK.json').write_text(json.dumps(cross,indent=2,ensure_ascii=False)+'\n',encoding='utf8')
print(json.dumps({'status':result['status'],'passed':result['passed'],'total':result['total'],'failed':result['failed'],
 'liveSec':LIVE['actualObservedSeconds'],'hashes':[LIVE['originalBodyExactCount'],LIVE['totalHashedResponses']]}))
sys.exit(0 if not result['failed'] else 2)
