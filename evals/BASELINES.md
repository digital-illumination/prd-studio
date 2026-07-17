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
