import { test, expect } from "@playwright/test";

test.describe("Portfolio Featured tab", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("shows nine projects in three full rows", async ({ page }) => {
    await page.goto("/portfolio/");
    const cards = page.locator('[role="listitem"]');
    await expect(cards).toHaveCount(9);

    const tops = await cards.evaluateAll((items) =>
      items.map((item) => Math.round(item.getBoundingClientRect().top)),
    );
    const rows = new Set(tops);
    expect(rows.size).toBe(3);
    for (const top of rows) {
      expect(tops.filter((value) => value === top)).toHaveLength(3);
    }
  });
});
