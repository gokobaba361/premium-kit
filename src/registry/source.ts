import "server-only";

import fs from "node:fs";
import path from "node:path";

/**
 * Reads a registry item's source from disk at build time.
 *
 * The documentation site shows the file that actually ships, not a copy of it,
 * so a snippet can never drift from the component it documents.
 */
export function readSource(relativePath: string) {
  // turbopackIgnore keeps the bundler from tracing the whole project as a
  // dependency of this dynamic read. The paths come from the registry, which
  // is a fixed list, so nothing arbitrary is ever read.
  const absolute = path.join(/* turbopackIgnore: true */ process.cwd(), relativePath);
  return fs.readFileSync(absolute, "utf8");
}

export function readSources(files: string[]) {
  return files.map((file) => ({
    path: file,
    name: file.split("/").pop() ?? file,
    code: readSource(file),
  }));
}
