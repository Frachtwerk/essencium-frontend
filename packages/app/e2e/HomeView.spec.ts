import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('HomeView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('go to homepage and open search bar', async ({ page }) => {
    await page.getByRole('main').getByRole('button').first().click()
    await expect(page.getByPlaceholder('Search ...')).toBeVisible()
  })

  test('go to homepage and use start menu', async ({ page }) => {
    await page.getByRole('main').getByRole('button').nth(2).click()
    await expect(page).toHaveURL(`${BASE_URL}/profile`)
  })
})
