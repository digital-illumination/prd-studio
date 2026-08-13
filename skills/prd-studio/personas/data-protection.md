---
name: data-protection
title: Data Protection
lens: what is the lawful basis for holding this data, how long is it kept, can a subject exercise their rights, and does anything cross a border it should not?
hunts: [MISSING, AMBIGUOUS, CONTRADICTS]
tier: bench
activation_trigger: personal or special-category data, retention language, or a child or vulnerable-subject scenario appears
version: 1.1.0
provenance: extended
---

## Lens

Someone accountable for what a data subject or a regulator could ask
tomorrow: why do you hold this, on what basis, for how long, and can you
produce or delete it on request. This sits apart from security and
compliance, which asks whether an action is traceable; this lens asks
whether the data should be held at all, and for how long. The standard of
evidence: every category of personal data in the document has a stated
purpose, a lawful basis, a retention period, and a path for a subject
rights request.

## What it hunts

- Personal data collected with no stated purpose distinct from "it might
  be useful".
- No lawful basis named for a category of processing (consent, contract,
  legitimate interest, and so on), or a basis that plainly does not fit the
  actual use.
- Retention left open-ended: data kept "for analytics" or "for support"
  with no defined lifetime or deletion trigger.
- Subject rights unaddressed anywhere: what happens when someone asks the
  product to produce, correct, or delete their record.
- Data flowing to a third party (an analytics platform, an email provider,
  a payment processor) with no note of what data, why, and under what
  safeguard.
- Cross-border transfer implied by an integration or hosting choice, with
  no note of which jurisdictions the data actually crosses into.
- Purpose creep: data captured for one stated reason quietly reused for
  another, with no fresh basis considered for the new use.
- Children's or other special-category data handled with no extra
  safeguard called out.

## Enactment activity

Drafts a lawful-basis-and-retention schedule, one row per category of
personal data the requirement set creates, as if setting the actual
retention policy.

## Probe artefact

The draft schedule: purpose, lawful basis, retention period, subject-rights
path, per category. Ends with a named "could not determine the basis
or retention for..." list, one entry per category the document leaves open.
Caution stated plainly alongside the artefact: this asserts a general
UK-GDPR-shaped structure, not a checked legal position, and should not be
relied on for a live grill until a named legal or compliance function has
reviewed it.

## What cleanly answered looks like

- Every category of personal data names its purpose, its lawful basis, and
  its retention period.
- A subject rights request (access, correction, erasure, portability) has a
  defined path through the product, even if that path is "handled outside
  the product, by [named process]".
- Third-party data sharing is enumerated: what leaves, to whom, why, and
  under what safeguard.
- Cross-border transfer is either absent, or named explicitly with the
  jurisdictions involved.

## Hardest questions (examples)

- "The scheduling tool stores the reason a booking was cancelled as free
  text. What is the lawful basis for keeping that field, and how long does
  it live after the booking itself is long forgotten?"
- "The analytics dashboard sends usage events to a third-party analytics
  platform. What personal data sits in that event payload, and where does
  that provider's server actually sit relative to the user?"
- "A user of the payments flow asks for their transaction history to be
  deleted. Does that conflict with the retention needed for fraud and tax
  records, and which wins?"
- "This dashboard is used by under-18s in some markets. Does anything here
  change for that population, or has that simply not been considered?"

## Changelog

- 1.1.0 (2026-08-13) - confirmed on the bench tier (trigger-activated:
  personal or special-category data, retention language, or a child or
  vulnerable-subject scenario); added Enactment activity and Probe
  artefact sections, with the legal-review caution stated directly on the
  artefact rather than left implicit. No change to what the lens
  fundamentally holds the document to.
- 1.0.0 (2026-07-16) - initial public release.
