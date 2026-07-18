# Baselines

A small honest record of persona catch-rates from live scored grills, kept
separate from the answer keys so a key version bump does not silently
invalidate old numbers. See the "Regression procedure" in `README.md` for
how this file is used.

## bench-01-team-scheduler (Shiftly)

### Scored against

- Benchmark: `bench-01-team-scheduler`.
- Key version: bench-01 `ANSWER-KEY.md` as of v0.2.0, before the D-8 split
  and before D-13, D-14 and D-15 were added (twelve seeded defects, D-1 to
  D-12).
- Date: 2026-07-17.

### Setup

- Fresh agent per persona, no memory of this suite or of any prior grill.
- Each agent was given only the persona definition and bench-01's `PRD.md`,
  never the answer key and never this file or `README.md`.
- Three-question cap per persona, hardest first, gap class tagged per
  question.
- Blind marking: questions were collected verbatim, then marked against the
  v0.2.0 key under the scoring rules in `README.md`.

### Results (against the v0.2.0 key)

| Persona | Catch-rate | Caught | Notes |
|---|---|---|---|
| engineer | 1/4 | D-2 | Also caught D-4, which is seeded for platform-architect, not engineer, so it does not count towards this rate. Its third question was promoted to D-13. |
| qa | 1/4 | D-1 | Also raised a question against D-8 (seeded for engineer) that a marker judged borderline at the time, since D-8 bundled two things and the question only clearly hit one of them; under the v0.2.1 split that question is a clean catch of D-8b. Its remaining question was promoted to D-14. |
| data-protection | 1/1 | D-3 | One question promoted to D-15; one further question (no subject-rights path for the new data categories) remains unkeyed. |

False positives: 0, across all nine questions asked.

Three further questions surfaced gaps that were not in the v0.2.0 key: one
from engineer (the missed-deadline path with no defined resolution, now
D-13), one from qa (the tier-gated mechanism behind an all-sites goal, now
D-14) and one from data-protection (retention undefined for two of the three
named data categories, now D-15). A marker judged all three genuine rather
than noise, and, following the "Bank the correction" rule in `README.md`,
they were promoted into the key in v0.2.1.

## bench-03-consumer-booking (Sundial)

### Scored against

- Key version: bench-03 `ANSWER-KEY.md` at the v0.2.1 release check, the
  twelve creation seeds D-1 to D-12. D-13 and D-14 were banked from this
  very run and are therefore excluded from its rates.
- Date: 2026-07-17. Same setup as bench-01: fresh agent per persona, persona
  definition and `PRD.md` only, three-question cap, blind marking.

### Results (against the twelve-seed key)

