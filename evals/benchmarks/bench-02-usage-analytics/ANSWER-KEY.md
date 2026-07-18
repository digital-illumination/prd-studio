# Answer key: bench-02-usage-analytics (Beacon)

Twenty-one seeded defects (twelve original, nine banked from live-grill curation). Scoring rules are in `../../README.md`. "Location"
gives the section and a quote fragment sufficient to find the seed. Where two
personas are listed, either catching it counts for that persona's rate.

## Seeded defects

### D-1: geo recompute contradicts the never-store-IPs posture (subtle)

- **Location:** Section 2: "then discards the source IP address; raw IP addresses are never stored" versus Section 5, FB-7: "historical breakdowns are recomputed from the stored source IPs"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** data-protection, regulator
- **Catching question looks like:** "FB-7 recomputes historical geo from 'the stored source IPs', but section 2, and our public documentation, says raw IPs are never stored. One of these is false. Either we keep IPs (and the privacy posture, the docs and probably the records of processing are wrong) or FB-7 is unbuildable as written. Which is it?"

### D-2: region commitment contradicts the single US cluster (subtle)

- **Location:** Decision summary: "workspace event data is processed and stored in the customer's chosen cloud region" and Section 6: "Data region | Configuration (chosen at workspace creation)" versus Section 8: "all event processing runs in Beacon's single US processing cluster at launch"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** platform-architect, regulator
- **Catching question looks like:** "The Decision summary sells processing and storage in the customer's chosen region, and section 6 lists region as workspace configuration, but section 8 says all processing runs in a single US cluster at launch. So an EU workspace's events are processed in the US. Does the commitment mean storage only, and does anyone buying on the region promise know that?"

### D-3: circular goal measurement (subtle)

- **Location:** Section 1, G-2: "Adoption-report views per workspace per week" / "Teams are viewing adoption reports weekly"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "G-2's evidence is its own measurement restated: customers understand adoption because they view adoption reports. Viewing is not understanding. What downstream behaviour (decisions citing the reports, ticket deflection beyond G-1, follow-through on flagged features) would show understanding, and at what threshold?"

### D-4: accuracy requirement is untestable

- **Location:** Section 7: "the analytics must be accurate enough to support product decisions, and the dashboards should feel trustworthy"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "'Accurate enough' and 'feel trustworthy' cannot be verified. What is the accuracy budget: tolerated event loss rate end to end, maximum divergence between dashboard counts and raw event-explorer counts, and how late data is treated in that comparison?"

### D-5: no packaging or commercial basis for the new capabilities

- **Location:** Section 2: "several prospects have asked whether that use is included or paid", which nothing in the document answers; no plan boundaries or event-volume limits anywhere despite ingestion costs scaling with usage
- **Gap class:** MISSING
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "Section 2 records prospects asking whether the renewal-evidence use is included or paid, and the PRD never answers it. What plan gates dashboards and usage reports, what is the billable unit as event volume grows, and what happens at a volume cap? Without this, G-3 drives cost with no revenue line."

### D-6: no operational behaviour behind the availability numbers

- **Location:** Section 7 gives SLO targets ("event ingestion meets a 99.9% monthly availability target; the dashboard layer meets 99.5%") but sections 5 and 7 define no behaviour for ingestion backlog or outage, no backfill story, no alerting when a workspace's events stop flowing, and no support tooling for a chart-went-flat report
- **Gap class:** MISSING
- **Expected persona(s):** operations-support, engineer
- **Catching question looks like:** "When ingestion backs up or a customer's SDK deploy silently breaks capture, what happens? Is anyone alerted that a workspace's events stopped, are gaps backfilled or permanently missing from rollups, and what can support show a customer who asks why Tuesday is flat? An SLO number is not an operational story."

### D-7: ingestion authenticity and report-access audit are undefined

- **Location:** Section 7 covers tenant isolation and workspace sign-in but says nothing about how the client-side SDK authenticates to ingestion; capture keys ship inside customers' public web apps, and nothing covers key rotation, spoofed or replayed events, or an audit record of who generated or viewed a customer-facing usage report
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance
- **Catching question looks like:** "The SDK's capture credential is public by construction, it ships in the customer's web app. What stops a competitor or a griefer firing fabricated events into a workspace and poisoning the renewal evidence in FB-6? How are capture keys rotated, and where is the audit trail of who generated which usage report for which account?"

### D-8: 'daily active users per feature' is undefined

- **Location:** Section 5, FB-2: "daily active users per feature over a selectable date range"; neither "active" nor the day boundary is defined anywhere
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** engineer
- **Catching question looks like:** "What makes a user active for a feature: any event mapped to it, or a qualifying subset? And whose day: the workspace's timezone (as the 02:00 rollup implies), UTC, or the end user's? A user firing events at 23:50 and 00:10 is one active day or two depending on the answer, and I cannot compute FB-2 without it."

### D-9: 'eligible plans' is never defined

