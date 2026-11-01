import { readFileSync } from "node:fs";
import { test, expect, type Page } from "@playwright/test";

type Entrance = {
  name: string;
  duration: number;
  keyframes: Record<string, unknown>[];
};

const entranceOf = async (page: Page, path: string) => {
  await page.addInitScript(() => {
    document.addEventListener(
      "animationstart",
      (event) => {
        const target = event.target as Element;
        const entered = window as Window & { entrance?: Entrance };
        if (entered.entrance) return;
        if (target !== document.querySelector('[role="listitem"]')) return;
        const animation = target
          .getAnimations()
          .find(
            (a) =>
              (a as CSSAnimation).animationName ===
              (event as AnimationEvent).animationName,
          );
        if (!animation?.effect) return;
        entered.entrance = {
          name: (animation as CSSAnimation).animationName,
          duration: Number(animation.effect.getComputedTiming().duration),
          keyframes: (animation.effect as KeyframeEffect).getKeyframes(),
        };
      },
      true,
    );
  });
  await page.goto(path);

  const read = () =>
    page.evaluate(
      () => (window as Window & { entrance?: Entrance }).entrance ?? null,
    );
  await expect.poll(read).not.toBeNull();
  return (await read()) as Entrance;
};

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
    await expect(page.getByText("Jun 2023 – Present")).toBeVisible();
    await expect(page.getByText("May 2023 – Present")).toHaveCount(0);
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
      const entrance = await entranceOf(page, path);

      expect(entrance.name).toBe("card-in");
      expect(entrance.duration).toBe(300);
    });
  }
});

