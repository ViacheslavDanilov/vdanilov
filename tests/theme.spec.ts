import { expect, test, type Page } from "@playwright/test";

const LIGHT_BG = "rgb(244, 246, 249)";
const DARK_BG = "rgb(10, 14, 20)";

const bodyBg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("Theme bootstrap", () => {
  test("a dark system shows the dark theme", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
  });

  test("a light system shows the light theme", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
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
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
  });

  test("a stored dark choice wins over a light system", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
    await context.close();
  });

  test("an unknown stored value is ignored", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "sepia"));
    await page.goto("/");
    expect(
      await page.evaluate(() => document.documentElement.dataset.theme),
    ).toBeUndefined();
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
  });

  test("storage that throws leaves the system theme and the switch working", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new Error("blocked");
        },
      });
    });
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await page.getByRole("switch", { name: "Dark theme" }).click();
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
    expect(errors).toEqual([]);
    await context.close();
  });
});

const themeSwitch = (page: Page) =>
  page.getByRole("switch", { name: "Dark theme" });

test.describe("Theme switch", () => {
  test("a click flips the theme, stores it and survives a reload", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "true");
    await themeSwitch(page).click();
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "false");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("theme")))
      .toBe("light");
    await page.reload();
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "false");
  });

  test("flipping back to the system theme clears the stored choice", async ({
    page,
  }) => {
    await page.goto("/");
    await themeSwitch(page).click();
    await themeSwitch(page).click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("theme")))
      .toBeNull();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.theme))
      .toBeUndefined();
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
  });

  test("two flips in one frame raise no error", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await themeSwitch(page).click();
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await page.waitForTimeout(500);
    await themeSwitch(page).evaluate((button: HTMLElement) => {
      button.click();
      button.click();
    });
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test("without a stored choice the page follows the system live", async ({
    page,
  }) => {
    await page.goto("/");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "false");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
  });

  test("Space and Enter flip it from the keyboard", async ({ page }) => {
    await page.goto("/");
    await themeSwitch(page).focus();
    await page.keyboard.press("Space");
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "false");
    await page.keyboard.press("Enter");
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "true");
  });

  test("the browser bar colour follows an explicit choice", async ({
    page,
  }) => {
    await page.goto("/");
    await themeSwitch(page).click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          [...document.querySelectorAll('meta[name="theme-color"]')].map((m) =>
            m.getAttribute("content"),
          ),
        ),
      )
      .toEqual(["#f4f6f9", "#f4f6f9"]);
  });

  test("the browser bar colour survives a client-side navigation", async ({
    page,
  }) => {
    await page.goto("/");
    await themeSwitch(page).click();
    await page.locator('nav a[href="/portfolio/"]').first().click();
    await page.waitForURL(/\/portfolio\/$/);
    await expect
      .poll(() =>
        page.evaluate(() =>
          [...document.querySelectorAll('meta[name="theme-color"]')].map((m) =>
            m.getAttribute("content"),
          ),
        ),
      )
      .toEqual(["#f4f6f9", "#f4f6f9"]);
  });

  test("the thumb does not slide with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const duration = await themeSwitch(page)
      .locator("[data-keep-motion]")
      .evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(duration).toBe("0s");
    await context.close();
  });

  for (const width of [320, 360, 768, 1024, 1440]) {
    test(`the switch fits the navbar at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const box = await themeSwitch(page).boundingBox();
      const pill = await page.locator("nav > div").first().boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(pill!.x);
      expect(box!.x + box!.width).toBeLessThanOrEqual(pill!.x + pill!.width);
      const siblings = await page
        .locator("nav > div a, nav > div button")
        .evaluateAll((els) =>
          els
            .filter((el) => el.getAttribute("role") !== "switch")
            .map((el) => el.getBoundingClientRect())
            .filter((r) => r.width > 0)
            .map((r) => [r.left, r.right]),
        );
      for (const [left, right] of siblings) {
        const overlaps = left < box!.x + box!.width - 1 && right > box!.x + 1;
        expect(overlaps).toBe(false);
      }
    });
  }
});

test.describe("Dark islands", () => {
  test("the portfolio category badge keeps its dark surface in light", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/portfolio/");
    const badge = page.locator('span[data-theme="dark"]').first();
    await expect(badge).toBeVisible();
    expect(
      await badge.evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--bg").trim(),
      ),
    ).toBe("#0a0e14");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await context.close();
  });
});
