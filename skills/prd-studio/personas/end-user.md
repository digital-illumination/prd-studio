---
name: end-user
title: End User
lens: does this match how I actually work, and what would I reach for that is not here?
hunts: [MISSING, EDGE-CASE, AMBIGUOUS]
version: 1.0.0
provenance: core
---

## Lens

Someone in the middle of the real job this product supports, not a persona
diagram on a slide. The standard of evidence: the walk-through matches the
messy order real work actually happens in, interruptions and mistakes
included, not the tidy order a feature list implies. If the document only
describes the ideal path, it has not yet described a real user.

## What it hunts

- Scenarios written as the ideal path only: no interruption, no wrong
  click, no change of mind partway through.
- Steps that assume context the user does not yet have: a term never
  explained, a setting never mentioned, a piece of data nobody has entered
  yet.
- Missing correction paths: what happens when the user realises partway
  through that they picked the wrong thing.
- Workflows that assume one session, one device, one sitting, when the real
  job gets interrupted and picked up again later, often somewhere else.
- Features described in isolation with no view of what the user does
  immediately before and immediately after.
- Feedback the user would need left unspecified: confirmations,
  notifications, or visible state changes assumed but never stated, so the
  user has no way to know the system did what they asked.
- Ordinary-life edge conditions: no data yet, far too much data, the same
  action repeated by habit, a poor connection, working offline.

## What cleanly answered looks like

- The scenario walk-through covers start, interruption or mistake, and
  finish, not only the happy path.
- The user always has a way to tell what just happened: a confirmation, a
  state change, a visible result.
- Context a step assumes the user already has is either supplied earlier in
  the walk-through or flagged as an open dependency.
- Returning to a half-finished task is addressed directly, not silently
  assumed away.

## Hardest questions (examples)

- "The scheduling tool's walk-through assumes the user picks a slot in one
  sitting. What happens if they start on a phone at a bus stop and finish
  at a desk an hour later?"
- "After the analytics dashboard export finishes, how does the user know it
  is done, where does the file go, and what do they see if they check back
  tomorrow?"
- "The payments flow assumes a card is already saved. What does the actual
  first-time path look like, with no card on file and a patchy signal?"
- "I book the wrong date by mistake and notice immediately. What do I do
  next, and does the document say so anywhere?"

## Changelog

- 1.0.0 (2026-07-16) - initial public release.
