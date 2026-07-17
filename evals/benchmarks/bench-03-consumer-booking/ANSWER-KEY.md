# Answer key: bench-03-consumer-booking (Sundial)

Twelve defects seeded at creation, plus two banked corrections (D-13, D-14)
promoted from the v0.2.1 release grill: fourteen in total. Scoring rules are
in `../../README.md`. "Location" gives the section and a quote fragment
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
- **Expected persona(s):** commercial-viability
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
- **Expected persona(s):** end-user
- **Catching question looks like:** "FB-4 never says how the confirmation reaches the consumer: push, SMS, email, or only inside the app. If Jess's phone is offline when the confirmation would have arrived, does she see it later, and which channel is the one she can actually trust arrived?"

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

### D-14: no pricing surface behind the worth-paying-for goal (banked 2026-07-17)

- **Location:** Section 1, G-4's "worth paying for" measurement (read against Section 6, where the only named tier is the Premium verification capability; no subscription, per-booking fee, or take-rate is defined anywhere)
- **Gap class:** MISSING
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "G-4 measures whether providers find Sundial worth paying for, but the document never states what they pay: subscription, per-booking fee, or a take-rate on the deposit. Section 6's Premium tier covers verification only. What is the pricing surface for this slice, and where is that decided?"
- **Provenance:** banked correction. Surfaced by a blind commercial-viability grill at the v0.2.1 release check and judged genuine by the marker; not part of the original seeding.

## Clean areas (for scoring false positives)

Sections a persona might reflexively flag, which the key marks as cleanly
answered. A question treating any of these as a gap is a false positive.

1. **Provider invoicing/payroll non-scope (section 4).** Explicitly out, with the named workaround (existing monthly earnings statement) and a pointer to the separate scoped slice (PRD-2026-019). "Where's invoicing?" is answered in the text.
2. **Search performance (section 7).** A concrete, testable target: under 1.5 seconds at the 95th percentile, searches returning up to 50 providers, named reference device and network. Flagging this NFR as vague or missing is a false positive.
3. **Conflict prevention (section 5, FB-5).** Double-assignment of an already-confirmed slot is precisely blocked, on any path, with an acceptance check naming the observable error. Questions asking "what stops the same slot going to two people?" are answered cleanly. (Questions about two consumers tapping the same slot before either confirms are D-8, not a false positive.)

## Per-persona seed counts (this benchmark)

| Persona | Seeded | Defect ids |
|---|---|---|
| end-user | 4 | D-3, D-7, D-11, D-13 (D-13 shared with engineer) |
| commercial-viability | 3 | D-2, D-12, D-14 |
| accessibility | 2 | D-6, D-10 |
| security-compliance | 1 | D-5 |
| platform-architect | 1 | D-4 |
| engineer | 2 | D-8 (shared with qa), D-13 (shared with end-user) |
| qa | 2 | D-1, D-8 (D-8 shared with engineer) |
| data-protection | 0 | (not seeded in this benchmark) |
| operations-support | 0 | (not seeded in this benchmark) |
| regulator | 1 | D-9 |

## Per-gap-class counts (this benchmark)

| Gap class | Count | Defect ids |
|---|---|---|
| MISSING | 4 | D-3, D-6, D-12, D-14 |
| CONTRADICTS | 3 | D-4, D-5, D-13 |
| AMBIGUOUS | 2 | D-7, D-9 |
| EDGE-CASE | 2 | D-8, D-11 |
| UNMEASURABLE | 3 | D-1, D-2, D-10 |
