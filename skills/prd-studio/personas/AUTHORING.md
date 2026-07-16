# Authoring a persona

A persona is a lens and a standard of evidence, not a job title. "Security
person" is a role. "Holds the document to: every irreversible action is
traceable after the fact, to a named accountable person" is a lens. Write
the second kind. If your draft reads like a badge someone would wear rather
than a test the document has to pass, it is not ready.

Use `TEMPLATE.md` as the starting file. This document is the method behind
each of its sections.

## Pick a lens that hunts a distinct failure mode

Before writing a word of the persona, answer one question: what does this
lens catch that no existing persona in the library catches? If the honest
answer is "roughly the same things as `security-compliance`, phrased
differently", stop. Either the lens is not distinct enough to justify a new
file, or it is distinct but you have described it as a restatement instead
of naming the actual gap. Read the other eleven files in this directory
first. Overlap is the most common way a new persona fails review.

A distinct lens usually comes from a standpoint the existing five (or ten)
do not occupy: a different stakeholder, a different regime, a different
point in the product's life (day one versus day two, this customer versus
the next one), or a different kind of harm (a business that cannot pay its
bills versus a user who cannot complete a task). Name that standpoint
plainly in the `lens` line.

## Write heuristics, not scripts

The "what it hunts" bullets are patterns the persona notices, not questions
lifted from one project and filed as universal. Compare:

- Scripted (wrong): "Does the booking cancellation flow send an email?"
- Heuristic (right): "Actions with real-world consequence described with no
  confirmation the affected party is told."

The scripted version only works on a booking tool and only catches one
missing email. The heuristic version fires on a payments flow, an
analytics dashboard, or anything else this persona is pointed at, and it
catches the whole family of "the system did something and nobody who
should know, knows" gaps. If a bullet only makes sense for one kind of
product, generalise it or cut it.

The "hardest questions" section is the one place scripted examples belong,
and only as illustrations of calibre, tied to generic products (a
scheduling tool, an analytics dashboard, a payments flow). Never let a
worked example creep back into the "what it hunts" bullets above it.

## "What cleanly answered looks like" is the section that keeps the persona honest

A persona that always finds something is not sharpening the document, it
is performing adversarial theatre. If you cannot write three to five bullets
describing the real conditions under which this persona has nothing left to
ask, the lens is not calibrated yet: either it is too vague to ever be
satisfied, or it is not actually checking anything specific. Write this
section before you finalise "what it hunts", not after. It is the
falsifiability test for the whole file.

A well-calibrated persona goes quiet on a well-written PRD. That silence is
the signal the method depends on: GRILL THE PRD reports a question the
document answers cleanly as *not listed*, and a persona that structurally
cannot produce that outcome breaks the convergence logic in `SKILL.md` and
`project-instructions.md`.

## Versioning and the changelog

Personas version like anything else the method depends on. Bump the minor
version (1.0.0 to 1.1.0) for a change that sharpens the lens or adds a
hunted pattern without changing what the persona fundamentally holds the
document to. Bump the major version (1.0.0 to 2.0.0) if the lens itself
changes: a different standpoint, a different standard of evidence, hunted
gap classes that shift materially. Every version bump gets a changelog line
stating what changed and why, dated. Do not silently edit a shipped
persona's lens without a version bump; a PRD grilled under version 1.0.0
and version 2.0.0 of the same persona is a different grill, and the
changelog is how that stays traceable.

## The quality bar

A new persona earns its place in the library by passing one test against
the eval benchmarks in `evals/`: it must catch at least one seeded defect
that no existing persona catches, or it must sharpen an existing catch
materially (a vaguer question one persona already asks becomes a specific,
harder one that closes the gap faster). "Sounds useful" and "covers a topic
nobody else covers" are not the bar on their own; the benchmark run is.

In practice, before proposing a persona:

1. Run the current library against the eval benchmarks and note which
   seeded defects go uncaught, or which are caught only weakly (a vague
   question rather than the hardest question that would have been asked).
2. Draft the persona against one of those gaps specifically.
3. Re-run the benchmarks with the new persona included. If it does not
   move a result, the lens is not distinct enough yet: go back to "pick a
   lens that hunts a distinct failure mode" above.
4. Record the result in the changelog line for version 1.0.0, in enough
   detail that a reviewer can see which seeded defect justified the file
   without re-running the benchmark themselves.

A persona added because it seemed thorough, rather than because it caught
something, is exactly the bloat this bar exists to prevent. A small library
of sharp personas beats a large library of overlapping ones.
