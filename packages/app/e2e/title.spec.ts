import { expect, test } from '@playwright/test'

import { BASE_URL_DOCS } from '../playwright.config'

test('preview has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Home/)
})

// Either remove this test or move it to /packages/docs after fixing
test.skip('docs have title', async ({ page }) => {
  await page.goto(BASE_URL_DOCS)

  await expect(page).toHaveTitle(/Essencium/)
})
