# PRD Studio

A PRD co-author and sparring partner, built as a set of instructions for
Claude. It drafts a Product Requirements Document from your concept material,
then *grills* it: asking you the questions the document cannot answer, and
attacking the document from five perspectives, folding every answer back in
until the PRD is **stable under interrogation**. You stay the authority
throughout: it sharpens your intent, it never overrides it, and it never signs
off. You do.

No application to install and no service to sign up for. The Studio is plain
markdown: a set of project instructions, a PRD template, and an optional
Claude Code skill. Bring your own Claude.

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

## The five commands

| You type | What happens |
|---|---|
| **DRAFT** | Generates PRD v0 for the slice you name, goals first, using only what is in the knowledge files. Anything it cannot know becomes an `[OPEN: ...]` marker. |
| **GRILL ME** | It asks *you* up to five hard questions the PRD cannot answer from its own text, hardest first. Answer what you know; park what you do not. Your answers are folded straight into the document. |
| **GRILL THE PRD** | Five personas attack the *document*: engineer, QA, an end user mid-task, security & compliance, platform architect. Questions the document answers cleanly are not listed; the rest become logged gaps. |
| **STATUS** | An honest convergence report: rounds run, gaps still open and whose they are, goals without measurements, and a verdict, CONVERGED or NOT CONVERGED with the shortest path. |
| **EXPORT** | The complete current PRD as clean markdown, ready to commit to a repo or paste into a wiki. Export at the end of every session; never leave work in chat. |

Run order in practice: DRAFT once per slice, then alternate GRILL ME and
GRILL THE PRD, checking STATUS as you go, and finish every sitting with
EXPORT. Thirty to forty-five minutes beats a marathon; convergence usually
takes two or three sittings, not one.

**What "converged" means:** two consecutive grill rounds producing zero new
material gaps, every goal carrying a measurement, and the open-questions
register empty or every item explicitly parked with an owner. Not perfect.
Stable under interrogation.

## Setup

### As a Claude Project (claude.ai)

1. Go to **claude.ai** → **Projects** → **New project**. Name it
   "PRD Studio".
2. Paste the contents of [`project-instructions.md`](project-instructions.md)
   into the project's custom instructions.
3. Add to the project's knowledge:
   - [`prd-template.md`](prd-template.md), the shape it drafts against;
   - your product concept material (concept documents, decompositions,
     research, prior decisions).
4. Start a chat and type `STATUS`. If it answers in role with an honest
   "no PRD yet", you are set.

### As a Claude Code skill

1. Create `.claude/skills/prd-studio/` in your project.
2. Copy [`SKILL.md`](SKILL.md) and [`prd-template.md`](prd-template.md) into
   it.
3. Put your concept material somewhere in the repository and mention it when
   you draft. The commands work with or without the leading slash.

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
