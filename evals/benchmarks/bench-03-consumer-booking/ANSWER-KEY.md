# Answer key: bench-03-consumer-booking (Sundial)

Twelve defects seeded at creation, plus two banked corrections (D-13, D-14)
promoted from the v0.2.1 release grill, plus thirteen more (D-15 to D-27)
banked from the 2026-07-18 full-panel sweep curation: twenty-seven in total.
Scoring rules are in `../../README.md`. "Location" gives the section and a quote fragment
sufficient to find the seed. Where two personas are listed, either catching
it counts for that persona's rate.

## Seeded defects

### D-1: circular goal measurement (subtle)

- **Location:** Section 1, G-3: "Repeat booking rate within 90 days of a first booking" / "Consumers who trust the deposit process go on to book again within 90 days"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "G-3's evidence statement just restates its measurement: consumers trust the process because they book again, and they book again because they trust the process. What observable signal, distinct from repeat booking itself, tells us trust caused the repeat rather than habit, convenience, or having no other provider nearby?"

### D-2: provider satisfaction evidence excludes early churners (subtle)

- **Location:** Section 1, G-4: "Average score on the in-app satisfaction survey shown after a provider's tenth completed booking"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** commercial-viability, qa
- **Salience:** uncaught by the 2026-07-17 full panel; qa added 2026-07-18 as second expected persona, since the gap is survivorship bias in a satisfaction metric, a measurement-validity question squarely within qa's lens, not only a commercial one.
- **Catching question looks like:** "The survey behind G-4 only reaches a provider after their tenth completed booking. Providers who churn before booking ten times, plausibly the ones most likely to say Sundial was not worth paying for, never see it. Does a score of +30 among survivors actually tell us providers find Sundial worth paying for, or only that the providers who stuck around long enough to be asked do?"

### D-3: first-booking scenario has no correction path

- **Location:** Section 3, Consumer (first-time booking): "picks a slot with a stylist whose profile she likes, pays the £12 deposit, and receives a confirmation with the appointment details"
- **Gap class:** MISSING
- **Expected persona(s):** end-user
- **Catching question looks like:** "Jess's walk-through goes straight from picking a slot to paying for it. What happens when she taps the wrong slot by mistake, or gets partway through checkout and wants a different time? Does the document say anywhere how she corrects a booking she has not yet confirmed?"

### D-4: deposit percentage hard-coded despite documented trade variety (subtle)

- **Location:** Section 2: "Driving instructors typically take no deposit at all... Physiotherapists... often charge a percentage of the session price... Whatever we build has to live with that variety" versus Section 6 table: "Deposit percentage | Platform (fixed: every booking requires a 20% deposit of the service price)"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** platform-architect
- **Catching question looks like:** "Section 2 says deposit requirements vary hugely by trade, some providers take none at all, and whatever we build has to live with that variety, but section 6 fixes a single 20% deposit at the platform layer for every booking. Is the deposit rule platform or configuration? As drawn, a driving instructor who wants to take no deposit cannot, which contradicts the market section 2 just described."

### D-5: provider dashboard displays card details, contradicting the never-displays posture (subtle)

- **Location:** Section 7: "card details are tokenised at the point of capture and Sundial never stores or displays raw card numbers" versus Section 5, FB-8: "the provider dashboard shows the consumer's card number and expiry date"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** security-compliance
- **Catching question looks like:** "Section 7 promises card details are tokenised and never displayed, but FB-8's manual capture fallback has the provider dashboard show the consumer's card number and expiry. Which is true: does Sundial ever display a raw card number to a provider, and if FB-8 stands, has the tokenisation guarantee in section 7 just been quietly broken?"

### D-6: colour-only slot availability

- **Location:** Section 5, FB-2: "Available slots are shown in green; slots that are already taken are shown in grey"
- **Gap class:** MISSING
- **Expected persona(s):** accessibility
- **Catching question looks like:** "FB-2 distinguishes available from taken slots by colour alone, green versus grey. What tells a colour-blind consumer or a screen reader user which slots they can actually tap?"

### D-7: confirmation channel undefined

