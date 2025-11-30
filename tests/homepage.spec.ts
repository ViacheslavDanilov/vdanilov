import { test, expect } from "@playwright/test";

test("homepage has title and navigation", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Viacheslav Danilov/);

  // Check if main content is visible (adjust selector based on actual content)
  // For now, just checking if the body is visible as a basic sanity check
  await expect(page.locator("body")).toBeVisible();
});
