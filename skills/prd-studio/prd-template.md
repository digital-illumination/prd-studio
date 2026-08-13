# PRD: [slice name]

<!-- Lead with the header block: most readers scan first and want the shape
before the detail. The requirement is section 5; the register and the grill
history are working notes, not the requirement. Grill history lives in a
separate linked file, grill-history.md, never inline in this document and
never a <details> block: some renderers (Azure DevOps among them) print
<details> as raw tags rather than a collapsible section, so this template
never depends on it working. -->

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

## TL;DR

The 30-second read for anyone who wants the shape before the detail, in
plain prose (not a bullet restatement of the sections below): what this
slice is, who it is for, and the one or two decisions a reader most needs to
carry into the rest of the document. Two to four sentences.

## How to read this document

One short paragraph naming: which sections an engineer or agent builds from
(typically §1, §5, Dependencies, §7), which section is the honest state of
what remains open (§9, Open Questions) and by whom, which section is
platform-versus-configuration (§6), and where the grill history and
glossary live. Link both:
[glossary.md](./glossary.md) for terms and abbreviations,
[grill-history.md](./grill-history.md) for how the document converged.
Every reader hits this paragraph before the requirement text, so state it
plainly rather than assuming the structure is self-evident.

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

What the system does, told as behaviours, mapped to any domain frameworks or
standards the product must honour. Each behaviour is a fixed-shape unit, in
this order:

1. **Story** (why): a one-line user story in the usual "As a ... I want ...
   so that ..." shape, naming the goal id it serves. **Definition variant**:
   a purely definitional FB (one that states what something is or is not,
   rather than a user-facing behaviour) uses a **Definition:** block instead
   of forcing a fake story onto it. Use the Definition variant only when
   there is genuinely no user action to narrate; do not reach for it to
   avoid writing a story that is merely awkward.
2. **Requirements** (what): a table of numbered EARS statements (see below),
   sub-ids stable within the FB (`FB-1a.3`, not renumbered as the document
   changes). **Split guideline**: an FB whose requirements table exceeds
   roughly ten rows is a candidate for splitting into two FBs; a long table
   is usually a sign the FB is covering two behaviours, not that the
   behaviour itself is unusually large. Split unless the rows are genuinely
   one behaviour's own detail (for example an exhaustive enumerated value
   set).
3. **Acceptance scenario** (verification): one Given/When/Then scenario a
   person can validate before release. Optional for the Definition variant,
   where there is no standalone behaviour to walk through; required
   otherwise.
4. **Context and provenance**, below a line, in italics: background, prior
   precedent, decision attribution ("Decided: [person], [date]"), and
   anything that explains *why* without being part of the requirement
   itself. This is where "(name, date)"-style attribution belongs, never
   inside a requirement statement.

`[OPEN: id]` markers reference §9 register rows: a marker inside an FB's
story, requirements or context points at a tracked open question, not an
oversight. `[CONTESTED: id]` marks a statement written as fact that a named
party actually disputes, same register row shape, with the Status cell
reading `CONTESTED, unresolved` until settled either way; see the "Contested
facts" section of `SKILL.md` for the full convention.

### FB-N: [short name]

**Story:** As a [persona], I want [behaviour], so that [outcome tying back
to a goal id].

**Requirements:**

| Id | Statement |
|----|-----------|
| FB-N.1 | [EARS statement] |
| FB-N.2 | |

**Acceptance scenario:** Given [context], when [action], then [observable
outcome].

*Context and provenance: [background, precedent, decision attribution].*

### FB-M: [definitional short name] (Definition variant)

**Definition:** [what this is, and what it is explicitly not, in plain
prose].

**Requirements:**

| Id | Statement |
|----|-----------|
| FB-M.1 | [EARS statement, where the definition still implies a testable rule] |

*Context and provenance: [background, decision attribution].*

### The five EARS patterns (reference)

