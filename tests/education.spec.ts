import { test, expect, type Page } from "@playwright/test";

const CERTIFICATE_TITLES = [
  "Backend Engineer",
  "Database Engineer",
  "Figma UI / UX Design",
  "Tailwind CSS",
  "Web Development",
  "Machine Learning Specialty",
  "Computer Vision",
  "English Language",
  "Digital Marketing",
];

/** The title link inside every visible certificate card. */
function certificateTitles(page: Page) {
  return page.locator('a[class*="group/title"]:visible');
}

test.describe("Education - Certificates Section", () => {
  test("certifications section has correct heading", async ({ page }) => {
    await page.goto("/education/");
    await expect(
      page.getByRole("heading", { name: "Certifications" }),
    ).toBeVisible();
  });

  test("every certificate listed in the data renders", async ({ page }) => {
    await page.goto("/education/");
    for (const title of CERTIFICATE_TITLES) {
      await expect(
        page.getByText(title, { exact: true }).locator("visible=true").first(),
      ).toBeVisible();
    }
  });

  test("every certificate title is a link with a destination", async ({
    page,
  }) => {
    await page.goto("/education/");
    const titles = certificateTitles(page);
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const link = titles.nth(i);
      expect(
        await link.getAttribute("href"),
        `card ${i} has no href`,
      ).toBeTruthy();
      expect(await link.getAttribute("target")).toBe("_blank");
      expect(await link.getAttribute("rel")).toContain("noopener");
    }
  });

  test("every certificate title carries the arrow", async ({ page }) => {
    await page.goto("/education/");
    const titles = certificateTitles(page);
    const count = await titles.count();

    for (let i = 0; i < count; i += 1) {
      await expect(
        titles.nth(i).locator('span[class*="translate-x-1"]'),
        `card ${i} has no arrow`,
      ).toHaveCount(1);
    }
  });

  test("no certificate title wraps to a second line", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/education/");

    const wrapped = await page.evaluate(() => {
      const out: string[] = [];
      for (const link of document.querySelectorAll('a[class*="group/title"]')) {
        const span = link.querySelector("span");
        if (!span || span.getBoundingClientRect().width === 0) continue;
        const lineHeight = parseFloat(getComputedStyle(span).lineHeight);
        const lines = Math.round(
          span.getBoundingClientRect().height / lineHeight,
        );
        if (lines > 1) out.push(`${span.textContent?.trim()} (${lines} lines)`);
      }
      return out;
    });

    expect(wrapped).toEqual([]);
  });

  test("education page does not scroll sideways", async ({ page }) => {
    // The two-column range is left out on purpose, see the fixme below.
    for (const width of [1440, 1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/education/");
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflows, `horizontal scroll at ${width}px`).toBe(false);
    }
  });

  // Known defect, older than this suite and present on main. Between the md and
  // lg breakpoints the certificates grid is two columns and "Machine Learning
  // Specialty" is wider than the column it sits in, so the card pushes the
  // document past the viewport and the whole page scrolls sideways: 3 px at
  // 768, 39 px at 1024. Measured with nine certificates and with ten, so the
  // tenth card is not the cause. Every fix changes how the card looks, by
  // truncating the title, wrapping it, or moving the breakpoint, so the choice
  // belongs to the owner.
  for (const width of [768, 1024]) {
    test.fixme(`education page does not scroll sideways at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/education/");
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflows).toBe(false);
    });
  }
});

test.describe("Education - Degrees", () => {
  test("core and additional education headings are present", async ({
    page,
  }) => {
    await page.goto("/education/");
    await expect(
      page.getByRole("heading", { name: "Core Education" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Additional Education" }),
    ).toBeVisible();
  });

  test("the bachelor thesis matches the wording the CV prints", async ({
    page,
  }) => {
    await page.goto("/education/");
    const bachelor = page
      .locator("article")
      .filter({ hasText: "BSc in Robotics" })
      .first();
    await bachelor.getByRole("button", { name: "Thesis" }).first().click();
    await expect(
      bachelor.getByText(
        "Emergency protection for the catalyst dosing unit in propylene polymerization reactors",
      ),
    ).toBeVisible();
  });
});
