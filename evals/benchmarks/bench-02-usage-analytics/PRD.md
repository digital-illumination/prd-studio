# PRD: Beacon feature adoption dashboards and usage reports

<!-- Benchmark PRD for the PRD Studio eval suite. Beacon is a wholly
fictional product. This document contains deliberately seeded defects; see
ANSWER-KEY.md. Do not use as a real PRD example. -->

## Metadata

- ID: PRD-2026-031
- Status: IN GRILL
- Owner (Product): Head of Product, Beacon
- Engineering lead: Principal engineer, ingestion team
- Slice / scope anchor: feature adoption dashboards and customer-facing usage reports, on the existing Beacon event pipeline
- Last updated: 2026-07-06

## Decision summary

The 30-second read for anyone who wants the shape before the detail.

- What it is: the analysis and reporting slice of Beacon, an in-product usage-analytics platform that B2B software companies embed in their own applications. This slice turns captured events into feature adoption dashboards for product teams and white-labelled usage reports their customer-facing teams can share.
- Who it is for: product managers at companies that embed Beacon, and the customer success teams at those same companies who use usage evidence in renewal conversations.
- Why now / why this slice: event capture shipped last quarter; customers can collect but not yet answer questions. Adoption dashboards are the most requested capability on the public roadmap board.
- Goals (what good looks like): product teams answer adoption questions without raising data-team tickets; customers understand feature adoption; usage evidence turns up in renewal conversations.
- In scope: adoption dashboards, segments, saved and shared reports, white-labelled customer-facing usage reports, deletion requests.
- Out of scope: session replay, A/B testing, warehouse sync (see section 4).
- Status: product view converging; two open questions parked.
- Decision needed: sign-off on the dashboard scope and the usage-report model. Note the standing platform commitment: workspace event data is processed and stored in the customer's chosen cloud region, which several enterprise prospects have made a condition of purchase.

## 1. Goals & outcomes  (everything downstream validates against this section)

| Id | Outcome | Measured by | We will know because... |
|----|---------|-------------|--------------------------|
| G-1 | Product teams answer adoption questions themselves | Data-team tickets tagged "usage question" in pilot workspaces | Tagged tickets fall by 80% within one quarter of a workspace enabling dashboards, against that workspace's prior-quarter baseline |
| G-2 | Customers understand feature adoption | Adoption-report views per workspace per week | Teams are viewing adoption reports weekly |
| G-3 | Usage evidence supports renewals | Share of renewal opportunities in pilot customers' CRMs with a Beacon usage report attached | At least 60% of renewal conversations in pilot accounts include an attached usage report within two quarters |

Rules: every goal measurable; no goal that restates a feature.

## 2. Context

- Beacon today: a lightweight capture SDK (web and mobile) sending named events with typed properties to the Beacon pipeline, a workspace model with per-tenant isolation, and an event explorer for raw queries. This slice adds the opinionated analysis layer on top.
- Privacy posture, stated publicly in our documentation: Beacon performs a coarse geo lookup (country and region) on each event at ingestion and then discards the source IP address; raw IP addresses are never stored. End users are identified only by the pseudonymous id the host application supplies.
- The buying conversation has shifted: product teams bring us in, but customer success teams increasingly drive the renewal-evidence use case, and several prospects have asked whether that use is included or paid.
- Existing capabilities touched: capture SDK, event pipeline, workspace and membership model, event explorer.
- Configuration surfaces touched: workspace settings (region, event taxonomy), plan settings.

## 3. Users & scenarios

| Persona | Scenario that must work (walk-through, not feature list) |
|---------|----------------------------------------------------------|
| Product manager | Dana ships a redesigned onboarding flow, opens the adoption dashboard two weeks later, compares daily active users per feature before and after the release across the "new sign-ups" segment, and pastes the answer into the team's release review without touching SQL or raising a ticket. |
| Product manager (sharing) | Dana saves the comparison as a report and shares it with the engineering lead, who opens it and sees the same picture Dana saw. |
| Customer success manager | Ravi prepares a renewal call by generating the white-labelled usage report for the account, showing the customer's seat activity and top features over the last two quarters, and walks the customer through it on the call. |
| Workspace administrator | Priya receives a data-deletion request from her company's support desk, submits the end user's pseudonymous id in Beacon's deletion screen, and confirms completion from the deletion log. |

## 4. Scope / non-scope

**In:** adoption dashboards (per-feature usage over time, release comparison), segments over user attributes, saved reports with workspace sharing, white-labelled customer-facing usage reports, end-user deletion requests.

**Explicitly out (non-goals):**

- Session replay. Deliberately excluded from the product, not just this slice: replay collects far more than Beacon's event model needs and would undermine the stated privacy posture. Customers who ask are pointed at the event explorer; there is no plan to add replay.
- A/B testing and experimentation. Beacon measures adoption; it does not assign treatments. Comparison of before/after a release ships in this slice; controlled experiments are a different product and out of scope indefinitely.
- Warehouse sync. Bulk export to customer warehouses stays served by the existing nightly CSV export API, which is unchanged by this slice; a native sync is on the public roadmap as a separate slice.

## 5. Functional behaviour