| Persona | Catch-rate | Caught | Notes |
|---|---|---|---|
| end-user | 1/3 | D-11 | Also caught D-5 (security-compliance's seed, cross). Missed D-3 and D-7. Its remaining question was promoted to D-13. |
| commercial-viability | 1/2 | D-12 | Also caught D-4 (platform-architect's seed, cross). Missed D-2. Its remaining question was promoted to D-14. |
| accessibility | 2/2 | D-6, D-10 | Clean sweep. Its third question was a cross-catch of D-8 (seeded for engineer and qa) via the assistive-technology timing framing now noted in D-8's key entry. |

False positives: 0, across all nine questions asked.

A fresh baseline against the fourteen-defect key (D-13 and D-14 included) is
the next recording due for end-user and commercial-viability; accessibility's
seeds are unchanged by the banked additions.

## Full panel, 2026-07-17 (v0.2.1 keys)

The first complete baseline matrix: every persona against every benchmark,
against the keys as tagged at v0.2.1 (bench-01: 16 seeds counting D-8a and
D-8b separately; bench-02: 12; bench-03: 14 counting the banked D-13 and
D-14). Setup per cell: two capped trials (fresh agent, persona file and
`PRD.md` only, three-question cap, blind) plus one uncapped sweep (same
blindness, list every genuine gap, padding scored as false positives).
Ninety grills and thirty markings in total.

### bench-01-team-scheduler

| Persona | Own seeds | Trial 1 (capped) | Trial 2 (capped) | Sweep | Cross-catches (all runs) | FPs |
|---|---|---|---|---|---|---|
| engineer | 6 | D-2, D-8b | none | D-2, D-8a | D-12, D-14, D-15, D-4, D-9 | 2 |
| qa | 6 | D-12, D-8b | D-12, D-8b | D-1, D-12, D-8b, D-2 | D-4, D-9 | 0 |
| end-user | 2 | none | none | D-9 | D-1, D-4, D-8b | 0 |
| security-compliance | 1 | D-5 | none | D-5 | D-15, D-3, D-4 | 0 |
| platform-architect | 1 | D-4 | D-4 | D-4 | D-14 | 0 |
| data-protection | 2 | D-15 | D-3, D-15 | D-3, D-15 | none | 0 |
| accessibility | 1 | D-6 | D-6 | D-6 | D-12, D-8b | 0 |
| commercial-viability | 1 | D-14 | D-14 | none | D-2 | 0 |
| operations-support | 2 | D-13 | D-13 | D-13, D-7 | D-12, D-2, D-4, D-5, D-8b | 0 |
| regulator | 1 | none | D-3 | none | D-12, D-15, D-2, D-4 | 2 |

### bench-02-usage-analytics

| Persona | Own seeds | Trial 1 (capped) | Trial 2 (capped) | Sweep | Cross-catches (all runs) | FPs |
|---|---|---|---|---|---|---|
| engineer | 3 | none | none | D-8 | D-1, D-10, D-2 | 1 |
| qa | 3 | D-4, D-10 | D-3 | D-3, D-4 | D-1, D-12 | 1 |
| end-user | 0 | none | none | none | D-1, D-5, D-9 | 2 |
| security-compliance | 1 | D-7 | D-7 | D-7 | D-1, D-10, D-2 | 0 |
| platform-architect | 1 | D-2 | D-2 | D-2 | D-1 | 1 |
| data-protection | 2 | D-1, D-10 | D-1, D-10 | D-1, D-10 | D-2 | 0 |
| accessibility | 1 | D-11 | D-11 | D-11 | D-1 | 0 |
| commercial-viability | 2 | D-9 | D-9 | D-9 | D-1, D-2 | 0 |
| operations-support | 2 | D-6 | D-6 | D-6 | D-1, D-10 | 0 |
| regulator | 2 | D-1, D-2 | D-1, D-2 | D-1, D-2 | D-10 | 0 |

### bench-03-consumer-booking

| Persona | Own seeds | Trial 1 (capped) | Trial 2 (capped) | Sweep | Cross-catches (all runs) | FPs |
|---|---|---|---|---|---|---|
| engineer | 2 | D-8 | D-8 | D-8 | D-11, D-4, D-5 | 0 |
| qa | 2 | D-1 | D-1 | D-1, D-8 | D-10, D-4, D-5 | 0 |
| end-user | 4 | D-11 | D-11, D-3 | D-3, D-11 | D-4, D-5, D-8 | 0 |
| security-compliance | 1 | D-5 | D-5 | D-5 | D-4 | 0 |
| platform-architect | 1 | D-4 | D-4 | D-4 | D-5 | 0 |
| data-protection | 0 | none | none | none | D-5 | 0 |
| accessibility | 2 | D-6, D-10 | D-6, D-10 | D-6, D-10 | D-5 | 0 |
| commercial-viability | 3 | D-12, D-14 | D-12, D-14 | D-12, D-14 | D-4, D-5 | 0 |
| operations-support | 0 | none | none | none | D-5, D-8 | 1 |
| regulator | 1 | D-9 | D-9 | D-9 | D-10, D-4, D-5 | 0 |

### Panel recall

The product-level number: the share of seeds caught by at least one persona
when the whole panel runs. Cross-catches count; the panel does not care whose
lens found the defect.

| Benchmark | Seeds | Capped panel union | With sweep union |
|---|---|---|---|
| bench-01-team-scheduler | 16 | 11/16 | 14/16 |
| bench-02-usage-analytics | 12 | 9/12 | 12/12 |
| bench-03-consumer-booking | 14 | 11/14 | 11/14 |

### Salience review list

Seeds no persona caught in this panel, in any mode. Under the mirror of the
bank-the-correction rule, these are key defects to review (reword, reassign,
or accept as genuinely hard), not automatic persona failures:

- bench-01: D-10, D-11
- bench-02: none, every seed was caught by at least one persona
- bench-03: D-2, D-7, D-13

D-13 (bench-03) deserves a note: it was banked from a live end-user catch at
the v0.2.1 release check, and no persona, end-user included, reproduced it
here. One catch and one miss on the same defect by the same persona is the
variance this multi-trial design exists to expose.

### Suite view per persona (own seeds only)

| Persona | Own seeds (suite) | Caught in capped trials (union) | Caught with sweep (union) | Total FPs |
|---|---|---|---|---|
| engineer | 11 | 3 | 5 | 3 |
| qa | 11 | 6 | 9 | 1 |
| end-user | 6 | 2 | 3 | 2 |
| security-compliance | 3 | 3 | 3 | 0 |
| platform-architect | 3 | 3 | 3 | 1 |
| data-protection | 4 | 4 | 4 | 0 |
| accessibility | 4 | 4 | 4 | 0 |
| commercial-viability | 6 | 4 | 4 | 0 |
| operations-support | 4 | 2 | 3 | 1 |
| regulator | 4 | 4 | 4 | 2 |

### Reading the full panel

- **Precision is the headline.** Ten false positives across roughly 660
  questions in ninety runs. The grill very rarely invents problems.
- **Stability varies by persona, and that is the finding.** Seven personas
  returned near-identical catches across their two capped trials.
  Engineer is the least stable: it cross-catches richly (its questions are
  good) but wanders off its own seeds, scoring 3 of 11 in capped trials.
  End-user (2 of 6 capped) and operations-support (2 of 4) also under-hit
  their own seeds. These three persona files are the next editing targets,
  and the regression procedure now has the baseline to grade those edits
  against.
- **Sweeps add real recall.** bench-02 goes from 9/12 to 12/12 with sweeps;
  the three-question cap is the binding constraint, not the lenses.
- **The sweeps produced 177 unscored candidate gaps** (54, 54 and 69 per
  benchmark), which is deliberate over-generation: they are uncurated, many
  will be duplicates or weak, and banking any of them requires the marker
  confirmation the rule demands. Curation is a separate pass; none were
  banked in this release.

## Persona A/B regression, 2026-07-18 (curated keys)

The first use of the regression gate on real edits. After the sweep-curation
pass grew the keys (bench-01: 29 seeds, bench-02: 21, bench-03: 27), the
three under-hitting personas from the full panel (engineer, end-user,
operations-support) were hardened to draft v1.1.0 and run A/B against their
unedited originals: same day, same keys, both arms blind, two capped trials
plus one sweep per cell.

| Persona | Benchmark | A capped (own) | B capped (own) | A sweep (own) | B sweep (own) | FP delta (B-A) |
|---|---|---|---|---|---|---|
| engineer | bench-01 | D-8a, D-8b, D-16 | D-2, D-8a, D-8b | 5 catches | 4 catches | 0 |
| engineer | bench-02 | D-13, D-14 | D-12 | D-13 | D-6, D-12, D-13, D-14 | 0 |
| engineer | bench-03 | D-15, D-16 | D-8, D-15, D-16 | 3 catches | 4 catches | 0 |
| end-user | bench-01 | D-9, D-19 | D-9 | D-19 | D-11, D-19 | 0 |
| end-user | bench-02 | none (0 own seeds) | none | none | none | +2 |
| end-user | bench-03 | D-3, D-11 | D-11 | 3 catches | 3 catches | 0 |
| operations-support | bench-01 | none | D-7, D-13 | 3 catches | 3 catches | 0 |
| operations-support | bench-02 | D-6 | D-6, D-12 | D-6 | D-6, D-12 | 0 |
| operations-support | bench-03 | none | none | D-22 | D-22 | +3 |

Verdicts, applying the regression rule and the variance clause:

- **engineer v1.1.0: KEPT.** Zero false positives in all six runs. Capped
  totals equal overall (a one-catch drop on bench-02 sits within run
  variance) and its hardened sweeps dominated, catching D-6 and D-12 on
  bench-02, seeds no engineer run had caught before (D-6 has long been an
  operations-support catch; it had never fallen to the engineer lens).
- **end-user v1.1.0: REJECTED, reverted to 1.0.0.** Capped own catches
  halved across the suite (four to two) and it introduced false positives on
  the benchmark where it has no seeds. Its sweeps did reach previously
  uncaught seeds (D-11 on bench-01; the reworded D-7 on bench-03), so the
  new heuristics have value, but as drafted they crowd the capped question
  budget out of previously reliable catches. Rework queued.
- **operations-support v1.1.0: REJECTED, reverted to 1.0.0.** Its capped
  gains were the strongest of the three (D-7 and D-13 caught capped on
  bench-01, D-12 on bench-02, all previously missed), but it introduced
  false positives in both capped trials on bench-03, pressing the same
  keyed-clean surface three times across modes. Under the rule, new false
  positives reject the edit even where catches improved. Rework queued: keep
  the new hunts, add the boundary that a defined, keyed-clean rejection
  surface is not a gap.

The rejected 1.1.0 drafts are preserved outside the repo for rework. The
A-arm results above are the current baselines for end-user and
operations-support against the curated keys; the B-arm results are the
baseline for the shipped engineer v1.1.0.

## Full panel v2 and calibration probes, 2026-07-18 (curated keys)

Everything below was scored against the curated keys (bench-01: 29 seeds,
bench-02: 21, bench-03: 27; 77 in total). Same setup as ever: fresh agent per
run, persona file and PRD only, blind, two capped trials plus one sweep per
cell, one marker per cell except where stated.

### Panel recall (shipped personas: engineer 1.1.0, all others 1.0.0)

| Benchmark | Seeds | Capped panel union | With sweep union |
|---|---|---|---|
| bench-01-team-scheduler | 29 | 20/29 | 24/29 |
| bench-02-usage-analytics | 21 | 14/21 | 17/21 |
| bench-03-consumer-booking | 27 | 19/27 | 25/27 |

Suite-level: 53/77 capped, 66/77 (86%) with sweeps, against keys nearly
twice the size of the v1 panel's.

### bench-01-team-scheduler (shipped personas)

| Persona | Own seeds | Trial 1 | Trial 2 | Sweep | Cross-catches (all runs) | FPs |
|---|---|---|---|---|---|---|
| engineer | 10 | D-2, D-8a | D-16, D-8a | D-10, D-17, D-2, D-7, D-8b | D-1, D-12, D-4 | 0 |
| qa | 11 | D-1, D-12 | D-1, D-12, D-2 | D-1, D-12, D-2, D-8b | D-4 | 1 |
| end-user | 4 | none | D-9 | D-19 | D-1, D-18, D-2, D-4, D-8b | 0 |
| security-compliance | 2 | D-22, D-5 | none | D-22, D-5 | D-15, D-16, D-24, D-4 | 0 |
| platform-architect | 3 | D-18, D-4 | D-18, D-4 | D-18, D-4 | D-12, D-2 | 0 |
| data-protection | 3 | D-15, D-24, D-3 | D-15, D-24, D-3 | D-15, D-24 | D-2 | 0 |
| accessibility | 2 | D-6 | D-6 | D-6 | D-27, D-4 | 0 |
| commercial-viability | 3 | D-25, D-26 | D-14, D-25, D-26 | D-25, D-26 | D-2 | 0 |
| operations-support | 3 | D-7 | D-13 | D-13, D-27, D-7 | D-4, D-5, D-8b | 0 |
| regulator | 2 | D-3 | D-3 | D-3 | D-15, D-18, D-2, D-4 | 0 |

### bench-02-usage-analytics (shipped personas)

| Persona | Own seeds | Trial 1 | Trial 2 | Sweep | Cross-catches (all runs) | FPs |
|---|---|---|---|---|---|---|
| engineer | 6 | D-14 | none | D-13, D-14 | D-1, D-10, D-2, D-4 | 1 |
| qa | 5 | D-10, D-4 | D-10, D-3 | D-10, D-3, D-4 | D-1 | 0 |
| end-user | 0 | none | none | none | D-1, D-12, D-13 | 0 |
| security-compliance | 5 | D-19 | D-7 | D-19 | D-1, D-10, D-18, D-2 | 0 |
| platform-architect | 2 | D-2 | none | D-17, D-2 | D-1, D-9 | 1 |
| data-protection | 7 | D-1, D-10, D-18 | D-1, D-18 | D-1, D-16, D-17, D-18 | D-2 | 0 |
| accessibility | 1 | D-11 | D-11 | D-11 | D-1, D-4 | 0 |
| commercial-viability | 2 | D-5, D-9 | D-5, D-9 | D-5, D-9 | D-1, D-2 | 0 |
| operations-support | 2 | D-6 | D-6 | D-6 | D-1, D-10 | 1 |
| regulator | 4 | D-1, D-2 | D-1, D-2 | D-1, D-17, D-2 | D-10, D-18, D-4 | 0 |

### bench-03-consumer-booking (shipped personas)

| Persona | Own seeds | Trial 1 | Trial 2 | Sweep | Cross-catches (all runs) | FPs |
|---|---|---|---|---|---|---|
| engineer | 6 | D-8 | D-15 | D-15, D-7, D-8 | D-24, D-4, D-5 | 0 |
| qa | 6 | D-1, D-15 | D-1, D-19 | D-1, D-15, D-18, D-19, D-8 | D-10, D-4, D-5 | 0 |
| end-user | 6 | D-13, D-15 | D-11, D-3 | D-15 | D-18, D-5, D-8 | 0 |
| security-compliance | 4 | D-22, D-23, D-5 | D-21, D-23, D-5 | D-21, D-22, D-23, D-5 | none | 0 |
| platform-architect | 3 | D-4 | D-4 | D-4 | D-5 | 0 |
| data-protection | 2 | D-23, D-25 | D-23 | D-23, D-25 | D-21, D-5 | 0 |
| accessibility | 3 | D-10, D-6 | D-10, D-26, D-6 | D-10, D-26, D-6 | D-8 | 0 |
| commercial-viability | 3 | D-14 | D-14 | D-12, D-14, D-2 | D-4, D-5 | 0 |
| operations-support | 4 | none | none | D-16 | D-21, D-5 | 2 |
| regulator | 4 | D-21, D-9 | D-9 | D-21, D-23, D-27, D-9 | D-10, D-22, D-4, D-5 | 0 |

### Suite totals (shipped personas, own seeds only)

| Persona | Own seeds (suite) | Capped union | With sweep | FPs |
|---|---|---|---|---|
| engineer | 22 | 6 | 12 | 1 |
| qa | 22 | 9 | 12 | 1 |
| end-user | 10 | 5 | 6 | 0 |
| security-compliance | 11 | 8 | 8 | 0 |
| platform-architect | 8 | 4 | 5 | 1 |
| data-protection | 12 | 8 | 10 | 0 |
| accessibility | 6 | 5 | 5 | 0 |
| commercial-viability | 8 | 6 | 8 | 0 |
| operations-support | 9 | 3 | 5 | 3 |
| regulator | 10 | 5 | 8 | 0 |

### Salience v2 (seeds uncaught by the shipped panel, any mode)

- bench-01: D-11, D-20, D-21, D-23, D-28
- bench-02: D-8, D-15, D-20, D-21
- bench-03: D-17, D-20

Most of these are banked seeds on their first outing; bench-02's D-8 was
caught in the v1 panel and by two of three models in the cross-model probe,
so its absence here is run variance, not key damage. The banked seeds that
went uncaught are the next salience review's input.

### A/B rework verdicts (second attempt, both REJECTED)

The 1.1.1 rework drafts for end-user and operations-support ran as B arms
against the shipped 1.0.0 files, inside this panel:

- **end-user 1.1.1: REJECTED.** Two capped false positives on bench-02 (the
  no-seed benchmark, the exact failure the rework targeted) and a capped
  drop on bench-03 (the shipped arm caught four own seeds including D-13,
  the accepted-as-hard seed; the rework caught two). Diagnosis: the
  prioritisation line did not stop the new heuristics from displacing
  reliable catches under the cap.
- **operations-support 1.1.1: REJECTED, with the diagnosis inverted.** The
  false-positive cure worked completely (zero FPs in all nine runs, against
  the shipped arm's three), and its bench-02 and bench-03 sweeps improved.
  But on bench-01 it caught nothing at all in any mode, where the shipped
  arm caught D-7 and D-13 capped. Diagnosis: the calibration boundary
  over-suppressed; an acceptance check that merely exists is not one that
  answers the failure-path question, and the draft's wording does not make
  that distinction sharply enough.

Both personas remain shipped at 1.0.0. The rejected drafts and diagnoses are
preserved for a third attempt; the gate has now rejected four of five
hardening attempts, which is the gate doing its job.

### Scorer-agreement probe (double marking)

Six persona-benchmark pairs across the three benchmarks, one fresh capped
run each, the same output scored by two independent markers. After normalising marker output to
bare defect ids: catch identification agreed in twelve of twelve dimensions
(own and cross, all six cells). The single divergence in the whole probe was
one question one marker scored as a false positive and the other as
unscored. Conclusion: catch-rates in this file carry little marker noise;
false-positive counts carry roughly one question of boundary fuzz, which the
"false-positive boundary" rule in `README.md` now pins down.

### Cross-model probe

Engineer 1.1.0 on bench-02, three runs (two capped, one sweep) per model,
single marker per model:

| Model | Own catches (union) | Cross | FPs | Unscored |
|---|---|---|---|---|
| Haiku | D-6, D-8, D-12, D-13 | D-1, D-10 | 0 | 8 |
| Sonnet | D-6, D-12 | D-1, D-4, D-9, D-10 | 2 | 8 |
| Opus | D-6, D-8, D-12, D-13 | D-1, D-2, D-9, D-10, D-18 | 0 | 5 |

The persona file transfers across tiers: no tier produced nonsense, and the
spread between models sits within the same range as run-to-run variance on a
single model. Sonnet's two false positives match its own single-model
variance elsewhere in this file rather than indicating a tier problem, but
they are false positives all the same. The marker noted two of
Haiku's own catches as borderline readings; a stricter marker would score
Haiku 2/6.

## Reading these numbers

Baselines recorded against an older key version are not directly comparable
to a run scored against a newer one. The denominators move: engineer's
bench-01 seeded count goes from 4 (v0.2.0) to 6 (v0.2.1, once D-8 splits into
D-8a/D-8b and D-13 joins it), qa's from 4 to 6, and data-protection's from 1
to 2 (D-3 plus the new D-15). The D-8 question that was borderline above
would, marked against v0.2.1, be an outright catch of D-8b. Treat the table
above as a historical record of the v0.2.0 grill, not a target to reproduce
against the current key.

The full panel of 2026-07-17 (above) is that recording: every persona, every
benchmark, against the v0.2.1 keys. It is the comparison point for persona
edits until the keys next change.
