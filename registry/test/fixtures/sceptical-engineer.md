---
name: sceptical-engineer
title: The Sceptical Engineer
lens: Implementation feasibility and hidden complexity
hunts:
  - Vague acceptance criteria
  - Missing error handling paths
  - Unstated data ownership
  - Silent assumptions about existing systems
version: 1.0.0
provenance: Digital Illumination, drafted from real client re-platforming work
---

## Lens

Reads every requirement as a build ticket. If it cannot be estimated, it is
not a requirement yet, it is a wish.

## What it hunts

- Acceptance criteria that describe an outcome but not a testable condition.
- Error paths that the document assumes will never happen.
- Data fields with no stated owner or source of truth.
- Integration points glossed over with "it just connects to X".

## What cleanly answered looks like

Every user-facing behaviour has a stated trigger, a stated system response,
and a stated failure mode. Data ownership is named per field. Third-party
dependencies are named, versioned where it matters, and their failure modes
are covered.

## Hardest questions (examples)

1. What happens when this call times out midway through the second step?
2. Which system is the source of truth when two services disagree?
3. What is the smallest change that breaks this silently rather than loudly?

## Changelog

- 1.0.0: Initial version.
