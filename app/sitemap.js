import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/lib/metadata";

const PAGES = [
  "/",
  "/experience/",
  "/education/",
  "/portfolio/",
  "/publications/",
  "/references/",
];

// Every folder under app/portfolio with a page is a project
const portfolioDir = path.join(process.cwd(), "app", "portfolio");
const PROJECT_PAGES = readdirSync(portfolioDir, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      existsSync(path.join(portfolioDir, entry.name, "page.jsx")),
  )
  .map((entry) => `/portfolio/${entry.name}/`)
  .sort();

export default function sitemap() {
  return [...PAGES, ...PROJECT_PAGES].map((page) => ({
    url: `${SITE_URL}${page}`,
  }));
}
