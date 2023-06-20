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
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    await expect(
      page.getByText('2023 Essencium License PrivacyImprintContact')
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Imprint' })).toBeVisible()
    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/contact`)
  })
})
