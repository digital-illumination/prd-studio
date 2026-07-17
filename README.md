# PRD Studio

A PRD co-author and sparring partner for Claude. It drafts a Product
Requirements Document from your concept material, then *grills* it: asking
you the questions the document cannot answer, and attacking the document
from ten adversarial perspectives, folding every answer back in until the
PRD is **stable under interrogation**. Once you sign it, PRD Studio carries
the PRD on through decomposition, handoff to build, and validation of the
finished build against it. You stay the authority throughout: it sharpens
your intent, it never overrides it, and it never signs off. You do.

No hosted service, ever. The Studio is plain markdown any way you install
it: a skill, a set of persona files, a PRD template, project instructions
for the claude.ai route, and (optionally) a small local MCP server for
persona lookup. Bring your own Claude; nothing here touches anyone else's
servers.

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

## The twelve commands

Case-insensitive, with or without the leading slash.

| Group | Command | What it does |
|---|---|---|
| Authoring | `DRAFT` | Generates PRD v0 for the slice you name, goals first, each with a measurement, using only what is in the knowledge files. Anything unknowable becomes an `[OPEN: ...]` marker. |
| Authoring | `GRILL ME` | Asks you up to five hard questions the PRD cannot answer from its own text, hardest first, each tagged with its section and a gap class. Your answers fold straight into the document. |
| Authoring | `GRILL THE PRD [persona ...]` | The installed personas attack the document itself: every persona with no argument, or only the ones you name. A question the PRD answers cleanly is never listed; the rest become classified gaps in the register. |
| Authoring | `STATUS` | An honest convergence report: rounds run, gaps still open and whose they are, goals without measurements, and a verdict, CONVERGED or NOT CONVERGED, with the shortest path. |
| Authoring | `EXPORT` | The complete current PRD as clean markdown, ready to commit to a repo or paste into a wiki. |
| Personas | `PERSONAS` | Lists the installed personas: name, title, lens, version, provenance. |
| Personas | `ADD-PERSONA <name>` | Scaffolds a new persona from the template, then interviews you briefly on the failure mode it should catch that no existing persona does. |
| Execution | `DECOMPOSE` | From a converged PRD, emits the behaviour ledger: every functional behaviour with a stable id, a Given/When/Then acceptance check, and a blast-radius tag, applying the reuse test to sort platform from configuration. |
| Execution | `HANDOFF` | Completes the PRD's agent execution contract (read-first, do-not-change, validation loop, stop conditions, reporting) and cuts epics and stories traced to goals and behaviour ids. |
| Execution | `VALIDATE-PLAN` | An adversarial pass over a proposed execution plan against the PRD before build starts: orphaned behaviours, blast-radius overruns, where an agent would stall. |
| Execution | `VALIDATE-BUILD` | Grades a finished build against the PRD, behaviour by behaviour, demanding evidence. Verdict per behaviour: MET / PARTIAL / UNMET / NO-EVIDENCE; no evidence is never a pass. |
| Trust | `GRILL-AUDIT` | Exports the audit pack for a completed grill round: every question asked, its persona, its reasoning, what changed, plus blank columns for a human expert to mark each row CORRECT / PARTIAL / WRONG. |

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
takes two or three sittings, not one. Once the PRD is signed, `DECOMPOSE`
and `HANDOFF` cut the build plan, `VALIDATE-PLAN` grills that plan before
work starts, and `VALIDATE-BUILD` grades the finished build against the
PRD. Run `GRILL-AUDIT` whenever you want a human expert to mark a completed
round and bank corrections back into the persona files.

## The persona library

Personas are files, not hard-coded prompts:
[`skills/prd-studio/personas/`](skills/prd-studio/personas/), one markdown
file per persona, each carrying its lens, what it hunts, what a cleanly
answered PRD looks like to it, and a changelog. This release ships ten.

