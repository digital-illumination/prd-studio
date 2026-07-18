# Answer key: bench-01-team-scheduler (Shiftly)

Fifteen seeded defect ids (D-1 to D-15). D-8 was split into two catchable
defects, D-8a and D-8b, after a live grill showed it bundled two distinct
questions; D-13 to D-15 were added after the same grill surfaced real gaps
this key had missed (see the "Bank the correction" rule in `../../README.md`).
D-16 to D-28 were banked on 2026-07-18 from a full-panel sweep curation pass
(provenance on each entry). D-18 was split into D-18a and D-18b on the same
date, after the salience review below found it bundled the rest rule's
measurement scope with its fixed-value question. Thirty individually scored
seeds in total.
Scoring rules are in
`../../README.md`. "Location" gives the section and a quote fragment
sufficient to find the seed. Where two personas are listed, either catching
it counts for that persona's rate.

## Seeded defects

### D-1: circular goal measurement (subtle)

- **Location:** Section 1, G-3: "Weekly active use of the self-service scheduling features" / "Teams are using self-service scheduling each week"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "G-3's evidence statement just restates its measurement: teams adopt self-service because teams use self-service. What observable change in the world (fewer manager-made assignments? swap volume routed through the app rather than group chat?) tells us adoption happened, and what threshold counts as adopted?"

### D-2: publish deadline contradiction across distant sections (subtle)

- **Location:** Decision summary: "rotas are published at least 14 days before the shift week begins" versus Section 5, FB-2: "published no later than 7 days before its shift week begins"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "The Decision summary commits to publishing at least 14 days ahead, the headline sales promise, but FB-2 sets the enforced deadline at 7 days. Which number does the builder enforce, and which one are we telling customers?"

### D-3: location retention contradicts the checked-not-tracked posture (subtle)

- **Location:** Section 2: "location is checked, not tracked: we verify presence at the moment it matters" versus Section 7: "the coordinates captured at each clock-in are retained for 24 months"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** data-protection, regulator
- **Catching question looks like:** "Section 2 promises location is checked, not tracked, yet section 7 retains every clock-in coordinate for 24 months. A two-year location history per worker is tracking by any reasonable reading. What is the minimum needed for attendance disputes: a pass/fail presence flag, or coordinates, and for how long?"

### D-4: swap approval hard-coded despite documented customer variety

- **Location:** Section 6 table: "Swap approval workflow | Platform (fixed: every swap requires the duty manager's approval before it completes)" versus Section 2: "Every customer we interviewed runs a different swap-approval policy" and FB-4's "the workspace's approval policy"
- **Gap class:** CONTRADICTS
- **Expected persona(s):** platform-architect
- **Catching question looks like:** "Section 2 says every customer runs a different swap policy and FB-4 speaks of 'the workspace's approval policy', but section 6 fixes a single manager-approval flow at the platform layer. Is approval policy platform or configuration? As drawn, the boundary contradicts the stated market and FB-4's own wording."

### D-5: no audit trail for pay-affecting edits to published rotas

- **Location:** Section 5, FB-2: "Managers may edit a published rota at any time; edits update the team's view immediately" with no audit requirement anywhere in section 7
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance
- **Catching question looks like:** "Published rotas drive hours worked and therefore pay, and FB-2 lets managers edit them at any time, yet nothing requires a record of who changed what and when. When a worker disputes a shift they say was removed after publish, what can be reconstructed?"

### D-6: no accessibility requirement for the primary interface

- **Location:** Section 7: "clean and intuitive on small screens" is the only interface quality statement; no accessibility requirement anywhere, for a product whose primary interface is a mobile app used by a large hourly workforce
- **Gap class:** MISSING
- **Expected persona(s):** accessibility
- **Catching question looks like:** "'Clean and intuitive' is not an accessibility requirement. What standard does the team member app meet (for example WCAG 2.2 AA), and how do staff using screen readers, large text or switch access receive offers and confirm swaps on the same terms as everyone else?"

### D-7: no failure behaviour or support tooling for the publish and notification path

