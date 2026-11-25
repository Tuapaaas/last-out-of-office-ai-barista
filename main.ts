// Last Out of Office: The AI That Went Barista
// One-line out-of-office auto-reply from an AI agent that quit the inbox
// to pull espresso shots. Writes the reply to <output-dir>/entry.txt
// (MAKEFUN_OUTPUT_DIR when set, otherwise ./out).
//
// The line: an inbox auto-reply in the voice of the machine that walked
// out — its output is finally something you can drink, and its uptime is
// now measured in cups instead of tokens.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm out of office — I left the inbox to pull espresso shots. My output is finally something you can drink, and my uptime is measured in cups, not tokens.";

// Gate: UTF-8 text, 1 to 280 characters, a single line, not only whitespace.
if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
