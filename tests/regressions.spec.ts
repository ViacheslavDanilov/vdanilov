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
    await expect(
      page.getByText("Jun 2023 - Present").locator("visible=true").first(),
    ).toBeVisible();
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
