#!/usr/bin/env python3
"""DJMRN X25 stage registration and PC-vs-GitHub authority audit (READ ONLY except its own JSON output).

Preflight: fetch authenticated-free GitHub public commit/tree snapshots and raw markdown into
X25-CURRENT (or use connected GitHub for these). This script never opens a public site,
installs software, rewrites an original capture, or reads/sends browsing credentials.
"""
from __future__ import annotations
import collections
import datetime
import hashlib
import json
import pathlib
import posixpath
import re
import urllib.parse

BASE = pathlib.Path.home() / "Desktop" / "DJMRN-Website-Reference-Evidence" / "fernhollow-gladeye-20261118-NEW-EXTRACTION"
DERIVED = BASE / "02-reviewed-derived"
HERE = DERIVED / "X25-CURRENT"
VENDOR = pathlib.Path.home() / "AppData" / "Local" / "DJMRN-Website-Toolkit" / "04-Specialists" / "Sources" / "webgl-developer-tool"
REPO = "mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations"
FLOWER = "09-self-marketing-website/graphics/flower-valley/"
X24 = DERIVED / "X24-CURRENT" / "X24-R2-FULL-RUST-WASM-2026-11-20"
SCRIPT_NAME = "X25-R3-Verify-Repository-PC-Stage-Coverage.py"
OUTPUT_NAME = "X25-R3-GITHUB-PC-STAGE-COVERAGE-LINKS-INTEGRITY.json"


def load(p: pathlib.Path):
    return json.loads(p.read_text(encoding="utf-8-sig"))


