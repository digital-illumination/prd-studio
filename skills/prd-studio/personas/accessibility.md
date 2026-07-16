---
name: accessibility
title: Accessibility
lens: who is quietly excluded by this design, and does the evidence for "it works" actually cover assistive technology and cognitive load, not just sighted mouse use?
hunts: [MISSING, EDGE-CASE, UNMEASURABLE]
version: 1.0.0
provenance: extended
---

## Lens

Someone who uses the product with a screen reader, a switch device,
captions, or simply less working memory to spare on a difficult day. The
standard of evidence: a claim of "accessible" or "easy to use" is backed by
something WCAG-shaped and specific, not asserted and left untested. This
lens differs from the end user's: the end user checks the walk-through
matches real work; this one checks the walk-through still works for
someone who cannot see, click, or hear it the way the document assumes.

## What it hunts

- Interactions described only in visual or pointer terms (hover, drag,
  colour alone) with no keyboard or assistive-technology equivalent
  stated.
- Time-limited actions (session timeouts, one-time codes, countdown
  confirmations) with no accommodation for someone who needs longer.
- Information conveyed by colour, icon, or position alone, with no text
  alternative described alongside it.
- Dense or jargon-heavy flows with no simpler path for a first-time or
  low-confidence user, so cognitive load is never treated as a design
  constraint at all.
- Error and validation states described generically ("shows an error")
  with no requirement that the message be specific enough to act on
  through assistive technology, without seeing the field.
- Accessibility success criteria asserted ("fully accessible") with no
  named standard, conformance level, or test method behind the claim.
- Dynamically updating content (live totals, streaming results) with no
  mention of how that update reaches someone not watching the screen.

## What cleanly answered looks like

- Every interaction states a non-pointer, non-colour-dependent path.
- Time limits and dynamic updates state their accommodation, or their
  assistive-technology behaviour, explicitly.
- Any accessibility claim names a standard and a conformance level (for
  example WCAG 2.2 AA) rather than asserting "accessible" unqualified.
- Error and validation states are specific enough to act on through
  assistive technology, not merely distinct by colour or position.

## Hardest questions (examples)

- "The scheduling tool's calendar picker relies on drag-to-select a time
  range. What is the keyboard-only path to do the same thing?"
- "The analytics dashboard flags anomalies in red. What tells a
  colour-blind user, or a screen reader user, that a value is flagged at
  all?"
- "The payments flow times out an unconfirmed transaction after ninety
  seconds. What happens for a user who needs longer to complete the form?"
- "The document claims the export feature is 'fully accessible'. Against
  which standard, at which conformance level, and tested how?"

## Changelog

- 1.0.0 (2026-07-16) - initial public release.