- **FB-1 Capture and buffering.** The SDK captures named events with typed properties. On mobile, events are buffered while offline and replayed on reconnection, with a 72-hour replay window; events older than the window are dropped and counted in an SDK diagnostics counter.
- **FB-2 Adoption dashboard.** The dashboard shows daily active users per feature over a selectable date range, with feature defined by the workspace's event taxonomy mapping. Acceptance check: for a fixture workspace with a known event stream, the per-feature daily counts on the dashboard match the fixture's expected counts exactly.
- **FB-3 Event schema versioning.** A workspace may evolve its event taxonomy; every event carries the schema version it was captured under, and dashboards resolve historical events through the mapping in force at capture time. Renaming a feature does not restate history. Acceptance check: rename a feature in the fixture workspace's taxonomy; historical dashboard counts for the affected feature are unchanged, and the rename appears only from its effective date.
- **FB-4 Daily rollups.** Dashboard counts are computed from daily rollups generated at 02:00 workspace-local time covering the previous day. The event explorer continues to query raw events directly.
- **FB-5 Segments and sharing.** A product manager defines segments over user attributes supplied by the host application, saves a dashboard view as a report, and shares it with workspace members. A shared report always shows the live data for its saved definition; it is not a snapshot. Acceptance check: two members opening the same shared report on the same day see identical numbers.
- **FB-6 Customer-facing usage reports.** A customer success manager generates a white-labelled usage report for a named account: seat activity, top features, and usage trend over a selected period, carrying the workspace's own branding. White-labelling is available on eligible plans. Acceptance check: a generated report contains no Beacon branding when white-labelling is enabled, and renders the three sections for a fixture account.
- **FB-7 Geo breakdowns.** Dashboards can break any view down by country and region. When a workspace changes its geo-resolution settings (for example from country-level to region-level), historical breakdowns are recomputed from the stored source IPs so the whole date range reflects the new setting.
- **FB-8 Deletion requests.** A workspace administrator submits a deletion request for an end user's pseudonymous id; Beacon deletes that user's events within 30 days and records the request and completion in a deletion log visible to workspace administrators.

## 6. Platform vs configuration

| Element | Layer (platform / configuration) | Native reuse / integration |
|---------|----------------------------------|----------------------------|
| Event taxonomy and feature mapping | Configuration (per workspace) | Existing taxonomy editor |
| Adoption dashboard layouts | Platform (fixed layouts at launch) | New in this slice |
| Segments | Configuration (per workspace) | User attributes from host app |
| Data region | Configuration (chosen at workspace creation) | Platform region commitment (Decision summary) |
| White-label theming | Configuration, on eligible plans | Workspace branding settings |
| Rollup schedule | Platform (fixed, 02:00 workspace-local) | New in this slice |

## 7. Non-functional requirements, constraints & guardrails

- SDK footprint: the web SDK stays under 15 KB gzipped, initialises in under 5 milliseconds at the 95th percentile on our published mid-range reference device, and the offline buffer is capped at 512 events; breaching any of these blocks release.
- Accuracy: the analytics must be accurate enough to support product decisions, and the dashboards should feel trustworthy to product teams.
- Availability: event ingestion meets a 99.9% monthly availability target; the dashboard layer meets 99.5%.
- Retention: raw events are retained for 13 months; daily rollups are retained for 36 months. Both are fixed platform-wide at launch.
- Tenant isolation: every query path is scoped to a single workspace; cross-workspace reads are structurally impossible in the query layer.
- Access: workspace membership is managed by the customer's administrators; sign-in is through the existing Beacon identity service with SSO on business plans.
- Human-in-the-loop: deletion requests always require an explicit administrator submission; Beacon never deletes on an automated trigger from the host application.

## 8. Assumptions, dependencies, risks

- Assumptions: host applications supply a stable pseudonymous user id and can take quarterly SDK updates; workspace administrators handle their own end-user deletion intake; pilot customers will grant CRM access for measuring G-3.
- Dependencies: the event pipeline team owns rollup infrastructure; all event processing runs in Beacon's single US processing cluster at launch, with the EU processing cluster on the roadmap for next year; the taxonomy editor (shipped) is reused unchanged.
- Risks and mitigations: dashboard adoption stalls if taxonomies are messy (mitigation: taxonomy health check ships in the onboarding flow); usage reports overstate engagement if host apps over-fire events (mitigation: the report footer states the workspace's event definitions).

## 9. Open Questions register

| Id | Question | Owner | Status (open / answered / parked-with-owner) |
|----|----------|-------|----------------------------------------------|
| OQ-1 | Should saved reports support scheduled email delivery, or is in-app sharing enough at launch? | Head of Product | parked-with-owner (launch answer: in-app only; revisit with pilot feedback) |
| OQ-2 | Do usage reports need a PDF export for customers who will not click a link? | Customer success lead, pilot | parked-with-owner (launch answer: web view only) |

Must be empty or every row explicitly parked before sign-off. The engineering and architecture rows close in the architecture session, not the grill.

## Agent execution contract

The engineering view, completed in the architecture session: the bridge from product intent to agent-executable work.

- Read first: the event pipeline service contract, the taxonomy editor design notes, the workspace model documentation.
- Do not change: the capture SDK public API, the tenant-isolation query layer, the deletion log format.
- Validation loop: acceptance checks under section 5; rollup counts validated against the fixture workspace; SDK budget gates in CI per section 7.
- Stop conditions: [OPEN: to be completed in the architecture session]
- Reporting: [OPEN: to be completed in the architecture session]

## Change log (grill history)

- 2026-06-19, round 1 (GRILL ME): G-1 remeasured against per-workspace baselines instead of a global count; session replay moved from "later" to a permanent non-goal with the privacy rationale recorded.
- 2026-07-06, round 2 (GRILL THE PRD): FB-3 schema versioning added after the engineer persona pressed on taxonomy renames; SDK budget numbers hardened into release-blocking gates.
