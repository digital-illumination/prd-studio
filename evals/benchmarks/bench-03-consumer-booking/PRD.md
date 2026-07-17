# PRD: Sundial provider discovery, booking and deposits

<!-- Benchmark PRD for the PRD Studio eval suite. Sundial is a wholly
fictional product. This document contains deliberately seeded defects; see
ANSWER-KEY.md. Do not use as a real PRD example. -->

## Metadata

- ID: PRD-2026-027
- Status: IN GRILL
- Owner (Product): Head of Product, Sundial
- Engineering lead: [OPEN: to be named once the architecture session is scheduled]
- Slice / scope anchor: provider discovery, appointment booking and deposit collection within the Sundial consumer marketplace
- Last updated: 2026-07-08

## Decision summary

The 30-second read for anyone who wants the shape before the detail.

- What it is: the discovery-to-deposit slice of Sundial, a marketplace where consumers find and book appointments with local independent service providers: hairdressers, physiotherapists, driving instructors and similar trades that work appointment by appointment.
- Who it is for: consumers booking appointments, and independent providers who manage their own calendar and take deposits against no-shows.
- Why now / why this slice: no-shows and phone-tag booking are the single biggest admin cost providers cite in discovery interviews, and not being able to see real availability before calling around is the top complaint from consumers who abandon during signup.
- Goals (what good looks like): fewer no-shows, faster time from search to booked, consumers who trust the deposit is fair, providers who keep control of their own calendar.
- In scope: provider discovery and search, availability display, booking creation, deposit collection, booking confirmation, conflict prevention, cancellation and refunds (both directions), notifications.
- Out of scope: provider invoicing and payroll, group bookings and classes, provider-to-provider marketplace features, marketing and promotional pricing (see section 4).
- Status: product view converging; engineering view to follow in the architecture session.
- Decision needed: sign-off on the deposit model and the cancellation window so build can be sequenced.

## 1. Goals & outcomes (everything downstream validates against this section)

| Id | Outcome | Measured by | We will know because... |
|----|---------|-------------|--------------------------|
| G-1 | Fewer confirmed bookings end as a no-show | Percentage of confirmed bookings marked no-show at the appointment time | It falls from the current phone-booking baseline of 18% to under 8% within two quarters of launch, measured across all active providers |
| G-2 | Consumers get from search to booked faster | Median elapsed time from opening search to a confirmed booking, instrumented in-app | It falls from roughly 12 minutes (discovery baseline, phone-tag included) to under 3 minutes within one quarter |
| G-3 | Consumers trust the deposit process | Repeat booking rate within 90 days of a first booking | Consumers who trust the deposit process go on to book again within 90 days |
| G-4 | Providers find Sundial worth paying for | Average score on the in-app satisfaction survey shown after a provider's tenth completed booking | The average exceeds +30 within two quarters of launch |
| G-5 | Providers keep control of their own calendar | Percentage of confirmed bookings a provider manually reschedules or declines after confirmation | It stays below 5%, tracked monthly |

Rules: every goal measurable; no goal that restates a feature ("has a booking calendar" is not a goal; "a consumer gets from search to a confirmed slot in under three minutes" is).

## 2. Context

- Sundial already provides consumer accounts, provider profiles and verification, and a ratings and reviews system. This slice adds discovery, booking and deposit collection on top of those capabilities.
- The provider base is small independent operators across appointment-based trades: hairdressers and barbers, physiotherapists and other allied-health practitioners, driving instructors, personal trainers and similar. Most run their business alone or with one or two staff, manage bookings from a phone or a shared tablet, and are not power users of software.
- Deposit requirements vary hugely by trade. Driving instructors typically take no deposit at all, since a missed lesson costs them relatively little. Hairdressers commonly take a small fixed fee to hold a first-time booking. Physiotherapists and similar allied-health providers often charge a percentage of the session price, since a missed hour is a meaningful loss to a one-person practice. Whatever we build has to live with that variety.
- Consumers browse and book primarily on their phone, often while doing something else: on a commute, between errands, in a waiting room.
- Existing capabilities touched: consumer accounts, provider profiles and verification, ratings and reviews, notifications service.
- Configuration surfaces touched: provider profile settings, notification preferences.

## 3. Users & scenarios

