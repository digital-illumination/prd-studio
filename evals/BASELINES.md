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

## Reading these numbers

Baselines recorded against an older key version are not directly comparable
to a run scored against a newer one. The denominators move: engineer's
bench-01 seeded count goes from 4 (v0.2.0) to 6 (v0.2.1, once D-8 splits into
D-8a/D-8b and D-13 joins it), qa's from 4 to 6, and data-protection's from 1
to 2 (D-3 plus the new D-15). The D-8 question that was borderline above
would, marked against v0.2.1, be an outright catch of D-8b. Treat the table
above as a historical record of the v0.2.0 grill, not a target to reproduce
against the current key.

A fresh baseline run against the v0.2.1 key (D-8a/D-8b and D-13 to D-15
included) is the next recording due, for engineer, qa and data-protection at
minimum, and ideally for the remaining seven personas that have not yet been
baselined on this benchmark.
