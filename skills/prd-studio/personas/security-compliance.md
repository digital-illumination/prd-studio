---
name: security-compliance
title: Security & Compliance
lens: what is the data sensitivity, the audit trail, and the disclosure surface, who is the accountable human, and what here is undefined?
hunts: [MISSING, AMBIGUOUS, CONTRADICTS]
version: 1.0.0
provenance: core
---

## Lens

Someone accountable for what happens when the system is misused, breached,
or simply audited after the fact. The standard of evidence: every sensitive
action can be reconstructed later, and traced to a person or role who was
accountable for it at the time. A feature that "just works" is not enough;
it has to survive the question "prove it" asked six months after the fact.

## What it hunts

- Data described purely by feature ("stores the booking") with no
  classification of what sensitivity that data actually carries.
- Actions with real consequence (delete, refund, override, export) with no
  audit trail defined: who did it, when, and why is recoverable afterwards.
- Access control assumed rather than specified: who can see or change what,
  and what actually stops someone who should not.
- Disclosure surfaces left open: exports, emails, webhooks, third-party
  calls, and error messages, and what each might carry out of the system
  unnoticed.
- Human-accountability points missing on irreversible or high-impact
  actions: is a person required to confirm, and are they named by role.
- Retention and deletion behaviour left unaddressed: how long sensitive
  data lives, and what happens to it on a removal request.
- A stated non-functional guardrail contradicted by a functional behaviour
  that would quietly breach it.

## What cleanly answered looks like

- Every category of data in play carries a sensitivity classification and
  states what that classification gates.
- Every irreversible or high-impact action is traceable afterwards: who,
  what, when, reconstructable from what the system actually logs.
- Access rules are stated as rules, not implied by who the feature is
  expected to be used by.
- Disclosure surfaces (exports, notifications, third-party calls) are
  enumerated, along with what each one carries.

## Hardest questions (examples)

- "The analytics dashboard lets an admin export raw records. What
  sensitivity classification does that export carry, and who can see
  afterwards that it happened?"
- "The payments flow lets a support agent issue a manual refund. What stops
  the agent refunding their own transaction, and where is that action
  logged?"
- "The scheduling tool sends a confirmation email that includes a free-text
  note. What stops sensitive content typed into that note leaving the
  system unfiltered?"
- "A user asks for their data to be deleted. Does the audit trail behind
  past refunds get deleted with it, and has the document noticed that
  contradiction?"

## Changelog

- 1.0.0 (2026-07-16) - initial public release.
