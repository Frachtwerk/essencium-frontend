import { expect, test } from '@playwright/test'

test.describe('HomeView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('go to homepage and open search bar', async ({ page }) => {
    const searchBarButton = page.getByRole('main').getByRole('button').first()
    await expect(searchBarButton).toBeVisible()
    await searchBarButton.click()

    const searchBar = page.getByPlaceholder('Search (Ctrl + K)')
    await expect(searchBar).toBeVisible()
  })

  test('go to homepage and use start menu', async ({ page }) => {
    const profileButton = page.getByLabel('View profile')
    await profileButton.click()
    await expect(page).toHaveURL('/profile')
  })
})
