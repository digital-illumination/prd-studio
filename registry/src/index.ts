#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  loadPersonas,
  resolvePersonasDir,
  searchPersonas,
  type PersonaRecord,
} from "./personas.js";

const TEMPLATE_FILENAME = "TEMPLATE.md";

function personaSummary(persona: PersonaRecord) {
  const { name, title, lens, hunts, version, provenance } = persona.frontmatter;
  return { name, title, lens, hunts, version, provenance };
}

function textResult(text: string, isError = false) {
  return { content: [{ type: "text" as const, text }], isError };
}

function jsonResult(value: unknown, note?: string) {
  const content: { type: "text"; text: string }[] = [
    { type: "text", text: JSON.stringify(value, null, 2) },
  ];
  if (note) {
    content.push({ type: "text", text: note });
  }
  return { content, isError: false };
}

const server = new McpServer({
  name: "prd-studio-registry",
  version: "0.2.3",
});

server.registerTool(
  "list_personas",
  {
    title: "List personas",
    description:
      "List every PRD Studio persona available: name, title, lens, hunts, version and provenance. Excludes TEMPLATE.md, AUTHORING.md and any all-caps filename.",
    inputSchema: {},
  },
  async () => {
    const dir = resolvePersonasDir();
    const outcome = await loadPersonas(dir);
    if (!outcome.ok) {
      return textResult(outcome.error, true);
    }

    const summaries = outcome.personas.map(personaSummary);
    const note =
      outcome.failures.length > 0
        ? `Note: ${outcome.failures.length} file(s) in ${dir} could not be parsed and were excluded: ${outcome.failures
            .map((f) => `${f.filename} (${f.error})`)
            .join("; ")}`
        : undefined;

    return jsonResult(summaries, note);
  }
);

server.registerTool(
  "get_persona",
  {
    title: "Get persona",
    description:
      "Get the full markdown content of one persona by its frontmatter name, plus the parsed frontmatter fields.",
    inputSchema: {
      name: z.string().min(1).describe("The persona's frontmatter 'name' value"),
    },
  },
  async ({ name }) => {
    const dir = resolvePersonasDir();
    const outcome = await loadPersonas(dir);
    if (!outcome.ok) {
      return textResult(outcome.error, true);
    }

    const persona = outcome.personas.find((p) => p.frontmatter.name === name);
    if (!persona) {
      const available = outcome.personas.map((p) => p.frontmatter.name);
      return textResult(
        `No persona named "${name}" found in ${dir}.${
          available.length > 0
            ? ` Available: ${available.join(", ")}.`
            : " No valid personas were found in that directory."
        }`,
        true
      );
    }

    return jsonResult({
      frontmatter: persona.frontmatter,
      content: persona.content,
    });
  }
);

server.registerTool(
  "search_personas",
  {
    title: "Search personas",
    description:
      "Substring and keyword search across persona name, title, lens and body. Returns matches with a short excerpt.",
    inputSchema: {
      query: z.string().min(1).describe("Text to search for"),
    },
  },
  async ({ query }) => {
    const dir = resolvePersonasDir();
    const outcome = await loadPersonas(dir);
    if (!outcome.ok) {
      return textResult(outcome.error, true);
    }

    const matches = searchPersonas(outcome.personas, query);
    return jsonResult(matches);
  }
);

server.registerTool(
  "get_template",
  {
    title: "Get template",
    description:
      "Get the TEMPLATE.md content for authoring a new persona of the given kind.",
    inputSchema: {
      kind: z.enum(["persona"]).describe("Template kind; only 'persona' exists today"),
    },
  },
  async ({ kind }) => {
    const dir = resolvePersonasDir();
    const templatePath = path.join(dir, TEMPLATE_FILENAME);

    try {
      const content = await fs.readFile(templatePath, "utf8");
      return jsonResult({ kind, content });
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT" || code === "ENOTDIR") {
        return textResult(
          `No ${TEMPLATE_FILENAME} found for kind "${kind}" in ${dir}.`,
          true
        );
      }
      return textResult(
        `Could not read ${templatePath}: ${
          err instanceof Error ? err.message : String(err)
        }`,
        true
      );
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("prd-studio-registry failed to start:", error);
  process.exit(1);
});
