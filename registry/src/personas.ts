import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { parseFrontmatter } from "./frontmatter.js";

/** Fields every persona file must declare in its frontmatter. */
export const personaFrontmatterSchema = z.object({
  name: z.string().min(1, "name is required"),
  title: z.string().min(1, "title is required"),
  lens: z.string().min(1, "lens is required"),
  hunts: z.array(z.string().min(1)).min(1, "hunts must be a non-empty list"),
  version: z.string().min(1, "version is required"),
  provenance: z.string().min(1, "provenance is required"),
});

export type PersonaFrontmatter = z.infer<typeof personaFrontmatterSchema>;

export interface PersonaRecord {
  /** Frontmatter fields, parsed and validated. */
  frontmatter: PersonaFrontmatter;
  /** The full raw markdown file, frontmatter and body together. */
  content: string;
  /** Just the body, for search excerpts. */
  body: string;
  /** Filename the persona was loaded from, e.g. "sceptical-engineer.md". */
  filename: string;
}

export interface PersonaFileFailure {
  filename: string;
  error: string;
}

export type PersonaDirOutcome =
  | { ok: true; personas: PersonaRecord[]; failures: PersonaFileFailure[] }
  | { ok: false; error: string };

/** Files that document the format rather than being personas themselves. */
const NON_PERSONA_FILES = new Set(["TEMPLATE.md", "AUTHORING.md"]);

function isAllCapsFilename(filename: string): boolean {
  const stem = filename.replace(/\.md$/i, "");
  return /[A-Z]/.test(stem) && stem === stem.toUpperCase();
}

export function isPersonaFilename(filename: string): boolean {
  if (!filename.toLowerCase().endsWith(".md")) return false;
  if (NON_PERSONA_FILES.has(filename)) return false;
  if (isAllCapsFilename(filename)) return false;
  return true;
}

/**
 * Resolve the directory personas are read from: PRD_STUDIO_PERSONAS_DIR if
 * set, otherwise ../skills/prd-studio/personas relative to this registry
 * package's own directory (i.e. one level above wherever this module is
 * running from, whether that's src/ under tsx or dist/ after a build).
 */
export function resolvePersonasDir(env: NodeJS.ProcessEnv = process.env): string {
  const override = env.PRD_STUDIO_PERSONAS_DIR;
  if (override && override.trim() !== "") {
    return path.resolve(override.trim());
  }

  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const packageDir = path.resolve(moduleDir, "..");
  return path.resolve(packageDir, "..", "skills", "prd-studio", "personas");
}

/** Parse a single persona file's raw text into a validated record. */
export function parsePersonaFile(
  filename: string,
  raw: string
): { ok: true; persona: PersonaRecord } | { ok: false; error: string } {
  const parsed = parseFrontmatter(raw);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error };
  }

  const validated = personaFrontmatterSchema.safeParse(parsed.result.data);
  if (!validated.success) {
    const issues = validated.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    return { ok: false, error: `Invalid frontmatter: ${issues}` };
  }

  return {
    ok: true,
    persona: {
      frontmatter: validated.data,
      content: raw,
      body: parsed.result.body,
      filename,
    },
  };
}

/** Load and parse every persona file in a directory. */
export async function loadPersonas(dir: string): Promise<PersonaDirOutcome> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT" || code === "ENOTDIR") {
      return {
        ok: false,
        error: `Personas directory not found: ${dir}. Set PRD_STUDIO_PERSONAS_DIR or create the skills/prd-studio/personas directory.`,
      };
    }
    return {
      ok: false,
      error: `Could not read personas directory ${dir}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }

  const personaFiles = entries.filter(isPersonaFilename).sort();
  const personas: PersonaRecord[] = [];
  const failures: PersonaFileFailure[] = [];

  for (const filename of personaFiles) {
    const fullPath = path.join(dir, filename);
    let raw: string;
    try {
      raw = await fs.readFile(fullPath, "utf8");
    } catch (err) {
      failures.push({
        filename,
        error: `Could not read file: ${err instanceof Error ? err.message : String(err)}`,
      });
      continue;
    }

    const result = parsePersonaFile(filename, raw);
    if (result.ok) {
      personas.push(result.persona);
    } else {
      failures.push({ filename, error: result.error });
    }
  }

  return { ok: true, personas, failures };
}

export interface PersonaSearchMatch {
  name: string;
  title: string;
  lens: string;
  excerpt: string;
}

/** Case-insensitive substring search over name, title, lens and body. */
export function searchPersonas(
  personas: PersonaRecord[],
  query: string
): PersonaSearchMatch[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") return [];

  const matches: PersonaSearchMatch[] = [];

  for (const persona of personas) {
    const { name, title, lens } = persona.frontmatter;
    const haystackFields = [name, title, lens];
    const fieldMatch = haystackFields.find((field) =>
      field.toLowerCase().includes(needle)
    );

    if (fieldMatch) {
      matches.push({
        name,
        title,
        lens,
        excerpt: buildExcerpt(fieldMatch, needle) ?? fieldMatch,
      });
      continue;
    }

    const bodyIndex = persona.body.toLowerCase().indexOf(needle);
    if (bodyIndex !== -1) {
      matches.push({
        name,
        title,
        lens,
        excerpt: buildExcerpt(persona.body, needle, bodyIndex),
      });
    }
  }

  return matches;
}

function buildExcerpt(text: string, needle: string, atIndex?: number): string {
  const index = atIndex ?? text.toLowerCase().indexOf(needle);
  if (index === -1) return text.slice(0, 120).trim();

  const radius = 60;
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + needle.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";

  return `${prefix}${text.slice(start, end).replace(/\s+/g, " ").trim()}${suffix}`;
}
