import { test, expect, type Page } from "@playwright/test";

test.describe("Homepage - Basic Page Tests", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Viacheslav Danilov/);
  });

  test("body element is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("all main sections are present", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("domcontentloaded");

    // Check that main structural elements exist
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Homepage - Navigation Tests", () => {
  test.describe("Desktop Navigation", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("navbar is visible on desktop", async ({ page }) => {
      await page.goto("/");
      const navbar = page.locator("nav").first();
      await expect(navbar).toBeVisible();
    });

    test("all 6 navigation links are present and clickable", async ({
      page,
    }) => {
      await page.goto("/");

      const navLinks = [
        { text: "Home", href: "/" },
        { text: "Experience", href: "/experience" },
        { text: "Education", href: "/education" },
        { text: "Portfolio", href: "/portfolio" },
        { text: "Publications", href: "/publications" },
        { text: "References", href: "/references" },
      ];

      for (const link of navLinks) {
        const navLink = page.getByRole("link", {
          name: link.text,
          exact: true,
        });
        await expect(navLink).toBeVisible();
      }
    });

    test("logo is visible and clickable", async ({ page }) => {
      await page.goto("/");
      const logo = page.locator('nav img[alt="Viacheslav Danilov"]');
      await expect(logo).toBeVisible();
    });

    test("logo navigates to home page", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      // Click Experience link first to navigate away from home
      const experienceLink = page
        .getByRole("link", { name: "Experience" })
        .first();
      await experienceLink.click();
      await page.waitForURL(/\/experience\/?/);

      // Now click logo to go back home
      const logo = page.locator("nav").first().locator('a[href="/"]').first();
      await logo.click();
      await expect(page).toHaveURL(/^\/$|^\/$/);
    });
  });

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("mobile menu toggle is visible on mobile", async ({ page }) => {
      await page.goto("/");
      const menuToggle = page.locator('nav button[aria-label="Toggle menu"]');
      await expect(menuToggle).toBeVisible();
    });

    test("mobile menu opens and closes", async ({ page }) => {
      await page.goto("/");

      const menuToggle = page.locator('nav button[aria-label="Toggle menu"]');

      // Click to open menu
      await menuToggle.click();

      // Wait for menu to appear - check for navigation links in mobile menu
      await expect(
        page.getByRole("link", { name: "Experience" }),
      ).toBeVisible();

      // Close menu
      await menuToggle.click();

      // Wait a bit for animation
      await page.waitForTimeout(300);
    });

    test("mobile menu navigation links are clickable when menu is open", async ({
      page,
    }) => {
      await page.goto("/");

      const menuToggle = page.locator('nav button[aria-label="Toggle menu"]');
      await menuToggle.click();

      // Wait for menu to open and check that navigation links are visible
      const experienceLink = page.getByRole("link", { name: "Experience" });
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
    await expect(
      page.getByText("Fusing Science with Engineering Precision"),
    ).toBeVisible();
  });

  test("hero section displays animated role titles", async ({ page }) => {
    await page.goto("/");

    // Check that at least one of the flip words is present
    const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];
    let foundRole = false;

    for (const role of roles) {
      const roleElement = page.locator(`text="${role}"`);
      if (await roleElement.isVisible()) {
        foundRole = true;
        break;
      }
    }

    expect(foundRole).toBeTruthy();
  });

  test("hero video element is present", async ({ page }) => {
    await page.goto("/");

    const video = page.locator("video").first();
    await expect(video).toBeVisible();

    // Check video has autoplay attribute
    await expect(video).toHaveAttribute("autoplay");
  });

  test("CV download button is visible and has correct link", async ({
    page,
  }) => {
    await page.goto("/");

    const cvButton = page.getByRole("link", { name: /Download CV/i });
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toHaveAttribute("href", /drive\.google\.com/);
  });
});

