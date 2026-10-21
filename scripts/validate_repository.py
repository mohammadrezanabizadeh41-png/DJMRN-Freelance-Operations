#!/usr/bin/env python3
"""Read-only DJMRN operational-memory structural checks (Python stdlib only)."""
from __future__ import annotations
import csv
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


def require_file(path: str) -> Path:
    result = ROOT / path
    if not result.is_file():
        ERRORS.append("MISSING FILE: " + path)
    return result


def read_csv(path: str) -> list[dict[str, str]]:
    file = require_file(path)
    if not file.is_file():
        return []
    with file.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


for path in (
    "README.md",
    "PROJECT-RULES.md",
    "ARCHITECTURE.md",
    "AGENTS.md",
    "08-operations-and-continuity/CURRENT-STATUS.md",
    "08-operations-and-continuity/WORK-INDEX.md",
    "08-operations-and-continuity/ACTIVITY-LOG.md",
    "08-operations-and-continuity/HANDOFF.md",
    "08-operations-and-continuity/decisions/DR-0001-github-operational-authority.md",
    "templates/OPPORTUNITY.md",
    "templates/JOB.md",
    "templates/LESSON.md",
):
    require_file(path)

sites = read_csv("01-platforms/discovery/1313-sites.csv")
if len(sites) != 1313:
    ERRORS.append(f"SITE COUNT: got {len(sites)}, expected 1313")
else:
    numbers = [row.get("source_sequence", "") for row in sites]
    if numbers != [str(i) for i in range(1, 1314)]:
        ERRORS.append("SITE IDS: not 1..1313 consecutively in source order")
    missing = [row["source_sequence"] for row in sites if not row.get("url_as_recorded")]
    if missing != ["319"]:
        ERRORS.append(f"MISSING SITE URL IDS: {missing!r}, expected only ['319']")

a = read_csv("01-platforms/international/plan-a-25.csv")
b = read_csv("01-platforms/international/plan-b-17.csv")
for label, entries, expected in (("A", a, 25), ("B", b, 17)):
    if len(entries) != expected:
        ERRORS.append(f"PLAN {label} COUNT: {len(entries)} instead of {expected}")
    if any(row.get("group") != label or row.get("rank") != str(i)
           for i, row in enumerate(entries, 1)):
        ERRORS.append(f"PLAN {label}: unexpected rank or group")
all_urls = [row.get("url", "").rstrip("/").lower() for row in a + b]
if len(all_urls) != len(set(all_urls)):
    ERRORS.append("PLAN A/B has duplicate URLs")

queue = read_csv("03-accounts-and-operations/current-7-site-queue.csv")
if len(queue) != 7 or sum(row.get("id", "").startswith("INT-") for row in queue) != 4 or sum(
    row.get("id", "").startswith("IR-") for row in queue
) != 3:
    ERRORS.append("PRACTICAL QUEUE: expected 7 rows, 4 INT and 3 IR")

if ERRORS:
    for issue in ERRORS:
        print("FAIL:", issue, file=sys.stderr)
    sys.exit(1)
print("PASS: required files; 1313 archive rows; A25/B17 unique; 7 queue (4 INT/3 IR).")
