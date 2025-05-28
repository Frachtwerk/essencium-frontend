import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('NavBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test.skip('click through navigation', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/`)

    await page.getByRole('link', { name: 'Users' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/users`)

    await page.getByRole('link', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/roles`)

    await page.getByRole('link', { name: 'Rights' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/rights`)

    await page.getByRole('link', { name: 'Translations' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/translations`)

    await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible()

    await expect(page.getByRole('link', { name: 'Imprint' })).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/contact`)

    await expect(page.locator('a').filter({ hasText: 'Logout' })).toBeVisible()

    await expect(
      page.getByText('2024 Essencium License PrivacyImprintContact'),
    ).toBeVisible()
  })

  test.skip('toggle hover state of sidebar', async ({ page }) => {
    await expect(page.locator('.tabler-icon-pinned-off')).not.toBeVisible()

    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).not.toBeVisible()
  })

  test.skip('toggle fixed state of sidebar', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.locator('.tabler-icon-pinned-off').click()

    await page.getByRole('link', { name: 'Contact' }).hover()

    await expect(page.locator('.tabler-icon-pin-filled')).toBeVisible()

    await page.locator('.tabler-icon-pin-filled').click()

    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()
  })
})
