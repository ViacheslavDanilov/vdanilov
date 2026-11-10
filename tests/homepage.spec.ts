import { test, expect, type Page } from "@playwright/test";

test.describe("Homepage - Basic Page Tests", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Viacheslav Danilov/);
  });
});

test.describe("Homepage - Statistics Section", () => {
  test("statistics section has correct heading", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Career Highlights" }),
    ).toBeVisible();
  });

  test("all 6 statistics are visible", async ({ page }) => {
    await page.goto("/");

    const statLabels = [
      "Years of Expertise",
      "ML and AI Projects",
      "Lines of Code Written",
      "Research Publications",
      "Universities Worked At",
      "Countries of Long-term Living",
    ];

    for (const label of statLabels) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test("statistic numbers are displayed", async ({ page }) => {
    // Reduced motion shows the final numbers without the count-up animation
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const statsSection = page.locator("#statistics");
    await expect(statsSection).toBeVisible();
    for (const value of ["10+", "20+", "50k", "48", "12", "6"]) {
      await expect(statsSection).toContainText(value);
    }
  });
});

test.describe("Homepage - Navigation Tests", () => {
  test.describe("Desktop Navigation", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("all 6 navigation links are present with correct hrefs", async ({
      page,
    }) => {
      await page.goto("/");

      const navLinks = [
        { text: "Home", href: /^\/?$/ },
        { text: "Experience", href: /^\/experience\/?$/ },
        { text: "Education", href: /^\/education\/?$/ },
        { text: "Portfolio", href: /^\/portfolio\/?$/ },
        { text: "Publications", href: /^\/publications\/?$/ },
        { text: "References", href: /^\/references\/?$/ },
      ];

      for (const link of navLinks) {
        const navLink = page.locator("nav").first().getByRole("link", {
          name: link.text,
          exact: true,
        });
        await expect(navLink).toBeVisible();
        await expect(navLink).toHaveAttribute("href", link.href);
      }
    });
  });

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("mobile menu navigation links are clickable when menu is open", async ({
      page,
    }) => {
      await page.goto("/");

      const menuToggle = page.locator('nav button[aria-label="Toggle menu"]');
      await menuToggle.click();

      // Wait for menu to open and check that navigation links are visible
      const experienceLink = page
        .locator("#mobile-menu")
        .getByRole("link", { name: "Experience" });
      await expect(experienceLink).toBeVisible();

      // Verify link is clickable
      await expect(experienceLink).toBeEnabled();
    });
  });
});

test.describe("Homepage - Hero Section", () => {
  test("hero section displays name and title", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Viacheslav Danilov, PhD" }),
    ).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("hero section lists the three roles for screen readers", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("#hero [data-depth-flip] > .sr-only")).toHaveText(
      "Tech Lead, Engineering Manager, Research Scientist",
    );
    await expect(page.locator('#hero [data-phrase="current"]')).toHaveText(
      "Tech Lead",
    );
  });

  test("CV download button is visible and has correct link", async ({
    page,
  }) => {
    await page.goto("/");

    const cvButton = page.getByRole("link", { name: /Download CV/i });
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toHaveAttribute(
      "href",
      /^https:\/\/drive\.google\.com\/uc\?export=download&id=1viI3o1RBDoreQcbCwe5zc2NTWpxU7ouk$/,
    );
  });

  test("all 6 social links are present in the hero, in order", async ({
    page,
  }) => {
    await page.goto("/");

    const links = page.locator('#hero a[aria-label][style*="inline-block"]');
    await expect(links).toHaveCount(6);
    expect(
      await links.evaluateAll((els) => els.map((el) => el.ariaLabel)),
    ).toEqual([
      "LinkedIn",
      "GitHub",
      "ResearchGate",
      "Google Scholar",
      "ORCID",
      "Email",
    ]);
    const hrefs = [
      "linkedin.com",
      "github.com",
      "researchgate.net",
      "scholar.google.com",
      "orcid.org",
      "mailto:",
    ];
    for (const [i, href] of hrefs.entries()) {
      await expect(links.nth(i)).toHaveAttribute("href", new RegExp(href));
    }
  });

  test("Contact me opens an email", async ({ page }) => {
    await page.goto("/");

    const contact = page
      .locator("#hero")
      .getByRole("link", { name: "Contact me" });
    await expect(contact).toBeVisible();
    await expect(contact).toHaveAttribute(
      "href",
      "mailto:viacheslav.v.danilov@gmail.com",
    );
  });

  test("social links open in new tab", async ({ page }) => {
    await page.goto("/");

    const linkedInLink = page.locator('a[href*="linkedin.com"]').first();
    await expect(linkedInLink).toHaveAttribute("target", "_blank");
    await expect(linkedInLink).toHaveAttribute("rel", /noopener/);
  });
});

