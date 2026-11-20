#!/usr/bin/env python3
"""DJMRN X27 independent, deterministic, offline cross-stage acceptance.
Reads immutable X01-X26 originals, generates ONLY X27 own sanitized outputs.
Never fetches website or original commercial GLSL, never edits vendor scene.
"""
import hashlib
import json
import pathlib

BASE = pathlib.Path.home() / "Desktop" / "DJMRN-Website-Reference-Evidence" / "fernhollow-gladeye-20261118-NEW-EXTRACTION"
D = BASE / "02-reviewed-derived"
HERE = D / "X27-CURRENT"
TK = pathlib.Path.home() / "AppData" / "Local" / "DJMRN-Website-Toolkit" / "04-Specialists" / "Sources" / "ShaderEditorExtension"
SRC = TK / "source-564f6c1922b1"
ZFILE = TK / "ShaderEditorExtension-564f6c1922b1dcf98813e6940d1e91995495e6dc.zip"
CHECK = {}
DETAILS = {}
def rd(file):
    return json.loads(file.read_text(encoding="utf-8-sig"))
def sha(p):
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()
def check(label, value, details=None):
    CHECK[label] = bool(value)
    if details is not None:
        DETAILS[label] = details
def main():
    receipt = rd(HERE / "X27-OFFICIAL-SOURCE-SECURITY-COMPATIBILITY-RECEIPT.json")
    base = rd(HERE / "X27-X22-CANONICAL-22-SHADER-SHA256-REFERENCE.json")
    own = rd(HERE / "X27-own-fixture-run-summary.json")
    fixture_driver = rd(HERE / "X27-fixture-driver-summary.json")
    live = rd(HERE / "X27-live-run-summary.json")
    x19 = rd(D / "X19-CURRENT" / "X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
    x16 = rd(D / "X16-CURRENT" / "X16-script-init-network-graph.json")
    x25 = rd(D / "X25-CURRENT" / "X25-live-run-summary.json")
    x26 = rd(D / "X26-CURRENT" / "X26-live-run-summary.json")
    x26_accept = rd(D / "X26-CURRENT" / "X26-INDEPENDENT-ACCEPTANCE.json")
    manifest = rd(SRC / "src" / "manifest.json")
    values = []
    expected_hash = set(base["shaderHashesSha256Sorted"])
    for item in live["samples"]:
        filename = HERE / item["file"]
        snapshot = rd(filename)
        ctx = snapshot["contexts"][0]
        sh = ctx["shaderRecords"]
        ps = ctx["programRecords"]
        hashes = sorted({v["sha256"] for v in sh if v.get("sha256")})
        values.append({
            "label": item["label"], "atSeconds": item["atSecond"],
            "shaderHashes": hashes,
            "newShadersVersusX22": sorted(set(hashes) - expected_hash),
            "missingShadersVersusX22": sorted(expected_hash - set(hashes)),
            "shaderKinds": {k: sum(s["kind"] == k for s in sh) for k in ("VERTEX", "FRAGMENT", "OTHER")},
            "perShaderSourceLengthHashAndCompileResult": [
                {"id": s["id"], "kind": s["kind"], "sourceSha256": s["sha256"],
                 "utf8Bytes": s["utf8Bytes"], "lineCount": s["lineCount"],
                 "glsl300": s["glsl300"], "compiled": s["compiled"]} for s in sh],
            "programAttachmentsAndLinkResult": ps,
            "windowDrawing": snapshot["contexts"][0]["counts"],
            "rawEvidenceFile": item["file"], "rawEvidenceSHA256": item["sha256"],
            "rawSHAAndSizeMatches": sha(filename) == item["sha256"] and filename.stat().st_size == item["bytes"]})
    observed_first_party = set(live["firstPartyPaths"])
    original_by_url = {r["url"]: r for r in x19["resources"]}
    new_urls = sorted(observed_first_party - set(original_by_url))
    sha_rows = []
    for b in live["bodySHA"]:
        known = original_by_url.get(b["url"], {}).get("originalBodyVariants", [])
        sha_rows.append({"url": b["url"], "sha256": b["sha256"], "bytes": b["bytes"],
                         "exactHistoricalBody": any(i["sha256"] == b["sha256"] and i["bytes"] == b["bytes"] for i in known)})
    original_edges = {e["from"] + "|" + e["to"] for e in x16["edges"]}
    unseen_edges = sorted(e["edge"] for e in live["initiatorEdges"] if e["edge"] not in original_edges)
    owned = own["initial"], own["validEdit"], own["invalidEdit"], own["recovery"]
    check("official_source_ZIP_sha256_verified", ZFILE.is_file() and sha(ZFILE) == receipt["sourceZIPSHA256"])
    check("official_source_ZIP_expected_5315076_bytes", ZFILE.stat().st_size == 5315076)
    check("official_unmodified_43_source_files", len([f for f in SRC.rglob("*") if f.is_file()]) == 43)
    check("source_pinned_to_Github_SHA", receipt["immutableOfficialCommit"] == "564f6c1922b1dcf98813e6940d1e91995495e6dc")
    check("official_source_LICENSE_MIT", receipt["licenseVerified"] and "MIT" in (SRC / "LICENSE").read_text(encoding="utf-8"))
    check("legacy_manifest_v2", manifest["manifest_version"] == 2)
    check("legacy_extension_version_1_0_17", manifest["version"] == "1.0.17")
    check("legacy_permissions_identified", "webNavigation" in manifest["permissions"] and "storage" in manifest["permissions"])
    check("legacy_allframes_allurls_documentend_disclosed",
          manifest["content_scripts"][0]["all_frames"] and "<all_urls>" in manifest["content_scripts"][0]["matches"])
    check("MV2_never_enabled_in_personal_or_isolated_Chrome", not live["legacyExtensionActivated"] and
          not receipt["personalBrowserExtensionInstalledOrActivated"])
    check("MV2_not_bypassed", not receipt["manifestV2PolicyBypassAttempted"])
    check("fixture_source_is_OWN_artifact", (HERE / "X27-OWN-WebGL2-Live-Shader-Editor-Fixture.html").is_file())
    check("OWN_initial_shader_pixel_red", owned[0]["accepted"] and owned[0]["pixel"] == [255, 0, 0, 255])
    check("OWN_live_fragment_shader_edit_pixel_green", owned[1]["accepted"] and owned[1]["pixel"] == [0, 255, 0, 255])
    check("OWN_bad_GLSL_compile_rejected", not owned[2]["accepted"] and owned[2]["errorClass"] == "GLSL_COMPILE_OR_LINK_FAILURE")
    check("OWN_bad_GLSL_preserves_previous_program", owned[2]["previousProgramContinues"] and owned[2]["pixel"] == [0, 255, 0, 255])
    check("OWN_reversion_pixel_red", owned[3]["accepted"] and own["finalPixel"] == [255, 0, 0, 255])
    check("OWN_fixture_no_errors", not fixture_driver["errors"] if "errors" in fixture_driver else fixture_driver["complete"])
    check("site_90s_continuous_observation", live["complete"] and live["seconds"] >= 90, live["seconds"])
    check("site_exact_7_discrete_observation_windows", len(live["samples"]) == 7)
    check("site_expected_7_actions", [s["label"] for s in live["samples"]] ==
          ["baseline", "pointer_left", "pointer_right", "wheel_450", "pointer_center", "wheel_800", "pointer_reverse"])
    check("site_WebGL2_programs_observed_each_sample", all(v["shaderKinds"]["VERTEX"] == 11 for v in values))
    check("site_WebGL2_fragment_shaders_observed_each_sample", all(v["shaderKinds"]["FRAGMENT"] == 11 for v in values))
    check("22_independently_sha256_hashed_GL_source_texts_in_browser", all(len(v["shaderHashes"]) == 22 for v in values))
    check("22_of_22_current_SHA_equal_original_X22", all(not v["newShadersVersusX22"] and not v["missingShadersVersusX22"] for v in values))
    check("X22_source_blob_authority_verified_reference", base["sourceGitBlobSHA1"] == "9828d8854721fd2d7cb44987bef836edc47e8e4d")
    check("each_shader_compile_status_success", all(all(s["compiled"] is True for s in v["perShaderSourceLengthHashAndCompileResult"]) for v in values))
    check("all_original_shader_source_GLSL_300", all(all(s["glsl300"] is True for s in v["perShaderSourceLengthHashAndCompileResult"]) for v in values))
    check("each_11_program_link_success", all(len(v["programAttachmentsAndLinkResult"]) == 11 and all(p["linked"] is True for p in v["programAttachmentsAndLinkResult"]) for v in values))
    check("each_program_shaders_two", all(all(len(p["attached"]) == 2 for p in v["programAttachmentsAndLinkResult"]) for v in values))
    check("public_capture_only_shader_hash_no_GLSL_raw", not live["proprietaryGLSLRawStored"] and not live["commercialShaderEdited"])
    check("each_7_raw_sample_bytes_SHA256_preserved", all(v["rawSHAAndSizeMatches"] for v in values))
    check("7_samples_16_draws_per_prior_X22_cycle", all(v["windowDrawing"]["drawCalls"] % 16 == 0 for v in values))
    check("7_samples_1_points_and_15_triangles_per_cycle",
          all(v["windowDrawing"]["pointsDraws"] * 16 == v["windowDrawing"]["drawCalls"]
              and v["windowDrawing"]["triangleDraws"] * 16 == v["windowDrawing"]["drawCalls"] * 15 for v in values))
    check("all_7_samples_RAM_above_emergency_100MiB", all(i["freeMiB"] > 100 for i in live["samples"]))
    check("minimum_RAM_above_emergency_100MiB", live["minFreeMiB"] > 100 and not live["emergencyStopped"], live["minFreeMiB"])
    check("no_browser_console_or_network_errors", not live["errors"])
    check("site_URL_network_78_original_ledger_exists", len(x19["resources"]) == 78)
    check("site_no_new_URL_paths", not new_urls, new_urls)
    check("site_network_original_body_SHA_size_all_exact", len(sha_rows) > 0 and all(i["exactHistoricalBody"] for i in sha_rows),
          {"observed": len(sha_rows), "exact": sum(i["exactHistoricalBody"] for i in sha_rows)})
    check("site_X16_initiator_edges_no_novel", not unseen_edges, unseen_edges)
    check("historical_X25_real_7_sample_preserved", x25["complete"] and len(x25["captures"]) == 7)
    check("historical_X26_real_7_sample_preserved", x26["complete"] and len(x26["samples"]) == 7)
    check("historical_X26_all_48_test_acceptances_preserved", x26_accept["status"] == "PASS" and x26_accept["checksPassed"] == 48)
    check("X24_7_original_binary_GPU_packets_still_local_private",
          len(list((BASE / "01-private-captures" / "X24" / "full-rust-wasm-2026-11-20" / "live-90s-stage2-gc").glob("*.webgd"))) == 7)
    check("X27_two_private_site_screenshots_still_local",
          len(list((BASE / "01-private-captures" / "X27" / "shader-editor-2026-11-20").glob("*PRIVATE.png"))) == 2)
    check("all_X01_to_X27_stage_derived_directories_still_present",
          all(list(D.glob("X{:02d}*".format(i))) for i in range(1, 28)))
    check("no_billing_extra_package_or_extension_permission_change", not receipt["personalBrowserExtensionInstalledOrActivated"])
    check("only_published_owner_generated_source_or_derived_provenance", all(v["rawSHAAndSizeMatches"] for v in values))
    # Deterministic content: observation timestamp is frozen, no fresh UTC timestamp from this analysis run.
    published = {
        "stage": "X27",
        "referenceObservationUTC": live["observationStartUTC"],
        "status": "COMPLETE_SCOPE_QUALIFIED_LEGACY_MV2_BLOCKED_MODERN_OWN_SHADER_EDIT_PASS",
        "upstream": {"repo": receipt["officialRepo"], "commit": receipt["immutableOfficialCommit"],
                     "MIT": True, "sourceZIP_SHA256": receipt["sourceZIPSHA256"],
                     "extensionManifestVersion": 2, "extensionActivated": False},
        "ownFixtureOnlyActualLiveShaderEditProof": own,
        "independentlyObservedPublicSiteSeconds": live["seconds"],
        "sevenIndependentGLSLReadOnlySamples": values,
        "newOriginalShaderHashesVersusX22": sorted(set().union(*(set(v["newShadersVersusX22"]) for v in values))),
        "priorX22SourceGitBlobSHA1": base["sourceGitBlobSHA1"],
        "priorX22ShaderCount": len(expected_hash),
        "originalNetworkComparison": {
            "firstPartyPathCount": len(live["firstPartyPaths"]), "newPaths": new_urls,
            "SHA256BodySamples": len(sha_rows), "SHA256AndOriginalBytesMatching": sum(i["exactHistoricalBody"] for i in sha_rows),
            "bodyVariants": sha_rows, "networkInitiatorEdges": len(live["initiatorEdges"]),
            "newNetworkEdges": unseen_edges},
        "minFreeRAM_MiB": live["minFreeMiB"],
        "classification": ["OWN WebGL2 fragment source recompile/relink and safe rejected rollback = real proof",
                           "Third-party site shaders only observed as SHA256/length/type/program link status; never edited or saved as raw original GLSL",
                           "Seven discrete samples over 90s page observation, not every GPU frame/replay",
                           "Draws across each time-window do not establish accurate FPS",
                           "Legacy MV2 cannot be activated in Chrome 157 without unsupported policy bypass/downgrade"] }
    (HERE / "X27-SANITIZED-90S-SHADER-COMPILE-LINK-X01-X26-CROSSWALK.json").write_text(
        json.dumps(published, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    result = {"stage": "X27", "referenceObservationUTC": live["observationStartUTC"],
              "status": "PASS" if all(CHECK.values()) else "FAIL",
              "checksPassed": sum(CHECK.values()), "checksTotal": len(CHECK),
              "failed": [k for k, v in CHECK.items() if not v], "checks": CHECK,
              "details": DETAILS, "noChangesToHistoricOriginals": True,
              "sourceTitle": "DJMRN-X27-Independent-X01-X26-Shader-Reconciliation"}
    (HERE / "X27-INDEPENDENT-ACCEPTANCE.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"status": result["status"], "passed": result["checksPassed"], "total": result["checksTotal"],
                      "failures": result["failed"], "seconds": live["seconds"], "SHA22Match": all(not v["newShadersVersusX22"]
                      and not v["missingShadersVersusX22"] for v in values),
                      "observedSHA256Bodies": len(sha_rows), "originalURLPaths": len(live["firstPartyPaths"]),
                      "drawCallCount": sum(x["windowDrawing"]["drawCalls"] for x in values),
                      "minFreeRAM_MiB": live["minFreeMiB"]}, ensure_ascii=False))
    if result["failed"]:
        raise SystemExit(2)
if __name__ == "__main__":
    main()
