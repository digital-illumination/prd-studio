# Validation report: the recommended shape

`VALIDATE-BUILD` grades a finished build against a signed PRD. This is the
studio's recommended shape for that report, and for any downstream reviewer
or agent (human or automated) writing one against a PRD this studio
produced. It is a convention, not a hard requirement enforced by the skill
itself: adopt it whole, or adapt it to a house style, but a reviewer reading
one of these reports cold should get the same thing every time.

Verdict-first: a reviewer reads the first screen and knows the state of
play; the per-behaviour detail follows for whoever needs it.

## Shape, in order

1. **Heading, exact and stable.** The report's first line names the PRD it
   grades, e.g. `## Validation: PRD-2026-014`. If a downstream tool posts
   this report as a comment and updates it in place on re-runs (see "An
   optional pipeline pattern" below), the heading is the string that tool
   matches on to find its own prior comment: keep it exact and do not
   repeat it elsewhere in the document.
2. **Verdict line, with counts**, immediately under the heading: evidence
   for a human merge decision, never a verdict itself. A single bold
   summary line giving the finding counts by severity and the headline
   completeness figures, e.g. `**Summary: 0 blocking, 3 advisory, 4 notes.
   9 of 9 behaviours have stable ids. 4 of 4 goals have testable pass
   conditions.**`
3. **Scorecard**, one row per NFR class from `prd-template.md` §7
   (Outcome-level acceptance, Scale/load/integration, Security & privacy,
   Cost/run-cost, Accessibility, Retention & audit), named, never numbered:
   a status column (good / advisory / blocking) and a one-line findings
   summary per class.
4. **A single horizontal rule (`---`) immediately after the scorecard
   table, before any findings.** Nothing above this rule repeats below it.
   A tool extracting a compact summary (see "An optional pipeline pattern"
   below) takes everything from the heading down to and including this
   rule as a literal string match, not a parse: do not place a `---`
   anywhere above this point for any other reason.
5. **Findings, six-field form, sorted blocking first, then advisory, then
   note.** Each finding:

   ```
   **[RULE-ID] <severity>: <short title>**
   - Location: <behaviour or goal id(s), or section>
   - What: <the defect itself, one or two sentences>
   - Why: <why it matters, one or two sentences>
   - Fix: <a concrete suggested fix, actionable without a follow-up question>
   ```

   A rule id is a short, stable tag naming the finding class (for example
   `NFR-A11Y-001`, `CONF-001`); reuse the same id across runs for the same
   recurring finding class so a re-run's findings are comparable to the
   last one, not renamed each time.
6. **Open questions and NFR-class gaps**, after the findings: the register
   rows this report's own checking touched, and any NFR class the PRD
   itself is silent on, each as before, unchanged in substance, just placed
   after the findings rather than mixed through a per-behaviour table.

Mark the whole report clearly as evidence for a human reviewer, never a
merge decision.

## Severity: blocking / advisory / note

A fixed three-value scale, not an invented vocabulary per report.

- **Blocking**: the PRD is silent, with no "not applicable, because..."
  statement, on an NFR class this product's own non-functional policy (if
  one exists) marks settled, or the gap sits on a critical surface named in
  the PRD's own "do not change" list, with no register row anywhere naming
  it. Must resolve before merge.
- **Advisory**: the PRD is silent on a class that is itself still
  provisional or unconfirmed (the product's own policy has a gap too, not
  only the PRD), or the finding is a partial or isolated gap rather than a
  systemic one, or a genuinely missing register row for something outside
  the critical-surface list. Should resolve; the reviewer's own judgement
  on timing, not a merge blocker on its own.
- **Note**: informational. A resolved ambiguity worth flagging, a
  background cross-check against context material, a parked-and-owned
  register row surfaced for visibility, or a terminology observation. No
  action required.

If a finding's severity is genuinely unclear against this mapping, say so in
the finding's own "Why" field rather than silently picking a tier.

## Markdown safety, parameterised per host

Different repositories and PR hosts render markdown differently; a report
generated for one host and pasted into another can silently lose structure
(a collapsible `<details>` block, for instance, that one host renders as a
real toggle and another prints as raw tags). State the host profile the
report targets, once, near the top of whichever project or repository
consumes this convention, and hold to it:

- **Widely portable subset** (the safe default when the host is unknown):
  headings, paragraphs, pipe tables, bold and italics, bullet and numbered
  lists, fenced code blocks. Avoid `<details>`, mermaid diagrams, and raw
  HTML unless the target host is confirmed to render them.
- **GitHub-flavoured markdown** (GitHub, most modern chat and wiki
  renderers): the safe subset above, plus task lists (`- [ ]`), collapsible
  `<details>` blocks, and mermaid diagrams in a committed file's own
  preview.
- **Azure DevOps** (a host with real, documented gaps against GitHub-flavoured
  markdown): the safe subset above, plus task lists and emoji; never
  `<details>` (renders as raw tags in both a repository file view and a PR
  comment) and never mermaid in a PR comment (renders only in a committed
  file's own preview). If a table cell needs a line break, restructure as
  two rows or a nested bullet; do not rely on `<br>`.

Treat the host profile as a fact about the repository the report lands in,
never a universal rule this document states once and forgets: a PRD Studio
adopted into a new host should confirm which profile applies before the
first report is written, not assume Azure DevOps's constraints are the
rule rather than one host's own limitation.

## No em dashes

Do not use the em dash character (U+2014) anywhere in a validation report,
in any finding, or in any extracted summary: use a comma, a full stop, a
colon, a spaced hyphen ( - ), or parentheses instead.

## An optional pipeline pattern

Some hosts benefit from posting the extracted compact summary (point 4
above) as a single comment on a PR, updated in place on every subsequent
run rather than posted fresh each time, so a reviewer re-checking a thread
always sees the current state rather than a stack of stale comments. This
is a genuinely useful pattern where CI wiring exists, and it needs nothing
more than: a stable heading string a script can match on, and a step that
finds a prior comment starting with that string and patches it rather than
posting a new one. It is not part of this skill's own commands; wire it in
the host's own CI configuration if and when that CI exists. The full report
stays a committed file linked from the comment, never duplicated into it.