| Persona | Scenario that must work (walk-through, not feature list) |
|---------|----------------------------------------------------------|
| Consumer (first-time booking) | Jess searches for a hairdresser within three miles with an evening slot this week, filters by service type, picks a slot with a stylist whose profile she likes, pays the £12 deposit, and receives a confirmation with the appointment details. |
| Consumer (managing a booking) | Tom opens Sundial to check tomorrow's driving lesson, decides he needs to cancel, cancels from the app more than 24 hours ahead, and sees his deposit refunded to his original payment method within a few days. |
| Provider (calendar & deposits) | Nadia, a physiotherapist, opens her Sundial calendar on Monday, blocks out the two hours she keeps for training, confirms three booking requests that came in overnight, and adjusts Friday's availability after a personal appointment comes up. |
| Provider (lapsed deposit) | A returning consumer's saved card is declined at the point of automatic deposit capture. Nadia is alerted, follows the manual capture fallback to secure the deposit before the appointment, and the booking stays confirmed. |

## 4. Scope / non-scope

**In:** provider discovery and search, availability display, booking creation, deposit collection, booking confirmation, conflict prevention, consumer cancellation and refund, provider-initiated cancellation, manual deposit capture fallback, notifications for bookings and cancellations.

**Explicitly out (non-goals):**

- Provider invoicing and payroll. Providers already have a downloadable monthly earnings statement in the existing provider finance area; a full invoicing and payroll product is a separate, already-scoped slice (PRD-2026-019). Nothing in this slice changes or removes the existing statement.
- Group bookings and classes. This slice assumes one consumer per slot; multiple consumers sharing a slot (a class, a group lesson) is a future slice and nothing here should preclude it.
- Provider-to-provider marketplace features (referrals, cross-booking between providers). Parked with the platform team as an explicit dependency, not a gap.
- Marketing and promotional pricing (discount codes, referral credits). A separate commercial slice.

## 5. Functional behaviour

A booking is defined by a provider, a service, a date, a start time, an end time, a consumer, and a status (requested, confirmed, cancelled, completed, no-show).

- **FB-1 Provider discovery & search.** A consumer searches by location, service type and date range. Results show provider name, service, price, rating and the next available slot. Acceptance check: search for a service type with providers within the set radius; results are sorted by next availability by default and every result shows a bookable next slot.
- **FB-2 Availability display & slot selection.** The consumer browses a calendar of upcoming availability for the selected provider and taps an open slot to select it. Available slots are shown in green; slots that are already taken are shown in grey and cannot be tapped. Acceptance check: a provider's calendar with a mix of open and taken slots renders correctly, and only open slots are tappable.
- **FB-3 Booking creation & deposit collection.** Selecting a slot moves the consumer to checkout, where the deposit amount and the cancellation window are shown before payment. The booking is created once payment succeeds. Acceptance check: complete checkout with a valid card; the booking status moves to confirmed only after payment succeeds, never before.
- **FB-4 Booking confirmation.** Once the deposit payment succeeds, the consumer receives a booking confirmation showing the date, time, provider, service and cancellation policy. Acceptance check: a successful booking produces a confirmation containing all five elements.
- **FB-5 Conflict prevention.** The system blocks a provider's calendar from holding two bookings against the same slot. Once a slot is confirmed for one consumer, any further attempt to assign that slot, from any path, is rejected with a named error identifying the existing booking. Acceptance check: attempt to confirm a second booking against an already-confirmed slot via the booking API directly; the attempt is rejected, the error names the existing booking reference, and no such double-assignment can be saved by any path.
- **FB-6 Consumer cancellation & refund.** A consumer can cancel a booking from the app at any time before the appointment. Cancelling more than 24 hours before the appointment start refunds the deposit in full to the original payment method; cancelling within 24 hours forfeits the deposit to the provider. Refunds and forfeitures are handled in line with applicable consumer protection requirements. Acceptance check: cancel a booking at 25 hours and at 23 hours before start; the first refunds in full, the second forfeits the deposit, and the app states which applied and why.
- **FB-7 Provider-initiated cancellation.** A provider can cancel a confirmed booking from their calendar, stating a reason from a short fixed list (illness, emergency, scheduling error). The consumer is notified immediately and the deposit is refunded to the consumer in full, regardless of how close to the appointment the cancellation happens. Acceptance check: a provider cancels a booking under two hours before its start; the consumer's deposit is refunded in full and the notification names the provider's stated reason.
- **FB-8 Manual deposit capture fallback.** Where a consumer's saved card is declined at the point of automatic deposit capture, for example a lapsed card on a returning booking, the provider dashboard shows the consumer's card number and expiry date so the provider can take payment by phone before the appointment. Acceptance check: trigger a declined automatic capture on a returning booking; the provider dashboard displays the card details and the provider can record a manual payment against the booking.

