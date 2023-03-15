import { expect, test } from '@playwright/test'

test('preview has title', async ({ page }) => {
  await page.goto('https://essencium-frontend.vercel.app/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Essencium/)
})

test('docs have title', async ({ page }) => {
  await page.goto('https://docs.essencium-frontend.vercel.app/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Essencium/)
})
