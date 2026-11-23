import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
const target = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy landed byte-identical before reporting success.
if (!readFileSync(source).equals(readFileSync(target))) {
  throw new Error("entry.txt copy mismatch");
}
