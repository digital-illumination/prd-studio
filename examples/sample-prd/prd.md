# PRD: Shift Swap Requests

<!-- A small, deliberately minimal worked example: enough to exercise the
layered EARS format, the Definition variant, a contested-fact marker, and
a clean Open Questions register, so scripts/lint-prd.py has real, lintable
content to check itself against. Not a real product; a fictional
scheduling tool. -->

## Metadata

- ID: PRD-2026-901
- Status: IN GRILL
- Owner (Product): the product owner
- Engineering lead: [name, once the architecture session is scheduled]
- Slice / scope anchor: shift swap requests, single-team scope
- Last updated: 2026-08-13

## TL;DR

Hourly-workforce shift workers can offer a shift for swap and have another
eligible worker accept it, without a manager doing the matching by hand.
This slice covers offer and accept only; manager override and multi-team
swaps are explicitly out of scope for this document.

## How to read this document

Section 1 states the goals, section 5 the requirements a build works from,
section 9 the honest state of what remains open. See
[glossary.md](./glossary.md) for terms and [grill-history.md](./grill-history.md)
for how this document converged.

## Decision summary

- What it is: a shift swap request flow for hourly workers.
- Who it is for: shift workers and their team's rota.
- Why now / why this slice: manager-mediated swaps are the top support
  ticket category this quarter.
- Goals (what good looks like): a worker completes a swap without a
  manager's manual involvement, in under five minutes, with the rota
  staying accurate.
- In scope: offer, accept, rota update.
- Out of scope: manager override, cross-team swaps.
- Status: product view converging; engineering view not yet scheduled.
- Decision needed: confirm the eligibility rule for who may accept an
  offered shift.

## 1. Goals & outcomes  (everything downstream validates against this section)

| Id | Outcome | Measured by | We will know because... |
|----|---------|-------------|--------------------------|
| G-1 | A worker completes a shift swap without a manager's manual involvement | Time from offer to rota update | 90% of swaps complete in under five minutes, measured from the offer's own timestamp |

## 2. Context

- Where this sits in the product concept and why now.
- Existing capabilities touched: the rota view, the notification service.
- Configuration surfaces touched: eligibility rules per team.

## 3. Users & scenarios

| Persona | Scenario that must work (walk-through, not feature list) |
|---------|----------------------------------------------------------|
| Shift worker | Offers a shift, a colleague accepts it, the rota updates and both are notified. |

## 4. Scope / non-scope

**In:** offering a shift, accepting an offered shift, the rota update that
follows.
**Explicitly out (non-goals):** manager override of an accepted swap
(a later slice); cross-team swaps (a later slice, pending the eligibility
rule below).

## 5. Functional behaviour

### FB-1: Offer a shift for swap

**Story:** As a shift worker, I want to offer one of my upcoming shifts for
swap, so that another eligible worker can take it, serving G-1.

**Requirements:**

| Id | Statement |
|----|-----------|
| FB-1.1 | The system shall let a worker mark one of their own upcoming shifts as offered for swap. |
| FB-1.2 | When a worker offers a shift, the system shall notify every worker eligible to accept it. |
| FB-1.3 | If a worker attempts to offer a shift that is not their own, then the system shall block the offer with a named reason. |

**Acceptance scenario:** Given a worker has an upcoming shift, when they
mark it offered, then every eligible worker on that team receives a
notification within one minute.

*Context and provenance: raised in the first grill round as the
top-scoring support ticket category this quarter.*

### FB-2: Accept an offered shift

**Story:** As an eligible shift worker, I want to accept a shift someone
else has offered, so that the rota updates without a manager's manual
involvement, serving G-1.

**Requirements:**

| Id | Statement |
|----|-----------|
| FB-2.1 | When an eligible worker accepts an offered shift, the system shall reassign that shift on the rota. |
| FB-2.2 | When a shift is reassigned by an accepted swap, the system shall notify both workers involved. |
| FB-2.3 | If two workers attempt to accept the same offered shift within the same second, then the system shall accept only the first attempt. |
| FB-2.4 | If a second worker's accept attempt is rejected due to a simultaneous accept, then the system shall notify that worker the shift is no longer available. |

