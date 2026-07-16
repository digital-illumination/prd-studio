# PRD: Shiftly rota publishing and shift swaps

<!-- Benchmark PRD for the PRD Studio eval suite. Shiftly is a wholly
fictional product. This document contains deliberately seeded defects; see
ANSWER-KEY.md. Do not use as a real PRD example. -->

## Metadata

- ID: PRD-2026-014
- Status: IN GRILL
- Owner (Product): Head of Product, Shiftly
- Engineering lead: [OPEN: to be named once the architecture session is scheduled]
- Slice / scope anchor: rota publishing, open-shift offers and shift swaps within the Shiftly workforce platform
- Last updated: 2026-07-02

## Decision summary

The 30-second read for anyone who wants the shape before the detail.

- What it is: the rota lifecycle slice of Shiftly, a scheduling product for hourly, largely deskless workforces (hospitality, retail, leisure). Managers build and publish rotas; team members see their shifts, pick up open shifts and swap with colleagues.
- Who it is for: duty managers who build rotas, team members who work them, and operations leads who watch coverage across sites.
- Why now / why this slice: rota building and the churn around swaps is the single largest source of manager admin in our discovery interviews, and the reason trial customers cite for not converting.
- Goals (what good looks like): fewer unfilled shifts, faster rota building, self-service scheduling adopted by teams, swaps resolved without manager rework.
- In scope: rota builder, publish flow, open-shift offers, swaps, notifications.
- Out of scope: payroll export, demand forecasting, leave management (see section 4).
- Status: product view converging; engineering view to follow in the architecture session.
- Decision needed: sign-off on the publish commitment and the swap model so build can be sequenced. We commit that rotas are published at least 14 days before the shift week begins; this is the headline promise in our sales conversations and it anchors everything downstream.

## 1. Goals & outcomes  (everything downstream validates against this section)

| Id | Outcome | Measured by | We will know because... |
|----|---------|-------------|--------------------------|
| G-1 | Fewer shifts go unfilled | Percentage of published shifts still unassigned 24 hours before start | It falls from the current 8% to 4% or lower within two quarters of launch, measured across all active sites |
| G-2 | Managers spend less time building rotas | Median elapsed time from opening the rota builder to publishing, instrumented in-app | It falls from roughly 3 hours (discovery baseline) to under 1 hour within one quarter |
| G-3 | Teams adopt self-service scheduling | Weekly active use of the self-service scheduling features | Teams are using self-service scheduling each week |
| G-4 | Swaps stop generating manager rework | Share of swap requests resolved without any manager edit to the rota | At least 70% of swaps complete without a manager touching the rota, within one quarter |

Rules: every goal measurable; no goal that restates a feature.

## 2. Context

- Shiftly already provides workforce profiles, site and team structures, a clock-in/clock-out flow and timesheet CSV export. This slice adds the rota lifecycle on top of those capabilities.
- The workforce is hourly and largely deskless: kitchen staff, floor staff, lifeguards, warehouse pickers. Most interaction happens on personal mobile devices, in short bursts, often between tasks.
- Swap policy varies widely. Every customer we interviewed runs a different swap-approval policy: some require manager sign-off on every swap, some allow like-for-like swaps to complete automatically, one large leisure chain requires two approvals for lifeguard roles. Whatever we build has to live with that variety.
- Clock-in confirmation uses a momentary location check at the point of clock-in. Shiftly's stated posture is that location is checked, not tracked: we verify presence at the moment it matters and we do not follow people around.
- Existing capabilities touched: workforce profiles, sites and teams, notifications service, clock-in flow.
- Configuration surfaces touched: site settings, notification preferences.

## 3. Users & scenarios

| Persona | Scenario that must work (walk-through, not feature list) |
|---------|----------------------------------------------------------|
| Duty manager | Priya opens the rota builder on Monday for the week after next, starts from last week's pattern, adjusts for two holiday absences, resolves the coverage warnings the builder raises, and publishes. Assigned staff are notified. Total elapsed time: under an hour. |
| Team member | Alex checks the Shiftly app each Sunday evening and always sees an up-to-date picture of the week ahead. When a shift Alex cannot work appears, Alex proposes a swap with a colleague from the same team and the swap completes under the workspace's approval policy. |
| Team member (open shifts) | Sam has opted in to extra hours. When an open shift appears at Sam's site, Sam is offered it in the app, accepts, and the shift shows in Sam's schedule immediately. |
| Operations lead | Morgan reviews coverage across five sites on Friday, spots a site trending toward unfilled weekend shifts, and nudges the duty manager, all from the coverage view. |

## 4. Scope / non-scope

**In:** rota builder (patterns, absence awareness, coverage warnings), publish flow with staff notification, open-shift offers to opted-in staff, shift swaps under a workspace approval policy, notifications for publishes, offers and swap outcomes.

**Explicitly out (non-goals):**

- Payroll export. Timesheet CSV export already exists in the platform and payroll integration is a separate, already-scoped slice (PRD-2026-009). Customers who need payroll data today use the existing CSV export; nothing in this slice changes or removes it.
- Demand forecasting. Coverage warnings in this slice are rule-based (minimum headcount per role per period, set in site settings). Forecast-driven suggestions are a future slice and nothing here should preclude them.
- Leave management. Absence data is read from the existing absence calendar; requesting and approving leave stays where it is. Parked with the platform team as an explicit dependency, not a gap.

## 5. Functional behaviour

A shift is defined by its date, a start time and an end time, an assigned role, and either an assigned person or open status. A rota is the set of shifts for one team for one shift week.