| Persona | Tier | Lens |
|---|---|---|
| Engineer | Core | Could I build this without guessing, and where would I stall? |
| QA | Core | Can every behaviour here be verified, and which goal has no measurement? |
| End User | Core | Does this match how I actually work, and what would I reach for that is not here? |
| Security & Compliance | Core | What is the data sensitivity, the audit trail, and the disclosure surface, who is the accountable human, and what here is undefined? |
| Platform Architect | Core | What is core capability here versus configuration, and is the boundary between them drawn right? |
| Data Protection | Extended | What is the lawful basis for holding this data, how long is it kept, can a subject exercise their rights, and does anything cross a border it should not? |
| Accessibility | Extended | Who is quietly excluded by this design, and does the evidence for "it works" actually cover assistive technology and cognitive load, not just sighted mouse use? |
| Commercial Viability | Extended | Who pays, what does it cost to serve one more customer, and what single assumption, if wrong, kills the business case? |
| Operations & Support | Extended | What does day two look like, who gets paged, who fields the ticket, and can anyone see what the system is actually doing right now? |
| Regulator | Extended | Which regimes actually apply here, and if an inspector asked for evidence tomorrow, does the document show where it would come from? |

### Adding a persona

Personas are files, so the library grows without touching any code. Run
`ADD-PERSONA <name>` to scaffold one from
[`skills/prd-studio/personas/TEMPLATE.md`](skills/prd-studio/personas/TEMPLATE.md);
the command interviews you on the failure mode it should catch, then fills
the template in.
[`AUTHORING.md`](skills/prd-studio/personas/AUTHORING.md) is the method
behind each section of that template.

The quality bar is not "sounds useful". A new persona earns its place in the
library only by catching a seeded defect in the eval benchmarks (below) that
no existing persona catches, or by sharpening an existing catch materially.
Overlap with an existing persona is the most common reason a proposed one
does not ship.

## Install

Three routes, clearest first.

### 1. Claude Code plugin (recommended)

```
/plugin marketplace add digital-illumination/prd-studio
/plugin install prd-studio@prd-studio
```

This installs the skill plus one independent grill subagent per persona
(`agents/grill-<persona>`). During `GRILL THE PRD`, the Agent tool spawns
all ten in parallel: personas cannot see each other's questions, so they
cannot politely converge on each other's blind spots. A synthesiser agent
then dedupes and ranks what comes back into one ordered round.

### 2. claude.ai Project

1. Create a project and paste
   [`project-instructions.md`](project-instructions.md) into its custom
   instructions.
2. Add to the project's knowledge:
   [`skills/prd-studio/prd-template.md`](skills/prd-studio/prd-template.md),
   the persona files you want from
   [`skills/prd-studio/personas/`](skills/prd-studio/personas/), and your
   concept material.
3. Start a chat and type `STATUS`. An honest "no PRD yet", in role, means
   you are set.

Honest note: this route runs personas sequentially in one context. Same
method, less rigour than the parallel plugin form; a persona reading the
previous persona's questions before writing its own is a weaker grill than
ten independent attempts.

### 3. Manual skill copy

Copy [`skills/prd-studio/`](skills/prd-studio/) into your project's
`.claude/skills/`. Same skill as the plugin route, without the parallel
subagents: personas run sequentially, as in the claude.ai route.

## Persona evals

[`evals/`](evals/) holds benchmark PRDs for fictional products, each with
defects seeded on purpose and an answer key of which persona should catch
which. Running the library against a benchmark produces a catch rate (how
many seeded defects were caught) and a false-positive rate (how many
questions pointed at something that was not actually a gap). The regression
rule: editing a persona must not lower its catch rate on the benchmarks it
already passes. See [`evals/README.md`](evals/README.md) for the scoring
detail and the current benchmarks.

## Persona registry

[`registry/`](registry/) is a small MCP server that serves the persona
library live from disk to any MCP client, so a tool other than Claude Code
can pull persona definitions at call time instead of a hand copy of the
files. Stdio only for now; a hosted mode, so a claude.ai connector or a
remote client could reach the same registry over the network, is deferred,
not ruled out. See [`registry/README.md`](registry/README.md) for the tools
it exposes and how to run it.

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
removed.

## Licence

[MIT](LICENSE). Copyright (c) 2026 Digital Illumination Limited.