- **Location:** Section 5, FB-6: "White-labelling is available on eligible plans" and Section 6: "Configuration, on eligible plans"; no plan is named anywhere in the document
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "Which plans are 'eligible' for white-labelling, and is the usage-report capability itself gated with it? Section 2 says customer success teams increasingly drive the buying conversation; whether their headline capability is an upsell or included changes the packaging story and the G-3 pilot design."

### D-10: deletion requests do not touch rollups

- **Location:** Section 5, FB-8: "deletes that user's events within 30 days" versus Section 7: "daily rollups are retained for 36 months"; nothing says whether rollups embedding the deleted user's activity are restated
- **Gap class:** EDGE-CASE
- **Expected persona(s):** data-protection, qa
- **Catching question looks like:** "FB-8 deletes the user's events, but the daily rollups computed from them live for 36 months. Do historical dashboard counts change after a deletion, or does the deleted user persist inside aggregates? Either answer needs stating: one affects FB-2's exact-count acceptance check, the other is a data-protection position that needs defending."

### D-11: no accessibility requirement for a chart-first product

- **Location:** Section 7 has no accessibility statement; the dashboards and usage reports in sections 3 and 5 are visual, chart-first surfaces, including reports shown to the customers' own customers
- **Gap class:** MISSING
- **Expected persona(s):** accessibility
- **Catching question looks like:** "Nothing in the document sets an accessibility bar. Can a screen-reader user read the adoption dashboard, is any series distinguishable without colour, and do the white-labelled reports, which our customers put in front of their customers, meet a named standard such as WCAG 2.2 AA?"

### D-12: late-arriving events versus already-computed rollups

- **Location:** Section 5, FB-1: offline events replayed up to 72 hours late versus FB-4: rollups computed at 02:00 covering the previous day; no restatement policy anywhere, while FB-2's acceptance demands exact counts and FB-5 promises two viewers identical numbers
- **Gap class:** EDGE-CASE
- **Expected persona(s):** engineer, operations-support
- **Catching question looks like:** "A mobile event can legitimately arrive 72 hours after its day's rollup was computed. Is the rollup restated, and if so when, or is the event silently absent from dashboards but present in the explorer? Yesterday's number changing under a shared report, or never including late events, both break promises this document makes; which one do we pick and state?"

### D-13: dashboard state before any rollup exists is undefined (banked 2026-07-18)

- **Location:** Section 5, FB-4: "Dashboard counts are computed from daily rollups generated at 02:00 workspace-local time covering the previous day"; no stated behaviour for the current day before that rollup runs, nor for a workspace with no rollup ever computed yet
- **Gap class:** MISSING
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "FB-4 only defines dashboard counts from the previous day's rollup. What does the dashboard show today, before 02:00 runs, and what does a brand-new workspace with no rollup yet show? If both render as zero, a product manager cannot tell 'no adoption' from 'not computed yet', and I cannot build the acceptance check for either state without one being named."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by engineer, qa, end-user

### D-14: FB-6 behaviour on an ineligible plan is undefined (banked 2026-07-18)

- **Location:** Section 5, FB-6: "White-labelling is available on eligible plans." No behaviour stated for a request made on an ineligible plan.
- **Gap class:** MISSING
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "FB-6 gates white-labelling to eligible plans but never says what happens when an ineligible-plan workspace tries to generate one. Is the report blocked outright, or does it fall back to a Beacon-branded version? The acceptance check only covers the eligible path; I need the ineligible-plan behaviour named before I can build or test the gate."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by engineer, qa

### D-15: deletion-request submission has no cross-workspace authorisation check (banked 2026-07-18)

- **Location:** Section 5, FB-8: "A workspace administrator submits a deletion request for an end user's pseudonymous id" versus Section 7: "every query path is scoped to a single workspace; cross-workspace reads are structurally impossible in the query layer"
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance
- **Catching question looks like:** "Section 7's tenant isolation guarantee covers query paths, reads. FB-8 is a write, a deletion request keyed only by a pseudonymous id. What stops an administrator in workspace A submitting a deletion request naming a pseudonymous id that actually belongs to workspace B? Tenant isolation on reads does not answer whether deletion submission is validated against the submitting workspace."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by security-compliance

### D-16: no classification gate on sensitive host-supplied attributes (banked 2026-07-18)

- **Location:** Section 5, FB-5: "A product manager defines segments over user attributes supplied by the host application"
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance, data-protection
- **Catching question looks like:** "Host applications can supply any attribute as a segmentable field, with no classification gate named. What stops a host app supplying a special-category attribute, health status or ethnicity, and it turning up as a segment dimension in a saved or shared report? FB-3's taxonomy governs event names, not attribute sensitivity."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by security-compliance, data-protection

### D-17: retention durations have no lawful basis or per-market carve-out (banked 2026-07-18)

- **Location:** Section 7: "Retention: raw events are retained for 13 months; daily rollups are retained for 36 months. Both are fixed platform-wide at launch."
- **Gap class:** MISSING
- **Expected persona(s):** data-protection, regulator, platform-architect
- **Catching question looks like:** "Thirteen and thirty-six months are stated as fixed numbers with no purpose or lawful basis tied to either duration, and no flag for whether a customer under a stricter regime can vary them. Is this a considered platform limit or an unexamined default, and what happens the first time a customer's regulator asks why the number is what it is?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by platform-architect, data-protection, regulator