**Acceptance scenario:** Given an offered shift with two eligible workers
both viewing it, when both attempt to accept within the same second, then
exactly one acceptance succeeds and the other worker is told the shift is
gone.

*Context and provenance: the simultaneous-accept rule was raised by the QA
persona during the first grill round and folded in as FB-2.3.*

### FB-3: Eligibility (Definition variant)

**Definition:** "Eligible" means a worker on the same team, qualified for
the shift's role, with no overlapping shift already on the rota. It does
not mean available in the sense of not currently working; a worker on
leave is still eligible in principle, and the accept action itself is what
checks the overlap. The prior manual process [CONTESTED: OQ-2] treated a
worker on leave as ineligible outright; this document treats that as an
open dispute rather than settled precedent.

**Requirements:**

| Id | Statement |
|----|-----------|
| FB-3.1 | The system shall evaluate eligibility at the moment a worker attempts to accept an offered shift, not at the moment the shift was offered. |

*Context and provenance: [OPEN: OQ-1] whether cross-team eligibility is
ever appropriate is explicitly parked, not decided, for this slice.*

## 6. Platform vs configuration

| Element | Layer (platform / configuration) | Native reuse / integration |
|---------|----------------------------------|----------------------------|
| Eligibility rule | Configuration | Per-team rota settings, existing service |
| Notification delivery | Platform | Existing notification service |

## 7. Non-functional requirements, constraints & guardrails

- **Outcome-level acceptance**: G-1's own measure (90% of swaps complete
  in under five minutes) is the outcome-level acceptance condition; no
  separate NFR statement needed.
- **Scale, load and integration**: near-live; a notification is expected
  within one minute of an offer or an accept, touching the existing
  notification service at ordinary team-size volumes.
- **Security & privacy**: no new personal data category is introduced;
  worker names and shift times already flow through the existing rota
  service.
- **Cost / run-cost**: negligible; no metered third-party dependency.
- **Accessibility**: WCAG 2.2 AA for the offer and accept surfaces; no
  departure stated.
- **Retention & audit**: a swap's offer and accept events are retained on
  the same schedule as any other rota change, no new retention need.

## 8. Assumptions, dependencies, risks

- Assumptions: workers already have an account and see their own rota.
- Dependencies (cross-team, cross-product): the existing notification
  service.
- Risks and mitigations: two simultaneous accepts on one shift; mitigated
  by FB-2.3.

## 9. Open Questions register

| Id | Question | Raised by (persona or person) | Owner | Status |
|----|----------|-------------------------------|-------|--------|
| OQ-1 | Should cross-team swaps ever be eligible in a later slice? | Product owner, DRAFT session | Product owner | Parked: explicitly out of scope for this slice, revisit if a later slice proposes cross-team rotas |
| OQ-2 | Was a worker on leave ever treated as eligible under the prior manual process? | QA persona, GRILL THE PRD round 1 | Product owner | CONTESTED, unresolved |

## Agent execution contract

- Read first: the rota service's own read model; the notification
  service's own send contract.
- Do not change: the rota's own source-of-truth write path.
- Validation loop: the acceptance scenarios above, run against a staging
  rota with two simulated concurrent accepts.
- Stop conditions: done when FB-1 through FB-3 pass their acceptance
  scenarios; stop for a human when a rota write conflict is not resolved
  by FB-2.3's own rule.
- Reporting: each story reports its behaviour id, the merge it landed in,
  and the acceptance scenario's own evidence.

## Validation report

Filled in once there is a build to grade against this PRD. Empty until
then. See the PRD Studio skill's own recommended validation report shape
document for the shape this section follows once filled in.

| Goal | Behaviour ids | Story | Merge / artefact | Evidence | Verdict |
|------|---------------|-------|------------------|----------|---------|

## Change log

The working record of how this PRD converged is kept in
[grill-history.md](./grill-history.md), a separate linked file.
