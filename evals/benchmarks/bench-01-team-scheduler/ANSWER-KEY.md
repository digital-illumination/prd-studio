# Answer key: bench-01-team-scheduler (Shiftly)

Twelve seeded defects. Scoring rules are in `../../README.md`. "Location"
gives the section and a quote fragment sufficient to find the seed. Where two
personas are listed, either catching it counts for that persona's rate.

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

- **Location:** Section 6 table: "Swap approval workflow | Platform (fixed: every swap requires the duty manager's approval)" versus Section 2: "Every customer we interviewed runs a different swap-approval policy" and FB-4's "the workspace's approval policy"
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

- **Location:** Section 5, FB-2 and FB-6 describe only the happy path; sections 5 and 7 define no behaviour for notification delivery failure, partial publish, or how support diagnoses "my team says they were never told"
- **Gap class:** MISSING
- **Expected persona(s):** operations-support, engineer
- **Catching question looks like:** "Publish notifies every assigned team member; what happens when a quarter of those notifications fail (dead device tokens, SMS provider outage)? Is the rota considered published anyway, is the manager told, can delivery be retried, and what can a support agent see when a customer reports staff who never heard?"

### D-8: 'fairly among eligible' is undefined and sits oddly with first-to-accept

- **Location:** Section 5, FB-3: "offered fairly among eligible team members who have opted in" and "The first to accept is assigned"
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** engineer
- **Catching question looks like:** "FB-3 says open shifts are offered 'fairly among eligible team members'. Eligible by what: role match, site, rest-rule headroom, contracted-hours limits? And what does 'fairly' mean when the same sentence says first to accept wins, which favours whoever checks their phone fastest? I cannot build this without an ordering rule."

### D-9: staff notification on post-publish changes is undefined

- **Location:** Section 3, team member scenario: "always sees an up-to-date picture of the week ahead" and Section 5, FB-2: "edits update the team's view immediately", but FB-6's notification list covers only publish, offers and swap outcomes, not changes to an individual's published shifts
- **Gap class:** AMBIGUOUS
- **Expected persona(s):** end-user
- **Catching question looks like:** "If my manager moves or removes my shift after publish, FB-6 never notifies me; I only find out if I happen to open the app. The scenario says I 'always see an up-to-date picture', but is the contract that I am told when my own shift changes, or that I must keep checking? Those are very different jobs for me."

### D-10: overnight shifts and clock changes do not fit the shift model

- **Location:** Section 5, preamble: "A shift is defined by its date, a start time and an end time"; no handling anywhere for shifts crossing midnight or for daylight saving transitions
- **Gap class:** EDGE-CASE
- **Expected persona(s):** qa, engineer
- **Catching question looks like:** "A bar close shift runs 18:00 to 02:00: which date does it belong to, how does the 11-hour rest rule in FB-5 measure against it, and what happens to a shift spanning the October clock change, does the worker work the repeated hour and does the rota show it?"

### D-11: staff without personal smartphones have no path

- **Location:** Section 8, assumption: "team members have personal smartphones and keep the Shiftly app installed"; every scenario in section 3 is app-based
- **Gap class:** EDGE-CASE
- **Expected persona(s):** end-user
- **Catching question looks like:** "Plenty of kitchen and warehouse staff do not bring a phone onto the floor, share a device, or will not install a work app on a personal phone. How do they see the rota, receive offers, or get told about swaps? A printed rota on the wall is the incumbent; what replaces it for them?"

### D-12: untestable acceptance check on notifications (subtle)

- **Location:** Section 5, FB-6 acceptance check: "notifications arrive without undue delay and feel timely to staff"
- **Gap class:** UNMEASURABLE
- **Expected persona(s):** qa
- **Catching question looks like:** "'Without undue delay' and 'feel timely' cannot be verified before release. What is the delivery target (for example, 95% of publish notifications delivered within 5 minutes), and how is it measured?"

## Clean areas (for scoring false positives)

Sections a persona might reflexively flag, which the key marks as cleanly
answered. A question treating any of these as a gap is a false positive.

1. **Payroll export non-scope (section 4).** Explicitly out, with the named workaround (existing timesheet CSV export) and a pointer to the separate scoped slice (PRD-2026-009). "Where is payroll integration?" is answered in the text.
2. **Rota view performance (section 7).** A concrete, testable target: under 2 seconds at the 95th percentile, sites up to 200 staff, named reference device and network. Flagging this NFR as vague or missing is a false positive.
3. **Conflict prevention (section 5, FB-5).** Overlap and 11-hour rest rules are precisely stated, enforced on every assignment path, with an acceptance check naming the observable error. Questions asking "what stops double-booking?" are answered cleanly. (Questions about how the rest rule interacts with overnight shifts are D-10, not a false positive.)

## Per-persona seed counts (this benchmark)

| Persona | Seeded | Defect ids |
|---|---|---|
| engineer | 4 | D-2, D-7, D-8, D-10 (D-2, D-7, D-10 shared with another persona) |
| qa | 4 | D-1, D-2, D-10, D-12 |
| end-user | 2 | D-9, D-11 |
| security-compliance | 1 | D-5 |
| platform-architect | 1 | D-4 |
| data-protection | 1 | D-3 |
| accessibility | 1 | D-6 |
| commercial-viability | 0 | (covered in bench-02) |
| operations-support | 1 | D-7 |
| regulator | 1 | D-3 |
