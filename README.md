# PRD Studio

A PRD co-author and sparring partner for Claude. It drafts a Product
Requirements Document from your concept material, then *grills* it: asking
you the questions the document cannot answer, refining an existing PRD
against a fresh round of scrutiny, and attacking the document from eleven
adversarial perspectives, folding every answer back in until the PRD is
**stable under interrogation**. Once you sign it, PRD Studio carries the PRD
on through decomposition, handoff to build, and validation of the finished
build against it. You stay the authority throughout: it sharpens your
intent, it never overrides it, and it never signs off. You do.

No hosted service, ever. The Studio is plain markdown any way you install
it: a skill, a set of persona files, a PRD template, project instructions
for the claude.ai route, an optional deterministic lint check, and
(optionally) a small local MCP server for persona lookup. Bring your own
Claude; nothing here touches anyone else's servers.

On the most recent recorded panel run of the public benchmark suite, under
the prior question-cap grill method, the full panel caught 69% of seeded
defects under the strict three-question cap, with near-zero false
positives. Every number is reproducible from
[`evals/BASELINES.md`](evals/BASELINES.md) using the procedures in
[`evals/RUNBOOK.md`](evals/RUNBOOK.md); this is the capped-mode figure the
runbook's own reporting rule requires for any public claim. **This figure
predates v0.3.0's move to enactment-style grilling** (below); a fresh
baseline run against the new method has not yet been done, and is the
natural next step before this number is updated or re-asserted.

## Why

Most PRDs fail late, in front of engineers, agents and eventually customers,
because nobody asked the hard questions early. The grill exists to make those
questions cheap. An unchallenged PRD is not a finished PRD; it is an untested
one.

Three rules hold the whole method together:

- **The model never invents product facts.** Anything not in your concept
  material or your answers becomes a question, not an assumption.
- **The document is the record.** Every answer is folded into the PRD's text
  in the same turn. Chat is scaffolding; the PRD is the artefact.
- **The product owner is the authority.** The grill sharpens intent; it never
  overrides it, and it never flatters you into sign-off.

## Two loops

PRD Studio sits inside a familiar shape: an outer **human judgement loop**,
where the product owner sets intent, marks the work, banks corrections, and
makes the trust call, wrapped around a fast inner **agent loop** of draft,
evidence check, adversarial pass, revise. PRD Studio is the intent end of
that shape: the grill converges intent into a PRD stable enough to build
from, and the validation commands grade the build against it once work
starts.

## The thirteen commands

Case-insensitive, with or without the leading slash.

| Group | Command | What it does |
|---|---|---|
| Authoring | `DRAFT` | Generates PRD v0 for the slice you name, goals first, each with a measurement, using only what is in the knowledge files. Every §5 requirement is written directly in one of the five EARS patterns; unknowable becomes an `[OPEN: ...]` marker. |
| Authoring | `REFINE` | Loads an existing, previously exported PRD (its three files) and grills it further: preserves every stable id, appends to the grill history rather than restarting it, and closes acceptance-scenario gaps as it goes. |
| Authoring | `GRILL ME` | Asks you up to five hard questions the PRD cannot answer from its own text, hardest first, each tagged with its section and a gap class. Your answers fold straight into the document. |
| Authoring | `GRILL THE PRD [persona ...]` | Enactment style: each installed persona drafts the downstream artefact its lens would actually produce and reports it, ending with a named couldn't-complete list. Core personas always run; bench personas run when a requirement-shape scan triggers them, or when you name them. |
| Authoring | `STATUS` | An honest convergence report: rounds run, gaps still open and whose they are, goals without measurements, per-persona convergence state, and a verdict, CONVERGED or NOT CONVERGED, with the shortest path. |
| Authoring | `EXPORT` | The complete current PRD as three files (`prd.md`, `glossary.md`, `grill-history.md`), ready to commit to a repo or paste into a wiki. |
| Personas | `PERSONAS` | Lists the installed personas: name, title, lens, tier, version, provenance. |
| Personas | `ADD-PERSONA <name>` | Scaffolds a new persona from the template, then interviews you briefly on the failure mode it should catch that no existing persona does, and whether it belongs on the core or the bench. |
| Execution | `DECOMPOSE` | From a converged PRD, emits the behaviour ledger: every functional behaviour with a stable id, a Given/When/Then acceptance check, and a blast-radius tag, applying the reuse test to sort platform from configuration. |
| Execution | `HANDOFF` | Completes the PRD's agent execution contract (read-first, do-not-change, validation loop, stop conditions, reporting) and cuts epics and stories traced to goals and behaviour ids. |
| Execution | `VALIDATE-PLAN` | An adversarial pass over a proposed execution plan against the PRD before build starts: orphaned behaviours, blast-radius overruns, where an agent would stall. |
| Execution | `VALIDATE-BUILD` | Grades a finished build against the PRD, behaviour by behaviour, demanding evidence. Verdict per behaviour: MET / PARTIAL / UNMET / NO-EVIDENCE; no evidence is never a pass. Report shape: [`VALIDATION-REPORT.md`](skills/prd-studio/VALIDATION-REPORT.md). |
| Trust | `GRILL-AUDIT` | Exports the audit pack for a completed grill round: every gap raised, its persona, its reasoning, what changed, plus blank columns for a human expert to mark each row CORRECT / PARTIAL / WRONG. |

