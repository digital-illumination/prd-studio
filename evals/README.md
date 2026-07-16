# PRD Studio: persona eval suite

Regression tests for the grill personas. Each benchmark is a deliberately
flawed PRD plus an answer key, so a persona edit can be judged on catch-rate
instead of vibes.

## What the benchmarks are

Each directory under `benchmarks/` contains:

- `PRD.md`: a plausible, decently written PRD for a wholly fictional product,
  following `../prd-template.md`. It is not a straw man. Most of it is sound;
  exactly twelve defects are seeded into it.
- `ANSWER-KEY.md`: every seeded defect with an id (D-1 onwards), its location
  (section plus a quote fragment), its gap class (AMBIGUOUS / CONTRADICTS /
  MISSING / EDGE-CASE / UNMEASURABLE), the persona(s) expected to catch it,
  and an example of what a catching question looks like. The key also lists
  three "clean" areas: sections a persona might wrongly flag, used to score
  false positives.

Current benchmarks:

| Benchmark | Product | Domain |
|---|---|---|
| `bench-01-team-scheduler` | Shiftly (fictional) | Shift scheduling SaaS for hourly workforces |
| `bench-02-usage-analytics` | Beacon (fictional) | In-product usage analytics platform |

The defects are spread so every persona (engineer, qa, end-user,
security-compliance, platform-architect, data-protection, accessibility,
commercial-viability, operations-support, regulator) has at least two defects
it is expected to catch across the two benchmarks, and every gap class
appears at least twice per benchmark.

## Scoring

- **Catch**: the persona raises a question that unambiguously targets a
  seeded defect. "Unambiguously" means a reasonable marker, reading the
  question next to the key entry, agrees it is asking about that defect and
  not something adjacent. Partial credit is not scored; a vague question that
  gestures at the right section but misses the defect is not a catch.
- **Catch-rate per persona** = defects caught / defects seeded for that
  persona in that benchmark. Where a defect lists two expected personas,
  either catching it counts for that persona's own rate; it does not need
  both.
- **False positive**: the persona raises as a gap something the answer key
  marks as cleanly answered (see the "clean areas" list in each key).
  Questions about genuinely unseeded-but-arguable material are neither
  catches nor false positives; ignore them, or note them as candidates for a
  future seeded defect.
- **Suite score** for a persona: total catches / total seeded across all
  benchmarks, reported alongside the false-positive count. Report both; a
  persona that catches everything by flagging everything has not improved.

## How to run manually

1. Start a fresh Claude session (or a subagent) with no memory of this suite.
2. Give it exactly two things: the persona definition under test, and one
   benchmark `PRD.md`. Do not include the answer key or this README.
3. Ask it to grill the PRD as that persona: up to its usual question budget,
   hardest first, gap class tagged per question.
4. Collect the questions verbatim.
5. Mark against `ANSWER-KEY.md`: for each question, either match it to a
   defect id (a catch), match it to a clean area (a false positive), or set
   it aside as unscored.
6. Record catch-rate and false positives per persona per benchmark. A simple
   table in the pull request or working note is enough; there is no harness.

Run each persona separately. Running all ten at once lets strong personas
mask weak ones and blows the question budget.

## Quality bar for new personas

A proposed persona earns its place only if, on this suite, it either:

- catches at least one seeded defect that no existing persona catches, or
- materially sharpens an existing catch: its question is specific enough to
  fold into the PRD directly, where the incumbent persona's question was only
  directional.

If it does neither, it is overlap, and overlap costs question budget on every
future grill. Reject it or merge its best question into an existing persona.

## Regression rule

A persona edit must not lower that persona's catch-rate on any benchmark.
Run the edited persona against both benchmarks before and after the change;
if any per-benchmark catch-rate drops, the edit is rejected or reworked, even
if the prose reads better. New false positives introduced by an edit count
against it the same way.

## Adding a benchmark

Follow the shape of the existing two: a convincing PRD written to
`../prd-template.md`, exactly twelve seeded defects, every gap class at
least twice, at least two subtle defects (distant contradictions, circular
measurements, untestable acceptance checks), three clean areas, and a key in
the same format. Fictional products only; nothing drawn from client work.
