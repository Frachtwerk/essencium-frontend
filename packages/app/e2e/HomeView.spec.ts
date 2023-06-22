import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('HomeView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('go to homepage and open search bar', async ({ page }) => {
    const searchBarButton = page.getByRole('main').getByRole('button').first()
    await searchBarButton.click()
    const searchBar = page.getByPlaceholder('Search ...')
    await expect(searchBar).toBeVisible()
  })

  test('go to homepage and use start menu', async ({ page }) => {
    const profileButton = page.getByRole('main').getByRole('button').nth(2)
    await profileButton.click()
    await expect(page).toHaveURL(`${BASE_URL}/profile`)
  })
})
