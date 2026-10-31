import { test, expect } from "@playwright/test";

test.describe("Experience dates west of UTC", () => {
  test.use({ timezoneId: "America/Los_Angeles" });

  test("months match the server render and hydration is clean", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && /hydrat/i.test(message.text())) {
        errors.push(message.text());
      }
    });

    await page.goto("/experience/");
    await expect(page.getByText("Jun 2023 - Present")).toBeVisible();
    await expect(page.getByText("May 2023 - Present")).toHaveCount(0);
    expect(errors).toEqual([]);
  });
});

test.describe("Layout width", () => {
  for (const width of [320, 768, 1024]) {
    test(`home and education do not scroll sideways at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/", "/education/"]) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe("Phone layout at 360px", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test("the hero word flip never widens the page", async ({ page }) => {
    await page.goto("/");
    const peak = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let max = 0;
          const end = performance.now() + 7000;
          const tick = () => {
            max = Math.max(max, document.documentElement.scrollWidth);
            if (performance.now() < end) requestAnimationFrame(tick);
            else resolve(max);
          };
          tick();
        }),
    );
    expect(peak).toBeLessThanOrEqual(360);
  });

  test("the lightbox image fills the width of the phone", async ({ page }) => {
    await page.goto("/portfolio/deep-anatomy/");
    const buttons = page.getByRole("button", {
      name: /^View .* in full size$/,
    });
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).scrollIntoViewIfNeeded();
      await buttons.nth(i).click();
      const image = page.getByRole("dialog").locator("img");
      await expect(image).toBeVisible();
      await page.waitForTimeout(300);
      const box = await image.boundingBox();
      expect(box?.width, `lightbox image ${i}`).toBeGreaterThanOrEqual(326);
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
    }
  });

  test("a publication title keeps most of the card width", async ({ page }) => {
    await page.goto("/publications/");
    const title = page.locator("article h2").first();
    await expect(title).toBeVisible();
    const wrapper = title.locator("xpath=ancestor::div[1]");
    const card = await title.locator("xpath=ancestor::article").boundingBox();
    const box = await wrapper.boundingBox();
    const contentWidth = await wrapper.evaluate((el) => {
      const style = getComputedStyle(el);
      return (
        el.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)
      );
    });
    expect(contentWidth).toBeGreaterThanOrEqual((card?.width ?? 0) - 50);

    const badge = await page
      .locator("article span.rounded-full")
      .first()
      .boundingBox();
    expect(badge?.y).toBeLessThan(box?.y ?? 0);
    expect((badge?.y ?? 0) + (badge?.height ?? 0)).toBeLessThanOrEqual(
      box?.y ?? 0,
    );
  });
});

test.describe("Touch screens", () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true });

  test("the lightbox thumbnail shows an expand cue and no Esc hint", async ({
    page,
  }) => {
    await page.goto("/portfolio/deep-anatomy/");
    const thumb = page
      .getByRole("button", { name: /^View .* in full size$/ })
      .first();
    await thumb.scrollIntoViewIfNeeded();
    await expect(thumb.locator("svg.w-4")).toBeVisible();
    await thumb.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("to close")).toBeHidden();
  });
});

test.describe("Document structure", () => {
  for (const path of ["/portfolio/", "/publications/", "/references/"]) {
    test(`${path} headings do not skip a level`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main h2").first()).toBeVisible();
      const levels = await page.evaluate(() =>
        [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) =>
          Number(h.tagName[1]),
        ),
      );
      levels.forEach((level, i) => {
        if (i > 0)
          expect(level - levels[i - 1], `heading ${i}`).toBeLessThan(2);
      });
    });
  }

  test("the skip link is the first tab stop and moves focus to main", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const link = page.getByRole("link", { name: "Skip to content" });
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator("main")).toBeFocused();
  });

  test("the nav marks the current page, also on a project page", async ({
    page,
  }) => {
    await page.goto("/portfolio/deep-anatomy/");
    const current = page.locator('nav a[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText("Portfolio");
  });

  test("tab panels never share an id while one swaps for another", async ({
    page,
  }) => {
    await page.goto("/experience/");
    const card = page
      .locator("article")
      .filter({ has: page.getByRole("button", { name: "Links" }) })
      .first();
    await card.getByRole("button", { name: "Responsibilities" }).click();
    await expect(card.locator('[id$="-panel"]')).toHaveCount(1);
    await card.getByRole("button", { name: "Links" }).click();
    const duplicates = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id$="-panel"]')].map(
        (el) => el.id,
      );
      return ids.length - new Set(ids).size;
    });
    expect(duplicates).toBe(0);
  });
});

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("Escape closes the menu and returns focus to the toggle", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle menu" });

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });
});

test.describe("Figure lightbox", () => {
  test("opens as a modal dialog and returns focus on close", async ({
    page,
  }) => {
    await page.goto("/portfolio/coronary-insight/");
    const thumbnail = page
      .getByRole("button", { name: /in full size$/ })
      .first();

    await thumbnail.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(
      page.getByRole("button", { name: "Close (Esc)" }),
    ).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(thumbnail).toBeFocused();
  });
});

test.describe("Portfolio filter", () => {
  test("survives opening a project and going back", async ({ page }) => {
    await page.goto("/portfolio/");
    const medicalImaging = page.getByRole("button", {
      name: /^Medical Imaging/,
    });

    await medicalImaging.click();
    await expect(page).toHaveURL(/\?filter=medical-imaging$/);
    await expect(medicalImaging).toHaveAttribute("aria-pressed", "true");

    await page
      .locator('[role="listitem"] a[href^="/portfolio/"]')
      .first()
      .click();
    await expect(page).toHaveURL(/\/portfolio\/[a-z-]+\/$/);
    await page.goBack();

    await expect(page).toHaveURL(/\?filter=medical-imaging$/);
    await expect(medicalImaging).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("Page metadata", () => {
  for (const path of ["/experience/", "/portfolio/deep-anatomy/"]) {
    test(`${path} has a canonical link and og:url`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`${path}$`),
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        new RegExp(`${path}$`),
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
        "content",
        "website",
      );
    });
  }
});

test.describe("Cards without JavaScript", () => {
  const paths = ["/portfolio/", "/publications/", "/references/"];

  for (const path of paths) {
    test(`${path} serves cards that are not transparent`, async ({
      request,
    }) => {
      const html = await (await request.get(path)).text();
      const items = html.match(/<div[^>]*role="listitem"[^>]*>/g) ?? [];

      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item).not.toContain("opacity:0");
      }
    });

    test(`${path} shows its cards when scripts are off`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(path);

      await expect(page.locator('[role="listitem"]').first()).toHaveCSS(
        "opacity",
        "1",
      );
      await context.close();
    });

    test(`${path} cards keep their entrance animation`, async ({ page }) => {
      await page.goto(path);

      const name = await page
        .locator('[role="listitem"]')
        .first()
        .evaluate((el) => getComputedStyle(el).animationName);
      expect(name).not.toBe("none");
    });
  }
});

test.describe("Sitemap and robots", () => {
  const SITE = "https://www.vdanilov.com";

  test("sitemap lists the main pages and every project", async ({
    page,
    request,
  }) => {
    await page.goto("/portfolio/?filter=all");
    await expect(page.locator('[role="listitem"]')).toHaveCount(22);
    const hrefs = await page
      .locator('[role="listitem"] a[href^="/portfolio/"]')
      .evaluateAll((links) => [
        ...new Set(links.map((a) => a.getAttribute("href"))),
      ]);
    expect(hrefs).toHaveLength(22);

    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");

    const xml = await response.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const pages = [
      "/",
      "/experience/",
      "/education/",
      "/portfolio/",
      "/publications/",
      "/references/",
    ];
    expect([...locs].sort()).toEqual(
      [...pages, ...hrefs].map((path) => `${SITE}${path}`).sort(),
    );
  });

  test("robots.txt allows crawling and names the sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toMatch(/User-Agent: \*/i);
    expect(text).toMatch(/Allow: \//i);
    expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });
});
