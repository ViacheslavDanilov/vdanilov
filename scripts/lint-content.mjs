// Checks the rules in AGENTS.md that a machine can decide: no em dash in copy, asset
// names, and asset references that point at a file. Run by `npm run check`.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const tracked = (...paths) =>
  execFileSync("git", ["ls-files", "-z", "--", ...paths], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);

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

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} content problem(s)`);
  process.exit(1);
}
console.log("Content rules: ok");
