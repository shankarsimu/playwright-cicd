import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  //added from google result
  timeout: isCi ? 60000 : 30000, // Give CI double the time (60 seconds)
  expect: {
    timeout: isCi ? 10000 : 5000,
  },
  workers: isCi ? 2 : undefined,   // Restrict workers on CI to prevent thrashing
  retries: isCi ? 2 : 0, 
  
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html'],['github']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
 
  ],

   
});