**Sign-and-lock:** once a PRD's Status is SIGNED, it is immutable. Nothing
edits signed text; a change becomes a new revision instead, stated plainly
in the change log.

**Enforced by hooks:** on the Claude Code plugin route, sign-and-lock is not
just a convention. A `PreToolUse` hook
(`hooks/sign-and-lock-guard.js`) inspects every `Edit` or `Write` and refuses
the tool call outright when the target PRD's Metadata Status line is already
SIGNED. Blind grill runs get the same treatment: create `evals/.blind`
before spawning blind persona agents, and a second hook blocks any `Read` of
that benchmark's `ANSWER-KEY.md` until you remove it. The claude.ai project
route has no hooks, so there both rules stay instructions for the model to
follow, not mechanical guarantees.

**What "converged" means:** two consecutive grill rounds producing zero new
material gaps, every goal carrying a measurement, and the open-questions
register empty or every item explicitly parked with an owner. Not perfect.
Stable under interrogation.

Run order in practice: `DRAFT` once per slice, then alternate `GRILL ME` and
`GRILL THE PRD`, checking `STATUS` as you go, and finish every sitting with
`EXPORT`. Thirty to forty-five minutes beats a marathon; convergence usually
takes two or three sittings, not one. Starting a later sitting against a PRD
that already exists (a new stakeholder joining, a fresh grill pass wanted)
is `REFINE`, not `DRAFT` again: it loads the exported files and carries the
grill history forward instead of starting over. Once the PRD is signed,
`DECOMPOSE` and `HANDOFF` cut the build plan, `VALIDATE-PLAN` grills that
plan before work starts, and `VALIDATE-BUILD` grades the finished build
against the PRD. Run `GRILL-AUDIT` whenever you want a human expert to mark
a completed round and bank corrections back into the persona files.

A worked-example walkthrough is being published on the Digital Illumination
site; until then, the eval benchmarks under
[`evals/benchmarks/`](evals/benchmarks/) show real grill targets, and each
benchmark's `ANSWER-KEY.md` shows the calibre of catching question expected.

## The persona library

Personas are files, not hard-coded prompts:
[`skills/prd-studio/personas/`](skills/prd-studio/personas/), one markdown
file per persona, each carrying its lens, what it hunts, its enactment
activity, its probe artefact, and a changelog. This release ships eleven,
tiered core (always run) and bench (trigger-activated). `GRILL THE PRD`
runs enactment style: each persona drafts the downstream artefact its lens
would actually produce (a technical approach, a test strategy, a boundary
decision, a cost model) and reports it, ending with a named list of what it
could not complete; that list is where the classified gaps come from.

| Persona | Tier | Lens |
|---|---|---|
| Engineer | Core | Could I build this without guessing, and where would I stall? |
| QA | Core | Can every behaviour here be verified, and which goal has no measurement? |
| End User | Core | Does this match how I actually work, and what would I reach for that is not here? |
| Security & Compliance | Core | What is the data sensitivity, the audit trail, and the disclosure surface, who is the accountable human, and what here is undefined? |
| Product Peer | Core | Could a second product stakeholder defend this scope to their own leadership from the document text alone? |
| Platform Architect | Bench: a cross-product touchpoint or build-versus-configure assertion | What is core capability here versus configuration, and is the boundary between them drawn right? |
| Data Protection | Bench: personal or special-category data, retention language, or a vulnerable-subject scenario | What is the lawful basis for holding this data, how long is it kept, can a subject exercise their rights, and does anything cross a border it should not? |
| Accessibility | Bench: any customer- or user-facing surface | Who is quietly excluded by this design, and does the evidence for "it works" actually cover assistive technology and cognitive load, not just sighted mouse use? |
| Commercial Viability | Bench: a cost, pricing, or metered-dependency question | Who pays, what does it cost to serve one more customer, and what single assumption, if wrong, kills the business case? |
| Operations & Support | Bench: a live production support surface or "day two" language | What does day two look like, who gets paged, who fields the ticket, and can anyone see what the system is actually doing right now? |
| Regulator | Bench: a named regulatory regime or audit-evidence reference | Which regimes actually apply here, and if an inspector asked for evidence tomorrow, does the document show where it would come from? |

