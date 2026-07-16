import { describe, expect, it } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isPersonaFilename,
  loadPersonas,
  parsePersonaFile,
  searchPersonas,
} from "../src/personas.js";

const FIXTURES_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "fixtures"
);

describe("isPersonaFilename", () => {
  it("excludes TEMPLATE.md and AUTHORING.md", () => {
    expect(isPersonaFilename("TEMPLATE.md")).toBe(false);
    expect(isPersonaFilename("AUTHORING.md")).toBe(false);
  });

  it("excludes any all-caps filename", () => {
    expect(isPersonaFilename("README.md")).toBe(false);
    expect(isPersonaFilename("CHANGELOG.md")).toBe(false);
  });

  it("excludes non-markdown files", () => {
    expect(isPersonaFilename("notes.txt")).toBe(false);
  });

  it("includes ordinary kebab-case persona files", () => {
    expect(isPersonaFilename("sceptical-engineer.md")).toBe(true);
    expect(isPersonaFilename("security-reviewer.md")).toBe(true);
  });
});

describe("loadPersonas", () => {
  it("lists valid personas and excludes TEMPLATE/AUTHORING", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;

    const names = outcome.personas.map((p) => p.frontmatter.name).sort();
    expect(names).toEqual(["sceptical-engineer", "security-reviewer"]);

    const filenames = outcome.personas.map((p) => p.filename);
    expect(filenames).not.toContain("TEMPLATE.md");
    expect(filenames).not.toContain("AUTHORING.md");
  });

  it("reports unparseable and invalid files as failures instead of throwing", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;

    const failedFiles = outcome.failures.map((f) => f.filename).sort();
    expect(failedFiles).toEqual(["broken-persona.md", "incomplete-persona.md"]);
    for (const failure of outcome.failures) {
      expect(failure.error.length).toBeGreaterThan(0);
    }
  });

  it("returns a clear error for a missing directory instead of crashing", async () => {
    const outcome = await loadPersonas(path.join(FIXTURES_DIR, "does-not-exist"));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.error).toMatch(/not found/i);
  });
});

describe("parsePersonaFile", () => {
  it("parses inline flow-style hunts lists", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    if (!outcome.ok) throw new Error("fixtures failed to load");

    const reviewer = outcome.personas.find(
      (p) => p.frontmatter.name === "security-reviewer"
    );
    expect(reviewer).toBeDefined();
    expect(reviewer?.frontmatter.hunts).toEqual([
      "Unencrypted secrets",
      "Missing audit logging",
      "Unbounded data retention",
      "Weak access boundaries",
    ]);
  });

  it("handles an unclosed frontmatter fence as a parse failure, not a crash", () => {
    const result = parsePersonaFile(
      "broken.md",
      "---\nname: x\ntitle: y\nno closing fence here"
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/closed/i);
  });

  it("handles missing required fields as a parse failure, not a crash", () => {
    const result = parsePersonaFile(
      "incomplete.md",
      "---\nname: x\ntitle: y\nlens: z\nversion: 1.0.0\n---\nbody"
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/hunts|provenance/i);
  });
});

describe("get_persona behaviour (via loadPersonas + lookup)", () => {
  it("happy path: returns full content and parsed frontmatter", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    if (!outcome.ok) throw new Error("fixtures failed to load");

    const persona = outcome.personas.find(
      (p) => p.frontmatter.name === "sceptical-engineer"
    );
    expect(persona).toBeDefined();
    expect(persona?.frontmatter.title).toBe("The Sceptical Engineer");
    expect(persona?.content).toContain("## Hardest questions (examples)");
    expect(persona?.content.startsWith("---")).toBe(true);
  });

  it("unknown name: is simply absent from the loaded set", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    if (!outcome.ok) throw new Error("fixtures failed to load");

    const persona = outcome.personas.find(
      (p) => p.frontmatter.name === "does-not-exist"
    );
    expect(persona).toBeUndefined();
  });
});

describe("searchPersonas", () => {
  it("hit: finds a persona by a body keyword and returns an excerpt", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    if (!outcome.ok) throw new Error("fixtures failed to load");

    const matches = searchPersonas(outcome.personas, "audit trail");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((m) => m.name === "security-reviewer")).toBe(true);
    const match = matches.find((m) => m.name === "security-reviewer");
    expect(match?.excerpt.toLowerCase()).toContain("audit");
  });

  it("hit: finds a persona by a frontmatter field (title)", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    if (!outcome.ok) throw new Error("fixtures failed to load");

    const matches = searchPersonas(outcome.personas, "Sceptical Engineer");
    expect(matches.map((m) => m.name)).toContain("sceptical-engineer");
  });

  it("miss: returns an empty array for no matches", async () => {
    const outcome = await loadPersonas(FIXTURES_DIR);
    if (!outcome.ok) throw new Error("fixtures failed to load");

    const matches = searchPersonas(outcome.personas, "no such thing anywhere");
    expect(matches).toEqual([]);
  });
});
