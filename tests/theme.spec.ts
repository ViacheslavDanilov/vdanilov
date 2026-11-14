import {
  expect,
  test,
  type Browser,
  type BrowserContextOptions,
  type Page,
} from "@playwright/test";

const LIGHT_BG = "rgb(244, 246, 249)";
const DARK_BG = "rgb(10, 14, 20)";

// Light is a stored choice, so a context starts with it saved
const lightContext = async (
  browser: Browser,
  options: BrowserContextOptions = {},
) => {
  const context = await browser.newContext(options);
  await context.addInitScript(() => localStorage.setItem("theme", "light"));
  return context;
};

const bodyBg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("Theme bootstrap", () => {
  test("a dark system shows the dark theme", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
  });

  test("a stored light choice shows the light theme", async ({ browser }) => {
    const context = await lightContext(browser);
    const page = await context.newPage();
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    await context.close();
  });

  test("a stored light choice shows before first paint", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForFunction(() => document.body !== null);
    expect(
      await page.evaluate(() => document.documentElement.dataset.theme),
    ).toBe("light");
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
  });

  test("a light system still shows the dark theme by default", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/");
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
    expect(
      await page.evaluate(() => document.documentElement.dataset.theme),
    ).toBeUndefined();
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

  test("storage that throws leaves the dark theme and the switch working", async ({
    browser,
  }) => {
    const context = await browser.newContext();
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
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
    await page.getByRole("switch", { name: "Dark theme" }).click();
    await expect.poll(() => bodyBg(page)).toBe(LIGHT_BG);
    expect(errors).toEqual([]);
    await context.close();
  });
});

const themeSwitch = (page: Page) =>
  page.getByRole("switch", { name: "Dark theme" });

test.describe("Theme switch", () => {
  test("a mouse click during the fade still lands", async ({ page }) => {
    await page.goto("/");
    const box = (await themeSwitch(page).boundingBox())!;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    // Raw clicks: a locator click would wait for the fade to end
    await page.mouse.click(x, y);
    await page.waitForTimeout(80);
    await page.mouse.click(x, y);
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
    await page.mouse.click(x, y);
    await page.waitForTimeout(80);
    const link = (await page
      .locator('nav a[href="/experience/"]')
      .first()
      .boundingBox())!;
    await page.mouse.click(link.x + link.width / 2, link.y + link.height / 2);
    await page.waitForURL(/\/experience\/$/);
  });

  test("a modified click during the fade keeps its modifier", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    const box = (await themeSwitch(page).boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(80);
    const link = (await page
      .locator('nav a[href="/experience/"]')
      .first()
      .boundingBox())!;
    const opened = context.waitForEvent("page");
    await page.keyboard.down("ControlOrMeta");
    await page.mouse.click(link.x + link.width / 2, link.y + link.height / 2);
    await page.keyboard.up("ControlOrMeta");
    await opened;
    expect(new URL(page.url()).pathname).toBe("/");
  });

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

  test("flipping back to dark clears the stored choice", async ({ page }) => {
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

  test("without a stored choice a light system does not change the page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(themeSwitch(page)).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => bodyBg(page)).toBe(DARK_BG);
  });

  test("hover and press deepen the track hue in both themes", async ({
    page,
  }) => {
    await page.goto("/");
    const layer = themeSwitch(page).locator("span span").first();
    const opacity = () => layer.evaluate((el) => getComputedStyle(el).opacity);
    const filter = () =>
      themeSwitch(page)
        .locator("span")
        .first()
        .evaluate((el) => getComputedStyle(el).filter);
    for (let i = 0; i < 2; i++) {
      await themeSwitch(page).hover();
      await expect.poll(opacity).toBe(i === 0 ? "0.09" : "0.1");
      expect(await filter()).toBe("none");
      await page.mouse.move(5, 300);
      await expect.poll(opacity).toBe("0");
      await themeSwitch(page).click();
      await page.waitForTimeout(400);
    }
  });

  test("the focus ring sits on the track, not on the tap area", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await themeSwitch(page).focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    const track = themeSwitch(page).locator("span").first();
    await expect(track).toHaveCSS("outline-style", "solid");
    await expect(themeSwitch(page)).toHaveCSS("outline-style", "none");
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
      .toEqual(["#f4f6f9"]);
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
      .toEqual(["#f4f6f9"]);
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
    const context = await lightContext(browser);
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

test.describe("Light polish", () => {
  test("the current page in the navbar is tinted blue in light", async ({
    browser,
  }) => {
    const context = await lightContext(browser, {
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("/experience/");
    const link = page.locator('nav a[aria-current="page"]').first();
    const [r, , b] = await link.evaluate((el) => {
      const ctx = document.createElement("canvas").getContext("2d")!;
      ctx.fillStyle = getComputedStyle(el).backgroundColor;
      ctx.fillRect(0, 0, 1, 1);
      return Array.from(ctx.getImageData(0, 0, 1, 1).data);
    });
    expect(b).toBeGreaterThan(r + 20);
    await context.close();
  });

  // An opaque pill keeps its contrast when a dark picture scrolls under the bar
  for (const [width, selector] of [
    [1440, 'nav a[aria-current="page"]'],
    [360, '#mobile-menu a[aria-current="page"]'],
  ] as const) {
    test(`the current page label keeps 4.5:1 on an opaque pill at ${width}px in light`, async ({
      browser,
    }) => {
      const context = await lightContext(browser, {
        viewport: { width, height: 900 },
      });
      const page = await context.newPage();
      await page.goto("/portfolio/deep-anatomy/");
      if (width === 360) await page.getByLabel("Toggle menu").click();
      const { text, fill } = await page
        .locator(selector)
        .first()
        .evaluate((el) => {
          const rgba = (css: string) => {
            const ctx = document.createElement("canvas").getContext("2d")!;
            ctx.fillStyle = css;
            ctx.fillRect(0, 0, 1, 1);
            return Array.from(ctx.getImageData(0, 0, 1, 1).data);
          };
          const style = getComputedStyle(el);
          return { text: rgba(style.color), fill: rgba(style.backgroundColor) };
        });
      const luminance = (rgb: number[]) => {
        const [r, g, b] = rgb.map((c) =>
          c / 255 <= 0.03928
            ? c / 255 / 12.92
            : ((c / 255 + 0.055) / 1.055) ** 2.4,
        );
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      expect(fill[3]).toBe(255);
      expect(
        (luminance(fill) + 0.05) / (luminance(text) + 0.05),
      ).toBeGreaterThanOrEqual(4.5);
      await context.close();
    });
  }

  test("experience and education cards fade in like the portfolio cards", async ({
    page,
  }) => {
    for (const path of ["/experience/", "/education/", "/portfolio/"]) {
      await page.goto(path, { waitUntil: "commit" });
      await page.waitForFunction(() => document.querySelector("article"));
      const names = await page.evaluate(() =>
        document
          .getAnimations()
          .map((a) => (a as CSSAnimation).animationName)
          .filter((n) => n?.startsWith("card-")),
      );
      expect(names.length, path).toBeGreaterThan(0);
    }
  });
});