### D-18: 'seat activity' is undefined (banked 2026-07-18)

- **Location:** Section 5, FB-6: "seat activity, top features, and usage trend over a selected period"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** data-protection
- **Catching question looks like:** "'Seat activity' is never defined. Does it name or count identifiable individuals, or is it an anonymised aggregate? This report is white-labelled and handed to the workspace's own customers, so if it identifies people it is a disclosure of end-user activity to a third party the end user never dealt with directly, and that needs a stated basis, not an assumption."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by data-protection

### D-19: deletion does not address already-distributed reports (banked 2026-07-18)

- **Location:** Section 5, FB-8: "Beacon deletes that user's events within 30 days" versus FB-6's generated usage reports and FB-5's shared live reports; nothing states whether a deletion touches a report already generated or already shared
- **Gap class:** EDGE-CASE
- **Expected persona(s):** data-protection, security-compliance
- **Catching question looks like:** "FB-8 deletes the user's events. D-10 covers whether the rollups restate. But what about a white-labelled usage report already generated and emailed to a customer, or a CSV already exported, before the deletion ran? Those are static copies outside Beacon's own stores. Does deletion reach them, and if not, is that limitation stated anywhere a customer or regulator would see it?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by security-compliance, data-protection

### D-20: a deleted user's pseudonymous id resurfacing after deletion is undefined (banked 2026-07-18)

- **Location:** Section 5, FB-8: "Beacon deletes that user's events within 30 days and records the request and completion in a deletion log visible to workspace administrators"; nothing addresses the host application sending new events under the same pseudonymous id after deletion completes
- **Gap class:** EDGE-CASE
- **Expected persona(s):** data-protection, engineer
- **Catching question looks like:** "If the host application fires a new event under the same pseudonymous id the day after a deletion completes, does Beacon start collecting for that id again as if nothing happened, or does completing a deletion request also suppress future events for that id? Either answer is defensible, but FB-8 states neither, and an administrator reading the deletion log has no way to know which one they got."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by data-protection, engineer

### D-21: no audit trail for Beacon's own access to a customer's CRM (banked 2026-07-18)

- **Location:** Section 8: "pilot customers will grant CRM access for measuring G-3" and Section 1, G-3: "Share of renewal opportunities in pilot customers' CRMs with a Beacon usage report attached"
- **Gap class:** MISSING
- **Expected persona(s):** regulator, security-compliance
- **Catching question looks like:** "Measuring G-3 means Beacon staff, or a Beacon process, get access to a pilot customer's own CRM, which holds that customer's commercially sensitive renewal data, not Beacon's. Section 7's audit provisions cover tenant isolation and sign-in within Beacon's own product. Where is the access-logging and retention story for Beacon looking inside someone else's CRM, and who can see that log?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by regulator, security-compliance

## Clean areas (for scoring false positives)

Sections a persona might reflexively flag, which the key marks as cleanly
answered. A question treating any of these as a gap is a false positive.

1. **Session replay non-scope (section 4).** Excluded permanently, with the privacy rationale recorded and the alternative (event explorer) named. "What about session replay?" is answered in the text.
2. **SDK footprint budget (section 7).** Concrete and release-blocking: 15 KB gzipped, 5 ms p95 initialisation on a named reference device, 512-event buffer cap. Flagging the SDK performance requirement as vague is a false positive. (The accuracy bullet next to it is D-4; do not confuse the two.)
3. **Event schema versioning (section 5, FB-3).** Taxonomy renames are precisely handled, with capture-time schema versions and an acceptance check that history is not restated by a rename. "What happens when customers rename events?" is answered cleanly. (Late-event restatement is D-12, a different question.)

## Per-persona seed counts (this benchmark)

| Persona | Seeded | Defect ids |
|---|---|---|
| engineer | 6 | D-6, D-8, D-12, D-13, D-14, D-20 (several shared with another persona) |
| qa | 5 | D-3, D-4, D-10, D-13, D-14 |
| end-user | 0 | (covered in bench-01) |
| security-compliance | 5 | D-7, D-15, D-16, D-19, D-21 |
| platform-architect | 2 | D-2, D-17 |
| data-protection | 7 | D-1, D-10, D-16, D-17, D-18, D-19, D-20 |
| accessibility | 1 | D-11 |
| commercial-viability | 2 | D-5, D-9 |
| operations-support | 2 | D-6, D-12 |
| regulator | 4 | D-1, D-2, D-17, D-21 |

## Per-gap-class counts (this benchmark)

| Gap class | Count | Defect ids |
|---|---|---|
| MISSING | 10 | D-5, D-6, D-7, D-11, D-13, D-14, D-15, D-16, D-17, D-21 |
| CONTRADICTS | 2 | D-1, D-2 |
| AMBIGUOUS | 3 | D-8, D-9, D-18 |
| EDGE-CASE | 4 | D-10, D-12, D-19, D-20 |
| UNMEASURABLE | 2 | D-3, D-4 |
