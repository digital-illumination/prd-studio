# PRD Studio persona registry

An MCP (Model Context Protocol) server that serves PRD Studio's adversarial
personas live from disk, so any MCP client can pull them at call time instead
of copying the persona files into a project by hand.

Personas are markdown files with YAML frontmatter in
`skills/prd-studio/personas/*.md` (name, title, lens, hunts, version,
provenance in the frontmatter; body sections for Lens, What it hunts, What
cleanly answered looks like, Hardest questions, and Changelog). `TEMPLATE.md`
and `AUTHORING.md` in that directory describe the format rather than being
personas, so they, and any other all-caps filename, are excluded from the
tools below.

## What it exposes

Four tools, over stdio:

- `list_personas()`, a summary of every persona: name, title, lens, hunts,
  version, provenance.
- `get_persona(name)`, the full markdown for one persona plus its parsed
  frontmatter.
- `search_personas(query)`, a substring and keyword search across name,
  title, lens and body, with a short excerpt per match.
- `get_template(kind)`, the `TEMPLATE.md` content for authoring a new
  persona. Only `kind: "persona"` exists today; a missing template returns a
  clear error rather than failing silently.

A missing personas directory, or a persona file that will not parse, comes
back as a clear message in the tool result. Neither crashes the server.

## Running it

Install and build once:

```bash
npm install
npm run build
```

Then add it to Claude Code:

```bash
claude mcp add prd-studio-registry -- node <path>/registry/dist/index.js
```

replacing `<path>` with wherever this repository sits on disk. Any other MCP
client that supports stdio servers can point at the same
`dist/index.js` command.

## Where personas are read from

By default the server looks for personas one directory up from this package,
in `skills/prd-studio/personas` (that is, alongside `prd-template.md` and
`SKILL.md` at the root of the PRD Studio repository). Set
`PRD_STUDIO_PERSONAS_DIR` to point it somewhere else, for example:

```bash
PRD_STUDIO_PERSONAS_DIR=/path/to/personas node dist/index.js
```

or via `claude mcp add`:

```bash
claude mcp add prd-studio-registry --env PRD_STUDIO_PERSONAS_DIR=/path/to/personas -- node <path>/registry/dist/index.js
```

## Transport

v1 is stdio only. Hosted HTTP mode, so a claude.ai connector or a remote MCP
client could reach the same registry over the network, is deferred: nothing
here rules it out, but it has not been built yet.

## Development

```bash
npm test    # vitest, using fixture persona files in test/fixtures/
npm run build
```

Runtime dependencies are kept to the MCP SDK and zod; nothing else loads at
run time.
