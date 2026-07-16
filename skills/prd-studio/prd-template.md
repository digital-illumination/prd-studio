# PRD: [slice name]

<!-- Lead with the Metadata and Decision summary: most readers scan first and
want the shape before the detail. Keep the grill log in the Change log at the
end. The requirement is the sections in between; the register and the log are
working notes, not the requirement. -->

## Metadata

- ID: PRD-YYYY-NNN
- Status: DRAFT / IN GRILL / CONVERGED (product) / SIGNED (product owner, date)
- Owner (Product): [product owner]
- Engineering lead: [name, once the architecture session is scheduled]
- Slice / scope anchor: [which part of the product concept this covers]
- Last updated: [date]
- Once Status is SIGNED, this PRD is locked: no further edits to its text.
  Changes happen only as a new revision (new Change log entry, the change
  stated plainly), never as a silent edit to signed content.

## Decision summary

The 30-second read for anyone who wants the shape before the detail.

- What it is:
- Who it is for:
- Why now / why this slice:
- Goals (what good looks like): [3 to 5, the change in the user's world]
- In scope:
- Out of scope:
- Status: [product view converged? engineering view still to follow?]
- Decision needed: [what is being asked of the reader]

## 1. Goals & outcomes  (everything downstream validates against this section)

| Id | Outcome | Measured by | We will know because... |
|----|---------|-------------|--------------------------|
| G-1 | [the change in the world, not the feature] | [metric / observable behaviour] | [the evidence at the end] |
| G-2 | | | |

Rules: every goal measurable; no goal that restates a feature ("has a
dashboard" is not a goal; "a duty manager reads the day's picture in under a
minute" is).

## 2. Context

- Where this sits in the product concept and why now.
- Existing capabilities touched: [...]
- Configuration surfaces touched: [...]

## 3. Users & scenarios

| Persona | Scenario that must work (walk-through, not feature list) |
|---------|----------------------------------------------------------|
| [primary persona] | [start, action, outcome] |

## 4. Scope / non-scope

**In:** [...]
**Explicitly out (non-goals):** [...] This is the grill's favourite hunting
ground; be generous here.

## 5. Functional behaviour

What it does, told as behaviours, mapped to any domain frameworks or standards
the product must honour. Each behaviour carries a stable id (FB-1, FB-2...) so
epics and stories can trace to it, an acceptance check a person can validate
before release, and a blast-radius tag so review routing matches the risk.

| Id | Behaviour (one observable thing) | Given / When / Then | Blast radius |
|----|-----------------------------------|----------------------|--------------|
| FB-1 | | | |

Blast radius: Minimal / Contained / Broad / Critical.

## 6. Platform vs configuration

For platform or multi-tenant products: which elements are core capability and
which are configuration. Delete this section if the distinction does not apply.

| Element | Layer (platform / configuration) | Native reuse / integration |
|---------|----------------------------------|----------------------------|

## 7. Non-functional requirements, constraints & guardrails

- Data sensitivity or classification levels in play and what they gate.
- Security, audit (what must be reconstructable), privacy, accessibility,
  performance, reliability, data retention.
- Human-in-the-loop points (where an accountable person confirms).

## 8. Assumptions, dependencies, risks

- Assumptions: [...]
- Dependencies (cross-team, cross-product): [...]
- Risks and mitigations: [...]

## 9. Open Questions register

| Id | Question | Owner | Status (open / answered / parked-with-owner) |
|----|----------|-------|----------------------------------------------|

Must be empty or every row explicitly parked before sign-off. The engineering
and architecture rows close in the architecture session, not the grill.

## Agent execution contract

The engineering view, completed in the architecture session: the bridge from
product intent to agent-executable work. Filled in as the open questions close.

- Read first: [repositories, designs, tickets the agent must read]
- Do not change: [critical surfaces: classification, audit, identity, contracts]
- Validation loop: [tests, checks, blast-radius review, the acceptance oracles above]
- Stop conditions: [done when...; stop for a human when...]
- Reporting: [what each task reports back, traceable from goal to merge]

## Validation report

Filled in by `/validate-build` once there is a build to grade against this
PRD. Empty until then.

| Goal | Behaviour ids | Story | Merge / artefact | Evidence | Verdict |
|------|---------------|-------|------------------|----------|---------|

Verdict per goal is one of MET / PARTIAL / UNMET / NO-EVIDENCE. An
unverifiable claim is NO-EVIDENCE; no evidence is never a pass.

## Change log (grill history)

The working record of how this PRD converged. Not part of the requirement.

- [date, round, what changed]