Every requirement row is one of these five shapes (Easy Approach to
Requirements Syntax). This is an output schema, not a post-hoc formatting
pass: write directly in one of these patterns rather than drafting prose and
reshaping it afterwards. One thought per row, one "shall" per row, active
voice (the system, or the named actor, does the acting, never a passive
construction that hides who or what acts), no vague terms ("appropriate",
"efficient", "effective", "sufficient", "adequate", "robust",
"user-friendly", "intuitive", "seamless") and no escape clauses ("where
feasible", "where possible", "if practical", "as appropriate", "if
required", "when necessary"). Where the condition genuinely is not yet
known, the row is `[OPEN: id]`, not a hedge.

| Pattern | Shape | Example |
|---------|-------|---------|
| Ubiquitous | The `<system>` shall `<response>`. | The board shall provide filter pills for category and status. |
| Event-driven | When `<trigger>`, the `<system>` shall `<response>`. | When an admin has set a rank for a status pill, the board shall order the pills by that rank. |
| State-driven | While `<state>`, the `<system>` shall `<response>`. | While any sort order is active, the board shall keep flagged items visually prominent. |
| Unwanted behaviour | If `<trigger>`, then the `<system>` shall `<response>`. | If a mandatory field has no source value, then the sync shall block with a named reason. |
| Optional feature | Where `<feature is included>`, the `<system>` shall `<response>`. | Where the template feature is enabled, the board shall default to the template's own groups. |

## 6. Platform vs configuration

For platform or multi-tenant products: which elements are core capability and
which are configuration. Delete this section if the distinction does not apply.

| Element | Layer (platform / configuration) | Native reuse / integration |
|---------|----------------------------------|----------------------------|

## 7. Non-functional requirements, constraints & guardrails

Six requirement classes, checked one at a time. State something for each, or
explicitly say "not applicable, because...": silence on a class is a gap,
not a pass. A register row naming the class also counts, if the class
genuinely is not yet settled.

- **Outcome-level acceptance**: what success looks like once this is live,
  not just that the mechanism works.
- **Scale, load and integration**: freshness tier, latency band, and the
  touchpoints this requirement declares (what else this touches, at what
  rate).
- **Security & privacy**: data sensitivity or classification levels in play
  and what they gate, audit trail (what must be reconstructable), lawful
  basis where personal data is involved, human-in-the-loop points (where an
  accountable person confirms).
- **Cost / run-cost**: a sensitivity declaration (negligible / metered /
  needs-a-ceiling) per requirement or per module; anything metered or
  needs-a-ceiling carries a stated ceiling or an explicit deferral naming
  who owns setting it.
- **Accessibility**: WCAG 2.2 AA, or an explicit statement of why this
  surface departs from it.
- **Retention & audit**: does this requirement create records with
  retention implications, and if so, what must be reconstructable and from
  when (creation, or only once later promoted or exported).

## 8. Assumptions, dependencies, risks

- Assumptions: [...]
- Dependencies (cross-team, cross-product): [...]
- Risks and mitigations: [...]

## 9. Open Questions register

**The convention: a parked-and-named question is honest state; an unnamed
gap is a defect.** A PRD is not expected to have every answer before
sign-off; it is expected to say, for every gap it knows about, who raised
it, what was decided about parking it, and who owns closing it.

| Id | Question | Raised by (persona or person) | Owner | Status |
|----|----------|-------------------------------|-------|--------|
| e.g. OQ-1 | Does this need a run-cost ceiling? | Engineer persona, GRILL THE PRD round 2 | Sponsor | Parked: no ceiling policy exists yet; not blocking this PRD's convergence |

Must be empty or every row explicitly parked before sign-off, with a named
owner and a non-blank status in every row: a row with a question but no
status or no owner is not a parked question, it is an unnamed gap wearing a
row. The engineering and architecture rows close in the architecture
session, not the grill. A `[CONTESTED: id]` row (see `SKILL.md`'s
"Contested facts" section) follows this same shape: Status reads
`CONTESTED, unresolved` until settled, then updates to the resolution; an
owner is always named even while the row is unresolved.

## Agent execution contract

The engineering view, completed in the architecture session: the bridge from
product intent to agent-executable work. Filled in as the open questions close.

- Read first: [repositories, designs, tickets the agent must read]
- Do not change: [critical surfaces: classification, audit, identity, contracts]
- Validation loop: [tests, checks, blast-radius review, the acceptance oracles above]
- Stop conditions: [done when...; stop for a human when...]
- Reporting: [what each task reports back, traceable from goal to merge]

## Validation report

Filled in once there is a build to grade against this PRD. Empty until then.
See the PRD Studio skill's own recommended validation report shape document
for the shape this section follows once filled in.

| Goal | Behaviour ids | Story | Merge / artefact | Evidence | Verdict |
|------|---------------|-------|------------------|----------|---------|

Verdict per goal is one of MET / PARTIAL / UNMET / NO-EVIDENCE. An
unverifiable claim is NO-EVIDENCE; no evidence is never a pass.

## Change log

The working record of how this PRD converged is kept in
[`grill-history.md`](./grill-history.md), a separate linked file, never an
inline section or a `<details>` block. It is not part of the requirement,
which is the sections above.
