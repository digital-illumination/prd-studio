#!/usr/bin/env python3
"""
lint-prd.py

Deterministic, mechanical checks against a PRD's shape, per
skills/prd-studio/prd-template.md and the DRAFT/REFINE style rules in
skills/prd-studio/SKILL.md. This script never judges whether a requirement
is a good idea, whether an acceptance check is the right one, or whether an
NFR declaration is adequate; that is a human reviewer's job, or a persona's,
during GRILL THE PRD or VALIDATE-BUILD. This script only checks what a
computer can check without understanding the product: does every FB carry
its required layers, does every EARS row match one of the five patterns and
read as one complete sentence, are ids unique, do the banned-word and
escape-clause lists turn up anywhere, do the glossary and grill-history
links the header promises actually resolve to real files, does every Open
Questions register row carry both a status and an owner (the template's own
parked-question bar), is each of prd-template.md §7's six NFR classes named
somewhere (the NFR section or the register, so silence is the only failure
caught, never an adequacy judgement), does every [CONTESTED: id] marker
resolve to a register row, does every capitalised-acronym or id-scheme term
used in the document body have a matching glossary.md entry, and does a
name-and-date-shaped attribution ever appear above an FB's own
"*Context and provenance:*" line rather than below it. Every check here runs
identically against a DRAFT-produced or a REFINE-produced document; none is
DRAFT-specific.

This is a generic, host-agnostic check: it knows nothing about any specific
platform, client, or NFR policy document. Its six NFR class names and its
structural-id conventions come from this repository's own
skills/prd-studio/prd-template.md, not from any external policy.

No LLM call, stdlib only (re, sys, pathlib, argparse), so this runs
identically on a developer's own machine, in a CI step if one is ever
wired up, with no network access and no API key. It is not wired into any
pipeline by default; scripts/README.md covers running it as an optional
pre-PR check.

Usage:
  scripts/lint-prd.py <path-to-prd.md> [--strict]

  --strict    Exit 1 if any finding is reported. Default: always exit 0
              (this check is advisory only; a failing lint is reported,
              never a hard block, unless a repository's own CI wires
              --strict in deliberately).

Exit codes:
  0  Ran to completion (--strict off, the default: regardless of findings;
     --strict on: no findings).
  1  Usage error (bad path), or --strict was given and at least one finding
     was reported.
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

# ---------------------------------------------------------------------------
# Rule data. Named here, once, rather than scattered through the checks
# below, so the banned lists are easy to review or extend without reading
# the parsing logic.
# ---------------------------------------------------------------------------

# INCOSE-derived vague terms (Guide to Writing Requirements V4), the same
# list skills/prd-studio/SKILL.md's DRAFT style rules name.
VAGUE_WORDS = [
    "appropriate",
    "efficient",
    "effective",
    "sufficient",
    "adequate",
    "robust",
    "user-friendly",
    "intuitive",
    "seamless",
]

# Escape clauses, same source.
ESCAPE_CLAUSES = [
    "where feasible",
    "where possible",
    "if practical",
    "as appropriate",
    "if required",
    "when necessary",
]

# The five EARS trigger keywords that open a non-ubiquitous statement.
# Order matters only for readability; matching is by explicit prefix below.
EARS_TRIGGER_PREFIXES = ("When ", "While ", "If ", "Where ")

SHALL_RE = re.compile(r"\bshall\b")
FB_HEADING_RE = re.compile(r"^#{2,3}\s+(FB-[0-9]+[A-Za-z]?)\b[:\-]?\s*(.*)$")
TABLE_ROW_RE = re.compile(r"^\|(.+)\|\s*$")
TABLE_SEP_RE = re.compile(r"^\|[\s:\-|]+\|\s*$")
ID_HEADER_RE = re.compile(r"^\s*id\s*$", re.IGNORECASE)
CONTEXT_LINE_RE = re.compile(r"^\*Context and provenance")

# --- Glossary auto-maintenance -------------------------------------------
# A conservative, two-part heuristic, deliberately narrow per
# skills/prd-studio/SKILL.md's own "## Glossary maintenance" section: noise
# kills trust in an advisory check faster than an occasional missed term
# does.

# Capitalised acronym-shaped token: two or more capital letters, digits
# allowed after the first letter (e.g. WCAG2, but not a single capital such
# as a sentence-initial "The"). The negative lookahead excludes a token
# immediately followed by "-<digit>", which the id-scheme check below owns
# instead, so a term such as "DS-4" produces one finding, not two.
ACRONYM_RE = re.compile(r"\b[A-Z][A-Z0-9]{1,}\b(?!-\d)")

# This template's own structural conventions and this skill's own command
# and marker vocabulary: never domain jargon, never a glossary candidate,
# regardless of whether glossary.md defines them.
STRUCTURAL_ACRONYMS = {
    "FB", "OQ", "NFR", "PRD", "EARS", "TL", "DR", "ID",
    "DRAFT", "REFINE", "CONVERGED", "SIGNED", "GRILL", "STATUS", "EXPORT",
    "OPEN", "PASSED", "GAP", "NOT", "APPLICABLE", "CONTESTED", "IN",
    "MET", "PARTIAL", "UNMET", "WCAG", "AA",
}

# Capitalised prefix-and-number id scheme (e.g. DS-4, REG-2): flagged only
# when the prefix is not one of this document's own established id
# families, which already carry their own meaning without a glossary entry.
ID_SCHEME_RE = re.compile(r"\b([A-Z]{2,6})-(\d+)\b")
KNOWN_ID_PREFIXES = {"G", "FB", "DEP", "OQ", "PRD"}

# --- Zone restriction for glossary scanning -------------------------------
# The Open Questions register is working notes, not the requirement
# (prd-template.md's own opening comment draws exactly this line), and
# carries a free-form, often ALL-CAPS-for-emphasis commentary style that the
# two-part heuristic above cannot reliably tell apart from genuine domain
# jargon. The glossary check excludes this one section rather than widen
# the structural-keyword list indefinitely.

# --- Provenance capture discipline ----------------------------------------
# A name-and-date-shaped parenthetical attribution, the same shape
# skills/prd-studio/prd-template.md's own worked example names (a person's
# name, a comma, a date). Capital-initial word, comma, then content
# containing at least one digit (a day number), closed by the same
# parenthesis.
PROVENANCE_ATTRIBUTION_RE = re.compile(r"\([A-Z][a-zA-Z]+,\s*[^)]*\d[^)]*\)")

# Any markdown heading up to h3, used to find section boundaries (the next
# heading of any level ends the current section, for this script's own
# section-scoped checks below).
ANY_HEADING_RE = re.compile(r"^#{1,3}\s+.+$")
REGISTER_HEADING_RE = re.compile(r"^#{1,3}\s+.*Open Questions register", re.IGNORECASE)
NFR_HEADING_RE = re.compile(
    r"^#{1,3}\s+.*(non-functional|constraints|guardrails)", re.IGNORECASE
)

# skills/prd-studio/prd-template.md §7's six generic requirement classes.
# This script checks only that each is named somewhere (the NFR section or
# the register): silence is the only failure it can catch, per its own
# charter above; it never judges whether a stated position is adequate.
NFR_CLASSES = [
    ("outcome-level acceptance", ["outcome-level acceptance", "outcome level acceptance"]),
    (
        "scale, load and integration",
        ["scale, load and integration", "scale/load/integration", "scale, load & integration"],
    ),
    ("security & privacy", ["security", "privacy"]),
    ("cost / run-cost", ["run-cost", "run cost", "cost /"]),
    ("accessibility", ["accessibility"]),
    ("retention & audit", ["retention"]),
]

CONTESTED_RE = re.compile(r"\[CONTESTED:\s*([^\]]+)\]")


@dataclass
class Finding:
    rule: str
    line: int
    message: str


@dataclass
class LintResult:
    findings: list = field(default_factory=list)

    def add(self, rule: str, line: int, message: str) -> None:
        self.findings.append(Finding(rule, line, message))

    @property
    def errors(self):
        return self.findings


def split_table_row(line: str) -> list[str]:
    inner = line.strip()
    if inner.startswith("|"):
        inner = inner[1:]
    if inner.endswith("|"):
        inner = inner[:-1]
    return [cell.strip() for cell in inner.split("|")]


def check_ears_statement(statement: str) -> list[str]:
    """Return a list of problems with one EARS requirement statement's own
    text. Empty list means the statement passed every check this function
    runs."""
    problems = []

    if not statement:
        return ["empty statement cell"]

    if not statement.endswith("."):
        problems.append("does not end with a full stop")

    shall_count = len(SHALL_RE.findall(statement))
    if shall_count == 0:
        problems.append("contains no 'shall': not an EARS requirement statement")
    elif shall_count > 1:
        problems.append(
            f"contains {shall_count} instances of 'shall': more than one "
            "thought per statement, split into separate rows"
        )

    matched_pattern = None
    for prefix in EARS_TRIGGER_PREFIXES:
        if statement.startswith(prefix):
            matched_pattern = prefix.strip()
            break
    if matched_pattern == "If":
        if ", then " not in statement and ",then " not in statement:
            problems.append(
                "starts with 'If' but has no ', then' clause: not the "
                "unwanted-behaviour EARS pattern (If <trigger>, then the "
                "<system> shall <response>.)"
            )
    # Ubiquitous pattern (no trigger prefix) needs no further shape check
    # beyond the shall-count above; When/While/Where need only the prefix
    # itself, already matched.

    lowered = statement.lower()
    for word in VAGUE_WORDS:
        if re.search(r"\b" + re.escape(word) + r"\b", lowered):
            problems.append(f"contains banned vague term '{word}'")
    for phrase in ESCAPE_CLAUSES:
        if phrase in lowered:
            problems.append(f"contains banned escape clause '{phrase}'")

    return problems


def find_table_after(lines: list[str], start_index: int, max_lookahead: int = 6):
    """Given a line index believed to introduce a table (e.g. a
    '**Requirements:**' label), find the header row and separator row
    within max_lookahead blank-tolerant lines, and return
    (header_cells, first_data_row_index) or (None, None) if no table is
    found nearby."""
    i = start_index + 1
    scanned = 0
    while i < len(lines) and scanned < max_lookahead:
        line = lines[i]
        if line.strip() == "":
            i += 1
            scanned += 1
            continue
        if TABLE_ROW_RE.match(line):
            header_cells = split_table_row(line)
            if i + 1 < len(lines) and TABLE_SEP_RE.match(lines[i + 1]):
                return header_cells, i + 2
            return None, None
        return None, None
    return None, None


def find_section(lines: list[str], heading_re: "re.Pattern[str]"):
    """Find the first heading matching heading_re and return (start_index,
    end_index) spanning that heading up to (not including) the next
    heading of any level, or the end of the document. Returns None if no
    heading matches."""
    start = None
    for idx, line in enumerate(lines):
        if heading_re.match(line):
            start = idx
            break
    if start is None:
        return None
    end = len(lines)
    for idx in range(start + 1, len(lines)):
        if ANY_HEADING_RE.match(lines[idx]):
            end = idx
            break
    return start, end


def check_glossary_terms(
    lines: list[str],
    glossary_text: str | None,
    excluded_span: tuple[int, int] | None = None,
) -> list[tuple[str, int]]:
    """Scan the document body for jargon-like terms (capitalised acronyms,
    id-scheme tokens) with no matching glossary.md entry. Returns
    (term, line_number) for each undefined term's first occurrence only.
    glossary_text is None when glossary.md could not be read (the
    header-link check above already reports that as its own finding); in
    that case every candidate term is treated as undefined, since nothing
    on disk can confirm otherwise. excluded_span, when given, skips lines
    in that (start_index, end_index) range (the Open Questions register:
    working notes, not the requirement, per prd-template.md's own opening
    comment)."""
    glossary_lower = glossary_text.lower() if glossary_text is not None else ""
    seen: set[str] = set()
    findings: list[tuple[str, int]] = []

    for idx, line in enumerate(lines):
        if excluded_span is not None and excluded_span[0] <= idx < excluded_span[1]:
            continue
        for m in ACRONYM_RE.finditer(line):
            term = m.group(0)
            if term in STRUCTURAL_ACRONYMS or term in seen:
                continue
            if glossary_text is not None and term.lower() in glossary_lower:
                continue
            seen.add(term)
            findings.append((term, idx + 1))
        for m in ID_SCHEME_RE.finditer(line):
            prefix, number = m.group(1), m.group(2)
            term = f"{prefix}-{number}"
            if prefix in KNOWN_ID_PREFIXES or term in seen:
                continue
            if glossary_text is not None and (
                term.lower() in glossary_lower
                or f"{prefix.lower()}-" in glossary_lower
            ):
                continue
            seen.add(term)
            findings.append((term, idx + 1))

    return findings


def find_register_table(lines: list[str]):
    """Find the Open Questions register table and return
    (header_cells, data_start_index, data_end_index), or None if no
    register heading, or no table under it, is found."""
    section = find_section(lines, REGISTER_HEADING_RE)
    if section is None:
        return None
    start, end = section
    header_cells, data_start = find_table_after(lines, start, max_lookahead=10)
    if header_cells is None:
        return None
    k = data_start
    while k < end and TABLE_ROW_RE.match(lines[k]):
        k += 1
    return header_cells, data_start, k


def find_column_index(header_cells: list[str], *substrings: str):
    """Return the index of the first header cell whose lowercased text
    contains any of the given lowercased substrings, or None."""
    for idx, cell in enumerate(header_cells):
        lowered = cell.strip().lower()
        if any(sub in lowered for sub in substrings):
            return idx
    return None


def lint(prd_path: Path) -> LintResult:
    result = LintResult()
    text = prd_path.read_text(encoding="utf-8")
    lines = text.splitlines()
    prd_dir = prd_path.parent

    # --- Header links resolve (glossary.md, grill-history.md) -----------
    header_text = "\n".join(lines[:60])
    for name in ("glossary.md", "grill-history.md"):
        link_re = re.compile(r"\(\.?/?" + re.escape(name) + r"\)")
        if not link_re.search(header_text):
            result.add(
                "header-link-missing",
                1,
                f"no link to {name} found in the document header "
                "(first 60 lines); prd-template.md's 'How to read this "
                "document' section links both.",
            )
        else:
            target = prd_dir / name
            if not target.is_file():
                result.add(
                    "header-link-broken",
                    1,
                    f"header links to {name} but {target} does not exist",
                )

    # --- Glossary auto-maintenance: undefined jargon-like terms ---------
    # Presence only, per this script's own charter: flags a term with no
    # matching glossary.md entry, never judges whether the definition given
    # is a good one.
    glossary_path = prd_dir / "glossary.md"
    glossary_text = (
        glossary_path.read_text(encoding="utf-8") if glossary_path.is_file() else None
    )
    oq_span = find_section(lines, REGISTER_HEADING_RE)
    for term, line_no in check_glossary_terms(lines, glossary_text, oq_span):
        result.add(
            "glossary-undefined-jargon",
            line_no,
            f"'{term}' looks like domain jargon (a capitalised acronym or "
            "an id-scheme term) with no matching entry in glossary.md; "
            "SKILL.md's '## Glossary maintenance' section is the "
            "propose-not-silently-add rule this term should have gone "
            "through",
        )

    # --- Collect every "Id" column value across every table, for the
    #     unique-ids check -------------------------------------------------
    all_ids: dict[str, list[int]] = {}
    i = 0
    while i < len(lines):
        if TABLE_ROW_RE.match(lines[i]):
            header_cells = split_table_row(lines[i])
            if header_cells and ID_HEADER_RE.match(header_cells[0]) and \
               i + 1 < len(lines) and TABLE_SEP_RE.match(lines[i + 1]):
                j = i + 2
                while j < len(lines) and TABLE_ROW_RE.match(lines[j]):
                    row_cells = split_table_row(lines[j])
                    if row_cells:
                        row_id = row_cells[0].strip()
                        if row_id and not row_id.startswith("e.g."):
                            all_ids.setdefault(row_id, []).append(j + 1)
                    j += 1
                i = j
                continue
        i += 1
    for row_id, occurrences in all_ids.items():
        if len(occurrences) > 1:
            lines_str = ", ".join(str(n) for n in occurrences)
            result.add(
                "duplicate-id",
                occurrences[0],
                f"id '{row_id}' appears {len(occurrences)} times (lines "
                f"{lines_str}); ids must be unique across the document",
            )

    # --- Open Questions register: the parked-question bar ----------------
    # prd-template.md's own rule: a row with a question but no status or no
    # owner is not a parked question, it is an unnamed gap wearing a row.
    # Checked mechanically as presence-only (a non-blank cell), never as a
    # judgement on whether the status itself is a good one.
    register = find_register_table(lines)
    if register is None:
        result.add(
            "register-not-found",
            1,
            "no 'Open Questions register' heading with a table under it "
            "found; the register-bar and NFR-class-coverage checks below "
            "could not run against it",
        )
    else:
        reg_header, reg_data_start, reg_data_end = register
        status_idx = find_column_index(reg_header, "status", "decision")
        owner_idx = find_column_index(reg_header, "owner")
        if status_idx is None or owner_idx is None:
            result.add(
                "register-columns-unrecognised",
                reg_data_start,
                "the Open Questions register table has no column header "
                "recognisable as 'Status' (or 'Decision') and 'Owner'; the "
                "register-bar check could not run against it",
            )
        else:
            for k in range(reg_data_start, reg_data_end):
                row_cells = split_table_row(lines[k])
                if not row_cells or not row_cells[0].strip():
                    continue
                row_id = row_cells[0].strip()
                if row_id.lower().startswith("e.g."):
                    continue
                status_cell = (
                    row_cells[status_idx].strip()
                    if status_idx < len(row_cells)
                    else ""
                )
                owner_cell = (
                    row_cells[owner_idx].strip() if owner_idx < len(row_cells) else ""
                )
                missing = []
                if not status_cell:
                    missing.append("status")
                if not owner_cell:
                    missing.append("owner")
                if missing:
                    result.add(
                        "register-bar",
                        k + 1,
                        f"register row '{row_id}' carries no {' or '.join(missing)}: "
                        "not a parked question, an unnamed gap wearing a row "
                        "(prd-template.md §9)",
                    )

    # --- NFR-class coverage: silence is the only failure ------------------
    # prd-template.md §7's six requirement classes must each be named
    # somewhere (the NFR section or the register): a stated position, an
    # explicit not-applicable-because, or a register row are all
    # acceptable, silence is not. This is a presence check only; it cannot
    # and does not judge whether a stated position is adequate.
    nfr_section = find_section(lines, NFR_HEADING_RE)
    nfr_text = (
        "\n".join(lines[nfr_section[0] : nfr_section[1]]).lower()
        if nfr_section is not None
        else ""
    )
    register_text = (
        "\n".join(lines[register[1] : register[2]]).lower()
        if register is not None
        else ""
    )
    if nfr_section is None:
        result.add(
            "nfr-section-not-found",
            1,
            "no non-functional-requirements/constraints section found; "
            "NFR-class coverage checked against the register only",
        )
    searchable = nfr_text + "\n" + register_text
    for label, substrings in NFR_CLASSES:
        if not any(sub in searchable for sub in substrings):
            result.add(
                "nfr-class-silent",
                nfr_section[0] + 1 if nfr_section is not None else 1,
                f"NFR class '{label}' is not named anywhere in the NFR "
                "section or the Open Questions register: a stated "
                "position, an explicit not-applicable-because, or a "
                "register row are all acceptable, silence is not "
                "(prd-template.md §7)",
            )

    # --- Contested-fact markers resolve to a register row ------------------
    for m in CONTESTED_RE.finditer(text):
        contested_id = m.group(1).strip()
        if contested_id not in all_ids:
            line_no = text.count("\n", 0, m.start()) + 1
            result.add(
                "contested-marker-unresolved",
                line_no,
                f"[CONTESTED: {contested_id}] has no matching Id in the "
                "Open Questions register (SKILL.md's 'Contested facts' "
                "convention)",
            )

    # --- Per-FB layer and EARS-row checks --------------------------------
    fb_starts = [
        (idx, m.group(1))
        for idx, line in enumerate(lines)
        if (m := FB_HEADING_RE.match(line))
    ]
    for pos, (start, fb_id) in enumerate(fb_starts):
        end = fb_starts[pos + 1][0] if pos + 1 < len(fb_starts) else len(lines)
        section = lines[start:end]
        section_text = "\n".join(section)

        has_story = bool(re.search(r"^\*\*Story:\*\*", section_text, re.MULTILINE))
        has_definition = bool(
            re.search(r"^\*\*Definition:\*\*", section_text, re.MULTILINE)
        )
        if not has_story and not has_definition:
            result.add(
                "fb-missing-story-or-definition",
                start + 1,
                f"{fb_id}: no '**Story:**' or '**Definition:**' block found",
            )

        req_label_idx = None
        for offset, line in enumerate(section):
            if line.strip().startswith("**Requirements") and "**" in line.strip()[2:]:
                req_label_idx = start + offset
                break
        if req_label_idx is None:
            result.add(
                "fb-missing-requirements",
                start + 1,
                f"{fb_id}: no '**Requirements:**' label found",
            )
        else:
            header_cells, data_start = find_table_after(lines, req_label_idx)
            if header_cells is None:
                result.add(
                    "fb-requirements-no-table",
                    req_label_idx + 1,
                    f"{fb_id}: '**Requirements:**' label found but no "
                    "table immediately follows it",
                )
            else:
                row_count = 0
                k = data_start
                while k < len(lines) and TABLE_ROW_RE.match(lines[k]):
                    row_cells = split_table_row(lines[k])
                    if len(row_cells) >= 2:
                        row_id, statement = row_cells[0], row_cells[1]
                        row_count += 1
                        for problem in check_ears_statement(statement):
                            result.add(
                                "ears-pattern",
                                k + 1,
                                f"{fb_id} {row_id or '(no id)'}: {problem}",
                            )
                    k += 1
                if row_count == 0:
                    result.add(
                        "fb-requirements-empty",
                        req_label_idx + 1,
                        f"{fb_id}: requirements table has no data rows",
                    )
                elif row_count > 10:
                    result.add(
                        "fb-split-guideline",
                        req_label_idx + 1,
                        f"{fb_id}: {row_count} requirement rows, over the "
                        "~10-statement split guideline in "
                        "prd-template.md; consider splitting",
                    )

        has_acceptance = bool(
            re.search(r"^\*\*Acceptance scenario:\*\*", section_text, re.MULTILINE)
        )
        if not has_acceptance and not has_definition:
            result.add(
                "fb-missing-acceptance-scenario",
                start + 1,
                f"{fb_id}: no '**Acceptance scenario:**' found, and this "
                "is not a Definition-variant FB (acceptance scenarios are "
                "required unless the FB is purely definitional)",
            )

        has_context = bool(
            re.search(r"^\*Context and provenance", section_text, re.MULTILINE)
        )
        if not has_context:
            result.add(
                "fb-missing-context-block",
                start + 1,
                f"{fb_id}: no '*Context and provenance: ...*' block found "
                "below the line",
            )

        # --- Provenance capture discipline, made mechanical -------------
        # A name-and-date-shaped attribution above the FB's own
        # "*Context and provenance:*" line (Story, Requirements table,
        # Acceptance scenario) belongs below it instead.
        context_offset = None
        for offset, line in enumerate(section):
            if CONTEXT_LINE_RE.match(line):
                context_offset = offset
                break
        above_lines = section if context_offset is None else section[:context_offset]
        for offset, line in enumerate(above_lines):
            for m in PROVENANCE_ATTRIBUTION_RE.finditer(line):
                result.add(
                    "provenance-inside-requirement",
                    start + offset + 1,
                    f"{fb_id}: attribution-shaped text {m.group(0)!r} appears "
                    "above the '*Context and provenance:*' line; provenance "
                    "belongs below the line, never inside a Story, "
                    "Requirements row or Acceptance scenario "
                    "(prd-template.md's FB unit, point 4)",
                )

    if not fb_starts:
        result.add(
            "no-fb-sections",
            1,
            "no '### FB-N' (or '## FB-N') headings found in this document "
            "at all; nothing to check",
        )

    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("prd_path", type=Path, help="path to the PRD markdown file")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="exit 1 if any finding is reported (default: always exit 0, "
        "advisory only)",
    )
    args = parser.parse_args()

    if not args.prd_path.is_file():
        print(f"lint-prd.py: no such file: {args.prd_path}", file=sys.stderr)
        return 1

    result = lint(args.prd_path)

    print(f"lint-prd.py: {args.prd_path}")
    if not result.findings:
        print("  PASS: no findings.")
    else:
        print(f"  {len(result.findings)} finding(s):")
        for f in result.findings:
            print(f"  [{f.rule}] line {f.line}: {f.message}")
    print()
    print(
        "This check is deterministic and mechanical only: it never judges "
        "product content, only shape (EARS pattern match, banned words, "
        "unique ids, the FB layer contract, and header links). It is "
        "advisory by default; see scripts/README.md."
    )

    if args.strict and result.findings:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
