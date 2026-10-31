// Checks the rules in AGENTS.md and DESIGN.md that a machine can decide: no em dash in
// copy, asset names, asset references that point at a file, and motion-safe: on hover
// movement. Run by `npm run check`.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// git resolves paths from the working directory, so start at the repository root
process.chdir(fileURLToPath(new URL("..", import.meta.url)));

const tracked = (...paths) =>
  execFileSync("git", ["ls-files", "-z", "--", ...paths], { encoding: "utf8" })
    .split("\0")
    .filter((file) => file && existsSync(file));

const problems = [];

// Prose: no em dash in anything that ships as copy or is read as project text
const EM_DASH = String.fromCharCode(0x2014);
const COPY_PATHS = [
  "app",
  "components",
  "lib",
  "tests",
  "README.md",
  ".github",
];
for (const file of tracked(...COPY_PATHS)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (line.includes(EM_DASH)) {
        problems.push(
          `${file}:${index + 1}: em dash, use a comma, colon or new sentence`,
        );
      }
    });
}

// Asset naming: lower-case ASCII kebab-case, no spaces, underscores or look-alike characters
const ASSET_NAME =
  /^public\/([a-z0-9]+(-[a-z0-9]+)*\/)*[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+$/;
for (const file of tracked("public")) {
  if (!ASSET_NAME.test(file)) {
    problems.push(`${file}: asset names are lower-case ASCII kebab-case`);
  }
}

// Renaming an asset means updating every reference: none may point at a missing file
const ASSET_REFERENCE =
  /["'`(](\/[A-Za-z0-9_./@%-]+\.(?:webp|jpe?g|png|svg|pdf|mp4|webm|ico|gif|avif|woff2?))/g;
for (const file of tracked("app", "components", "lib")) {
  const text = readFileSync(file, "utf8");
  for (const [, path] of text.matchAll(ASSET_REFERENCE)) {
    if (!existsSync(`public${path}`)) {
      problems.push(`${file}: ${path} is not in public/`);
    }
  }
}

// Reduced motion: a state effect that moves, scales or turns needs motion-safe:
const MOVEMENT =
  /^(?:-?(?:scale|translate|rotate)(?:-|$)|\[(?:scale|translate|rotate):)/;
const STATE_VARIANT =
  /^(?:(?:group|peer)(?:-[\w-]+)?(?:\/[\w-]+)?|hover|active|focus|focus-visible|focus-within|open|checked|aria-.+|data-.+)$/;
const variantsOf = (token) => {
  const parts = [];
  let depth = 0;
  let part = "";
  for (const char of token) {
    if ("[(".includes(char)) depth += 1;
    if ("])".includes(char)) depth -= 1;
    if (char === ":" && depth === 0) {
      parts.push(part);
      part = "";
    } else {
      part += char;
    }
  }
  return [...parts, part];
};
for (const file of tracked("app", "components")) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const token of line.split(/[\s"'`{},]+/)) {
        const parts = variantsOf(token.replace(/^!/, ""));
        const utility = parts.pop();
        if (
          MOVEMENT.test(utility) &&
          parts.some((variant) => STATE_VARIANT.test(variant)) &&
          !parts.some((variant) => variant.startsWith("motion-"))
        ) {
          problems.push(
            `${file}:${index + 1}: ${token} moves on a state change, add motion-safe:`,
          );
        }
      }
    });
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} content problem(s)`);
  process.exit(1);
}
console.log("Content rules: ok");
