import { readdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const SLUGS = readdirSync("app/portfolio", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

test.describe("Next project block", () => {
  test("every project page offers another project, and the chain closes", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const next = new Map<string, string>();

    for (const slug of SLUGS) {
      await page.goto(`/portfolio/${slug}/`);
      const section = page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: "Next project" }) });
      await expect(section, `${slug} has no block`).toHaveCount(1);
      const href = await section
        .locator("article a[href^='/portfolio/']")
        .first()
        .getAttribute("href");
      next.set(
        slug,
        (href ?? "").replace(/^\/portfolio\//, "").replace(/\/$/, ""),
      );
    }

    for (const [slug, target] of next) {
      expect(target, `${slug} points at itself`).not.toBe(slug);
      expect(SLUGS, `${slug} points at a missing page`).toContain(target);
      let current = target;
      let steps = 1;
      while (current !== slug && steps <= SLUGS.length) {
        current = next.get(current) as string;
        steps += 1;
      }
      expect(current, `${slug} never comes round again`).toBe(slug);
    }
  });

  test("the block has a way back to all projects", async ({ page }) => {
    await page.goto("/portfolio/pulmovision/");
    await expect(
      page.getByRole("link", { name: "All projects" }),
    ).toHaveAttribute("href", "/portfolio/");
  });
});