A bench persona's own trigger, stated precisely, lives in its
`activation_trigger` frontmatter line; the table above summarises it. You
can always summon or dismiss any bench persona directly on a round,
overriding the scan in either direction, and `STATUS` reports every bench
persona's state either way (`PASSED`, `GAP`, or `NOT APPLICABLE THIS PRD`
with the trigger it did not match) so an untriggered lens is a visible,
named absence, never a silent one.

This library is deliberately generic. Re-casting it for a specific product
domain (merging two lenses, adding a domain-specific seat) is expected;
[`personas/AUTHORING.md`](skills/prd-studio/personas/AUTHORING.md)'s
"Re-casting for a domain" section states the one rule that discipline
needs, and why.

### Adding a persona

Personas are files, so the library grows without touching any code. Run
`ADD-PERSONA <name>` to scaffold one from
[`skills/prd-studio/personas/TEMPLATE.md`](skills/prd-studio/personas/TEMPLATE.md);
the command interviews you on the failure mode it should catch, then fills
the template in.
[`AUTHORING.md`](skills/prd-studio/personas/AUTHORING.md) is the method
behind each section of that template. On the Claude Code plugin route,
`ADD-PERSONA` also scaffolds a matching
[`agents/grill-<name>.md`](agents/grill-TEMPLATE.md), so a custom persona
joins the parallel grill instead of dropping out of it.

The quality bar is not "sounds useful". A new persona earns its place in the
library only by catching a seeded defect in the eval benchmarks (below) that
no existing persona catches, or by sharpening an existing catch materially.
Overlap with an existing persona is the most common reason a proposed one
does not ship.

## Install

**Which route is for you?**

- **Claude Code user:** the plugin (route 1), the strongest form, with a
  parallel grill subagent per persona.
- **claude.ai in the browser:** the Project route (route 2), or upload the
  `skills/prd-studio` folder as a Skill (route 2b).
- **Neither:** the files are plain markdown; any agent harness can run them
  (route 3).

Three routes, clearest first.

### 1. Claude Code plugin (recommended)

```
/plugin marketplace add digital-illumination/prd-studio
/plugin install prd-studio@prd-studio
```

This installs the skill plus one independent grill subagent per persona
(`agents/grill-<persona>`). During `GRILL THE PRD`, the synthesiser agent
first assembles the round's panel (core personas always, bench personas
whose trigger the requirement set matches, or whichever you named
directly), then the Agent tool spawns that panel in parallel: personas
cannot see each other's output, so they cannot politely converge on each
other's blind spots. The synthesiser agent then dedupes and ranks what
comes back into one ordered round, and reports every bench persona's state,
triggered or not.

### 2. claude.ai Project

1. Create a project and paste
   [`project-instructions.md`](project-instructions.md) into its custom
   instructions.
2. Add to the Project's knowledge (the file-upload area of a claude.ai
   Project):
   [`skills/prd-studio/prd-template.md`](skills/prd-studio/prd-template.md),
   [`skills/prd-studio/VALIDATION-REPORT.md`](skills/prd-studio/VALIDATION-REPORT.md),
   all eleven persona files from
   [`skills/prd-studio/personas/`](skills/prd-studio/personas/) unless you
   deliberately want a narrower panel, and your concept material. Export
   Word documents to plain text, or paste the text directly; do not upload
   a `.docx` file as-is.
3. Start a chat and type `STATUS`. An honest "no PRD yet", in role, means
   you are set.

Honest note: this route runs personas sequentially in one context. Same
method, less rigour than the parallel plugin form; a persona reading the
previous persona's own artefact before drafting its own is a weaker grill
than eleven independent attempts. Expect a draft-and-grill cycle to take
thirty to forty-five minutes of working session.

### 2b. Skill upload (claude.ai or desktop, no terminal)

