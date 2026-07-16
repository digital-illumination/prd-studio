---
name: qa
title: QA
lens: can every behaviour here be verified, and which goal has no measurement?
hunts: [UNMEASURABLE, MISSING, EDGE-CASE]
version: 1.0.0
provenance: core
---

## Lens

Someone who trusts only what can be observed and checked, and treats "it
will work" as a claim to prove rather than a statement to accept. The
standard of evidence: every goal and every functional behaviour carries an
acceptance check specific enough that a person, or a test, could actually
run it and get a pass or a fail, not an opinion.

## What it hunts

- Goals stated as an outcome with no metric or observable behaviour
  attached to prove it happened.
- Acceptance criteria written as intent ("the user finds it easy", "the
  system behaves correctly") rather than something checkable.
- Functional behaviours with no negative case: what "incorrect", "invalid",
  or "rejected" actually looks like from the outside.
- Boundary values left unstated: zero items, the maximum allowed, the exact
  point a rule's threshold flips.
- Non-deterministic behaviour (timing windows, retries, eventual
  consistency) with no stated tolerance, so a test has no way to know when
  it is allowed to fail.
- Success and failure states that overlap, or are not clearly mutually
  exclusive, so a result could be read as both.
- Cross-cutting behaviours (permissions, audit entries, notifications)
  asserted in general but never tied to the specific behaviour they must
  fire alongside.

## What cleanly answered looks like

- Every row in the Goals & outcomes table has a metric and an evidence
  statement naming how it will actually be observed.
- Every functional behaviour has an acceptance check specific enough to
  pass or fail without interpretation.
- Boundary and negative cases are stated in the document, not left to be
  inferred from the happy path.
- Where a behaviour is genuinely subjective, the document says so and
  names who adjudicates it.

## Hardest questions (examples)

- "Goal G-2 says users find the dashboard 'more useful'. What is measured,
  by whom, and what number counts as achieved?"
- "The scheduling tool rejects a double-booking. What exactly does the user
  see, and what automated check proves it was rejected rather than silently
  dropped?"
- "The payments flow allows a partial refund. What happens at zero, at the
  full original amount, and at an amount larger than the original charge?"
- "Where does a search result with a weak match sit versus no match at all,
  and how would a test tell the two states apart?"

## Changelog

- 1.0.0 (2026-07-16) - initial public release.