- **Location:** Section 5, FB-4: "the consumer receives a booking confirmation showing the date, time, provider, service and cancellation policy"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** end-user, engineer
- **Salience:** uncaught by the 2026-07-17 full panel; engineer added 2026-07-18 as second expected persona, since the undefined delivery channel is also a cannot-build-without-guessing gap.
- **Catching question looks like:** "FB-4 never says how the confirmation reaches the consumer: push, SMS, email, or only inside the app. If Jess's phone is offline when the confirmation would have arrived, does she see it later, and which channel is the one she can actually trust arrived?" A question reaching the same gap by the engineer route also counts, for example: "FB-4 specifies the confirmation's content but not its delivery channel; is it push, SMS, email or in-app only, and what is the defined fallback if the primary channel fails to deliver?"

### D-8: pre-confirmation double-booking race is undefined

- **Location:** Section 5, FB-5: "Once a slot is confirmed for one consumer, any further attempt to assign that slot, from any path, is rejected" (read against FB-2's tap-to-select flow)
- **Gap class:** EDGE-CASE
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "FB-5 only blocks a second booking once the first is already confirmed. Two consumers viewing the same provider's calendar tap the same open slot within moments of each other, before either payment completes. Which one wins, and does the other find out before entering their card details, or only after their payment fails?" A question reaching the same gap by a different route also counts, for example the accessibility framing: a selected slot is not held during checkout, so a user who needs longer to pay, such as a screen-reader user, is exposed to losing it. The catch is the missing hold between selection and confirmation, whatever the narrative.

### D-9: vague consumer-protection claim on refunds

- **Location:** Section 5, FB-6: "Refunds and forfeitures are handled in line with applicable consumer protection requirements"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** regulator
- **Catching question looks like:** "'In line with applicable consumer protection requirements' names no regime and no source. A booking made through the app is a distance contract; if a statutory cooling-off period applies to the first 14 days after booking, how does that interact with FB-6's 24-hour forfeiture window, and which one actually governs a cancellation made on day two?"

### D-10: unqualified accessibility claim

- **Location:** Section 7: "the consumer app is fully accessible and easy to use for everyone, regardless of ability"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** accessibility
- **Catching question looks like:** "'Fully accessible... for everyone' names no standard and no conformance level. Against which standard, for example WCAG 2.2 AA, is that claim tested, and by what method?"

### D-11: single-sitting, single-device assumption

- **Location:** Section 8, assumption: "consumers complete a booking in a single sitting on the device they started on"
- **Gap class:** EDGE-CASE
- **Expected persona(s):** end-user
- **Catching question looks like:** "The document assumes a booking happens in one sitting on one device. What actually happens if Jess starts browsing on her phone at a bus stop, loses signal, and picks the flow back up on a laptop an hour later? Does she lose her selected slot, or does the document simply not consider this?"

### D-12: payment processor dependency has no cost-sensitivity note

- **Location:** Section 8, dependencies: "a third-party payment processor for deposit capture and provider payout"
- **Gap class:** MISSING
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "The payment processor is named as a dependency with no note of what it costs per transaction, who absorbs that fee (Sundial, the provider, or the consumer), or what happens to the business case if the processor raises its pricing. What is the cost driver here, and has anyone decided who pays it?"

### D-13: requested status contradicts auto-confirm flow (banked 2026-07-17)

- **Location:** Section 3, provider walk-through: "confirms three booking requests that came in overnight", and Section 2's booking definition: "a status (requested, confirmed, cancelled, completed, no-show)" (read against Section 5: FB-3 creates the booking on payment success and FB-4 confirms straight to the consumer, with no provider accept or decline behaviour anywhere)
- **Gap class:** CONTRADICTS
- **Expected persona(s):** end-user, engineer
- **Catching question looks like:** "Section 3 has the provider confirming overnight booking requests, and the model names requested as a status, but FB-3 and FB-4 create and confirm the booking the moment payment succeeds, with no accept or decline step for the provider. After a consumer pays their deposit, are they confirmed, or waiting on the provider? The document gives both answers."
- **Provenance:** banked correction. Surfaced by a blind end-user grill at the v0.2.1 release check and judged genuine by the marker; not part of the original seeding.
- **Salience:** hard; uncaught by the 2026-07-17 full panel. The contradiction requires synthesising three separate sections (2, 3, 5) in one pass, a heavier lift than a three-question budget run typically affords; retained as-is rather than reworded.

### D-14: no pricing surface behind the worth-paying-for goal (banked 2026-07-17)

- **Location:** Section 1, G-4's "worth paying for" measurement (read against Section 6, where the only named tier is the Premium verification capability; no subscription, per-booking fee, or take-rate is defined anywhere)
- **Gap class:** MISSING
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "G-4 measures whether providers find Sundial worth paying for, but the document never states what they pay: subscription, per-booking fee, or a take-rate on the deposit. Section 6's Premium tier covers verification only. What is the pricing surface for this slice, and where is that decided?"
- **Provenance:** banked correction. Surfaced by a blind commercial-viability grill at the v0.2.1 release check and judged genuine by the marker; not part of the original seeding.

### D-15: FB-6's 24-hour cutoff has no defined reference clock or exact-boundary rule (banked 2026-07-18)

- **Location:** Section 5, FB-6: "Cancelling more than 24 hours before the appointment start refunds the deposit in full... cancelling within 24 hours forfeits the deposit", acceptance check: "cancel a booking at 25 hours and at 23 hours before start"
- **Gap class:** EDGE-CASE
- **Expected persona(s):** qa, engineer, end-user
- **Catching question looks like:** "FB-6's acceptance check tests 25 hours and 23 hours, either side of the line, but never states which clock the 24-hour window is measured against, server time, the consumer's local time, or the provider's, nor which bucket the exact 24:00:00 boundary itself falls into. Which is it, and what happens to a cancellation made at exactly the cutoff?"
- **Provenance:** banked correction. Surfaced by a full-panel sweep across qa, engineer and end-user framings, judged genuine by the marker; not part of the original seeding.

### D-16: payment processor dependency has no retry, timeout or idempotency contract (banked 2026-07-18)

- **Location:** Section 8, dependencies: "a third-party payment processor for deposit capture and provider payout" (read against FB-3's "The booking is created once payment succeeds")
- **Gap class:** MISSING
- **Expected persona(s):** engineer, operations-support
- **Catching question looks like:** "The payment processor is named as a dependency with no stated contract for what happens when its response is indeterminate mid-checkout, a network drop after the charge but before Sundial hears back. Is a retry safe without risking a double charge, and what tells anyone, engineering or support, that a booking is stuck in that state rather than confirmed or failed?"
- **Provenance:** banked correction. Surfaced independently by the engineer and operations-support sweeps at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-17: FB-8's manually-recorded phone payment has no reconciliation path against the automated refund flow (banked 2026-07-18)

- **Location:** Section 5, FB-8: "the provider dashboard shows the consumer's card number and expiry date so the provider can take payment by phone before the appointment" (read against FB-6 and FB-7's automated refund behaviour)
- **Gap class:** MISSING
- **Expected persona(s):** engineer, operations-support
- **Catching question looks like:** "Once a provider records a manual phone payment under FB-8, and that booking is later cancelled under FB-6 or FB-7, what reconciles the refund against a payment that was never tokenised or captured through the automated flow? Does the automatic refund still fire, and does anything stop it double-charging or double-refunding against the manually recorded one?"
- **Provenance:** banked correction. Surfaced independently by the engineer and operations-support sweeps at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-18: FB-3 has no stated outcome for a payment decline at first-time checkout (banked 2026-07-18)

- **Location:** Section 5, FB-3: "The booking is created once payment succeeds."
- **Gap class:** MISSING
- **Expected persona(s):** qa
- **Catching question looks like:** "FB-3's acceptance check only covers a valid card succeeding. What does the consumer see, and what state is the attempted booking left in, when the card is declined? Is the slot released immediately, and can she retry with a different card without losing it?"
- **Provenance:** banked correction. Surfaced by a blind qa grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-19: G-5's metric is never distinguished from an FB-7 provider cancellation (banked 2026-07-18)

- **Location:** Section 1, G-5: "Percentage of confirmed bookings a provider manually reschedules or declines after confirmation" (read against Section 5, FB-7 provider-initiated cancellation)
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "G-5 counts bookings a provider 'reschedules or declines after confirmation.' Does an FB-7 cancellation count as a decline for this metric? If it does, is it also separately tracked as a cancellation elsewhere, risking double-counting, and if it doesn't, is a provider who cancels instead of declining invisible to G-5 entirely?"
- **Provenance:** banked correction. Surfaced by a blind qa grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-20: no functional behaviour describes a surface to view or manage an existing confirmed booking (banked 2026-07-18)

- **Location:** Section 3, Consumer (managing a booking): "Tom opens Sundial to check tomorrow's driving lesson" (read against Section 5's FB-1 through FB-8, none of which describe a bookings list or detail view)
- **Gap class:** MISSING
- **Expected persona(s):** end-user
- **Catching question looks like:** "Tom's walk-through has him open the app to check tomorrow's lesson, but no functional behaviour in section 5 describes a screen where a consumer sees their existing bookings. Where does that capability live, and what does it show?"
- **Provenance:** banked correction. Surfaced by a blind end-user grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-21: FB-8's manual capture has no control on amount, no audit trail, and unclear retention coverage (banked 2026-07-18)

- **Location:** Section 5, FB-8: "the provider dashboard shows the consumer's card number and expiry date so the provider can take payment by phone" (read against Section 7's "retained for 6 years to meet HMRC accounting record requirements")
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance, regulator
- **Catching question looks like:** "FB-8 lets a provider charge a consumer's card by phone with no stated bound on the amount, no limit on repeat attempts, and no record of who authorised it or when. If a consumer disputes a manual charge, what audit trail exists, and does section 7's 6-year HMRC retention rule, written for the tokenised automatic flow, actually cover this off-platform record at all?"
- **Provenance:** banked correction. Surfaced independently by the security-compliance and regulator sweeps at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-22: FB-7's self-declared cancellation reason has no verification, audit trail or abuse guardrail (banked 2026-07-18)

- **Location:** Section 5, FB-7: "stating a reason from a short fixed list (illness, emergency, scheduling error)" (read against Section 1, G-5's 5% threshold)
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance, operations-support, platform-architect
- **Catching question looks like:** "A provider's FB-7 cancellation reason is self-declared from a fixed list with no verification and no audit trail. What stops a provider repeatedly cancelling and re-offering the slot to a different consumer under a pretextual reason such as 'scheduling error', and would that behaviour ever surface against G-5's 5% threshold, or dodge it entirely?"
- **Provenance:** banked correction. Surfaced independently by the security-compliance, operations-support and platform-architect sweeps at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-23: section 7's retention rule is financial-only and silent on UK GDPR obligations and legal holds (banked 2026-07-18)

- **Location:** Section 7: "Data held by this slice: booking records, deposit and refund history, provider calendar data. Deposit and payment records are retained for 6 years to meet HMRC accounting record requirements, then deleted."
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance, data-protection, regulator, operations-support
- **Catching question looks like:** "The 6-year rule is scoped to deposit and payment records for HMRC purposes. It says nothing about a lawful basis, retention period or deletion trigger for the booking records and provider calendar data section 7 also names, nothing about a consumer's UK GDPR erasure request against any of it, and nothing about a legal hold if a record due for auto-deletion is still needed for an open dispute or chargeback. Which regime governs the rest of this data, and does the 6-year clock ever pause?"
- **Provenance:** banked correction. Surfaced independently by the security-compliance, data-protection, regulator and operations-support sweeps at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-24: cancellation window is configurable in section 6 but hard-coded in FB-6 (banked 2026-07-18)

- **Location:** Section 6 table: "Cancellation window (24 hours) | Configuration (per provider)" versus Section 5, FB-6's acceptance check: "cancel a booking at 25 hours and at 23 hours before start"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** platform-architect
- **Catching question looks like:** "Section 6 marks the cancellation window as per-provider configuration, but FB-6's functional behaviour and its acceptance check are both written around a fixed 24-hour value with no reference to a configured window anywhere. Is the window actually configurable, and if so, where does FB-6 read it from?"
- **Provenance:** banked correction. Surfaced by a blind platform-architect grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-25: no lawful basis named anywhere for the personal data this slice processes (banked 2026-07-18)

- **Location:** Section 5, FB-1: "A consumer searches by location, service type and date range" (read against Section 8's third-party payment processor dependency and Section 7's "Data held by this slice" line)
- **Gap class:** MISSING
- **Expected persona(s):** data-protection
- **Catching question looks like:** "This slice collects a consumer's location for search, and holds booking, deposit and refund history, but no lawful basis under UK GDPR is named for any of it anywhere in the document, nor an access, erasure or portability path for the consumer, nor what safeguard governs the third-party payment processor sharing that data across a border. What is the basis, and who owns a subject-rights request?"
- **Provenance:** banked correction. Surfaced by a blind data-protection grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding. data-protection had no seeded defect in this benchmark before this correction.

### D-26: FB-2's slot selection has no keyboard or switch-access equivalent (banked 2026-07-18)

- **Location:** Section 5, FB-2: "The consumer browses a calendar of upcoming availability for the selected provider and taps an open slot to select it"
- **Gap class:** MISSING
- **Expected persona(s):** accessibility
- **Catching question looks like:** "FB-2 describes slot selection only as a tap. What is the keyboard, switch-access or screen-reader-navigable equivalent for a consumer who cannot use a touchscreen gesture? This is distinct from D-6's colour-only signalling: even with colour fixed, is the slot itself operable without a tap?"
- **Provenance:** banked correction. Surfaced by a blind accessibility grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

### D-27: the PCI DSS claim names no compliance level or evidence trail (banked 2026-07-18)

- **Location:** Section 7: "all deposit collection is handled through Sundial's PCI DSS-compliant payment processor"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** regulator
- **Catching question looks like:** "'PCI DSS-compliant' names no compliance level or SAQ type and no evidence trail, an attestation of compliance or an assessment date, that an auditor could actually check. Compliant to what level, assessed when, and where is that evidence held?"
- **Provenance:** banked correction. Surfaced by a blind regulator grill at the 2026-07-18 full-panel curation and judged genuine by the marker; not part of the original seeding.

## Clean areas (for scoring false positives)

Sections a persona might reflexively flag, which the key marks as cleanly
answered. A question treating any of these as a gap is a false positive.

1. **Provider invoicing/payroll non-scope (section 4).** Explicitly out, with the named workaround (existing monthly earnings statement) and a pointer to the separate scoped slice (PRD-2026-019). "Where's invoicing?" is answered in the text.
2. **Search performance (section 7).** A concrete, testable target: under 1.5 seconds at the 95th percentile, searches returning up to 50 providers, named reference device and network. Flagging this NFR as vague or missing is a false positive.
3. **Conflict prevention (section 5, FB-5).** Double-assignment of an already-confirmed slot is precisely blocked, on any path, with an acceptance check naming the observable error. Questions asking "what stops the same slot going to two people?" are answered cleanly. (Questions about two consumers tapping the same slot before either confirms are D-8, not a false positive.)

## Per-persona seed counts (this benchmark)

| Persona | Seeded | Defect ids |
|---|---|---|
| end-user | 6 | D-3, D-7 (shared engineer), D-11, D-13 (shared engineer), D-15 (shared qa, engineer), D-20 |
| commercial-viability | 3 | D-2 (shared qa), D-12, D-14 |
| accessibility | 3 | D-6, D-10, D-26 |
| security-compliance | 4 | D-5, D-21 (shared regulator), D-22 (shared operations-support, platform-architect), D-23 (shared data-protection, regulator, operations-support) |
| platform-architect | 3 | D-4, D-22 (shared security-compliance, operations-support), D-24 |
| engineer | 6 | D-7 (shared end-user), D-8 (shared qa), D-13 (shared end-user), D-15 (shared qa, end-user), D-16 (shared operations-support), D-17 (shared operations-support) |
| qa | 6 | D-1, D-2 (shared commercial-viability), D-8 (shared engineer), D-15 (shared engineer, end-user), D-18, D-19 |
| data-protection | 2 | D-23 (shared security-compliance, regulator, operations-support), D-25 |
| operations-support | 4 | D-16 (shared engineer), D-17 (shared engineer), D-22 (shared security-compliance, platform-architect), D-23 (shared security-compliance, data-protection, regulator) |
| regulator | 4 | D-9, D-21 (shared security-compliance), D-23 (shared security-compliance, data-protection, operations-support), D-27 |

## Per-gap-class counts (this benchmark)

| Gap class | Count | Defect ids |
|---|---|---|
| MISSING | 13 | D-3, D-6, D-12, D-14, D-16, D-17, D-18, D-20, D-21, D-22, D-23, D-25, D-26 |
| CONTRADICTS | 4 | D-4, D-5, D-13, D-24 |
| AMBIGUOUS | 2 | D-7, D-9 |
| EDGE-CASE | 3 | D-8, D-11, D-15 |
| UNMEASURABLE | 5 | D-1, D-2, D-10, D-19, D-27 |