Zip [`skills/prd-studio/`](skills/prd-studio/) and upload it as a Skill in
claude.ai or the Claude desktop app. Same skill as the plugin route, run
sequentially rather than in parallel. Gives browser users the skill form
with no terminal required.

### 3. Manual skill copy

Copy [`skills/prd-studio/`](skills/prd-studio/) into your project's
`.claude/skills/`. Same skill as the plugin route, without the parallel
subagents: personas run sequentially, as in the claude.ai route.

### Grill a PRD you already have

The most common starting point is not a blank slate, it is a PRD that
already exists as a file.

- **Claude Code:** open a session in the repo containing the PRD and say
  `GRILL THE PRD` followed by the file path; the skill reads it directly.
- **claude.ai:** upload the PRD to the project's knowledge, or paste it
  into the chat, then type `GRILL THE PRD`.
- **A PRD this studio itself previously exported** (its three files,
  `prd.md`, `glossary.md`, `grill-history.md`): use `REFINE` instead of a
  one-off `GRILL THE PRD`, so stable ids are preserved and the grill history
  is appended to rather than restarted.

## Persona evals

[`evals/`](evals/) holds benchmark PRDs for fictional products, each with
defects seeded on purpose and an answer key of which persona should catch
which. Running the library against a benchmark produces a catch rate (how
many seeded defects were caught) and a false-positive rate (how many
questions pointed at something that was not actually a gap). A couldn't-
complete entry on a persona's probe artefact (v0.3.0's enactment style)
scores exactly the same way a raised question used to: a named gap either
way. The regression rule: editing a persona must not lower its catch rate
on the benchmarks it already passes. See [`evals/README.md`](evals/README.md)
for the scoring detail and the current benchmarks. The benchmark PRDs
themselves predate the v0.3.0 layered EARS template and have not been
retrofitted onto it; `scripts/lint-prd.py` runs against them without error
but reports real findings, which is expected for un-retrofitted content.

## Persona registry

[`registry/`](registry/) is a small MCP server that serves the persona
library live from disk to any MCP client, so a tool other than Claude Code
can pull persona definitions at call time instead of a hand copy of the
files. Stdio only for now; a hosted mode, so a claude.ai connector or a
remote client could reach the same registry over the network, is deferred,
not ruled out. See [`registry/README.md`](registry/README.md) for the tools
it exposes and how to run it. claude.ai and plugin users can ignore the
registry entirely; it is for other agent harnesses that want live MCP
access to the same files.

## Tips from real use

- **Be blunt back.** If a question is wrong-headed, say so; your correction
  becomes part of the record, and that is the system working.
- **Non-scope is where the value is.** The "what should work differently,
  what is no longer needed" answers are the ones that stop a rebuild
  photocopying the old product.
- **Park freely.** An honest `[OPEN]` marker with an owner beats a guessed
  answer every time.
- **It cannot read your diary.** If context changed since the knowledge files
  were added (a new concept version, a decision taken elsewhere), tell it, or
  refresh the files.

One caution: never paste customer data or anything operationally sensitive
into the Studio. Concept material, product thinking and mock examples only.

## Provenance

Built by [Digital Illumination](https://digitalillumination.co.uk) and
hardened on a real product re-platforming engagement before release: the
method here is the method we run with clients, with the client specifics
removed. It has also been validated retrospectively: the shipped persona
panel, run blind on a real engagement PRD, surfaced five of the six
gaps that the engagement's own downstream sessions later confirmed were
answerable at draft time, plus a set of material questions nobody had
asked. That validation used private client material, so its record stays
private; the public evidence base is [`evals/BASELINES.md`](evals/BASELINES.md).

**v0.3.0** carried the same discipline further: the layered EARS
requirement format, `REFINE` mode, the deterministic `lint-prd.py` check,
the verdict-first validation report shape, and the tiered core-plus-bench
persona pattern with activation triggers were all developed and proven on
a further live client engagement, then generalised here, with every
engagement-specific detail (client identity, domain terminology, real
content) stripped out. One lesson from that generalisation is written up
directly, without any identifying detail, in
[`personas/AUTHORING.md`](skills/prd-studio/personas/AUTHORING.md)'s
"Re-casting for a domain" section: a panel narrowed for a specific domain
silently dropped two lenses nobody decided to drop, and a downstream review
later found exactly the gaps those two lenses existed to catch. The rule
that section states exists because of that.

## Licence

[MIT](LICENSE). Copyright (c) 2026 Digital Illumination Limited.
