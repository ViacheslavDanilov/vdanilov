import { readdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const SLUGS = readdirSync("app/portfolio", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

test.describe("Keep exploring block", () => {
  test("every project page offers two other projects from two categories", async ({
    page,
  }) => {
    test.setTimeout(180_000);

    for (const slug of SLUGS) {
      await page.goto(`/portfolio/${slug}/`);
      const section = page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: "Keep exploring" }) });
      await expect(section, `${slug} has no block`).toHaveCount(1);

      const cards = section.locator("article");
      await expect(cards, `${slug} should offer two cards`).toHaveCount(2);

      const targets = await cards.evaluateAll((articles) =>
        articles.map((article) => ({
          href: article.querySelector("a")?.getAttribute("href") ?? "",
          badge: article.querySelector("a span")?.textContent?.trim() ?? "",
        })),
      );
      const [first, second] = targets.map((target) => ({
        ...target,
        slug: target.href.replace(/^\/portfolio\//, "").replace(/\/$/, ""),
      }));

      for (const target of [first, second]) {
        expect(target.slug, `${slug} points at itself`).not.toBe(slug);
        expect(SLUGS, `${slug} points at a missing page`).toContain(
          target.slug,
        );
      }
      expect(first.slug, `${slug} offers one project twice`).not.toBe(
        second.slug,
      );
      expect(
        first.badge,
        `${slug} offers two projects of one category`,
      ).not.toBe(second.badge);
    }
  });

  test("the block has a way back to all projects", async ({ page }) => {
    await page.goto("/portfolio/pulmovision/");
    await expect(
      page.getByRole("link", { name: /^All \d+ projects$/ }),
    ).toHaveAttribute("href", "/portfolio/");
  });
});