- **FB-1 Rota builder.** A duty manager builds a rota for a named shift week, starting blank or from a previous week's pattern. The builder shows absence data from the absence calendar inline and raises a coverage warning wherever a period falls below the site's configured minimum headcount per role. Acceptance check: build a rota against a site with one configured minimum; removing a shift below that minimum raises the warning within the builder session, and the warning names the role and period.
- **FB-2 Publish.** Publishing a rota notifies every assigned team member and makes the rota visible to the team. Publish deadline: a rota must be published no later than 7 days before its shift week begins; the builder blocks publishing after that point and directs the manager to their operations lead. Managers may edit a published rota at any time; edits update the team's view immediately.
- **FB-3 Open shifts.** A shift left open at publish, or vacated afterwards, is offered fairly among eligible team members who have opted in to extra hours. The first to accept is assigned and the offer closes for everyone else. Acceptance check: open shifts are offered to eligible staff and fill without manager intervention.
- **FB-4 Swaps.** A team member proposes a swap of one of their shifts, either with a named colleague or to the team. The swap takes effect once it completes under the workspace's approval policy, and both rotas update. A swap that would create a conflict for either party is blocked before it is proposed. Acceptance check: propose a valid swap and an invalid one (overlap for the counterparty); the valid swap completes and both schedules update; the invalid one is blocked at proposal with the conflict named.
- **FB-5 Conflict prevention.** The system blocks assigning a person to two overlapping shifts, and blocks any assignment that would leave less than 11 hours' rest between one shift's end and the next shift's start for the same person. Acceptance check: attempting either assignment, in the builder or via swap or open-shift acceptance, produces a named blocking error that lists the conflicting shift; no such assignment can be saved by any path.
- **FB-6 Notifications.** Team members are notified when a rota they are on is published, when they receive an open-shift offer, and when a swap they are party to completes or is declined. Acceptance check: notifications arrive without undue delay and feel timely to staff.

## 6. Platform vs configuration

| Element | Layer (platform / configuration) | Native reuse / integration |
|---------|----------------------------------|----------------------------|
| Rota patterns and templates | Configuration (per team) | Builds on existing team structures |
| Minimum headcount rules | Configuration (per site, per role) | Site settings surface |
| Notification channels (push, SMS, email) | Configuration (per workspace) | Existing notifications service |
| Swap approval workflow | Platform (fixed: every swap requires the duty manager's approval before it completes) | New capability in this slice |
| Open-shift marketplace | Platform capability, Premium tier | New capability in this slice |
| Rest-period rule (11 hours) | Platform (fixed) | New capability in this slice |

## 7. Non-functional requirements, constraints & guardrails

- Performance: the rota view (manager builder and team member schedule) loads in under 2 seconds at the 95th percentile for sites of up to 200 staff, measured from our standard mid-range Android reference device on 4G.
- Data held by this slice: shift assignments, swap and offer history, notification delivery records. Rota and assignment data is processed as workforce management under the customer's employment relationship with their staff; the customer is the data controller and Shiftly the processor, per the existing platform data processing agreement.
- Clock-in location: the coordinates captured at each clock-in are retained for 24 months to support attendance disputes, then deleted.
- Security: all access is through the existing Shiftly identity service (SSO for managers, device-bound sign-in for team members). Data in transit and at rest is encrypted under the platform's existing standards.
- Human-in-the-loop: publishing is always an explicit manager action; the system never publishes a rota on its own.
- Interface: the team member experience must be clean and intuitive on small screens, given the short-burst usage pattern described in section 2.
- Reliability: the schedule view degrades gracefully to the last-synced rota when offline; a staleness banner shows the last sync time.

## 8. Assumptions, dependencies, risks

- Assumptions: team members have personal smartphones and keep the Shiftly app installed; the existing absence calendar is authoritative for planned absence; sites keep their minimum headcount rules current.
- Dependencies: the platform notifications service (push, SMS, email); the Shiftly identity service; the absence calendar read API (platform team).
- Risks and mitigations: adoption risk if managers keep building rotas in spreadsheets alongside Shiftly (mitigation: the pattern-based builder must beat a spreadsheet on speed from the first week, tracked against G-2); notification fatigue if offers are broadcast too widely (mitigation: offer targeting is reviewed in the first post-launch retro).

## 9. Open Questions register

| Id | Question | Owner | Status (open / answered / parked-with-owner) |
|----|----------|-------|----------------------------------------------|
| OQ-1 | Can staff who work across two sites appear on both sites' rotas in the same week, and if so which site's minimum headcount rules see them? | Head of Product | parked-with-owner (multi-site staffing is a later slice; single-site assignment is the launch rule) |
| OQ-2 | Should operations leads be able to publish on a duty manager's behalf? | Operations lead, pilot customer | parked-with-owner (launch answer is no; revisit after pilot feedback) |

Must be empty or every row explicitly parked before sign-off. The engineering and architecture rows close in the architecture session, not the grill.

## Agent execution contract

The engineering view, completed in the architecture session: the bridge from product intent to agent-executable work.

- Read first: [OPEN: repository and design references, to be listed in the architecture session]
- Do not change: the clock-in flow, the timesheet CSV export contract, the identity service integration.
- Validation loop: acceptance checks under section 5; coverage-warning rules validated against site settings fixtures.
- Stop conditions: [OPEN: to be completed in the architecture session]
- Reporting: [OPEN: to be completed in the architecture session]

## Change log (grill history)

- 2026-06-24, round 1 (GRILL ME): sharpened G-1 and G-2 baselines from discovery data; payroll export moved to explicit non-scope with the CSV workaround named.
- 2026-07-02, round 2 (GRILL THE PRD): added FB-5 conflict prevention after the QA persona pressed on double-booking; added the offline staleness banner under section 7.
