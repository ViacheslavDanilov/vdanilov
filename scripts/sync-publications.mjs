// Writes lib/publications.generated.json from the research-record repository, which is
// private, so the site cannot read it at build time. Run by hand after the record changes:
//   npm run publications:sync -- /path/to/research-record
// The path may also come from RESEARCH_RECORD. Only records with "public": true pass, and
// only the fields the site shows, plus the totals in stats.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

const root = fileURLToPath(new URL("..", import.meta.url));
const recordDir = resolve(
  process.argv[2] ||
    process.env.RESEARCH_RECORD ||
    resolve(root, "../research-record"),
);
const output = resolve(root, "lib/publications.generated.json");

// The page lists the types in this order, and the record order (newest first) holds inside each
const TYPE_BY_KIND = {
  "Journal article": "Journal",
  "Conference paper": "Conference",
  Post: "Blog Post",
  Dataset: "Dataset",
};
const TYPES = Object.values(TYPE_BY_KIND);

// The owner's family name in either script, as scripts/lib.py in the record has it
const isOwner = (author) =>
  ["danilov", "данилов"].includes((author.family || "").toLowerCase());

const authorPosition = (record) => {
  const authors = record.csl.author;
  const index = authors.findIndex(isOwner);
  if (index === -1) return undefined;
  const count = record.authors_total || authors.length;
  if (index === 0) return "first";
  return index + 1 === count ? "senior" : "middle";
};

const records = JSON.parse(
  readFileSync(resolve(recordDir, "data/publications.json"), "utf8"),
);

// Counts over the whole record, public or not, which is what the page text says
// ("selected from ..."). Only the totals leave the record, never a private entry
const papers = records.filter((record) =>
  ["Journal article", "Conference paper"].includes(record.kind),
);
const stats = {
  peerReviewed: papers.length,
  datasets: records.filter((record) => record.kind === "Dataset").length,
  firstAuthor: papers.filter((record) => authorPosition(record) === "first")
    .length,
  seniorAuthor: papers.filter((record) => authorPosition(record) === "senior")
    .length,
  q1Journals: records.filter(
    (record) =>
      record.kind === "Journal article" && record.metrics?.scopus === "Q1",
  ).length,
};

const publications = records
  .filter((record) => record.public === true)
  .map((record) => {
    const { csl } = record;
    const type = TYPE_BY_KIND[record.kind];
    if (!type) throw new Error(`${record.id}: unknown kind "${record.kind}"`);
    const url = csl.DOI ? `https://doi.org/${csl.DOI}` : csl.URL;
    if (!url) throw new Error(`${record.id}: no DOI and no URL`);
    return {
      id: record.id,
      title: csl.title,
      venue: csl["container-title"],
      year: String(csl.issued["date-parts"][0][0]),
      url,
      // The page shows a position on works that have a byline, not on blog posts
      ...(type !== "Blog Post" && { authorPosition: authorPosition(record) }),
      type,
    };
  })
  .sort((a, b) => TYPES.indexOf(a.type) - TYPES.indexOf(b.type));

const options = (await resolveConfig(output)) ?? {};
writeFileSync(
  output,
  await format(JSON.stringify({ stats, publications }), {
    ...options,
    filepath: output,
  }),
);
console.log(
  `${publications.length} public records written to lib/publications.generated.json`,
);
