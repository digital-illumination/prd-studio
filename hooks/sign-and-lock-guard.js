#!/usr/bin/env node
// Enforces sign-and-lock: blocks Edit/Write on a markdown PRD whose Metadata
// section carries a filled "- Status: SIGNED (...)" line. Never blocks the
// template's DRAFT/.../SIGNED option list, non-markdown files, missing files,
// or files with no Metadata Status line. Never throws on malformed input.

const fs = require("fs");
const path = require("path");

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function isSignedInMetadata(content) {
  const lines = content.split(/\r?\n/);
  let inMetadata = false;

  for (const line of lines) {
    if (/^#{1,6}\s+Metadata\s*$/.test(line)) {
      inMetadata = true;
      continue;
    }
    if (inMetadata && /^#{1,6}\s+/.test(line)) {
      // Left the Metadata section for the next heading.
      break;
    }
    if (!inMetadata) continue;

    const match = /^-\s*Status:\s*(.*)$/i.exec(line);
    if (!match) continue;

    const value = match[1].trim();
    // The template's option list ("DRAFT / IN GRILL / CONVERGED (product) /
    // SIGNED (product owner, date)") offers SIGNED as one option among
    // several: if DRAFT is also on the line, this is the template, not a
    // recorded status.
    if (/\bDRAFT\b/i.test(value)) continue;
    if (/^SIGNED\b/i.test(value)) return true;
  }

  return false;
}

function main() {
  let payload;
  try {
    payload = JSON.parse(readStdin());
  } catch {
    process.exit(0); // malformed stdin: pass through, never crash the session
  }

  const toolInput = payload && payload.tool_input;
  const rawPath = toolInput && toolInput.file_path;
  if (!rawPath || typeof rawPath !== "string") {
    process.exit(0);
  }

  const cwd = typeof (payload && payload.cwd) === "string" ? payload.cwd : process.cwd();
  const filePath = path.isAbsolute(rawPath) ? rawPath : path.resolve(cwd, rawPath);

  if (!/\.md$/i.test(filePath)) {
    process.exit(0); // non-markdown: not a PRD
  }

  let content;
  try {
    if (!fs.existsSync(filePath)) {
      process.exit(0); // new Write target: nothing signed yet
    }
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    process.exit(0); // unreadable: pass through rather than guess
  }

  if (isSignedInMetadata(content)) {
    process.stderr.write(
      "Editing refused: this PRD is signed and immutable; create a new revision instead of editing signed text.\n"
    );
    process.exit(2); // blocking error: PreToolUse refuses the tool call
  }

  process.exit(0);
}

main();
