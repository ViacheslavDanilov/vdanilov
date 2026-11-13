import { expect, test, type Page } from "@playwright/test";

const LIGHT_BG = "rgb(244, 246, 249)";
const DARK_BG = "rgb(10, 14, 20)";

const bodyBg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("Theme bootstrap", () => {
  test("a dark system shows the dark theme", async ({ page }) => {
    await page.goto("/");
    expect(await bodyBg(page)).toBe(DARK_BG);
  });

  test("a light system shows the light theme", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/");
    expect(await bodyBg(page)).toBe(LIGHT_BG);
    await context.close();
  });

  test("a stored light choice wins over a dark system before first paint", async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForFunction(() => document.body !== null);
    expect(
      await page.evaluate(() => document.documentElement.dataset.theme),
    ).toBe("light");
    expect(await bodyBg(page)).toBe(LIGHT_BG);
  });

  test("a stored dark choice wins over a light system", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/");
    expect(await bodyBg(page)).toBe(DARK_BG);
    await context.close();
  });

  test("an unknown stored value is ignored", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "sepia"));
    await page.goto("/");
    expect(
      await page.evaluate(() => document.documentElement.dataset.theme),
    ).toBeUndefined();
    expect(await bodyBg(page)).toBe(DARK_BG);
  });

  test("storage that throws leaves the system theme", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new Error("blocked");
        },
      });
    });
    await page.goto("/");
    expect(await bodyBg(page)).toBe(LIGHT_BG);
    await context.close();
  });
});
