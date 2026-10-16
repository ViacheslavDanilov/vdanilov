import { test, expect, type Page } from "@playwright/test";

const CATEGORIES = ["Research", "Medicine", "Industry", "Pharma"];

// Names on the cards of one filter, once the grid shows exactly that filter's cards
async function namesFor(page: Page, filter: string, label: string) {
  await page.goto(`/references/?filter=${filter}`);
  const tab = page.getByRole("button", { name: new RegExp(`^${label} \\(`) });
  await expect(tab).toHaveAttribute("aria-pressed", "true");
  const count = Number((await tab.textContent())?.match(/\((\d+)\)/)?.[1]);
  const names = page.getByRole("listitem").locator("h3");
  await expect.poll(() => names.count()).toBe(count);
  return names.allTextContents();
}

test.describe("References order", () => {
  test("each category is sorted by name", async ({ page }) => {
    for (const category of CATEGORIES) {
      const names = await namesFor(page, category, category);
      expect(names, category).toEqual(
        [...names].sort((a, b) => a.localeCompare(b)),
      );
    }
  });

  test("All lists the categories in order", async ({ page }) => {
    const expected: string[] = [];
    for (const category of CATEGORIES) {
      expected.push(...(await namesFor(page, category, category)));
    }
    expect(await namesFor(page, "all", "All")).toEqual(expected);
  });

  test("Featured follows the order of All", async ({ page }) => {
    const all = await namesFor(page, "all", "All");
    const featured = await namesFor(page, "featured", "Featured");
    expect(featured).toEqual(all.filter((name) => featured.includes(name)));
  });

  test("the order the owner asked for holds", async ({ page }) => {
    const all = await namesFor(page, "all", "All");
    const position = (name: string) => {
      const index = all.findIndex((entry) => entry.startsWith(name));
      expect(index, name).toBeGreaterThan(-1);
      return index;
    };
    // Pharma, then Medicine, each by name, and one person from each category in order
    expect(position("Anton Kutikhin")).toBeLessThan(position("Yuriy Popov"));
    expect(position("Diana Litmanovich")).toBeLessThan(position("Maria Poca"));
    expect(position("Maria Poca")).toBeLessThan(position("Nikolay Vasilyev"));
    expect(position("Olawande Daramola")).toBeLessThan(
      position("Diana Litmanovich"),
    );
    expect(position("Diana Litmanovich")).toBeLessThan(
      position("Alex Proutski"),
    );
    expect(position("Alex Proutski")).toBeLessThan(position("Anton Kutikhin"));
  });

  test("the filter tabs follow the category order", async ({ page }) => {
    await page.goto("/references/");
    const tabs = await page
      .getByRole("group", { name: "Filter references" })
      .getByRole("button")
      .allTextContents();
    expect(tabs.map((tab) => tab.replace(/ \(\d+\)$/, ""))).toEqual([
      "Featured",
      "All",
      ...CATEGORIES,
    ]);
  });
});
