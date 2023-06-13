import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('NavBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })
  test('click through navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Users' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/users`)
    await page.getByRole('button', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/roles`)
    await page.getByRole('button', { name: 'Rights' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/rights`)
    await page.getByRole('button', { name: 'Translations' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/translations`)
  })

  test('open search bar and navigate to users', async ({ page }) => {
    await page.locator('body').press('Meta+k')
    await expect(page.getByPlaceholder('Search ...')).toBeVisible()
    await page.getByPlaceholder('Search ...').click()
    await page.getByPlaceholder('Search ...').fill('users')
    await page.getByPlaceholder('Search ...').press('Enter')
    await expect(page).toHaveURL(`${BASE_URL}/users`)
  })
})