test.describe("Homepage - Featured Projects Section", () => {
  test("featured projects section has correct heading", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Featured Projects" }),
    ).toBeVisible();
  });

  test("all 4 project cards are visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const projects = [
      "Deep BrainWatch",
      "Sales Pilot",
      "Immune Profiler",
      "Video Bokeh",
    ];

    // Scroll way down to ensure projects section is in view
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2),
    );
    await page.waitForTimeout(1000);

    for (const projectTitle of projects) {
      const projectElement = page.getByText(projectTitle, { exact: true });
      await expect(projectElement).toBeVisible({ timeout: 15000 });
    }
  });

  test("project cards contain images", async ({ page }) => {
    await page.goto("/");

    // Preview images go through next/image, so match them by alt text
    for (const title of [
      "Deep BrainWatch",
      "Sales Pilot",
      "Immune Profiler",
      "Video Bokeh",
    ]) {
      await expect(page.locator(`img[alt="${title}"]`)).toBeVisible();
    }
  });

  test("project cards display client information", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const clients = [
      "Vall d'Hebron Hospital",
      "Symfa",
      "Boehringer Ingelheim",
      "Huawei",
    ];

    // Scroll way down to ensure projects section is in view
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2),
    );
    await page.waitForTimeout(1000);

    for (const client of clients) {
      const clientElement = page.getByText(client).first();
      await expect(clientElement).toBeVisible({ timeout: 15000 });
    }
  });

  test("project cards display technology badges", async ({ page }) => {
    await page.goto("/");

    // Check for some common technologies
    const technologies = ["Python", "PyTorch", "scikit-learn"];

    for (const tech of technologies) {
      const techBadge = page.getByText(tech, { exact: true }).first();
      await expect(techBadge).toBeVisible();
    }
  });
});

test.describe("Homepage - Expertise Section", () => {
  test("expertise section has correct heading", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Expertise & Leadership" }),
    ).toBeVisible();
  });
});

test.describe("Homepage - Expertise list with a pinned picture", () => {
  const ROWS = [
    ["10+ Years of Advanced R&D", "research-and-development", "/experience/"],
    [
      "Medical Imaging AI",
      "medical-imaging-ai",
      "/portfolio/?filter=medical-imaging",
    ],
    ["Scalable ML Systems", "scalable-ml-systems", null],
    ["Technology Leadership", "technology-leadership", null],
    ["Cross-Functional Management", "cross-functional-management", null],
    [
      "Applied ML & AI Across Industries",
      "applied-ml-across-industries",
      "/portfolio/?filter=industry-ai-ml",
    ],
  ] as const;

  const row = (page: Page, title: string) =>
    page.locator("li", { has: page.getByRole("heading", { name: title }) });
  const shown = async (page: Page) =>
    decodeURIComponent(
      (await page
        .getByTestId("expertise-picture")
        .locator('img[data-active="true"]')
        .getAttribute("src"))!,
    );

  test("rows link to the portfolio filter or the experience page, or to nothing", async ({
    page,
  }) => {
    await page.goto("/");
    for (const [title, , href] of ROWS) {
      const links = row(page, title).getByRole("link");
      if (href) {
        await expect(links, title).toHaveCount(1);
        await expect(links, title).toHaveAttribute("href", href);
      } else {
        await expect(links, title).toHaveCount(0);
      }
    }
  });

  test("the pinned picture follows the pointer, the keyboard and the scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page
      .getByRole("heading", { name: "Expertise & Leadership" })
      .scrollIntoViewIfNeeded();
    await expect.poll(() => shown(page)).toContain(ROWS[0][1]);

    // Centre a row without a link, so the scroll makes it the active one
    const centre = (title: string) =>
      page.evaluate((title) => {
        const el = [...document.querySelectorAll("li")].find(
          (li) => li.querySelector("h3")?.textContent === title,
        )!;
        const box = el.getBoundingClientRect();
        window.scrollBy(0, box.top + box.height / 2 - innerHeight / 2);
      }, title);
    await page.mouse.move(2, 2);
    await centre(ROWS[2][0]);
    await expect.poll(() => shown(page)).toContain(ROWS[2][1]);

    // The pointer picks a row that is not on the middle line
    await expect(row(page, ROWS[3][0])).toBeInViewport();
    await row(page, ROWS[3][0]).hover();
    await expect.poll(() => shown(page)).toContain(ROWS[3][1]);

    // Tab onto a visible link above the middle line, without scrolling
    await page.mouse.move(2, 2);
    const next = row(page, ROWS[1][0]).getByRole("link");
    await expect(next).toBeInViewport();
    await row(page, ROWS[0][0])
      .getByRole("link")
      .evaluate((link) => (link as HTMLElement).focus({ preventScroll: true }));
    await page.keyboard.press("Tab");
    await expect(next).toBeFocused();
    await expect.poll(() => shown(page)).toContain(ROWS[1][1]);

    // The scroll takes over again
    await centre(ROWS[4][0]);
    await expect.poll(() => shown(page)).toContain(ROWS[4][1]);
  });

  test("on a phone every row carries its own picture and nothing is pinned", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByTestId("expertise-picture")).toBeHidden();
    for (const [title, name] of ROWS) {
      const picture = row(page, title).locator("img");
      await expect(picture, title).toHaveCount(1);
      expect(
        decodeURIComponent((await picture.getAttribute("src"))!),
      ).toContain(name);
    }
  });

  test("with reduced motion the picture changes without a fade", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const durations = await page
      .getByTestId("expertise-picture")
      .locator("img")
      .evaluateAll((images) =>
        images.map((image) => getComputedStyle(image).transitionDuration),
      );
    expect(durations).toHaveLength(6);
    expect(new Set(durations)).toEqual(new Set(["0s"]));
  });

  test("rows that are not active stay dim enough to read", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    // 75% keeps the cyan link of a dim row at 4.5:1 on the page ground
    const opacities = await page
      .locator("section ol > li:not([data-active='true'])")
      .evaluateAll((rows) =>
        rows.map((row) => Number(getComputedStyle(row).opacity)),
      );
    expect(opacities).toHaveLength(5);
    for (const opacity of opacities) {
      expect(opacity).toBeGreaterThanOrEqual(0.75);
      expect(opacity).toBeLessThan(1);
    }
  });
});

