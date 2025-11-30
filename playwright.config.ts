import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },

    /* Test against mobile viewports. */
    // iPhone devices: Latest, 2-3 years old, 5 years old
    {
      name: "iPhone 15",
      use: { ...devices["iPhone 15"] }, // 2023 (latest available)
    },
    {
      name: "iPhone 13",
      use: { ...devices["iPhone 13"] }, // 2021 (2-3 years ago)
    },
    {
      name: "iPhone 11",
      use: { ...devices["iPhone 11"] }, // 2019 (5 years ago)
    },
    // Samsung Galaxy devices: Latest, 2-3 years old, 5 years old
    {
      name: "Galaxy S23 Ultra",
      use: { ...devices["Galaxy S23 Ultra"] }, // 2023 (latest available)
    },
    {
      name: "Galaxy S21",
      use: { ...devices["Galaxy S21"] }, // 2021 (2-3 years ago)
    },
    {
      name: "Galaxy S9+",
      use: { ...devices["Galaxy S9+"] }, // 2018 (5+ years ago)
    },
    // Google Pixel devices: Latest, 2-3 years old, 5 years old
    {
      name: "Pixel 8",
      use: { ...devices["Pixel 8"] }, // 2023 (latest available)
    },
    {
      name: "Pixel 5",
      use: { ...devices["Pixel 5"] }, // 2020 (2-3 years ago)
    },
    {
      name: "Pixel 3",
      use: { ...devices["Pixel 3"] }, // 2018 (5+ years ago)
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