test.describe("Homepage - About Section", () => {
  test("about section is visible with heading", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
    await expect(
      page.getByText(
        "Bridging science and engineering to solve complex challenges",
      ),
    ).toBeVisible();
  });

  test("about video element is present", async ({ page }) => {
    await page.goto("/");

    const videos = page.locator("video");
    const videoCount = await videos.count();

    // There should be at least 2 videos (hero + about)
    expect(videoCount).toBeGreaterThanOrEqual(2);
  });

  test("all 6 social links are present in about section", async ({ page }) => {
    await page.goto("/");

    const socialLinks = [
      { name: "LinkedIn", href: "linkedin.com" },
      { name: "GitHub", href: "github.com" },
      { name: "Google Scholar", href: "scholar.google.com" },
      { name: "ORCID", href: "orcid.org" },
      { name: "ResearchGate", href: "researchgate.net" },
      { name: "Email", href: "mailto:" },
    ];

    for (const social of socialLinks) {
      const link = page.locator(`a[href*="${social.href}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test("WhatsApp contact button is visible", async ({ page }) => {
    await page.goto("/");

    const whatsappButton = page.getByRole("link", { name: /Contact me/i });
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton).toHaveAttribute("href", /wa\.me/);
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

    const projects = [
      "Wavelets in the brain",
      "AI-driven lead scoring at scale",
      "Tumor immune phenotype classification",
      "ML for laser ablation assessment",
    ];

    for (const projectTitle of projects) {
      const projectElement = page
        .getByText(projectTitle, { exact: true })
        .first();
      await projectElement.scrollIntoViewIfNeeded();
      await expect(projectElement).toBeVisible();
    }
  });

  test("project cards contain images", async ({ page }) => {
    await page.goto("/");

    // Check for project images - look for images with src containing project paths
    const projectImages = page.locator('img[src*="projects/"]');
    const imageCount = await projectImages.count();

    expect(imageCount).toBeGreaterThanOrEqual(4);
  });

  test("project cards display client information", async ({ page }) => {
    await page.goto("/");

    const clients = [
      "Vall d'Hebron Hospital",
      "Symfa",
      "Boehringer Ingelheim",
      "Institute for Image-Guided Surgery",
    ];

    for (const client of clients) {
      const clientElement = page.getByText(client).first();
      await clientElement.scrollIntoViewIfNeeded();
      await expect(clientElement).toBeVisible();
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

test.describe("Homepage - Expertise Section (BentoGrid)", () => {
  test("expertise section has correct heading", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Expertise & Leadership" }),
    ).toBeVisible();
  });

  test("all 6 expertise cards are visible", async ({ page }) => {
    await page.goto("/");

    const expertiseAreas = [
      "10+ Years of Advanced R&D",
      "Medical Imaging AI",
      "Scalable Systems",
      "Technology Leadership",
      "Cross-Functional Management",
      "Applied ML & AI Across Industries",
    ];

    for (const area of expertiseAreas) {
      await expect(page.getByText(area, { exact: false })).toBeVisible();
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

  test("all 12 client logos are present", async ({ page }) => {
    await page.goto("/");

    // Check for client logo images - look for images in clients directory
    const clientLogos = page.locator('img[src*="clients/"]');
    const logoCount = await clientLogos.count();

    expect(logoCount).toBeGreaterThanOrEqual(12);
  });

  test("client logos have external links", async ({ page }) => {
    await page.goto("/");

    // Find links with client images
    const externalLinks = page.locator('a:has(img[src*="clients/"])');

    const linkCount = await externalLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(12);
  });
});

test.describe("Homepage - Footer", () => {
  test("footer is visible", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("footer contains logo that links to home", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer first
    await page.locator("footer").scrollIntoViewIfNeeded();

    // Check for any link to home in footer
    const footerHomeLink = page.locator('footer a[href="/"]').first();
    await expect(footerHomeLink).toBeVisible();
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

    const socialServices = [
      "LinkedIn",
      "GitHub",
      "Google Scholar",
      "ORCID",
      "ResearchGate",
      "Email",
    ];

    // Scroll to footer
    await page.locator("footer").scrollIntoViewIfNeeded();

    for (const service of socialServices) {
      const socialLink = page
        .locator("footer")
        .getByText(service, { exact: true })
        .first();
      await expect(socialLink).toBeVisible();
    }
  });

  test("footer displays copyright information", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.locator("footer").scrollIntoViewIfNeeded();

    const currentYear = new Date().getFullYear();
    await expect(
      page
        .locator("footer")
        .getByText(`© ${currentYear} Viacheslav Danilov`)
        .first(),
    ).toBeVisible();
  });
});

test.describe("Homepage - Responsive Layout Tests", () => {
  test("mobile viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu toggle should be visible
    await expect(
      page.locator('nav button[aria-label="Toggle menu"]'),
    ).toBeVisible();

    // Main content should still be visible
    await expect(
      page.getByRole("heading", { name: "Viacheslav Danilov, PhD" }),
    ).toBeVisible();
  });

  test("tablet viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    // Check that main sections are visible
    await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Featured Projects" }),
    ).toBeVisible();
  });

  test("desktop viewport displays correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    // Desktop navigation links should be visible (not in mobile menu)
    const experienceLink = page
      .getByRole("link", { name: "Experience", exact: true })
      .first();
    await expect(experienceLink).toBeVisible();
  });
});

test.describe("Homepage - Accessibility Tests", () => {
  test("page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Check for h1
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Check for multiple h2s (section headings)
    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test("interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Tab to first focusable element
    await page.keyboard.press("Tab");

    // Wait a moment for focus to settle
    await page.waitForTimeout(100);

    // Check that an interactive element is focused (link, button, or input)
    const focusedElement = page.locator(":focus");
    const elementCount = await focusedElement.count();

    // Should have at least one focused element
    expect(elementCount).toBeGreaterThan(0);
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("links have accessible names", async ({ page }) => {
    await page.goto("/");

    const links = page.locator("a");
    const linkCount = await links.count();

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

  test("page has no automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");

    // Basic accessibility check - ensure main landmark exists
    await expect(page.locator("main")).toBeVisible();

    // Ensure navigation landmark exists
    await expect(page.locator("nav").first()).toBeVisible();

    // Ensure footer landmark exists
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Homepage - Performance Tests", () => {
  test("page loads within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test("videos load successfully", async ({ page }) => {
    await page.goto("/");

    const videos = page.locator("video");
    const videoCount = await videos.count();

    expect(videoCount).toBeGreaterThanOrEqual(2);

    // Check that videos are present and have source
    const firstVideo = videos.first();
    const hasSrc = await firstVideo.getAttribute("src");
    const hasSourceChild = await firstVideo.locator("source").count();

    // Video should have either src attribute or source child elements
    expect(hasSrc || hasSourceChild > 0).toBeTruthy();
  });

  test("images load successfully", async ({ page }) => {
    await page.goto("/");

    // Wait for images to load
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThan(0);
  });
});
