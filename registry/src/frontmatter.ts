/**
 * Minimal YAML frontmatter parser for persona files.
 *
 * Persona frontmatter is a deliberately small, flat shape (a handful of
 * scalar strings plus one list field), so a hand-rolled parser is enough
 * and keeps the runtime dependency list to just the MCP SDK and zod.
 * It is not a general YAML parser: it supports
 *
 *   key: scalar value
 *   key: "quoted value"
 *   key: [inline, list, items]
 *   key:
 *     - block
 *     - list
 *     - items
 *
 * Anything it cannot make sense of is reported back as a parse error
 * rather than thrown, so callers can turn it into a clear tool result.
 */

export interface FrontmatterResult {
  data: Record<string, string | string[]>;
  body: string;
}

export type FrontmatterOutcome =
  | { ok: true; result: FrontmatterResult }
  | { ok: false; error: string };

const FRONTMATTER_FENCE = /^---\s*\r?\n/;

export function parseFrontmatter(raw: string): FrontmatterOutcome {
  if (!FRONTMATTER_FENCE.test(raw)) {
    return {
      ok: false,
      error: "File does not start with a '---' frontmatter fence.",
    };
  }

  // Find the closing fence on its own line, after the opening one.
  const lines = raw.split(/\r?\n/);
  if (lines[0].trim() !== "---") {
    return {
      ok: false,
      error: "File does not start with a '---' frontmatter fence.",
    };
  }

  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    return {
      ok: false,
      error: "Frontmatter is not closed with a second '---' fence.",
    };
  }

  const frontmatterLines = lines.slice(1, closingIndex);
  const body = lines.slice(closingIndex + 1).join("\n");

  try {
    const data = parseFlatYaml(frontmatterLines);
    return { ok: true, result: { data, body } };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Could not parse frontmatter: ${message}` };
  }
}

function parseFlatYaml(lines: string[]): Record<string, string | string[]> {
  const data: Record<string, string | string[]> = {};
  let currentKey: string | null = null;
  let currentList: string[] | null = null;

  const flush = () => {
    if (currentKey !== null && currentList !== null) {
      data[currentKey] = currentList;
    }
    currentKey = null;
    currentList = null;
  };

  for (let rawLine of lines) {
    // Ignore blank lines and comments.
    if (rawLine.trim() === "" || rawLine.trim().startsWith("#")) {
      continue;
    }

    const listItemMatch = /^\s*-\s?(.*)$/.exec(rawLine);
    if (listItemMatch && currentKey !== null) {
      if (currentList === null) {
        currentList = [];
      }
      currentList.push(unquote(listItemMatch[1].trim()));
      continue;
    }

    const keyValueMatch = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(rawLine);
    if (!keyValueMatch) {
      throw new Error(`Could not read line: "${rawLine}"`);
    }

    flush();
    const [, key, rest] = keyValueMatch;
    const value = rest.trim();

    if (value === "") {
      // Either a block list follows, or the value is genuinely empty.
      currentKey = key;
      currentList = null;
      continue;
    }

    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1).trim();
      data[key] = inner === "" ? [] : inner.split(",").map((v) => unquote(v.trim()));
      currentKey = null;
      currentList = null;
      continue;
    }

    data[key] = unquote(value);
    currentKey = null;
    currentList = null;
  }

  flush();
  return data;
}

function unquote(value: string): string {
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.slice(1, -1);
  }
  return value;
}
