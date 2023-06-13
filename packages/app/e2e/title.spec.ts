import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test('preview has title', async ({ page }) => {
  await page.goto(BASE_URL)
  await expect(page).toHaveTitle(/Essencium/)
})

test('docs have title', async ({ page }) => {
  await page.goto('https://docs.essencium.dev/')

  await expect(page).toHaveTitle(/Essencium/)
})
