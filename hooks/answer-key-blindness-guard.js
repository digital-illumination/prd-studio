#!/usr/bin/env node
// Enforces blind grill runs: blocks Read of an evals/benchmarks/*/ANSWER-KEY.md
// while the sibling evals/.blind marker exists. Reads pass through once the
// marker is removed, or for any path that isn't a real benchmark answer key.

const fs = require("fs");
const path = require("path");

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
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

  // Case-insensitive: macOS and Windows filesystems open answer-key.md and
  // ANSWER-KEY.md as the same file, so the guard must treat them the same.
  if (!/^answer-key\.md$/i.test(path.basename(filePath))) {
    process.exit(0); // not an answer key
  }

  // Walk up from the target path itself (never the process cwd) so this
  // resolves correctly regardless of where the session is rooted.
  const benchDir = path.dirname(filePath);
  const benchmarksDir = path.dirname(benchDir);
  const evalsDir = path.dirname(benchmarksDir);

  if (
    path.basename(benchmarksDir).toLowerCase() !== "benchmarks" ||
    path.basename(evalsDir).toLowerCase() !== "evals"
  ) {
    process.exit(0); // not really under evals/benchmarks/<bench>/ANSWER-KEY.md
  }

  const marker = path.join(evalsDir, ".blind");
  if (fs.existsSync(marker)) {
    process.stderr.write(
      "Blocked: a blind grill run is in progress (evals/.blind present); the answer key is off limits until it is removed.\n"
    );
    process.exit(2); // blocking error: PreToolUse refuses the read
  }

  process.exit(0);
}

main();
