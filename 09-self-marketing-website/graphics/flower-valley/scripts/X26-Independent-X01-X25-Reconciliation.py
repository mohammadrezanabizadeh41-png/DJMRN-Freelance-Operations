#!/usr/bin/env python3
"""DJMRN X26 independent evidence reconciliation; NEVER performs site requests or installs."""
import datetime
import hashlib
import json
import pathlib
from collections import Counter
from urllib.parse import urlsplit

ROOT = pathlib.Path.home() / "Desktop" / "DJMRN-Website-Reference-Evidence" / "fernhollow-gladeye-20261118-NEW-EXTRACTION"
D = ROOT / "02-reviewed-derived"
X = D / "X26-CURRENT"
UP = pathlib.Path.home() / "AppData" / "Local" / "DJMRN-Website-Toolkit" / "04-Specialists" / "Sources" / "webgl-insight"
SHA_UP = "cbe4463869bbf543106d672790f82155a22844f8"
checks = {}
details = {}


def load(p):
    return json.loads(p.read_text(encoding="utf-8-sig"))


def sha(p):
    h = hashlib.sha256()
    with p.open("rb") as fp:
        for block in iter(lambda: fp.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def check(name, condition, evidence=None):
    checks[name] = bool(condition)
    if evidence is not None:
        details[name] = evidence


def named_raw(metadata_list):
    result = []
    for item in metadata_list:
        p = X / item["file"]
        exists = p.is_file()
        result.append({"label": item["label"], "exists": exists, "bytesMatch": exists and p.stat().st_size == item["bytes"],
                       "sha256Match": exists and sha(p) == item["sha256"],
                       "file": item["file"]})
    return result


def count(k, parts):
    return sum(s["counts"].get(k, 0) for s in parts)


def main():
    legacy = load(X / "X26-OFFICIAL-SOURCE-SECURITY-INSTALL-RECEIPT.json")
    fixture = load(X / "X26-fixture-run-summary.json")
    live = load(X / "X26-live-run-summary.json")
    old25 = load(D / "X25-CURRENT" / "X25-live-run-summary.json")
    ledger = load(D / "X19-CURRENT" / "X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
    x16 = load(D / "X16-CURRENT" / "X16-script-init-network-graph.json")
    x25accept = load(D / "X25-CURRENT" / "X25-R2-INDEPENDENT-ACCEPTANCE.json")
    repo_bytes = UP / f"insight-{SHA_UP}.zip"
    src = UP / "source-cbe4463869bb"
    manifest = load(src / "manifest.json")
    readme = (src / "README.md").read_text(encoding="utf-8")
    check("official_zip_exists", repo_bytes.is_file())
    check("official_zip_SHA256_exact", sha(repo_bytes) == "23820d60993ec466a754d394e2072d8411d50b82aa267bc40bac9b8a1c1d4989")
    check("official_zip_bytes_exact", repo_bytes.stat().st_size == 525048)
    check("pinned_official_git_commit_recorded", legacy["commit"] == SHA_UP)
    check("official_source_79_files", len([p for p in src.rglob("*") if p.is_file()]) == 79)
    check("official_source_deprecated_and_removed_from_store", "DEPRECATED" in readme and "no longer available" in readme)
    check("official_manifest_MV2_not_MV3", manifest["manifest_version"] == 2)
    check("official_v_1_0_3", manifest["version"] == "1.0.3")
    check("official_MIT_license", legacy["licenseVerified"] and "MIT" in (src / "LICENSE.md").read_text(encoding="utf-8"))
    check("legacy_permissions_reviewed", manifest["permissions"] == ["tabs", "storage"])
    check("legacy_broad_match_unsafe_eval_not_enabled", legacy["manifestUsesAllURLs"] and legacy["manifestUnsafeEval"] and
          not legacy["oldMV2BrowserActivationAttempted"] and not live["legacyExtensionActivated"])
    check("legacy_has_not_been_force_ported", not legacy["portToMV3Attempted"])
    check("isolated_modern_Chrome_157_used", "Chrome for Testing 157" in live["chrome"] and "Chrome for Testing 157" in fixture["chrome"])
    check("privacy_source_and_overdraw_risk_properly_labeled", live["classification"] == "LIVE_STATE_ONLY_NOT_PIXEL_ACCURATE" and
          fixture["classification"] == "OWN_PIXEL_ACCURATE_OVERDRAW")
    check("OWN_fixture_exact_overdraw_pass", bool(fixture["fixture"]["passed"]))
    check("OWN_fixture_three_controlled_pixel_layers", fixture["fixture"]["observed"] == {"one": 2048, "two": 1024, "three": 1024})
    check("OWN_fixture_4096_pixel_area", sum(int(x) for x in fixture["fixture"]["pixelHistogram"].values()) == 4096)
    check("OWN_fixture_WebGL2_64x64", fixture["fixture"]["drawingBuffer"] == [64, 64])
    check("OWN_fixture_two_valid_observer_samples", len(fixture["samples"]) == 2 and all(x["contexts"] == 1 for x in fixture["samples"]))
    check("OWN_fixture_overdraw_observer_blend_depth_signal",
          all(x["blend"] > 0 and x["blendDepthWriteOff"] > 0 and x["triangles"] > 0 if "triangles" in x else x["blend"] > 0 and x["blendDepthWriteOff"] > 0
              for x in fixture["samples"]))
    check("OWN_fixture_true_observation_five_seconds", fixture["seconds"] >= 5 and fixture["complete"])
    check("fixture_no_runtime_errors", not fixture["errors"] and not fixture["emergencyStopped"])
    check("real_public_site_page_status_200_or_304", live["documentStatus"] in (200, 304))
    check("real_public_site_90_seconds", live["seconds"] >= 90, live["seconds"])
    check("real_site_completed_all_seven_discrete_samples", live["complete"] and len(live["samples"]) == 7)
    expected = ["baseline", "pointer_left", "pointer_right", "wheel_450", "pointer_center", "wheel_800", "pointer_reverse"]
    check("seven_exposure_conditions_exact", [x["label"] for x in live["samples"]] == expected)
    check("seven_sampled_contexts_are_WebGL2", all(
          load(X / x["file"])["states"][0]["version"] == "webgl2" for x in live["samples"]))
    raw = named_raw(live["samples"])
    check("all_seven_samples_exist_and_exact_SHA_bytes", len(raw) == 7 and all(r["exists"] and r["bytesMatch"] and r["sha256Match"] for r in raw), raw)
    check("minimum_RAM_gt_100MiB", live["minFreeMiB"] > 100 and not live["emergencyStopped"], live["minFreeMiB"])
    check("all_live_samples_memory_gt_100MiB", all(x["freeMiB"] > 100 for x in live["samples"]))
    check("live_observer_never_claims_GPU_timer", "NOT_PIXEL_ACCURATE" in live["classification"] and "GPU" not in live["observer"])
    check("live_all_samples_have_real_draw_observations", all(x["draw"] > 0 for x in live["samples"]))
    check("all_samples_draw_counts_partitioned_consistently", all(x["points"] <= x["draw"] and x["blend"] <= x["draw"] and
          x["depthWriteOff"] <= x["draw"] and x["blendDepthWriteOff"] <= x["blend"] for x in live["samples"]))
    check("every_sample_has_expected_11_16_GUI_scene_draw_pattern",
          all(x["draw"] % 16 == 0 and x["points"] * 16 == x["draw"] for x in live["samples"]))
    check("X25_legacy_seven_sample_source_preserved", old25["complete"] and len(old25["captures"]) == 7)
    check("X25_prior_Spector_drawing_baseline_valid", all(x["draws"] == 16 for x in old25["captures"]))
    check("X25_old_36_checks_pass", x25accept["passed"] == 36 and x25accept["total"] == 36 and x25accept["status"] == "PASS")
    known = {r["url"]: r for r in ledger["resources"]}
    known_url = set(known)
    newpaths = sorted(set(live["firstPartyPaths"]) - known_url)
    check("canonical_X19_78_URL_inventory_read", len(known) == 78)
    check("new_original_paths_disclosed_not_invented", isinstance(newpaths, list))
    comparisons = []
    for b in live["bodySHA"]:
        prior = known.get(b["url"], {}).get("originalBodyVariants", [])
        match = any(x["sha256"] == b["sha256"] and x["bytes"] == b["bytes"] for x in prior)
        comparisons.append({**b, "existingExactOriginalSHAAndSize": match})
    check("all_live_body_SHA_verified_or_reported", len(comparisons) == len(live["bodySHA"]))
    key_edges = {r["from"] + "|" + r["to"] for r in x16["edges"]}
    n_edges = sorted(x["edge"] for x in live["initiatorEdges"] if x["edge"] not in key_edges)
    check("X16_canonical_initiator_edges_loaded", len(key_edges) >= 37)
    check("all_new_edges_explicitly_reported", isinstance(n_edges, list))
    check("7_frame_counts_fit_prior_X25_webgl_resource_evidence", len(old25["captures"]) == 7 and
          all(x["resourceTypeCounts"]["Framebuffer"] == 13 for x in old25["captures"]))
    prior_wgdw = list((ROOT / "01-private-captures" / "X24" / "full-rust-wasm-2026-11-20" / "live-90s-stage2-gc").glob("*.webgd"))
    check("X24_7_original_GPU_files_still_private", len(prior_wgdw) == 7 and
          sum(p.stat().st_size for p in prior_wgdw) == 960061412)
    private = ROOT / "01-private-captures" / "X26" / "webgl-insight-legacy-and-webgl2-2026-11-20"
    private_png = list(private.glob("*.png"))
    check("X26_screenshots_private_not_public", len(private_png) == 2 and all(p.stat().st_size > 2000 for p in private_png))
    check("all_X01_to_X26_derived_local_stage_dirs_present", all(list(D.glob(f"X{i:02d}*")) for i in range(1, 27)))
    check("remote_user_PC_standalone_source_runner_present", (X / "X26-WebGL2-Overdraw-Risk-90s-Runner.cjs").is_file())
    check("no_site_raw_shader_or_texture_pixels_in_public_result",
          all("glsl" not in r["file"].lower() and "shader" not in r["file"].lower() for r in raw))

    frames = []
    for s in live["samples"]:
        detail = load(X / s["file"])
        counts = detail["states"][0]["counts"]
        approx = s["draw"] // 16 if s["draw"] % 16 == 0 else None
        frames.append({"label": s["label"], "atSecond": s["actualSecond"],
                       "sampleWindowDrawCalls": counts["draw"],
                       "estimatedFramesFrom16Draws_Not_independentFPS": approx,
                       "observedPointsDraws": counts["points"], "observedTriangleDraws": counts["triangles"],
                       "drawsWithBlendingEnabled": counts["blend"],
                       "drawsWithDepthTestOff": counts["depthTestOff"],
                       "drawsWithDepthWriteOff": counts["depthWriteOff"],
                       "drawsWithBlendAndDepthWriteOff": counts["blendDepthWriteOff"],
                       "drawsWithBlendAndDepthTestOff": counts["blendDepthTestOff"],
                       "possibleAdditiveONE_ONEDraws": counts["additiveOneOne"],
                       "drawByFramebufferToken": counts["drawByFbo"],
                       "framebufferBindChanges": counts["fboChanges"],
                       "programChanges": counts["programChanges"],
                       "maxCountSingleDraw_Not_distinctFlowerCount": counts["maxCount"],
                       "snapshotMetadataSHA": s["sha256"]})
    result = {"stage": "X26", "dateUTC": datetime.datetime.now(datetime.timezone.utc).isoformat(),
              "status": "POST_RUN_VERIFICATION",
              "sourceAuthority": {"officialHistoricalExtension": "https://github.com/3Dparallax/insight",
                                  "legacySHA": SHA_UP, "legacyManifest": 2, "legacyActive": False,
                                  "modernObserver": "owner-written in-browser draw/state proxy WebGL2"},
              "OWNFixtureQuantifiedRealPixelOverdraw": fixture["fixture"],
              "realSiteObservationSeconds": live["seconds"], "sevenDiscreteSamples_Not_ContinuousPerFrameCapture": frames,
              "totalWindowDraws": sum(x["draw"] for x in live["samples"]),
              "totalWindowPointsDraws": sum(x["points"] for x in live["samples"]),
              "totalWindowBlendDraws": sum(x["blend"] for x in live["samples"]),
              "totalWindowDepthWriteOffDraws": sum(x["depthWriteOff"] for x in live["samples"]),
              "meanBlendDrawsPerEstimatedFrame": round(sum(x["blend"] for x in live["samples"]) /
                                                      (sum(x["draw"] for x in live["samples"]) / 16), 3),
              "network": {"publicPathCount": len(live["firstPartyPaths"]), "knownPaths": len(live["firstPartyPaths"]) - len(newpaths),
                          "newPaths": newpaths, "responsesSHAExactKnown": sum(x["existingExactOriginalSHAAndSize"] for x in comparisons),
                          "responsesTotal": len(comparisons), "responsesSHAComparison": comparisons,
                          "initiatorEdgesTotal": len(live["initiatorEdges"]), "novelEdges": n_edges},
              "memoryMinimumFreeMiB": live["minFreeMiB"],
              "sourceLimitations": ["Official historical WebGL Insight is deprecated MV2; source only, NOT activated on Chrome 157.",
                "The public-site draw classification is an overdraw-risk proxy, NOT a true pixel heatmap or true fragment count.",
                "WebGL2 frame counts inferred from existing 16-draw topology, not accurate measured FPS.",
                "A blended draw does not prove actual overlapping fragments or its GPU cost.",
                "OWN-scene scissor ground-truth is a separate intentionally controlled scene; its counts do not transfer to third-party site.",
                "Historical original third-party GPU frames, shaders, assets and full-resolution screenshots remain private on PC."],
              "fixtureRaw": named_raw(fixture["samples"]), "liveRaw": raw}
    (X / "X26-SANITIZED-90S-SEVEN-SAMPLES-X01-X25-CROSSWALK.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    decision = {"status": "PASS" if all(checks.values()) else "FAIL",
                "checksPassed": sum(checks.values()), "checksTotal": len(checks),
                "failed": [k for k,v in checks.items() if not v], "checks": checks, "details": details,
                "sourceStage": "X26", "actualLiveSeconds": live["seconds"], "toolLegacyActivated": False,
                "exactPixelOverdrawSiteMeasured": False,
                "publicDataBoundary": "Only owner scripts, fixture and synthetic/derived statistics; never proprietary raw resources."}
    (X / "X26-INDEPENDENT-ACCEPTANCE.json").write_text(json.dumps(decision, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"status": decision["status"], "passed": decision["checksPassed"], "total": decision["checksTotal"],
                      "failed": decision["failed"], "liveSeconds": live["seconds"], "newURLs": len(newpaths),
                      "nonmatchingSHA": len(comparisons) - sum(x["existingExactOriginalSHAAndSize"] for x in comparisons),
                      "newEdges": len(n_edges), "draws": result["totalWindowDraws"],
                      "blendPer16": result["meanBlendDrawsPerEstimatedFrame"]}, ensure_ascii=False))
    if decision["failed"]:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
