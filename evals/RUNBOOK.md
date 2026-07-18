# Eval runbook

The procedures behind every number in `BASELINES.md`, written so a stranger
can reproduce them. All of them share one discipline: the grilling agent is
always fresh, always blind, and always reads exactly two things, the persona
file under test and the benchmark `PRD.md`. Under a Claude Code plugin
install, create `evals/.blind` first so the answer key is mechanically
unreadable during the run (see the hooks note in the repository README).

## Shared mechanics

- **A run** is one fresh agent, given one persona file and one benchmark
  `PRD.md`, never the key, never this directory's other files, no repository
  search. Capped mode: at most three questions, hardest first. Sweep mode:
  every distinct gap the lens genuinely finds, with padding scored as false
  positives.
- **A cell** is one persona on one benchmark: two capped runs plus one
  sweep.
- **Marking**: collect each run's questions verbatim, then one marker scores
  every question against the key under the rules in `README.md` (catch with
  defect id, false positive, or unscored). Markers must return bare defect
  ids, not prose, so results compare mechanically.
- **Aggregates**: a persona's capped result for a cell is the union of own
  catches across its two capped trials. Panel recall for a benchmark is the
  union of all catches (own and cross) across every persona's runs, capped
  and with-sweep counted separately.

## Full panel

Every persona, every benchmark, one cell each (ten personas, three
benchmarks: 90 runs, 30 markings). Produces the per-benchmark tables, the
suite totals, panel recall, and the salience list (seeds no persona caught
in any mode), which feeds the next key review. Record the results in
`BASELINES.md` with the key version stated.

## A/B regression (for a persona edit)

Run the edited persona and the unedited persona as two arms of the same
panel slice: same day, same keys, one cell per benchmark per arm (for one
persona: 18 runs, 6 markings). The unedited arm is the live baseline; do not
lean on an older recorded baseline if the keys have changed since it was
recorded. Apply the regression rule and the variance clause from
`README.md`: a one-catch capped difference is within run variance and is
judged alongside the sweeps; new false positives reject the edit even where
catches improved. Record the comparison and the verdict in `BASELINES.md`
whichever way it goes; a rejected edit's diagnosis is the next attempt's
input.

## Double-marking (scorer agreement)

Take a handful of persona-benchmark pairs spanning benchmarks and personas,
one fresh capped run each, and have two independent markers score the
identical output. Compare
own catches, cross catches, false-positive count and unscored count after
normalising to bare ids. Catch disagreement means the key or the rubric needs
work before any gate decision is trusted; false-positive disagreement of
about one question is the observed boundary fuzz, and the false-positive
boundary rule in `README.md` exists to keep it that small.

## Cross-model probe

One persona, one benchmark, one cell per model tier, marked identically.
The claim under test is not that every tier scores identically (they will
not; run variance alone forbids it) but that the persona file transfers: no
tier should produce nonsense or a false-positive spike. State the marker's
borderline calls; they matter at this sample size.

## Reporting rules

- State the key version (seed counts per benchmark) next to every recorded
  result; numbers scored against different key versions are not comparable.
- Record failed attempts and rejections with the same care as successes.
- Public claims use capped-mode numbers only; sweeps are the instrument's
  ceiling, not the product's behaviour.
