import { expect, test } from '@playwright/test'

import { BASE_URL, BASE_URL_DOCS } from '../playwright.config'

test('preview has title', async ({ page }) => {
  await page.goto(BASE_URL)
  await expect(page).toHaveTitle(/Home/)
})

test.skip('docs have title', async ({ page }) => {
  await page.goto(BASE_URL_DOCS)

  await expect(page).toHaveTitle(/Essencium/)
})
