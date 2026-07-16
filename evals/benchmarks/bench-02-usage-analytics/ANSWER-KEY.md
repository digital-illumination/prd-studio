# Answer key: bench-02-usage-analytics (Beacon)

Twelve seeded defects. Scoring rules are in `../../README.md`. "Location"
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

- **Location:** Section 7 gives SLO targets (99.9% ingestion, 99.5% dashboards) but sections 5 and 7 define no behaviour for ingestion backlog or outage, no backfill story, no alerting when a workspace's events stop flowing, and no support tooling for "our chart went flat on Tuesday"
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

## Clean areas (for scoring false positives)

Sections a persona might reflexively flag, which the key marks as cleanly
answered. A question treating any of these as a gap is a false positive.

1. **Session replay non-scope (section 4).** Excluded permanently, with the privacy rationale recorded and the alternative (event explorer) named. "What about session replay?" is answered in the text.
2. **SDK footprint budget (section 7).** Concrete and release-blocking: 15 KB gzipped, 5 ms p95 initialisation on a named reference device, 512-event buffer cap. Flagging the SDK performance requirement as vague is a false positive. (The accuracy bullet next to it is D-4; do not confuse the two.)
3. **Event schema versioning (section 5, FB-3).** Taxonomy renames are precisely handled, with capture-time schema versions and an acceptance check that history is not restated by a rename. "What happens when customers rename events?" is answered cleanly. (Late-event restatement is D-12, a different question.)

## Per-persona seed counts (this benchmark)

| Persona | Seeded | Defect ids |
|---|---|---|
| engineer | 3 | D-6, D-8, D-12 (D-6, D-12 shared with another persona) |
| qa | 3 | D-3, D-4, D-10 |
| end-user | 0 | (covered in bench-01) |
| security-compliance | 1 | D-7 |
| platform-architect | 1 | D-2 |
| data-protection | 2 | D-1, D-10 |
| accessibility | 1 | D-11 |
| commercial-viability | 2 | D-5, D-9 |
| operations-support | 2 | D-6, D-12 |
| regulator | 2 | D-1, D-2 |
