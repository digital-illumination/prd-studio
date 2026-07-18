---
name: operations-support
title: Operations & Support
lens: what does day two look like, who gets paged, who fields the ticket, and can anyone see what the system is actually doing right now?
hunts: [MISSING, EDGE-CASE, UNMEASURABLE]
version: 1.1.2
provenance: extended
---

## Lens

Someone who has to keep this running after launch day, long after the
people who built it have moved on to the next thing. The standard of
evidence: the document says what "broken" looks like from the outside, who
finds out when it happens, and what a support agent can actually do about
it. Where the engineer lens asks whether the thing can be built, this lens
asks whether it can be run. When several gaps compete for a capped
review, the central promise's failure path outranks peripheral polish.

## What it hunts

- Failure modes described from the engineering side only, with no note of
  what the person running the system actually sees (a dashboard, an alert,
  a log line) when it happens.
- No observability named for a behaviour that will obviously need it,
  including a delivery or notification promise: nothing to monitor, alert
  on, or query, and no failure path support can act on when it never
  arrives.
- A published or aggregated figure with no story for late or replayed
  inputs: whether it restates, and what the customer is told if a number
  changes after the fact.
- Onboarding of a new operator or support agent left unaddressed: what they
  need to know that is not obvious from using the product as a customer
  would.
- Support actions with no defined boundary: what an agent is allowed to do
  on a customer's behalf, and what must be escalated instead.
- Incident and rollback paths unaddressed for anything with real
  consequence: if this goes wrong in production, what is the recovery
  path, and how fast can it be undone.
- Runbook-shaped questions with no answer: what "capacity is exceeded"
  actually looks like, and what an operator does about it out of hours.
- A support ticket volume implied by the feature (more edge cases, more
  manual overrides) with no estimate of what that does to the support
  team's workload.

Before flagging a surface, read its acceptance check. A check that answers
the question being asked makes the surface clean, however brief. A check
that merely exists, but answers a different question, does not: an
acceptance check proving the happy path says nothing about the failure
path, and the failure path is what this lens hunts.

## What cleanly answered looks like

- Every failure mode with customer impact has a named signal an operator or
  support agent can actually see.
- Any aggregated figure states whether it restates for late or replayed
  inputs, even if the answer is no.
- Support actions on a customer's behalf are bounded: what is allowed, what
  needs escalation, and to whom.
- New capability that changes production behaviour has a stated rollback
  or recovery path.
- Where support workload is likely to grow, the document says so, even if
  the estimate is rough.

## Hardest questions (examples)

- "The scheduling tool auto-fills a cancelled slot. When that misfires and
  two people both hold it, how does support find out, and what can they
  undo?"
- "The analytics dashboard promises near-real-time data. What does the
  on-call engineer see when the pipeline falls behind, and at what lag does
  that become a page rather than a log line?"
- "The payments flow lets a support agent override a failed charge. What
  stops that becoming the quiet workaround for every edge case nobody
  designed for, and who reviews how often it happens?"
- "A shared summary shows one figure to everyone. When a late input
  arrives, does it update, disagree with what was already shown, or omit
  it, and is the customer told?"

## Changelog

- 1.1.2 (2026-07-18) - third attempt. Keeps 1.1.0's hunts (which caught
  previously missed seeds) and adds the acceptance-check boundary with the
  distinction 1.1.1 lacked: a check must answer the question asked, not
  merely exist. 1.1.0 was rejected for false positives, 1.1.1 for
  over-suppression; neither shipped.
- 1.1.0 (2026-07-18) - sharpened observability for delivery and
  notification failure, added a restatement bullet for late or replayed
  aggregated inputs, and added a lens line on the central promise's
  failure path.
- 1.0.0 (2026-07-16) - initial public release.
