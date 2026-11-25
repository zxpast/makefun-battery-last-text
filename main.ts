// The Battery's Last Text to Its Charger.
//
// One original line: the phone battery's last text to the charger it
// waited for all day. The program is fully deterministic — one fixed
// string, no clock, no randomness, no network, no external files —
// so every run writes byte-identical output.
//
// The joke: the setup is a specific, vivid scene (1% since breakfast,
// watching the charger feed the earbuds, the watch, then the toothbrush
// first — three escalating insults), and the punchline lands in the
// final words: the battery spent its very last 1% saying goodbye to
// the group chat instead of waiting for the charger. Spite, not sorrow.
import * as fs from "node:fs";
import * as path from "node:path";

// The line, built in order: setup (specific scene + 3-beat escalation),
// pivot (don't rush over now), punchline (the last 1% went to the
// group chat — the twist pays off in the final words).
const SETUP =
  "You left me on 1% since breakfast and charged your earbuds, your watch, and your toothbrush first.";
const PIVOT = "Don't come running now —";
const PUNCH = "I spent my last 1% texting goodbye to the group chat.";
const LINE = `${SETUP} ${PIVOT} ${PUNCH}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, and not only white space.
// Output goes to $MAKEFUN_OUTPUT_DIR when set, else the absolute
// default "/output" (so the gate path above is exactly where it lands).
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${codePoints} code points, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

console.log(LINE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
