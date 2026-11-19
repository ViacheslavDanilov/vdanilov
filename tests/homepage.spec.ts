import { test, expect, type Page } from "@playwright/test";
import { REMOTE_SPANS, STOP_STARTS, progressOfDate } from "../lib/journey.js";

test.describe("Homepage - Basic Page Tests", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Viacheslav Danilov/);
  });
});

test.describe("Homepage - Career Journey", () => {
  const seek = (page: Page, value: number) =>
    page.locator("#journey input[type=range]").evaluate((el, v) => {
      const input = el as HTMLInputElement;
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )!.set!.call(input, String(v));
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }, value);

  test("journey section has its heading", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Career Journey" }),
    ).toBeVisible();
  });

  test("reduced motion opens on the totals and the summary card", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const section = page.locator("#journey");
    for (const [value, label] of [
      ["9", "Countries"],
      ["12", "Cities"],
      ["12", "Universities"],
      ["3", "Remote teams"],
    ]) {
      const item = section.locator("dl:visible > div", {
        has: page.getByText(label, { exact: true }),
      });
      await expect(item.locator("dd")).toHaveText(value);
    }
    await expect(section.getByText("12 cities, 9 countries")).toBeVisible();
    await expect(page.getByRole("button", { name: "Play" })).toBeVisible();
  });

  test("scrubbing to the start shows Tomsk and resets the counters", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const section = page.locator("#journey");
    // The summary card shows once the player has hydrated and opened at the end
    await expect(section.getByText("12 cities, 9 countries")).toBeVisible();
    await seek(page, 0);
    await expect(section.getByText("Tomsk, Russia")).toBeVisible();
    // A stay names the most senior role it overlaps, for the whole stay
    await expect(
      section.getByText("MSc in Computer Engineering"),
    ).toBeVisible();
    await expect(section.getByText("Tomsk State University")).toHaveCount(0);
    await seek(page, Math.round(progressOfDate(Date.UTC(2014, 5, 1)) * 4000));
    await expect(section.getByText("Senior Research Scientist")).toBeVisible();
    await expect(
      section.getByText("PhD Student in Computer Science"),
    ).toHaveCount(0);
    await expect(section.getByText("SIBUR")).toHaveCount(0);
    await seek(page, 0);
    const countries = section.locator("dl:visible > div", {
      has: page.getByText("Countries", { exact: true }),
    });
    await expect(countries.locator("dd")).toHaveText("1");
  });

  test("arrow keys step from stop to stop and the end reads Present", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const section = page.locator("#journey");
    await expect(section.getByText("12 cities, 9 countries")).toBeVisible();
    await expect(section.getByText("Present", { exact: true })).toBeVisible();
    await expect(section.getByText("2007", { exact: true })).toBeVisible();
    await seek(page, 0);
    const timeline = section.getByRole("slider", { name: "Journey timeline" });
    await timeline.focus();
    await page.keyboard.press("ArrowRight");
    await expect(section.getByText("Lisbon, Portugal")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(section.getByText("Tomsk, Russia")).toBeVisible();
    await expect(section.getByText("Sep 2007", { exact: true })).toBeVisible();
    await page.keyboard.press("End");
    await page.keyboard.press("ArrowLeft");
    await expect(section.getByText("Barcelona, Spain")).toBeVisible();
  });

  test("a remote role's start does not bring back the last flight", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const section = page.locator("#journey");
    const trail = section.locator('g[stroke="url(#journey-tail)"]');
    await expect(section.getByText("12 cities, 9 countries")).toBeVisible();
    // Just after a landing the trail is there, which also waits for the map
    await seek(page, Math.ceil((STOP_STARTS[7] + 0.0005) * 4000));
    await expect(trail).toHaveCount(1);
    for (const { revealStart, revealEnd } of REMOTE_SPANS) {
      const step = Math.ceil(
        (revealStart + 0.05 * (revealEnd - revealStart)) * 4000,
      );
      await seek(page, step);
      await expect(section.locator("input[type=range]")).toHaveValue(
        String(step),
      );
      await expect(trail).toHaveCount(0);
    }
  });

  test("a remote city on the final map jumps to its role", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Go to Miami" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#journey").getByText("Symfa")).toBeVisible();
    await expect(
      page.locator('#journey svg[viewBox="0 0 1200 675"] text', {
        hasText: "Miami",
      }),
    ).toBeVisible();
    // The pressed target leaves with the final view, so focus moves to the timeline
    await expect(page.locator("#journey input[type=range]")).toBeFocused();
  });

  test("a city picked on the final map leads back to the whole map", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const section = page.locator("#journey");
    const back = section.getByRole("button", { name: "Back to the whole map" });
    await expect(back).toHaveCount(0);
    await page.getByRole("button", { name: "Go to Trento" }).focus();
    await page.keyboard.press("Enter");
    await expect(section.getByText("12 cities, 9 countries")).toHaveCount(0);
    await back.click();
    await expect(section.getByText("12 cities, 9 countries")).toBeVisible();
    await expect(back).toHaveCount(0);
    await expect(section.locator("input[type=range]")).toBeFocused();
  });

  test("sound is on by default and turning it off is remembered", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const sound = page.getByRole("button", { name: "Sound" });
    await expect(sound).toHaveAttribute("aria-pressed", "true");
    // A click before hydration does nothing, so retry until it toggles
    await expect(async () => {
      await sound.click();
      await expect(sound).toHaveAttribute("aria-pressed", "false", {
        timeout: 500,
      });
    }).toPass();
    await page.reload();
    await expect(page.getByRole("button", { name: "Sound" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("phones get the totals and a static route, without the map", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto("/");

    const section = page.locator("#journey");
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole("img", { name: /Route through/ }),
    ).toBeVisible();
    await expect(section.locator("canvas")).toHaveCount(0);
    const countries = section.locator("dl:visible > div", {
      has: page.getByText("Countries", { exact: true }),
    });
    await expect(countries.locator("dd")).toHaveText("9");
    const width = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(width).toBeLessThanOrEqual(360);
  });

  test("phones never start audio for the journey", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.addInitScript(() => {
      const Original = window.AudioContext;
      window.AudioContext = class extends Original {
        constructor(options?: AudioContextOptions) {
          super(options);
          document.documentElement.dataset.audio = "started";
        }
      };
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByRole("heading", { name: "Career Journey" }).click();
    await page.keyboard.press("a");
    await expect(page.locator("html")).not.toHaveAttribute("data-audio");
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

  test("Download CV is a split button: the industry CV, and a menu with both", async ({
    page,
  }) => {
    await page.goto("/");

    const main = page.locator("#hero").getByRole("link", {
      name: /Download CV/,
    });
    await expect(main).toHaveAttribute(
      "href",
      "https://drive.google.com/file/d/1bE5CESQ41rQEfIBX1KdMHofyzrFVcXcf/view",
    );
    await expect(main).toHaveAttribute("target", "_blank");
    await expect(main).toHaveAccessibleName(
      "Download CV (Industry CV, 3 pages)",
    );

    const button = page.getByRole("button", { name: "Choose CV version" });
    const contact = page.locator("#hero").getByRole("link", {
      name: "Contact me",
    });
    const before = await contact.boundingBox();
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    expect(await contact.boundingBox()).toEqual(before);

    const items = page.locator("#hero ul a");
    await expect(items).toHaveText([/Industry CV/, /Academic CV/]);
    for (const item of await items.all()) {
      await expect(item).toHaveAttribute(
        "href",
        /^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view$/,
      );
      await expect(item).toHaveAttribute("target", "_blank");
      expect((await item.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("the CV menu opens on Enter and Space, closes on Escape, outside click and focus leaving", async ({
    page,
  }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Choose CV version" });
    const menu = page.locator("#hero ul");

    await button.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.locator("#hero ul a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(button).toBeFocused();

    await button.click();
    await expect(menu).toBeVisible();
    await page.mouse.click(5, 300);
    await expect(menu).toHaveCount(0);

    await button.focus();
    await page.keyboard.press("Space");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(menu).toHaveCount(0);
  });

  test("choosing a CV opens it in a new tab and closes the menu", async ({
    page,
    context,
  }) => {
    await context.route("https://drive.google.com/**", (route) =>
      route.fulfill({ body: "" }),
    );
    await page.goto("/");
    const button = page.getByRole("button", { name: "Choose CV version" });
    await button.click();
    const popup = page.waitForEvent("popup");
    await page.locator("#hero ul a").nth(1).click();
    const tab = await popup;
    await tab.waitForURL(
      "https://drive.google.com/file/d/1RpvMc8mo-8BpBisBqaH4sxwlR_xDpqdR/view",
    );
    await expect(page.locator("#hero ul")).toHaveCount(0);
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();

    await button.click();
    const next = page.waitForEvent("popup");
    await page
      .locator("#hero")
      .getByRole("link", { name: /Download CV/ })
      .click();
    await (await next).waitForURL(/1bE5CESQ41rQEfIBX1KdMHofyzrFVcXcf/);
    await expect(page.locator("#hero ul")).toHaveCount(0);
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("the CV menu stays open when focus moves to the page, as a click in it does in Safari", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Choose CV version" }).focus();
    await page.keyboard.press("Enter");
    await page.locator("main").focus();
    await expect(page.locator("#hero ul")).toBeVisible();
  });

  test("the CV menu stays on screen when the button is near the bottom", async ({
    page,
  }) => {
    for (const [width, height] of [
      [320, 640],
      [360, 640],
      [1366, 657],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await page.getByRole("button", { name: "Choose CV version" }).click();
      const menu = (await page.locator("#hero ul").boundingBox())!;
      expect([
        width,
        menu.y >= 0 && menu.y + menu.height <= height,
        menu.x >= 0 && menu.x + menu.width <= width,
      ]).toEqual([width, true, true]);
      // Centred under the pill from 640px, under the button row below it
      const offset = await page.locator("#hero ul").evaluate((ul) => {
        const centre = (el: Element) => {
          const box = el.getBoundingClientRect();
          return box.left + box.width / 2;
        };
        const anchor =
          innerWidth >= 640
            ? ul.previousElementSibling!
            : ul.parentElement!.parentElement!;
        return Math.abs(centre(ul) - centre(anchor));
      });
      expect([width, offset]).toEqual([width, expect.closeTo(0, 0)]);
    }
  });

  test("the CV menu opened above the button is drawn over the navbar", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 568, height: 320 });
    await page.goto("/");
    const nav = page.locator("nav");
    const shown = "matrix(1, 0, 0, 1, 0, 0)";
    // Scrolling down to put the pill 160px from the top hides the navbar; focus brings it back
    await page.locator("#hero").evaluate((hero) => {
      const pill = hero.querySelector('a[href*="drive.google.com"]')!;
      const top = pill.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top - 160, behavior: "instant" });
    });
    await expect(nav).not.toHaveCSS("transform", shown);
    await nav.evaluate((el) =>
      el.querySelector("a")!.focus({ preventScroll: true }),
    );
    await expect(nav).toHaveCSS("transform", shown);
    await page.getByRole("button", { name: "Choose CV version" }).click();
    const [above, onTop] = await page.locator("#hero ul").evaluate((ul) => {
      const box = ul.getBoundingClientRect();
      const pill = ul.previousElementSibling!.getBoundingClientRect();
      const hit = document.elementFromPoint(
        box.left + box.width / 2,
        box.top + 8,
      );
      return [box.bottom <= pill.top, ul.contains(hit)];
    });
    expect([above, onTop]).toEqual([true, true]);
  });

  test("the master CV is linked nowhere on the home page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Choose CV version" }).click();
    const hrefs = await page
      .locator("a[href*='drive.google.com']")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));

    expect(new Set(hrefs).size).toBe(2);
    expect(hrefs.join(" ")).not.toContain("1viI3o1RBDoreQcbCwe5zc2NTWpxU7ouk");
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
      "LayerWise",
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
      "LayerWise",
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
