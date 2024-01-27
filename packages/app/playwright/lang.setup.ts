import { test as setup } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

setup('language settings', async ({ page }) => {
  await page.goto(`${BASE_URL}  `)
  await page.getByRole('button', { name: 'Home' }).click()
  await page
    .getByRole('button', { name: 'Test User test.user@e2e.com' })
    .click()
  await page.getByPlaceholder('Language').click()
  await page.getByRole('option', { name: 'English' }).click()
  await page.getByRole('button', { name: 'Save Changes' }).click()
  await page.getByRole('button', { name: 'Home' }).click()
})
