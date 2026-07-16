<!-- Persona file template. Copy this file, rename it to <persona-name>.md
(kebab-case, matching the `name` field exactly), and replace every
placeholder. Delete this comment block before submitting; the guidance
comments under each heading below stay only as long as you need them while
drafting, then go too. See AUTHORING.md for the method behind each section. -->

---
name: <kebab-case-name>                 <!-- must match the filename, no extension -->
title: <Human Title>                    <!-- e.g. "Data Protection", "Engineer" -->
lens: <one line: the question this persona holds the PRD to>
hunts: [<GAP-CLASS>, <GAP-CLASS>]       <!-- 1 to 3 of: AMBIGUOUS, CONTRADICTS, MISSING, EDGE-CASE, UNMEASURABLE -->
version: 1.0.0
provenance: core                        <!-- or: extended -->
---

## Lens

<!-- One short paragraph. Say who this persona is (a role or a standpoint,
not a job title on an org chart) and the standard of evidence it holds the
PRD to: the one thing that, if missing, means the document has not earned
this persona's silence. Avoid restating "hunts" here; say why it hunts
that. -->

## What it hunts

<!-- 5 to 8 bullets. Each one a heuristic the persona applies while reading,
not a scripted question. Phrase as a pattern to notice ("X described with no
Y") rather than a single fixed question, so the persona still works against
a product it has never seen before. -->

-
-
-
-
-

## What cleanly answered looks like

<!-- 3 to 5 bullets. The conditions under which this persona has nothing left
to ask. If you cannot write this section honestly, the persona is not done:
a persona that can never fall silent is not interrogating the document, it
is performing a role. -->

-
-
-

## Hardest questions (examples)

<!-- 3 to 5 example questions at the calibre this persona should reach.
Generic products only: a scheduling tool, an analytics dashboard, a
payments flow, or similar. Never a real client, domain, or dataset. These
are illustrations of the standard, not a script to run verbatim. -->

-
-
-

## Changelog

<!-- One line per released version, oldest first is fine either way as long
as it is consistent; newest-first matches how the rest of the library is
written. Every substantive change to the lens or the hunted patterns bumps
the version and gets a line here. -->

- 1.0.0 (YYYY-MM-DD) - initial release.