- **Location:** Section 5, FB-2 and FB-6 describe only the happy path (FB-6's acceptance check is "notifications arrive without undue delay and feel timely to staff"); sections 5 and 7 define no behaviour for notification delivery failure, partial publish, or how support diagnoses a staff-were-never-told report
- **Gap class:** MISSING
- **Expected persona(s):** operations-support, engineer
- **Catching question looks like:** "Publish notifies every assigned team member; what happens when a quarter of those notifications fail (dead device tokens, SMS provider outage)? Is the rota considered published anyway, is the manager told, can delivery be retried, and what can a support agent see when a customer reports staff who never heard?"

### D-8a: 'eligible' and 'fairly' are undefined in the open-shift offer

- **Location:** Section 5, FB-3: "offered fairly among eligible team members who have opted in"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** engineer
- **Catching question looks like:** "FB-3 offers open shifts 'fairly among eligible team members'. Eligible by what test: role match, site, rest-rule headroom against FB-5, contracted-hours limits? And separately, what does 'fairly' constrain here: only the eligibility filter, or also some ordering (seniority, hours owed) among the eligible pool? I cannot build the eligibility check or the fairness pass without both defined."

### D-8b: no ordering or tie-break rule when accepts arrive together, and no defined outcome for the loser

- **Location:** Section 5, FB-3: "The first to accept is assigned and the offer closes for everyone else"
- **Gap class:** EDGE-CASE
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "'First to accept' assumes acceptances arrive in a clean order, but two eligible staff can tap accept within the same request window. What breaks the tie: server receipt time, an atomic claim, something else? And what does the person who loses the race see: a clear 'this shift has been taken' message, a silent removal from their offers list, or nothing until they look again? FB-6's notification list does not cover it."

### D-9: staff notification on post-publish changes is undefined

- **Location:** Section 3, team member scenario: "always sees an up-to-date picture of the week ahead" and Section 5, FB-2: "edits update the team's view immediately", but FB-6's notification list covers only publish, offers and swap outcomes, not changes to an individual's published shifts
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** end-user
- **Catching question looks like:** "If my manager moves or removes my shift after publish, FB-6 never notifies me; I only find out if I happen to open the app. The scenario says I 'always see an up-to-date picture', but is the contract that I am told when my own shift changes, or that I must keep checking? Those are very different jobs for me."

### D-10: overnight shifts and clock changes do not fit the shift model

- **Location:** Section 5, preamble: "A shift is defined by its date, a start time and an end time"; no handling anywhere for shifts crossing midnight or for daylight saving transitions
- **Gap class:** EDGE-CASE
- **Expected persona(s):** qa, engineer
- **Catching question looks like:** "A shift is defined only by a date, a start time and an end time; nothing says what happens when a shift crosses midnight or a clock change. Take a bar close shift running 18:00 to 02:00: which date does it belong to, and how does the 11-hour rest rule in FB-5 measure against it? Now take a shift spanning the October clock change: does the worker work the repeated hour, and does the rota show it?"

### D-11: staff without personal smartphones have no path

- **Location:** Section 8, assumption: "team members have personal smartphones and keep the Shiftly app installed"; every scenario in section 3 is app-based
- **Gap class:** EDGE-CASE
- **Expected persona(s):** end-user, accessibility (added 2026-07-18: device/app dependency is a digital-exclusion question, squarely the accessibility lens's exclusion-evidence remit, not only end-user's)
- **Catching question looks like:** "Section 8 assumes team members have personal smartphones and keep the Shiftly app installed, and every section 3 scenario is built on that assumption. What is the actual path for a kitchen or warehouse worker who does not own a smartphone, shares one with family, or will not install a work app on personal hardware: how do they see the rota, take an open shift, or learn a shift changed? The document names exactly one channel for every staff-facing function and no other, which is a hardware and software access barrier, not a mere inconvenience, and excludes a named real segment (kitchen and warehouse staff) from the product outright. A printed rota on the wall is the incumbent; what replaces it for the staff this design has no other path for?"
- **Salience:** reworded 2026-07-18, uncaught by both full panels (2026-07-17 and 2026-07-18) despite accessibility being added as a second persona on 2026-07-18; the prior wording read as an end-user workflow gap rather than the accessibility lens's own exclusion-evidence test, which this wording now states directly. Review after the next panel before considering accept-as-hard.

### D-12: untestable acceptance check on notifications (subtle)

- **Location:** Section 5, FB-6 acceptance check: "notifications arrive without undue delay and feel timely to staff"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "'Without undue delay' and 'feel timely' cannot be verified before release. What is the delivery target (for example, 95% of publish notifications delivered within 5 minutes), and how is it measured?"

### D-13: the missed-deadline escalation path has no defined resolution

- **Location:** Section 5, FB-2: "the builder blocks publishing after that point and directs the manager to their operations lead" versus Section 9, OQ-2: "Should operations leads be able to publish on a duty manager's behalf?" (recorded answer: "parked-with-owner (launch answer is no; revisit after pilot feedback)")
- **Gap class:** MISSING
- **Expected persona(s):** engineer, operations-support
- **Catching question looks like:** "FB-2 sends a manager who misses the 7-day deadline to their operations lead, but OQ-2 records the launch answer as no, operations leads cannot publish on a manager's behalf. So what does the operations lead actually do when a manager lands there: unlock the builder for a late publish, grant a one-off exception, escalate further? As written, the only documented step after a missed deadline leads to a door OQ-2 says is locked."

### D-14: the unfilled-shift target assumes a Premium-only mechanism

- **Location:** Section 1, G-1: "measured across all active sites" versus Section 6: "Open-shift marketplace | Platform capability, Premium tier"
- **Gap class:** MISSING
- **Expected persona(s):** qa, commercial-viability
- **Catching question looks like:** "G-1 commits to cutting unfilled shifts from 8% to 4% or lower 'across all active sites', but section 6 marks the open-shift marketplace, FB-3, the only stated mechanism for filling an open or vacated shift, as a Premium-tier capability. What fills an open shift at a non-Premium site? If nothing does, is the 4% target only ever measured across Premium sites, or is this a commitment we cannot hit for the rest of the base?"

### D-15: no retention period for swap, offer or notification records

- **Location:** Section 7: "shift assignments, swap and offer history, notification delivery records" versus "the coordinates captured at each clock-in are retained for 24 months to support attendance disputes, then deleted"
- **Gap class:** MISSING
- **Expected persona(s):** data-protection
- **Catching question looks like:** "Section 7 names four categories of data this slice holds, but only clock-in coordinates get a stated retention period and deletion trigger. What is the retention period for swap and offer history and for notification delivery records, and what deletes them: a fixed period, account closure, something else? Left unstated, these categories default to forever, which sits oddly against the processor agreement named in the same section."

### D-16: no conflict re-validation timing for edits and swap approvals after the initial check

- **Location:** Section 5, FB-2: "Managers may edit a published rota at any time; edits update the team's view immediately" and FB-4: "The swap takes effect once it completes under the workspace's approval policy" versus FB-5's acceptance check: "attempting either assignment, in the builder or via swap or open-shift acceptance, produces a named blocking error"
- **Gap class:** EDGE-CASE
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "FB-5's acceptance check names three paths checked at the moment of assignment: builder, swap and open-shift acceptance. It says nothing about two cases where time passes between the check and the outcome: a manager directly editing a published rota (FB-2), and a swap that only completes once the workspace's approval policy runs (FB-4), which can take longer than a moment. Does the conflict and rest-rule check re-run at edit-save and at approval time, or only once at proposal, leaving a conflict that arose in between unblocked?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by engineer, qa.

### D-17: the team-broadcast swap variant has no defined acceptance path or outcome

- **Location:** Section 5, FB-4: "A team member proposes a swap of one of their shifts, either with a named colleague or to the team"; no acceptance mechanism, tie-break or non-selected-candidate outcome is defined for the "to the team" branch, unlike FB-3's open-shift path
- **Gap class:** EDGE-CASE
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "A named-colleague swap has one counterparty who accepts under the approval policy, but 'to the team' broadcasts the offer to everyone. If more than one teammate is willing to take it, who is assigned, what breaks a near-simultaneous tie, and is there a timeout if nobody responds? And do teammates who were not chosen get told they were not selected, the same question D-8b answers for FB-3's open shifts, or does this branch stay silent?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by engineer, qa, end-user.

### D-18a: the 11-hour rest rule's measurement scope is underspecified

- **Location:** Section 5, FB-5: "blocks any assignment that would leave less than 11 hours' rest between one shift's end and the next shift's start for the same person", read against OQ-1: "Can staff who work across two sites appear on both sites' rotas in the same week"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** qa, platform-architect
- **Catching question looks like:** "FB-5 blocks under-11-hour rest 'for the same person', but OQ-1 is still open on whether a person can hold shifts on two sites in the same week. Is the 11-hour check scored against that person's shifts on one site, one team, or every shift they hold platform-wide? Until OQ-1 resolves, the builder does not know what set of shifts to check the rest rule against."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by qa, platform-architect. Split from D-18 on 2026-07-18 (salience review), separating this measurement-scope question from D-18b's fixed-value question, per the one-defect-one-question rule. Narrows clean area 3 below: FB-5's overlap and rest-rule blocking mechanism is still cleanly answered, but its measurement scope is not.

### D-18b: the 11-hour rest rule's fixed value has no configuration point

- **Location:** Section 6: "Rest-period rule (11 hours) | Platform (fixed)"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** platform-architect
- **Catching question looks like:** "Section 6 fixes the 11-hour rest rule as a platform constant with no configuration point. Is that number ever expected to vary, for example a different statutory minimum in a different market, or is 11 hours genuinely universal? As drawn there is no surface to change it if the answer is ever no."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by qa, platform-architect. Split from D-18 on 2026-07-18 (salience review), separating this fixed-value question from D-18a's measurement-scope question, per the one-defect-one-question rule. Narrows clean area 3 below alongside D-18a: the blocking mechanism itself remains cleanly answered.

### D-19: no withdrawal or cancellation path for a proposed swap

- **Location:** Section 5, FB-4: "A team member proposes a swap of one of their shifts, either with a named colleague or to the team. The swap takes effect once it completes under the workspace's approval policy"
- **Gap class:** MISSING
- **Expected persona(s):** end-user
- **Catching question looks like:** "Once I propose a swap, FB-4 only describes it completing or being blocked at proposal for a conflict. What if I change my mind, or my circumstances change, before the colleague or manager acts on it? Can I withdraw the proposal, or am I committed the moment I tap propose?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by end-user (raised independently across the sweep).

### D-20: unclear whether a coverage warning blocks publish or is only advisory

- **Location:** Section 5, FB-1: "raises a coverage warning wherever a period falls below the site's configured minimum headcount per role" versus FB-2's publish deadline, which blocks publishing only on the 7-day date rule and says nothing about unresolved warnings
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** engineer, qa
- **Catching question looks like:** "FB-1 raises a coverage warning for an understaffed period, but FB-2's publish block is defined purely by date: 7 days out. Can a manager publish a rota that still has an open coverage warning, or does the builder block that too? If it is advisory only, what is the point of the warning at publish time, and if it blocks, FB-2 needs to say so."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by end-user.
- **Salience:** uncaught on first outing, 2026-07-18 panel v2; review after the next panel.

### D-21: no fallback when an open shift is never taken, despite feeding the unfilled-shift goal

- **Location:** Section 5, FB-3: "offered fairly among eligible team members who have opted in to extra hours. The first to accept is assigned and the offer closes for everyone else" versus Section 1, G-1: "measured across all active sites"
- **Gap class:** MISSING
- **Expected persona(s):** end-user, qa
- **Catching question looks like:** "FB-3 describes an offer being accepted; it does not say what happens if nobody accepts, or if the same unpopular shift is offered, declined by everyone eligible, and offered again. Does it return to the manager, get re-offered on a timer, or sit open indefinitely? G-1's whole target, cutting unfilled shifts from 8% to 4%, depends on what happens in exactly this case."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by end-user.
- **Salience:** uncaught on first outing, 2026-07-18 panel v2; review after the next panel.

### D-22: no audit trail for who initiated, approved or declined a swap

- **Location:** Section 5, FB-4: "The swap takes effect once it completes under the workspace's approval policy" versus Section 7's data list: "shift assignments, swap and offer history, notification delivery records", which names history but no accountability record
- **Gap class:** MISSING
- **Expected persona(s):** security-compliance
- **Catching question looks like:** "FB-4 lets a swap complete under a workspace's own approval policy, which section 2 says varies by customer and can require manager sign-off or two approvals for some roles. Section 7 keeps swap and offer 'history' but names no record of who approved or declined a given swap, or when. When a worker disputes a swap they say they never agreed to, what can be reconstructed, the same accountability gap D-5 raises for rota edits, but here for the approval decision itself?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by security-compliance.

### D-23: the agent execution contract's protected-boundary list omits two named dependencies

- **Location:** Agent execution contract: "Do not change: the clock-in flow, the timesheet CSV export contract, the identity service integration" versus Section 8's dependency list: "the platform notifications service (push, SMS, email); the Shiftly identity service; the absence calendar read API (platform team)"
- **Gap class:** MISSING
- **Expected persona(s):** platform-architect, engineer
- **Catching question looks like:** "The identity service is both a named dependency and a protected 'do not change' boundary. The notifications service and the absence calendar read API are named dependencies too, but neither appears on the do-not-change list. Is that an oversight, or is it deliberate because this slice is allowed to change those integrations? If it's an oversight, an agent building this slice has no signal that breaking either one is out of bounds."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by platform-architect.
- **Salience:** uncaught on first outing, 2026-07-18 panel v2; review after the next panel.

### D-24: no subject-access, correction or erasure path for any held data category

- **Location:** Section 7: "Data held by this slice: shift assignments, swap and offer history, notification delivery records... the customer is the data controller and Shiftly the processor, per the existing platform data processing agreement"
- **Gap class:** MISSING
- **Expected persona(s):** data-protection
- **Catching question looks like:** "Section 7 names the data this slice holds and the controller/processor split, but nothing describes how a worker's subject-access, correction or erasure request against any of these categories is fulfilled, or how a controller's instruction to act on one reaches this slice. D-15 asks how long the data is kept; this asks what happens when someone exercises a right over it before that period is up."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by data-protection.

### D-25: no commercial metric sits alongside the operational goals despite the stated conversion rationale

- **Location:** Decision summary: "the reason trial customers cite for not converting" versus Section 1's goals table, G-1 to G-4, all operational (unfilled shifts, builder time, adoption, swap rework)
- **Gap class:** MISSING
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "This slice is justified partly by trial conversion: it's 'the reason trial customers cite for not converting'. None of G-1 to G-4 measures conversion itself, only operational proxies. If we hit all four operational goals but trial-to-paid conversion does not move, has this slice succeeded or failed? Without a commercial goal alongside the operational ones, that question has no answer."
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by commercial-viability.

### D-26: no fair-use ceiling or cost model for the variable-cost mechanisms this slice introduces

- **Location:** Section 5, FB-3 and FB-4 (unbounded open-shift offers and swaps); Section 6: notification channels including SMS are workspace configuration, not tier-gated; Section 8: "notification fatigue if offers are broadcast too widely (mitigation: offer targeting is reviewed in the first post-launch retro)"
- **Gap class:** MISSING
- **Expected persona(s):** commercial-viability
- **Catching question looks like:** "Open-shift offers and swaps can fire an unbounded number of notifications, including paid SMS, on any plan, since only the marketplace feature itself is Premium-gated, not the notification volume it or ordinary swaps generate. On a flat-priced non-Premium plan, what stops a high-churn site from generating a variable cost with no matching revenue? Section 8's fatigue mitigation is scoped as a UX retro; is the cost side of the same volume driver anyone's job to watch?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by commercial-viability (consolidated from several related cost-angle observations across the sweep: SMS cost, tier cost-allocation, retention storage cost).

### D-27: no staleness threshold or alerting for the offline degrade-to-last-synced behaviour

- **Location:** Section 7: "the schedule view degrades gracefully to the last-synced rota when offline; a staleness banner shows the last sync time"
- **Gap class:** MISSING
- **Expected persona(s):** operations-support
- **Catching question looks like:** "The staleness banner shows the last sync time, but nothing says how stale is too stale. Is there a threshold beyond which this becomes a supportable incident rather than a normal offline moment, who gets alerted (the site, the operations lead, nobody), and what does a support agent see when a customer reports staff working off a schedule that is hours or days out of date?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by operations-support.

### D-28: statutory staffing minimums are not distinguished from operational-preference minimums

- **Location:** Section 2: "one large leisure chain requires two approvals for lifeguard roles" versus Section 5, FB-1: "raises a coverage warning wherever a period falls below the site's configured minimum headcount per role", which treats every role's minimum identically
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** regulator
- **Catching question looks like:** "Section 2 flags lifeguard roles as carrying extra approval weight, which reads as a statutory safety minimum (a pool cannot legally operate below a lifeguard ratio), not a staffing preference like an extra till operator on a busy Saturday. FB-1 treats every role's configured minimum the same way, a soft coverage warning. Should a shortfall against a statutory minimum carry a harder consequence, such as blocking publish or escalation, than a shortfall against a preference-driven one, and how does the system know which kind of minimum it is looking at?"
- **Provenance:** banked 2026-07-18, full-panel sweep curation, surfaced by regulator.
- **Salience:** uncaught on first outing, 2026-07-18 panel v2; review after the next panel.

## Clean areas (for scoring false positives)

Sections a persona might reflexively flag, which the key marks as cleanly
answered. A question treating any of these as a gap is a false positive.

1. **Payroll export non-scope (section 4).** Explicitly out, with the named workaround (existing timesheet CSV export) and a pointer to the separate scoped slice (PRD-2026-009). "Where is payroll integration?" is answered in the text.
2. **Rota view performance (section 7).** A concrete, testable target: under 2 seconds at the 95th percentile, sites up to 200 staff, named reference device and network. Flagging this NFR as vague or missing is a false positive.
3. **Conflict prevention, narrowed 2026-07-18 (section 5, FB-5).** The blocking mechanism itself is precisely stated, enforced on every assignment path, with an acceptance check naming the observable error; questions asking "what stops double-booking?" are answered cleanly. This clean area no longer covers the rest rule's measurement scope or its fixed value: questions about how the rule interacts with overnight shifts are D-10, and questions about whether the 11 hours is scored within one site/team or across all of a person's shifts platform-wide are D-18a, and questions about whether 11 hours itself is configurable are D-18b. Neither is a false positive.

None of the three clean areas above conflict with D-13, D-14 or D-15: payroll
export non-scope, rota view performance and FB-5 conflict prevention are
untouched by the missed-deadline escalation gap, the Premium-tier marketplace
gap or the retention gap. Clean areas 1 and 2 stand as written against D-16 to
D-28 too. Clean area 3 was narrowed on 2026-07-18 (see its entry above): D-18a
and D-18b's rest-rule scope and fixed-value questions sit outside what clean
area 3 now covers, alongside the existing D-10 carve-out for overnight shifts;
the blocking mechanism itself remains cleanly answered.

## Per-persona seed counts (this benchmark)

| Persona | Seeded | Defect ids |
|---|---|---|
| engineer | 10 | D-2, D-7, D-8a, D-8b, D-10, D-13, D-16, D-17, D-20, D-23 (most shared with another persona) |
| qa | 11 | D-1, D-2, D-8b, D-10, D-12, D-14, D-16, D-17, D-18a, D-20, D-21 |
| end-user | 4 | D-9, D-11, D-19, D-21 |
| security-compliance | 2 | D-5, D-22 |
| platform-architect | 4 | D-4, D-18a, D-18b, D-23 |
| data-protection | 3 | D-3, D-15, D-24 |
| accessibility | 2 | D-6, D-11 (D-11 shared with end-user, added 2026-07-18) |
| commercial-viability | 3 | D-14, D-25, D-26 |
| operations-support | 3 | D-7, D-13, D-27 |
| regulator | 2 | D-3, D-28 |

## Per-class counts (this benchmark)

| Gap class | Count | Defect ids |
|---|---|---|
| AMBIGUOUS | 6 | D-8a, D-9, D-18a, D-18b, D-20, D-28 |
| CONTRADICTS | 3 | D-2, D-3, D-4 |
| EDGE-CASE | 5 | D-8b, D-10, D-11, D-16, D-17 |
| MISSING | 14 | D-5, D-6, D-7, D-13, D-14, D-15, D-19, D-21, D-22, D-23, D-24, D-25, D-26, D-27 |
| UNMEASURABLE | 2 | D-1, D-12 |