test.describe("Card entrance", () => {
  test("the entrance fades and scales, and leaves transform to Motion", async ({
    page,
  }) => {
    const { keyframes } = await entranceOf(page, "/portfolio/");

    expect(keyframes.some((kf) => kf.opacity === "0")).toBe(true);
    expect(keyframes.some((kf) => kf.scale === "0.9")).toBe(true);
    for (const kf of keyframes) {
      expect(kf.transform ?? "none").toBe("none");
    }
  });

  test("a kept card does not replay its entrance on a filter change", async ({
    page,
  }) => {
    await page.goto("/portfolio/");
    const medicalImaging = page.getByRole("button", {
      name: /^Medical Imaging \(/,
    });
    await expect(async () => {
      await medicalImaging.click();
      expect(await medicalImaging.getAttribute("aria-pressed")).toBe("true");
    }).toPass();

    const count = Number(
      (await medicalImaging.innerText()).match(/\((\d+)\)/)![1],
    );
    await expect
      .poll(() =>
        page.evaluate((expected) => {
          const list = document.querySelector('[role="list"]')!;
          const items = [
            ...list.querySelectorAll(':scope > [role="listitem"]'),
          ];
          return (
            items.length === expected &&
            items.every((el) => getComputedStyle(el).opacity === "1") &&
            list.getAnimations({ subtree: true }).length === 0
          );
        }, count),
      )
      .toBe(true);

    const { opacities, moved, replays } = await page
      .getByRole("button", { name: /^Featured \(/ })
      .evaluate(
        (button) =>
          new Promise<{
            opacities: number[];
            moved: boolean;
            replays: string[];
          }>((resolve) => {
            const find = () =>
              document
                .querySelector('a[href="/portfolio/coronary-insight/"]')
                ?.closest('[role="listitem"]') ?? null;
            const card = find();
            let didMove = false;
            const observer = new MutationObserver((records) => {
              didMove ||= records.some((r) =>
                [...r.addedNodes].includes(card!),
              );
            });
            observer.observe(document.querySelector('[role="list"]')!, {
              childList: true,
            });
            const replays: string[] = [];
            card!.addEventListener("animationstart", (event) => {
              if (event.target === card) replays.push(event.animationName);
            });

            button.click();
            const samples: number[] = [];
            const end = performance.now() + 500;
            const sample = () => {
              const el = find();
              samples.push(el ? Number(getComputedStyle(el).opacity) : 0);
              if (performance.now() < end) requestAnimationFrame(sample);
              else {
                observer.disconnect();
                resolve({ opacities: samples, moved: didMove, replays });
              }
            };
            requestAnimationFrame(sample);
          }),
      );

    expect(moved, "the card moves in the DOM").toBe(true);
    expect(replays).toEqual([]);
    expect(opacities.length).toBeGreaterThan(0);
    expect(Math.min(...opacities)).toBeGreaterThanOrEqual(0.95);
  });

  test("a card a filter link adds gets one entrance, not two", async ({
    page,
  }) => {
    type Added = { name: string; transform: string };
    await page.addInitScript(() => {
      document.addEventListener(
        "animationstart",
        (event) => {
          const target = event.target as HTMLElement;
          if (!target.matches('[role="listitem"]')) return;
          if (!target.querySelector('a[href="/portfolio/insurecast/"]')) return;
          (window as Window & { added?: Added }).added = {
            name: (event as AnimationEvent).animationName,
            transform: target.style.transform,
          };
        },
        true,
      );
    });
    await page.goto("/portfolio/?filter=all");

    const read = () =>
      page.evaluate(() => (window as Window & { added?: Added }).added ?? null);
    await expect.poll(read).not.toBeNull();
    const added = (await read()) as Added;

    expect(added.name).toBe("card-in");
    expect(["", "none"]).toContain(added.transform);
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("the entrance fades without scaling", async ({ page }) => {
      const { keyframes } = await entranceOf(page, "/portfolio/");

      expect(keyframes.some((kf) => kf.opacity !== undefined)).toBe(true);
      for (const kf of keyframes) {
        expect(kf.scale ?? "none").toBe("none");
        expect(kf.transform ?? "none").toBe("none");
      }
    });
  });
});

test.describe("Sitemap and robots", () => {
  const SITE = "https://www.vdanilov.com";

  test("sitemap lists the main pages and every project", async ({
    page,
    request,
  }) => {
    await page.goto("/portfolio/?filter=all");
    const allLabel = await page
      .getByRole("button", { name: /^All \(\d+\)/ })
      .innerText();
    const total = Number(allLabel.match(/\d+/)![0]);
    await expect(page.locator('[role="listitem"]')).toHaveCount(total);
    const hrefs = await page
      .locator('[role="listitem"] a[href^="/portfolio/"]')
      .evaluateAll((links) => [
        ...new Set(links.map((a) => a.getAttribute("href"))),
      ]);
    expect(hrefs).toHaveLength(total);

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

test.describe("Touch targets at 360px", () => {
  test.use({ viewport: { width: 360, height: 780 }, hasTouch: true });

  const targets = [
    ["menu toggle", "/", 'button[aria-label="Toggle menu"]'],
    ["team icons", "/portfolio/deep-anatomy/", 'main a[aria-label*="\'s "]'],
    ["reference icons", "/references/", 'main a[aria-label*="\'s "]'],
    ["About icons", "/", 'main a[aria-label][style*="inline-block"]'],
    ["filter tabs", "/portfolio/", "button[aria-pressed]"],
    ["card tabs", "/experience/", "article button[aria-expanded]"],
    ["footer links", "/", "footer ul a"],
    ["portfolio card titles", "/portfolio/?filter=all", "article a:has(h2)"],
  ];

  for (const [name, path, selector] of targets) {
    test(`${name} are at least 44px square`, async ({ page }) => {
      await page.goto(path);
      const boxes = await page.locator(selector).evaluateAll((els) =>
        els.map((el) => ({
          width: (el as HTMLElement).offsetWidth,
          height: (el as HTMLElement).offsetHeight,
        })),
      );

      expect(boxes.length).toBeGreaterThan(0);
      for (const { width, height } of boxes) {
        expect(width).toBeGreaterThanOrEqual(43.5);
        expect(height).toBeGreaterThanOrEqual(43.5);
      }
    });
  }

  test("Experience company links take a tap 21px above and below", async ({
    page,
  }) => {
    await page.goto("/experience/");
    const misses = await page
      .locator('main a[aria-label$="website"]:not(:has(img))')
      .evaluateAll((links) =>
        links.flatMap((link) => {
          link.scrollIntoView({ block: "center" });
          const { left, top, width, height } = link.getBoundingClientRect();
          const x = left + width / 2;
          return [-21, 21]
            .map((dy) => document.elementFromPoint(x, top + height / 2 + dy))
            .filter((hit) => !link.contains(hit))
            .map(() => link.textContent);
        }),
      );

    expect(misses).toEqual([]);
  });

  test("a press moves a tab and a portfolio card", async ({ page }) => {
    await page.goto("/portfolio/");
    const tab = page.locator('button[aria-pressed="false"]').first();
    const card = page.locator("article").first();

    for (const target of [tab, card]) {
      await target.scrollIntoViewIfNeeded();
      const box = (await target.boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await expect
        .poll(() => target.evaluate((el) => getComputedStyle(el).scale))
        .not.toBe("none");
      expect(
        await target.evaluate((el) => getComputedStyle(el).transitionProperty),
      ).toMatch(/\b(all|scale)\b/);
      await page.mouse.up();
    }
  });
});

test.describe("Small polish", () => {
  test("certificate arrows follow the last word, inside the card at 360px", async ({
    page,
  }) => {
    for (const width of [360, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/education/");

      const problems = await page.evaluate(
        (checkEdge) =>
          [...document.querySelectorAll("article")]
            .filter((article) => article.querySelector("a.group\\/title"))
            .flatMap((article) => {
              const card = article.firstElementChild as HTMLElement;
              const edge =
                card.getBoundingClientRect().right -
                parseFloat(getComputedStyle(card).paddingRight);
              const title = article.querySelector(
                "a.group\\/title span.uppercase",
              ) as HTMLElement;
              const arrow = [...article.querySelectorAll("a.group\\/title svg")]
                .map((icon) => icon.parentElement!.getBoundingClientRect())
                .find((rect) => rect.width > 0)!;
              const words = document.createTreeWalker(
                title,
                NodeFilter.SHOW_TEXT,
              );
              let lastText: Node | null = null;
              while (words.nextNode()) {
                if (words.currentNode.textContent!.trim()) {
                  lastText = words.currentNode;
                }
              }
              const range = document.createRange();
              range.selectNodeContents(lastText!);
              const lines = [...range.getClientRects()];
              const last = lines[lines.length - 1];
              const offset =
                arrow.top + arrow.height / 2 - (last.top + last.bottom) / 2;
              const gap = arrow.left - last.right;

              const found: string[] = [];
              if (checkEdge && arrow.right > edge + 0.5) {
                found.push("outside the content box");
              }
              if (Math.abs(offset) > 2) found.push("off the last title line");
              if (gap < 0 || gap > 12) found.push("not next to the last word");
              return found.map((what) => `${title.textContent}: ${what}`);
            }),
        width === 360,
      );

      expect(problems, `at ${width}px`).toEqual([]);
    }
  });

  test("glow cards let a two-finger pinch zoom the page", async ({ page }) => {
    await page.goto("/references/");

    await expect(
      page.locator('main div[style*="touch-action"]').first(),
    ).toHaveCSS("touch-action", "pan-y pinch-zoom");
  });

  test("tabs draw their focus ring on the visible pill", async ({ page }) => {
    await page.goto("/portfolio/");
    const rings = await page
      .locator("button[aria-pressed]")
      .evaluateAll((tabs) =>
        tabs.map((tab) => {
          const style = getComputedStyle(tab);
          return {
            round:
              parseFloat(style.borderTopLeftRadius) >=
              (tab as HTMLElement).offsetHeight / 2,
            offset: style.outlineOffset,
          };
        }),
      );

    expect(rings.length).toBeGreaterThan(0);
    for (const ring of rings)
      expect(ring).toEqual({ round: true, offset: "-4px" });
  });

  test("reference badges keep 8px clear of the photo circle at 360px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 900 });
    await page.goto("/references/");

    const gaps = await page.evaluate(() =>
      [...document.querySelectorAll("main h2")].slice(0, 6).map((heading) => {
        const card = heading.closest("div.relative")!;
        const photo = card.querySelector("img")!.parentElement!;
        const badge = card
          .querySelector(".absolute.top-5.right-5")!
          .getBoundingClientRect();
        const circle = photo.getBoundingClientRect();
        const radius = circle.width / 2;
        const cx = circle.left + radius;
        const cy = circle.top + radius;
        const nearX = Math.min(Math.max(cx, badge.left), badge.right);
        const nearY = Math.min(Math.max(cy, badge.top), badge.bottom);
        return Math.hypot(cx - nearX, cy - nearY) - radius;
      }),
    );

    expect(gaps).toHaveLength(6);
    for (const gap of gaps) expect(gap).toBeGreaterThanOrEqual(8);
  });

  test("project tech chips use the 12px chip size", async ({ page }) => {
    await page.goto("/portfolio/deep-anatomy/");
    const chip = page
      .locator('span[class*="rounded-full"][class*="bg-white/5"]')
      .first();

    await expect(chip).toHaveCSS("font-size", "12px");
  });

  test("the page sets a theme colour for the browser bar", async ({
    request,
  }) => {
    const html = await (await request.get("/")).text();

    expect(html).toMatch(/<meta name="theme-color" content="#0a0e14"\/?>/i);
  });
});

test.describe("Date ranges", () => {
  for (const path of ["/education/", "/experience/"]) {
    test(`${path} separates dates with an en dash`, async ({ page }) => {
      await page.goto(path);
      const text = await page.locator("main").innerText();

      expect(text).toMatch(
        /[A-Z][a-z]{2} \d{4} \u2013 (?:[A-Z][a-z]{2} \d{4}|Present)/,
      );
      expect(text).not.toMatch(/\d{4} - /);
    });
  }
});

test.describe("Last small tap targets at 360px", () => {
  test.use({ viewport: { width: 360, height: 780 }, hasTouch: true });

  const targets = [
    ["logo links", "/", 'a[aria-label="Go to home page"]'],
    ["Featured project titles", "/", "main a:has(> h3)"],
    [
      "Back to Portfolio",
      "/portfolio/deep-anatomy/",
      'main a[href="/portfolio/"]',
    ],
    [
      "client link",
      "/portfolio/deep-anatomy/",
      "main header a.text-accent:not([class*='bg-'])",
    ],
    [
      "client link with a short name",
      "/portfolio/risk-profiler/",
      "main header a.text-accent:not([class*='bg-'])",
    ],
    [
      "client link that wraps",
      "/portfolio/hypervision-ablation/",
      "main header a.text-accent:not([class*='bg-'])",
    ],
    [
      "resource buttons",
      "/portfolio/deep-anatomy/",
      "main a:has-text('PhD Thesis'), main a:has-text('PhD Abstract')",
    ],
    [
      "institution links",
      "/education/",
      'main a[aria-label$="website"]:not(:has(img))',
    ],
    ["certificate titles", "/education/", "article a.group\\/title"],
    ["certificate organisations", "/education/", "article a.tracking-wider"],
  ];

  for (const [name, path, selector] of targets) {
    test(`${name} take a tap in a 44px area`, async ({ page }) => {
      await page.goto(path);
      const areas = await page.locator(selector).evaluateAll((links) =>
        links.map((link) => {
          link.scrollIntoView({ block: "center" });
          const box = link.getBoundingClientRect();
          const cx = box.left + box.width / 2;
          const cy = box.top + box.height / 2;
          const run = (dx: number, dy: number) => {
            let n = 0;
            while (
              n < 60 &&
              link.contains(document.elementFromPoint(cx + dx * n, cy + dy * n))
            )
              n += 1;
            return n;
          };
          return {
            label: link.textContent?.trim().slice(0, 24),
            width: run(1, 0) + run(-1, 0) - 1,
            height: run(0, 1) + run(0, -1) - 1,
          };
        }),
      );

      expect(areas.length).toBeGreaterThan(0);
      for (const { label, width, height } of areas) {
        expect(width, `${label} width`).toBeGreaterThanOrEqual(43);
        expect(height, `${label} height`).toBeGreaterThanOrEqual(43);
      }
    });
  }

  test("tap areas stay out of the keyboard focus ring", async ({ page }) => {
    for (const [name, path, selector] of targets) {
      await page.goto(path);
      await page.keyboard.press("Shift");
      const focused = await page.locator(selector).evaluateAll((links) =>
        links.map((link) => {
          (link as HTMLElement).focus();
          const after = getComputedStyle(link, "::after");
          return {
            ring: after.content !== "none" && after.display !== "none",
            padded:
              !link.matches("[class*='bg-']") &&
              getComputedStyle(link).paddingTop !== "0px",
          };
        }),
      );

      expect(focused.length, name).toBeGreaterThan(0);
      for (const { ring, padded } of focused) {
        expect(ring, `${name} pseudo-element`).toBe(false);
        expect(padded, `${name} padding`).toBe(false);
      }
    }
  });
});

test.describe("Page weight", () => {
  test("the home page fetches only the upright Poppins files", async ({
    page,
  }) => {
    const fonts: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "font") fonts.push(request.url());
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    expect(fonts.length).toBeGreaterThan(0);
    expect(fonts.length).toBeLessThanOrEqual(5);
  });

  test("italic text still uses a real italic face", async ({ page }) => {
    await page.goto("/publications/");
    await page.evaluate(() => document.fonts.ready);

    const italics = await page.evaluate(
      () =>
        [...document.fonts].filter(
          (face) => face.style === "italic" && face.status === "loaded",
        ).length,
    );
    expect(italics).toBeGreaterThanOrEqual(1);
    expect(italics).toBeLessThanOrEqual(2);
  });

  test("server-only home sections stay server components", () => {
    for (const name of [
      "About",
      "FeaturedProjects",
      "ExpertiseSection",
      "CallToAction",
    ]) {
      const source = readFileSync(`components/${name}.jsx`, "utf8");
      expect(source.trimStart(), name).not.toMatch(/^["']use client["']/);
    }
  });

  test("/references/ loads only the first card image eagerly", async ({
    page,
  }) => {
    await page.goto("/references/");

    await expect(page.locator('main img:not([loading="lazy"])')).toHaveCount(1);
  });

  test("the home page warms nothing when the data saver is on", async ({
    browser,
  }) => {
    const warmed = async (saveData: boolean) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.addInitScript((value) => {
        Object.defineProperty(navigator, "connection", {
          value: { saveData: value },
          configurable: true,
        });
      }, saveData);
      let count = 0;
      page.on("request", (request) => {
        if (request.url().endsWith("/experience/core-roles/symfa.svg")) {
          count += 1;
        }
      });
      await page.goto("/");
      await page.waitForTimeout(3500);
      await context.close();
      return count;
    };

    expect(await warmed(false)).toBeGreaterThan(0);
    expect(await warmed(true)).toBe(0);
  });

  for (const project of ["deep-anatomy", "sonoguide"]) {
    test(`${project} shows the feature transfer figure as a video`, async ({
      page,
      request,
    }) => {
      const gifs: string[] = [];
      page.on("response", (response) => {
        if (response.url().endsWith(".gif")) gifs.push(response.url());
      });
      await page.goto(`/portfolio/${project}/`);

      const video = page.locator(
        `video[controls] source[src="/portfolio/${project}/v-net-feature-transfer.mp4"]`,
      );
      await expect(video).toHaveCount(1);
      await expect(page.locator('img[src*=".gif"]')).toHaveCount(0);
      expect(gifs).toEqual([]);

      const response = await request.get(
        `/portfolio/${project}/v-net-feature-transfer.mp4`,
      );
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("video/mp4");
    });
  }
});

test.describe("Hero and About videos", () => {
  for (const [name, src] of [
    ["hero", "/hero/hero-video.mp4"],
    ["about", "/hero/about-video.mp4"],
  ]) {
    test(`the ${name} video is 1082 px, plays and stays under 4 MB`, async ({
      page,
      request,
    }) => {
      await page.goto("/");
      const video = page.locator(`video:has(source[src="${src}"])`);
      await video.scrollIntoViewIfNeeded();

      await expect
        .poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime), {
          timeout: 15_000,
        })
        .toBeGreaterThan(0);
      const size = await video.evaluate((el: HTMLVideoElement) => [
        el.videoWidth,
        el.videoHeight,
      ]);
      expect(size).toEqual([1082, 1082]);

      const response = await request.get(src);
      expect(response.headers()["content-type"]).toContain("video/mp4");
      expect((await response.body()).length).toBeLessThan(4 * 1024 * 1024);
    });
  }
});

// Number of client logos in each row of the grid, top to bottom
const logoRows = (page: Page) =>
  page.locator('main li:has(img[src*="/clients/"])').evaluateAll((els) => {
    const rows = new Map<number, number>();
    for (const el of els) {
      const top = Math.round(el.getBoundingClientRect().top);
      rows.set(top, (rows.get(top) ?? 0) + 1);
    }
    return [...rows.keys()].sort((a, b) => a - b).map((t) => rows.get(t));
  });

test.describe("Home section spacing", () => {
  for (const [width, height] of [
    [3840, 2160],
    [2560, 1440],
    [1920, 1080],
    [1440, 900],
  ]) {
    test.describe(`at ${width}x${height}`, () => {
      test.use({ viewport: { width, height } });
      // Sections stop growing at 72rem so a very tall screen is not left empty
      const screen = Math.min(height, 1152);

      test("each screen holds one section and the hero does not leak", async ({
        page,
      }) => {
        await page.goto("/");
        const sections = page.locator("main section");
        const boxes = await sections.evaluateAll((els) =>
          els.map((el) => {
            const r = el.getBoundingClientRect();
            return [r.top + scrollY, r.height];
          }),
        );
        expect(boxes).toHaveLength(7);
        for (const i of [1, 2, 3, 4, 5, 6]) {
          expect(boxes[i][1]).toBeGreaterThanOrEqual(screen);
          if (height > screen) expect(boxes[i][1]).toBeLessThan(height);
        }
        expect(boxes[0][0] + boxes[0][1]).toBeCloseTo(screen, 0);
        expect(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth <=
              document.documentElement.clientWidth,
          ),
        ).toBe(true);
      });

      test("the 12 client logos sit in three rows of four", async ({
        page,
      }) => {
        await page.goto("/");
        expect(await logoRows(page)).toEqual([4, 4, 4]);
      });
    });
  }

  for (const [width, height] of [
    [390, 844],
    [800, 1024],
  ]) {
    test(`section content sits 96 px apart at ${width}x${height}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      const rows = await page.locator("main section").evaluateAll((els) =>
        els.map((el) => {
          const s = getComputedStyle(el);
          return [
            el.firstElementChild!.getBoundingClientRect().top + scrollY,
            el.lastElementChild!.getBoundingClientRect().bottom + scrollY,
            parseFloat(s.paddingTop),
            parseFloat(s.paddingBottom),
          ];
        }),
      );
      expect(rows).toHaveLength(7);
      expect(await logoRows(page)).toEqual(
        width < 768 ? [2, 2, 2, 2, 2, 2] : [4, 4, 4],
      );
      rows.forEach(([, , top, bottom], i) => {
        expect([i, top, bottom]).toEqual([i, 48, 48]);
        if (i > 0) expect(rows[i][0] - rows[i - 1][1]).toBeCloseTo(96, 0);
      });
    });
  }
});

test.describe("Client logos", () => {
  test("are white, at most 52px tall and say they open a new tab", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const links = page.locator('main a:has(img[src*="/clients/"])');
    await expect(links).toHaveCount(12);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute(
        "aria-label",
        /\(opens in a new tab\)$/,
      );
      const img = link.locator("img");
      await expect(img).toHaveAttribute("src", /-mono\.svg/);
      await img.scrollIntoViewIfNeeded();
      // A lazy image measures 0px until it loads
      await expect
        .poll(() =>
          img.evaluate((el: HTMLImageElement) =>
            el.complete ? el.naturalWidth : 0,
          ),
        )
        .toBeGreaterThan(0);
      const box = await img.boundingBox();
      expect(box!.height).toBeGreaterThan(0);
      expect(box!.height).toBeLessThanOrEqual(52.5);
    }
  });

  test("only one logo cell is highlighted while the pointer moves", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const links = page.locator('main a:has(img[src*="/clients/"])');
    await links.first().scrollIntoViewIfNeeded();
    const glow = (index: number) =>
      links
        .nth(index)
        .evaluate(
          (el) => getComputedStyle(el.parentElement!, "::before").opacity,
        );
    await links.nth(0).hover();
    await links.nth(1).hover();
    expect(await glow(0)).toBe("0");
    expect(await glow(1)).toBe("1");
  });

  test("a lit logo cell has the same colour with or without the tint", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const links = page.locator('main a:has(img[src*="/clients/"])');
    await links.first().scrollIntoViewIfNeeded();
    const cellBackground = (index: number) =>
      links
        .nth(index)
        .evaluate((el) => getComputedStyle(el.parentElement!).backgroundColor);
    // Cell 0 carries the checkerboard tint at md, cell 1 does not
    expect(await cellBackground(0)).not.toBe("rgba(0, 0, 0, 0)");
    expect(await cellBackground(1)).toBe("rgba(0, 0, 0, 0)");
    for (const index of [0, 1]) {
      await links.nth(index).hover();
      expect(await cellBackground(index)).toBe("rgba(0, 0, 0, 0)");
    }
  });

  test("a cell is lit at every pixel from one logo cell to the next", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const links = page.locator('main a:has(img[src*="/clients/"])');
    await links.first().scrollIntoViewIfNeeded();
    const first = (await links.nth(0).boundingBox())!;
    const second = (await links.nth(1).boundingBox())!;
    const y = first.y + first.height / 2;
    const state = () =>
      page.evaluate(() =>
        [...document.querySelectorAll("main ul li")]
          .filter((li) => li.querySelector('img[src*="/clients/"]'))
          .map((li) => {
            const glow = getComputedStyle(li, "::before");
            const opacity = glow.content === "none" ? "none" : glow.opacity;
            return `${li.matches(":hover") ? "hover" : "idle"} ${opacity}`;
          }),
      );
    const from = Math.round(first.x + first.width / 2);
    const to = Math.round(second.x + second.width / 2);
    for (let x = from; x <= to; x++) {
      await page.mouse.move(x, y);
      const lit = (await state()).filter((cell) => cell !== "idle 0");
      expect([x, lit]).toEqual([x, ["hover 1"]]);
    }
  });
});

test.describe("Reduced motion", () => {
  const modes = [
    ["no preference", "no-preference", true],
    ["reduce", "reduce", false],
  ] as const;

  for (const [name, reducedMotion, moves] of modes) {
    test.describe(`with ${name}`, () => {
      test.use({ reducedMotion });

      test(`an About icon ${moves ? "grows" : "stays put"} on hover`, async ({
        page,
      }) => {
        await page.goto("/");
        const icon = page
          .locator('main a[aria-label][style*="inline-block"]')
          .first();
        await icon.scrollIntoViewIfNeeded();
        await icon.hover();

        await expect
          .poll(() => icon.evaluate((el) => getComputedStyle(el).scale))
          .toBe(moves ? "1.1" : "none");
      });

      test(`a card title arrow ${moves ? "slides" : "stays put"} on hover`, async ({
        page,
      }) => {
        await page.goto("/portfolio/");
        const title = page.locator("article a:has(h2)").first();
        await title.scrollIntoViewIfNeeded();
        await title.hover();
        const arrow = title.locator("span.inline-block");

        await expect
          .poll(() => arrow.evaluate((el) => getComputedStyle(el).translate))
          .toBe(moves ? "4px" : "none");
      });

      test(`a pressed tab ${moves ? "shrinks" : "stays put"}`, async ({
        page,
      }) => {
        await page.goto("/portfolio/");
        const tab = page.locator('button[aria-pressed="false"]').first();
        const box = (await tab.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();

        await expect
          .poll(() => tab.evaluate((el) => getComputedStyle(el).scale))
          .toBe(moves ? "0.95" : "none");
        await page.mouse.up();
      });

      test(`the navbar ${moves ? "slides" : "jumps"} when it hides`, async ({
        page,
      }) => {
        await page.goto("/");

        const property = await page
          .locator("nav")
          .first()
          .evaluate((el) => getComputedStyle(el).transitionProperty);
        if (moves) expect(property).not.toBe("none");
        else expect(property).toBe("none");
      });

      test(`an Experience tab panel opens ${moves ? "gradually" : "at once"}`, async ({
        page,
      }) => {
        await page.goto("/experience/");
        const card = page.locator("article").first();
        await card.scrollIntoViewIfNeeded();

        const heights = await card.evaluate(async (article) => {
          const tab = article.querySelector(
            "button[aria-expanded]",
          ) as HTMLElement;
          const samples: number[] = [];
          const started = performance.now();
          tab.click();
          while (performance.now() - started < 700) {
            await new Promise(requestAnimationFrame);
            const panel = article.querySelector('[id$="-panel"]');
            samples.push(panel ? panel.getBoundingClientRect().height : 0);
          }
          return samples;
        });

        const settled = heights[heights.length - 1];
        expect(settled).toBeGreaterThan(40);
        const between = heights.filter(
          (h) => h > settled * 0.1 && h < settled * 0.9,
        );
        if (moves) expect(between.length).toBeGreaterThan(2);
        else expect(between).toEqual([]);
      });
    });
  }

  for (const [reducedMotion, instant] of [
    ["reduce", true],
    ["no-preference", false],
  ] as const) {
    test(`the menu icon morphs ${instant ? "at once" : "with a transition"} with ${reducedMotion}`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion });
      await page.setViewportSize({ width: 360, height: 780 });
      await page.goto("/");

      const properties = await page
        .locator(
          'button[aria-label="Toggle menu"] svg, button[aria-label="Toggle menu"] svg path:first-child',
        )
        .evaluateAll((els) =>
          els.map((el) => getComputedStyle(el).transitionProperty),
        );

      expect(properties).toHaveLength(2);
      for (const property of properties) {
        if (instant) expect(property).toBe("none");
        else expect(property).not.toBe("none");
      }
    });
  }
});