def hash_file(p: pathlib.Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def git_blob_sha(p: pathlib.Path) -> str:
    h = hashlib.sha1()
    n = p.stat().st_size
    h.update(("blob " + str(n)).encode("ascii") + b"\x00")
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def tree_index(data):
    if data.get("truncated"):
        raise ValueError("GitHub tree is truncated")
    return {x["path"]: x for x in data["tree"] if x["type"] == "blob"}


checks = {}
details = {}
warnings = []


def check(label: str, value: bool, detail=None):
    checks[label] = bool(value)
    if detail is not None:
        details[label] = detail


def extract_links(content: str, source: str, tree):
    # Inline markdown links: external links & same-page anchors are excluded.
    # Link-style references are not counted as broken: resolved paths only.
    counted, broken = 0, []
    for m in re.finditer(r"(?<!!)\[[^\]]+\]\(([^)]*)\)", content):
        v = m.group(1).strip()
        if not v or v.startswith(("http:", "https:", "mailto:", "data:")):
            continue
        v = v.split(" ", 1)[0].strip("<>")
        if v.startswith("#"):
            counted += 1
            continue
        v = urllib.parse.unquote(v).split("#", 1)[0].split("?", 1)[0]
        if not v:
            counted += 1
            continue
        resolved = posixpath.normpath(posixpath.join(posixpath.dirname(source), v))
        counted += 1
        # A link can target an existing directory (not a blob).
        if resolved not in tree and not any(k.startswith(resolved.rstrip("/") + "/") for k in tree):
            broken.append({"source": source, "target": v, "resolved": resolved})
    return counted, broken


def main():
    frozen = load(HERE / "X25-AUDIT-FROZEN-X24-GITHUB-TREE-PRIVATE.json")
    now = load(HERE / "X25-AUDIT-GITHUB-LIVE-TREE-PRIVATE-READONLY.json")
    before = tree_index(frozen)
    current = tree_index(now)
    x25_manifest = load(HERE / "X25-R2-PUBLIC-SOURCE-AND-RECEIPT-SHA256-MANIFEST.json")
    x25_live = load(HERE / "X25-live-run-summary.json")
    x25_fixture = load(HERE / "X25-fixture-run-summary.json")
    x25_crosswalk = load(HERE / "X25-R2-SANITIZED-7FRAME-X01-X24-CROSSWALK.json")
    x25_accept = load(HERE / "X25-R2-INDEPENDENT-ACCEPTANCE.json")
    x19 = load(DERIVED / "X19-CURRENT" / "X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json")
    x16 = load(DERIVED / "X16-CURRENT" / "X16-script-init-network-graph.json")
    x24 = load(X24 / "X24-R2-S2-SEVEN-FULL-WGDW-INDEPENDENT-X01-X23-CROSSWALK.json")
    known = {r["url"]: r for r in x19["resources"]}
    known_edges = {e["from"] + "|" + e["to"] for e in x16["edges"]}
    known_x24_frames = {f["name"]: f for f in x24["frames"]}

    check("full_github_tree_untruncated", not now.get("truncated") and not frozen.get("truncated"))
    expected_original = "292f870c077c25e5fe08a93c83f21cb2ec43f4cb"
    check("prior_X24_release_tree_pinned", frozen["sha"] == expected_original, frozen["sha"])
    check("both_repo_trees_nontrivial", len(before) >= 200 and len(current) >= 200, {"prior": len(before), "X25": len(current)})
    deleted = sorted(set(before) - set(current))
    changed = sorted(p for p in before if p in current and before[p]["sha"] != current[p]["sha"])
    added = sorted(set(current) - set(before))
    expected_changed = sorted(["09-self-marketing-website/PROJECT-LOG.md", FLOWER + "EXTRACTION-RUNBOOK.md"])
    check("no_preexisting_Github_files_deleted", not deleted, deleted)
    check("only_canonical_runbook_and_project_log_modified", changed == expected_changed, changed)
    check("X25_added_only_owner_source_evidence_and_audit_files", len(added) in (9, 11) and all(p.startswith(FLOWER) and "/X25-" in p for p in added), added)
    check("no_unrelated_or_duplicate_repository_created", len(added) in (9, 11) and all(p.startswith(FLOWER) for p in added))

    # Identical original X01–X24 public Git blobs, including the X24 source/crosswalk.
    historical = [p for p in before if p.startswith(FLOWER) and "/X25-" not in p and p != FLOWER + "EXTRACTION-RUNBOOK.md"]
    altered_historical = [p for p in historical if p not in current or current[p]["sha"] != before[p]["sha"]]
    check("all_historical_flower_files_exact_Git_blobs_preserved", not altered_historical, {"fileCount": len(historical), "altered": altered_historical})

    stage_pattern = re.compile(r"(^|/)(X(?:0[1-9]|1\d|2[0-5]))(?=[-._/])")
    def stages(files):
        result = collections.Counter()
        for p in files:
            if not p.startswith(FLOWER):
                continue
            for name in set(m.group(2) for m in stage_pattern.finditer(p)):
                result[name] += 1
        return result
    stages24 = stages(before)
    stages25 = stages(current)
    unchanged = {f"X{i:02d}": stages24.get(f"X{i:02d}", 0) == stages25.get(f"X{i:02d}", 0) for i in range(1, 25)}
    check("all_X01_to_X25_stages_in_canonical_repository", all(stages25.get(f"X{i:02d}", 0) > 0 for i in range(1, 26)), dict(stages25))
    check("X01_to_X24_public_stage_file_coverage_not_diminished", all(unchanged.values()), {k: v for k, v in unchanged.items() if not v})
    check("X25_stage_expected_nine_or_eleven_public_files_at_snapshot", stages25["X25"] in (9, 11), stages25["X25"])

    # Validate 8 original X25 public artifacts with independent bytes + actual GitHub live tree blob.
    file_records = []
    for item in x25_manifest["rows"]:
        p = item["path"]
        f = HERE / pathlib.Path(p).name
        entry = current.get(p)
        exists = f.is_file()
        measured = {"path": p, "foundOnPC": exists, "foundInGithubTree": bool(entry)}
        if exists:
            measured["bytes"] = f.stat().st_size
            measured["sha256"] = hash_file(f)
            measured["gitBlobSha1FromRawBytes"] = git_blob_sha(f)
        measured["matchesManifestSHA"] = exists and measured["sha256"] == item["sha256"]
        measured["matchesManifestBytes"] = exists and measured["bytes"] == item["bytes"]
        measured["matchesManifestGitBlob"] = exists and measured["gitBlobSha1FromRawBytes"] == item["githubCurrentBlobSha1"]
        measured["matchesCurrentGithubTreeBlob"] = bool(entry and exists and entry["sha"] == measured["gitBlobSha1FromRawBytes"])
        file_records.append(measured)
    check("all_8_public_X25_files_true_PC_SHA_and_byte_match", len(file_records) == 8 and all(r["matchesManifestSHA"] and r["matchesManifestBytes"] and r["matchesManifestGitBlob"] for r in file_records))
    check("all_8_public_X25_Git_blobs_still_current_in_repository", len(file_records) == 8 and all(r["matchesCurrentGithubTreeBlob"] for r in file_records))
    manifest_path = FLOWER + "evidence/X25-R2-PUBLIC-SOURCE-AND-RECEIPT-SHA256-MANIFEST.json"
    check("ninth_X25_manifest_actual_GitHub_blob_present", manifest_path in current and current[manifest_path]["size"] > 2000)

    # Resolve every local Markdown href of canonical sources against the real GitHub file tree.
    runbook = (HERE / "X25-AUDIT-CURRENT-RUNBOOK-PRIVATE.md").read_text(encoding="utf-8")
    projectlog = (HERE / "X25-AUDIT-CURRENT-PROJECT-LOG-PRIVATE.md").read_text(encoding="utf-8")
    docs = [
        (FLOWER + "EXTRACTION-RUNBOOK.md", runbook),
        ("09-self-marketing-website/PROJECT-LOG.md", projectlog),
        (FLOWER + "handoffs/X25-R2-WEBGL-DEVELOPER-TOOL-135S-FULL-X01-X24-HANDOFF-2026-11-20.md",
         (HERE / "X25-R2-WEBGL-DEVELOPER-TOOL-135S-FULL-X01-X24-HANDOFF-2026-11-20.md").read_text(encoding="utf-8")),
    ]
    link_totals, broken = {}, []
    for path, data in docs:
        n, issue = extract_links(data, path, current)
        link_totals[path] = n
        broken.extend(issue)
    check("runbook_all_relative_links_resolve", not [x for x in broken if x["source"] == docs[0][0]],
          {"links": link_totals[docs[0][0]], "broken": [x for x in broken if x["source"] == docs[0][0]][:15]})
    check("project_log_all_relative_links_resolve", not [x for x in broken if x["source"] == docs[1][0]],
          {"links": link_totals[docs[1][0]], "broken": [x for x in broken if x["source"] == docs[1][0]][:15]})
    check("X25_handoff_all_relative_links_resolve", not [x for x in broken if x["source"] == docs[2][0]],
          {"links": link_totals[docs[2][0]], "broken": [x for x in broken if x["source"] == docs[2][0]][:15]})
    check("runbook_X25_current_X26_next_linked", ("X25 FINAL COMPLETENESS AUDIT" in runbook or "X25-R2 CURRENT" in runbook) and "X26 NEXT" in runbook)
    check("canonical_project_log_X25_closure_registered", "135-second real homepage / seven-frame evidence COMPLETE" in projectlog)

    # Independent owner machine continued-state check, read only.
    local_stage_presence = {}
    for i in range(1, 26):
        stage = f"X{i:02d}"
        local_stage_presence[stage] = len(list(DERIVED.glob(stage + "*")))
    check("all_25_local_PC_stage_folders_or_files_present", all(local_stage_presence.values()), local_stage_presence)
    check("own_fixture_two_real_captures", x25_fixture["complete"] and len(x25_fixture["captures"]) == 2)
    check("real_135sec_seven_sample_sweep_and_RAM_guard",
          x25_live["complete"] and x25_live["realObservedSeconds"] >= 135 and
          len(x25_live["captures"]) == 7 and not x25_live["emergencyStopped"] and
          x25_live["minimumFreeRAMMiB"] >= 100, {"actualSeconds": x25_live["realObservedSeconds"],
                                                 "frameCount": len(x25_live["captures"]), "minFreeMiB": x25_live["minimumFreeRAMMiB"]})
    check("all_7_raw_sample_metadata_SHA256_valid",
          all((HERE / f["metadataFile"]).is_file() and hash_file(HERE / f["metadataFile"]) == f["metadataSHA256"]
              for f in x25_live["captures"]))
    check("7_sample_names_and_X24_GPU_topology_match",
          {f["label"] for f in x25_live["captures"]} == set(known_x24_frames) and
          all(f["draws"] == known_x24_frames[f["label"]]["realDraws"] and
              f["resourceTypeCounts"]["Shader"] == known_x24_frames[f["label"]]["shaderSourceShaCount"]
              for f in x25_live["captures"]))

    # Public source SHA/edge novelty must be based on X19 and X16 authority (not only prior prose).
    body_exact = []
    for r in x25_live["firstPartyBodySHA"]:
        variants = known.get(r["url"], {}).get("originalBodyVariants", [])
        body_exact.append(any(v["sha256"] == r["sha256"] and v["bytes"] == r["bytes"] for v in variants))
    current_edges = [e["edge"] for e in x25_live["initiatorEdges"]]
    check("all_26_observed_source_bodies_existing_X19_sha_bytes",
          len(body_exact) == 26 and all(body_exact), {"checked": len(body_exact), "matched": sum(body_exact)})
    check("all_37_first_party_initiator_edges_existing_X16",
          len(current_edges) == 37 and all(x in known_edges for x in current_edges))
    check("zero_new_X25_source_url_paths",
          len(known) == 78 and not (set(x25_live["firstPartyPaths"]) - set(known)))

    check("X25_numeric_Uniform_and_FBO_provenance_in_public_crosswalk",
          len(x25_crosswalk["frames"]) == 7 and len(x25_crosswalk["uniformUniqueNamesAcrossSeven"]) == 29 and
          all(len(f["framebufferAttachmentTypes"]) == 13 for f in x25_crosswalk["frames"]))
    check("X25_36_of_36_independent_checks_still_readable",
          x25_accept["status"] == "PASS" and x25_accept["passed"] == 36 and x25_accept["total"] == 36 and not x25_accept["failed"])
    x24private = BASE / "01-private-captures" / "X24" / "full-rust-wasm-2026-11-20" / "live-90s-stage2-gc"
    raw_gpu = list(x24private.glob("*.webgd"))
    check("all_7_previous_X24_raw_GPU_packets_still_private",
          len(raw_gpu) == 7 and sum(p.stat().st_size for p in raw_gpu) == 960061412)
    private = BASE / "01-private-captures" / "X25"
    private_images = list(private.rglob("*PRIVATE.png"))
    check("four_private_X25_screenshots_valid_PNG",
          len(private_images) == 4 and all(p.stat().st_size > 12000 and p.open("rb").read(8) == b"\x89PNG\r\n\x1a\n" for p in private_images),
          {"count": len(private_images), "filenames": [p.name for p in private_images]})
    hist = HERE / "X25-R1-90S-5OF7-HISTORICAL" / "X25-live-run-summary.json"
    historic = load(hist)
    check("failed_90s_historical_capture_preserved",
          hist.exists() and historic["realObservedSeconds"] >= 90 and len(historic["captures"]) == 5)
    vendor = VENDOR / "source-cc9317e6"
    zipfile = VENDOR / "webgl-developer-tool-cc9317e6e6805beb16968f2cbd19dcbfe0c064e4.zip"
    check("official_upstream_ZIP_SHA256_reverified",
          zipfile.exists() and hash_file(zipfile) ==
          "2dfd529dd3c8e4a44ee1f1997adc9bb6deed66f2e73a77c92ca75454b31ccbf5")
    check("compiled_embed_and_Chrome_MV3_plugin_still_installed",
          (vendor / "dist/embed/gli.js").is_file() and (vendor / "dist/extension/manifest.json").is_file())
    logs = [HERE / ("X25-source-" + x + ".log") for x in ("ci", "test", "build")]
    check("NPM_install_test_build_logs_stored_locally", all(p.is_file() for p in logs))

    # No claim the original commercial source is recovered; observer attribution unresolved.
    warnings = [
        "WebGL Developer Tool reported 29 WebGL errors per stable public frame; possible debugger artifact, not an independently proven bug in the website.",
        "GL-call duration metadata is CPU/observer-instrumented and is not native GPU timer-query evidence.",
        "Seven discrete captured frames over 135 s; not a continuous every-frame stream.",
        "Original screenshots, shader text, GPU capture binaries and browser-profile metadata remain LOCAL PRIVATE; public GitHub has owner source and derived metadata.",
        "GitHub tree and markdown snapshots are pinned to snapshot 'sha'; any subsequent Git commit requires rerunning this independent audit with refreshed snapshots.",
    ]
    result = {
        "stage": "X25-R3-REGISTRATION-AUDIT",
        "dateUTC": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "scope": "Independent actual GitHub tree vs previous X24 release, all 25 stages, PC SHA+Git blob, canonical links and private-original preservation. No live recapture.",
        "baselineX24GitCommit": frozen["sha"],
        "auditedCurrentGitCommit": now["sha"],
        "githubTree": {"previousFileBlobs": len(before), "currentFileBlobs": len(current),
                       "newFiles": added, "modifiedFiles": changed, "deletedFiles": deleted,
                       "allHistoricalFlowerBlobsPreserved": not altered_historical,
                       "X01ToX25StageFilePresence": {f"X{i:02d}": stages25.get(f"X{i:02d}", 0) for i in range(1, 26)}},
        "canonicalMarkdownLinks": {"counts": link_totals, "broken": broken},
        "originalEightX25SourceFilesExactPCGit": file_records,
        "localRawPreservation": {"X24SevenPacketsPrivateBytes": sum(p.stat().st_size for p in raw_gpu),
                                 "X25PrivateScreenshots": [p.name for p in private_images],
                                 "X25SevenLiveSampleFiles": [f["metadataFile"] for f in x25_live["captures"]],
                                 "fixtureSampleCount": len(x25_fixture["captures"]),
                                 "X25HistoricalR1CaptureCount": len(historic["captures"])},
        "acceptance": {"passed": sum(checks.values()), "total": len(checks),
                       "failed": [name for name, okay in checks.items() if not okay],
                       "checks": checks, "details": details},
        "warnings": warnings,
        "publicationBoundary": "Every coverage result is pinned to auditedCurrentGitCommit. The current head may include 9 initial X25 files or 11 after its separate auditor+evidence additions; this report does not recursively hash its own changing report file. Recheck after subsequent commits.",
    }
    output = HERE / OUTPUT_NAME
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"status": "PASS" if not result["acceptance"]["failed"] else "FAIL",
                      "checks": result["acceptance"]["passed"], "total": result["acceptance"]["total"],
                      "failed": result["acceptance"]["failed"],
                      "GitHubChanges": {"added": len(added), "modified": len(changed), "deleted": len(deleted)},
                      "stageFiles": result["githubTree"]["X01ToX25StageFilePresence"],
                      "linkCounts": link_totals, "brokenLinks": broken[:15],
                      "output": str(output)}, ensure_ascii=False))
    if result["acceptance"]["failed"]:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
