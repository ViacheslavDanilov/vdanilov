// Checks the rules in AGENTS.md and DESIGN.md that a machine can decide: no em dash in
// copy, asset names, asset references that point at a file, motion-safe: on hover
// movement, and semantic colour classes. Run by `npm run check`.
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

// Colour: components use the semantic tokens in globals.css, never a palette step
const PALETTE_CLASS =
  /^-?(?:text|bg|border(?:-[xytrblse])?|from|via|to|(?:inset-)?ring(?:-offset)?|outline|fill|stroke|divide|decoration|caret|placeholder|accent)-(?:white|black|(?:gray|slate|zinc|neutral|stone)(?:-\d+)?|dark|light|card)(?:\/[\w.[\]]+)?$/;
for (const file of tracked("app", "components")) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const token of line.split(/[\s"'`{},]+/)) {
        const utility = variantsOf(token.replace(/^!|!$/g, "")).pop();
        if (PALETTE_CLASS.test(utility)) {
          problems.push(
            `${file}:${index + 1}: ${token} is a palette colour, use a token from globals.css`,
          );
        }
      }
    });
}

// Publications: lib/publications-site.json holds the site-only fields, one entry for each
// record in lib/publications.generated.json and none for a record that is no longer there
const generated = JSON.parse(
  readFileSync("lib/publications.generated.json", "utf8"),
).publications.map((publication) => publication.id);
const siteOnly = Object.keys(
  JSON.parse(readFileSync("lib/publications-site.json", "utf8")),
);
for (const id of generated.filter((id) => !siteOnly.includes(id))) {
  problems.push(`lib/publications-site.json: no entry for ${id}`);
}
for (const id of siteOnly.filter((id) => !generated.includes(id))) {
  problems.push(
    `lib/publications-site.json: ${id} is not in lib/publications.generated.json`,
  );
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} content problem(s)`);
  process.exit(1);
}
console.log("Content rules: ok");
