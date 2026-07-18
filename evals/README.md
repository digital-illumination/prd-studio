# PRD Studio: persona eval suite

Regression tests for the grill personas. Each benchmark is a deliberately
flawed PRD plus an answer key, so a persona edit can be judged on catch-rate
instead of vibes.

## What the benchmarks are

Each directory under `benchmarks/` contains:

- `PRD.md`: a plausible, decently written PRD for a wholly fictional product,
  following `../prd-template.md`. It is not a straw man. Most of it is sound;
  twelve defects are seeded into it at the outset (a benchmark can grow past
  twelve over time as live grills bank real corrections into the key, see
  "Bank the correction" below).
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
| `bench-03-consumer-booking` | Sundial (fictional) | Consumer marketplace for booking local providers |

The defects are spread so every persona (engineer, qa, end-user,
security-compliance, platform-architect, data-protection, accessibility,
commercial-viability, operations-support, regulator) has at least three
defects it is expected to catch across the benchmarks, and every gap class
appears at least twice per benchmark.

## One defect, one question

A defect id must be catchable by a single question. If a seeded defect turns
out to bundle two distinct catchable questions, split it: give each half its
own lettered id (D-8a, D-8b, and so on) and a full key entry of its own,
location, gap class, expected persona(s), catching question, and leave every
other id in the benchmark stable. bench-01's D-8 bundled the undefined
"eligible" and "fairly" terms in the open-shift offer with a separate missing
tie-break rule for simultaneous accepts; a live grill caught both as distinct
lines of questioning, so it became D-8a and D-8b.

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
- **The false-positive boundary** (added after the double-marking probe, the
  one place two independent markers diverged): a false positive requires the
  question to assert as a gap something a clean area's own statement
  explicitly answers. A question probing near a clean area without
  contradicting its claim is unscored, not a false positive. When torn,
  score unscored and note it.
- **Suite score** for a persona: total catches / total seeded across all
  benchmarks, reported alongside the false-positive count. Report both; a
  persona that catches everything by flagging everything has not improved.

The full procedures used to produce `BASELINES.md` (panel runs, A/B
regression, double-marking, cross-model probes) are written up step by step
in [`RUNBOOK.md`](RUNBOOK.md).

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

## Bank the correction

When a grill of a benchmark surfaces a real gap the key missed, and a marker
confirms it as genuine rather than noise, it is added to the key as a new
seeded defect with its catching persona(s), not filed away as a one-off. The
suite improves by being used: an unkeyed-but-real gap is a key defect the
suite had not yet written down, not a failure of the persona that found it.

## Regression rule

A persona edit must not lower that persona's catch-rate on any benchmark.
Run the edited persona against the benchmarks before and after the change;
if any per-benchmark catch-rate drops, the edit is rejected or reworked, even
if the prose reads better. New false positives introduced by an edit count
against it the same way.

## Regression procedure

To regression-test a persona edit, spawn the persona as a fresh agent with
only the persona definition and the benchmark `PRD.md`, never the answer key,
capped at three questions. Under a plugin install, create `evals/.blind`
before spawning the blind agents and remove it before marking the questions
against the key, so the key is mechanically unreadable for the run rather
than merely withheld by convention. Mark the questions against the key and
compare the result to that persona's recorded baseline in `BASELINES.md`. An
edit must not lower any per-benchmark catch-rate against its baseline, and any
new false positive counts against it, the same standard as the regression
rule above. If the persona has no recorded baseline against the current key
version, record one first (unedited persona, same procedure) before treating
the comparison as a pass/fail gate.

Variance clause (added after the first A/B regression): with two capped
trials per arm, a one-catch difference between arms is within observed run
variance and is judged alongside the sweep results, not mechanically. New
false positives weigh heavier than a one-catch capped delta: an edit that
adds false positives on any benchmark is rejected or reworked even where its
catches improved. The cleanest comparison is A/B on the same day against the
same key, original and edited arms run identically.

## Adding a benchmark

Follow the shape of the existing benchmarks: a convincing PRD written to
`../prd-template.md`, exactly twelve seeded defects, every gap class at
least twice, at least two subtle defects (distant contradictions, circular
measurements, untestable acceptance checks), three clean areas, and a key in
the same format. Fictional products only; nothing drawn from client work.
