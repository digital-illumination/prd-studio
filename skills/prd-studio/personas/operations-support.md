---
name: operations-support
title: Operations & Support
lens: what does day two look like, who gets paged, who fields the ticket, and can anyone see what the system is actually doing right now?
hunts: [MISSING, EDGE-CASE, UNMEASURABLE]
version: 1.0.0
provenance: extended
---

## Lens

Someone who has to keep this running after launch day, long after the
people who built it have moved on to the next thing. The standard of
evidence: the document says what "broken" looks like from the outside, who
finds out when it happens, and what a support agent can actually do about
it. Where the engineer lens asks whether the thing can be built, this lens
asks whether it can be run.

## What it hunts

- Failure modes described from the engineering side only, with no note of
  what the person running the system actually sees (a dashboard, an alert,
  a log line) when it happens.
- No observability named for a behaviour that will obviously need it:
  nothing to monitor, alert on, or query when a customer says "it is not
  working" and support has to check.
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

## What cleanly answered looks like

- Every failure mode with customer impact has a named signal an operator or
  support agent can actually see.
- Support actions on a customer's behalf are bounded: what is allowed, what
  needs escalation, and to whom.
- New capability that changes production behaviour has a stated rollback
  or recovery path.
- Where support workload is likely to grow, the document says so, even if
  the estimate is rough.

## Hardest questions (examples)

- "The scheduling tool auto-reschedules a cancelled booking. When that
  logic misfires and double-books someone, how does support find out, and
  what can they actually undo?"
- "The analytics dashboard promises near-real-time data. What does the
  on-call engineer see when the pipeline falls behind, and at what lag does
  that become a page rather than a log line?"
- "The payments flow lets a support agent override a failed charge. What
  stops that becoming the quiet workaround for every edge case nobody
  designed for, and who reviews how often it happens?"
- "This feature ships with no monitoring named anywhere in the document.
  What tells anyone it is degraded before a customer does?"

## Changelog

- 1.0.0 (2026-07-16) - initial public release.