## 6. Platform vs configuration

| Element | Layer (platform / configuration) | Native reuse / integration |
|---------|----------------------------------|----------------------------|
| Provider search ranking & radius | Configuration (per market) | New capability in this slice |
| Cancellation window (24 hours) | Configuration (per provider) | New capability in this slice |
| Deposit percentage | Platform (fixed: every booking requires a 20% deposit of the service price) | New capability in this slice |
| Conflict prevention (slot locking) | Platform (fixed) | New capability in this slice |
| Notification channels (push, SMS, email) | Configuration (per workspace) | Existing notifications service |
| Provider verification tier | Platform capability, Premium tier | Existing capability, extended |

## 7. Non-functional requirements, constraints & guardrails

- Performance: search results for a given location and service type load in under 1.5 seconds at the 95th percentile, for a search returning up to 50 providers, measured from our standard mid-range Android reference device on 4G.
- Payment: all deposit collection is handled through Sundial's PCI DSS-compliant payment processor; card details are tokenised at the point of capture and Sundial never stores or displays raw card numbers.
- Data held by this slice: booking records, deposit and refund history, provider calendar data. Deposit and payment records are retained for 6 years to meet HMRC accounting record requirements, then deleted.
- Human-in-the-loop: a booking is only created once the consumer has explicitly confirmed payment; the system never books an appointment on a consumer's behalf.
- Interface: the consumer app is fully accessible and easy to use for everyone, regardless of ability.
- Reliability: the availability list falls back to the last-synced view when offline, with a staleness banner showing the last sync time.

## 8. Assumptions, dependencies, risks

- Assumptions: consumers complete a booking in a single sitting on the device they started on; providers keep their calendar availability current; deposit amounts providers set stay within a sane range relative to the service price.
- Dependencies: the platform notifications service (push, SMS, email); the Sundial identity service; a third-party payment processor for deposit capture and provider payout.
- Risks and mitigations: adoption risk if providers keep taking bookings by phone alongside Sundial (mitigation: the booking flow must beat a phone call on speed from week one, tracked against G-2); no-show risk persisting despite deposits if the amount set is too low to deter (mitigation: reviewed against G-1 in the first post-launch retro).

## 9. Open Questions register

| Id | Question | Owner | Status (open / answered / parked-with-owner) |
|----|----------|-------|------------------------------------------------|
| OQ-1 | Can a provider who offers more than one service (for example a driving instructor who also does in-car valeting) set a different deposit rule per service, or one rule for their whole profile? | Head of Product | parked-with-owner (one deposit rule per provider is the launch rule; per-service rules are a later slice) |
| OQ-2 | Should a consumer be able to book the same provider for two different services back-to-back in one session? | Head of Product | parked-with-owner (launch answer is no, one booking at a time; revisit after pilot feedback) |

Must be empty or every row explicitly parked before sign-off. The engineering and architecture rows close in the architecture session, not the grill.

## Agent execution contract

The engineering view, completed in the architecture session: the bridge from product intent to agent-executable work.

- Read first: [OPEN: repository and design references, to be listed in the architecture session]
- Do not change: the payment processor integration and tokenisation boundary, the identity service integration, the conflict-prevention slot-locking logic.
- Validation loop: acceptance checks under section 5; deposit-percentage rules validated against provider profile fixtures.
- Stop conditions: [OPEN: to be completed in the architecture session]
- Reporting: [OPEN: to be completed in the architecture session]

## Change log (grill history)

- 2026-06-19, round 1 (GRILL ME): sharpened G-1 and G-2 baselines from discovery data; provider invoicing moved to explicit non-scope with the earnings-statement workaround named.
- 2026-07-08, round 2 (GRILL THE PRD): added FB-5 conflict prevention after the QA persona pressed on double-booking; added the offline staleness banner under section 7.
