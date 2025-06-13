import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

// TODO: These tests rely on the UI being rendered in english.
// Add separate test user that won't be used by actual users on Staging.
test.describe('NavBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('click through navigation', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/`)

    const adminstrationMenu = page.getByRole('button', {
      name: 'Administration',
    })
    await expect(adminstrationMenu).toBeVisible()
    await adminstrationMenu.click()

    await page.getByRole('link', { name: 'Users' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/users`)

    await page.getByRole('link', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/roles`)

    await page.getByRole('link', { name: 'Rights' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/rights`)

    await page.getByRole('link', { name: 'Translations' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/translations`)

    await expect(
      page.getByRole('link', { name: 'Privacy Policy' }),
    ).toBeVisible()

    await expect(page.getByRole('link', { name: 'Legal Notice' })).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/contact`)

    await expect(page.locator('a').filter({ hasText: 'Logout' })).toBeVisible()

    await expect(page.getByText('2024 Essencium License')).toBeVisible()
  })

  test('toggle hover state of sidebar', async ({ page }) => {
    await expect(page.locator('.tabler-icon-pinned-off')).not.toBeVisible()

    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).not.toBeVisible()
  })

  test('toggle fixed state of sidebar', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.locator('.tabler-icon-pinned-off').click()
    await expect(page.locator('.tabler-icon-pin-filled')).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).hover()

    await page.locator('.tabler-icon-pin-filled').click()
    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.getByRole('link', { name: 'Home' }).hover()
  })
})
