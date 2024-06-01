import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/**
 * See https://playwright.dev/docs/test-configuration.
 */

dotenv.config({ path: path.resolve(__dirname, '.env.local') })

export const BASE_URL = 'https://staging.essencium.dev'

export const BASE_URL_DOCS = 'https://docs.essencium.dev'

if (!process.env.TEST_ADMIN_USERNAME || !process.env.TEST_ADMIN_PASSWORD) {
  throw new Error(
    'Please provide ADMIN_USERNAME and ADMIN_PASSWORD env variables',
  )
}

export const ADMIN = {
  username: process.env.TEST_ADMIN_USERNAME,
  password: process.env.TEST_ADMIN_PASSWORD,
  firstName: 'Admin',
  lastName: 'User',
}

export default defineConfig({
  testDir: './e2e',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'authSetup',
      testDir: './playwright',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'langSetup',
      testDir: './playwright',
      testMatch: /lang\.setup\.ts/,
      use: {
        storageState: './playwright/.auth/user.json',
      },
      dependencies: ['authSetup'],
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/user.json',
      },
      dependencies: ['authSetup', 'langSetup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: './playwright/.auth/user.json',
      },
      dependencies: ['authSetup', 'langSetup'],
    },
    /* exclude because of login error in safari */
    //   {
    //     name: 'webkit',
    //     use: { ...devices['Desktop Safari'] },
    //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
})
