# scripts

Deterministic glue, not judgement. This directory checks a PRD's mechanical
shape; it never judges product content.

## `lint-prd.py`

Deterministic, stdlib-only, no LLM call, no network access, no API key.
Checks a committed `prd.md` against `skills/prd-studio/prd-template.md`'s
shape and the DRAFT/REFINE style rules in `skills/prd-studio/SKILL.md`:

- every FB carries its required layers (Story or Definition, Requirements,
  Acceptance scenario unless Definition-variant, Context and provenance);
- every EARS requirement row matches one of the five patterns and reads as
  one complete sentence (one "shall", ends with a full stop);
- no banned vague term ("appropriate", "efficient", and so on) or escape
  clause ("where feasible", "if required", and so on) anywhere in a
  requirement row;
- ids are unique across the whole document;
- the header's `glossary.md` and `grill-history.md` links resolve to files
  that actually exist alongside the PRD;
- every Open Questions register row carries both a status and an owner
  (the template's own parked-question bar);
- each of `prd-template.md` §7's six NFR classes (outcome-level acceptance;
  scale, load and integration; security and privacy; cost / run-cost;
  accessibility; retention and audit) is named somewhere, in the NFR
  section or the register, so silence is the only failure this catches,
  never an adequacy judgement;
- every `[CONTESTED: id]` marker resolves to a matching Id in the register;
- every capitalised-acronym or id-scheme term used in the document body has
  a matching `glossary.md` entry, excluding the register's own free-form
  commentary and this template's structural vocabulary, to keep noise down;
- a name-and-date-shaped attribution never appears above an FB's own
  `*Context and provenance:*` line.

Every check runs identically against a DRAFT-produced or a REFINE-produced
document; none is DRAFT-specific.

### Usage

```
python3 scripts/lint-prd.py path/to/prd.md
python3 scripts/lint-prd.py path/to/prd.md --strict
```

Default mode always exits 0 and prints every finding: **advisory only**.
This studio is host-agnostic, deliberately unwired to any specific CI
system, repository host, or pull-request flow; a project adopting PRD
Studio into its own pipeline can wire this script in as an optional
pre-PR check (a pre-commit hook, a CI step, or a plain habit before opening
a pull request), and decide for itself whether and when to pass `--strict`
to make a finding block rather than merely inform. Nothing in this
repository assumes that decision on a project's behalf.

Full detail on every check is in the script's own header comment.

## Why the rest are not built yet

This studio ships as plain markdown, a skill, persona files, and (for the
Claude Code plugin route) a set of subagents; it deliberately does not
assume a repository host, a CI system, or a pull-request flow, since those
vary by project. `lint-prd.py` is the one script built so far because it is
genuinely host-agnostic: it reads a markdown file from disk and prints
findings to a terminal, nothing more. A future script wiring this check, or
`VALIDATE-BUILD`'s output, into a specific host's CI belongs in that
project's own repository, not in this one.