test.describe("Homepage - Clients Section (LogoGrid)", () => {
  test("clients section has correct heading", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Selected Clients" }),
    ).toBeVisible();
  });
});

test.describe("Homepage - Footer", () => {
  test("footer contains logo that links to home", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll all the way to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // On desktop (1280x720), footer uses lg:grid layout
    // Check for any link to home in footer
    const footerHomeLink = page.locator('footer a[href="/"]');
    await expect(footerHomeLink.first()).toBeVisible({ timeout: 15000 });
  });

  test("footer has all 6 quick links", async ({ page }) => {
    await page.goto("/");

    const quickLinks = [
      "Home",
      "Experience",
      "Education",
      "Portfolio",
      "Publications",
      "References",
    ];

    for (const linkText of quickLinks) {
      const footerLink = page
        .locator("footer")
        .getByRole("link", { name: linkText, exact: true });
      await expect(footerLink).toBeVisible();
    }
  });

  test("footer has all 6 social connect links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const socialServices = [
      "LinkedIn",
      "GitHub",
      "Google Scholar",
      "ORCID",
      "ResearchGate",
      "Email",
    ];

    // Scroll all the way to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    for (const service of socialServices) {
      const socialLink = page
        .locator("footer")
        .getByText(service, { exact: true });
      await expect(socialLink.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test("footer displays copyright information", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll all the way to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const currentYear = new Date().getFullYear();
    await expect(
      page.locator("footer").getByText(`© ${currentYear} Viacheslav Danilov`),
    ).toBeVisible({ timeout: 15000 });
  });
});

test.describe("Homepage - Accessibility Tests", () => {
  test("images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("links have accessible names", async ({ page }) => {
    await page.goto("/");

    const links = page.locator("a");
    const linkCount = await links.count();

    // Check first 20 visible links for performance - covers critical navigation and hero section links
    let linksChecked = 0;
    for (let i = 0; i < linkCount && linksChecked < 20; i++) {
      const link = links.nth(i);

      // Skip if link is not visible
      if (!(await link.isVisible())) continue;

      const text = (await link.textContent())?.trim();
      const ariaLabel = await link.getAttribute("aria-label");
      const hasImage = (await link.locator("img").count()) > 0;

      // Link should have either text content, aria-label, or contain an image with alt text
      if (hasImage) {
        const img = link.locator("img").first();
        const alt = await img.getAttribute("alt");
        expect(alt).toBeTruthy();
      } else {
        expect(text || ariaLabel).toBeTruthy();
      }

      linksChecked++;
    }
  });
});
