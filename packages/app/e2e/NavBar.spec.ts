import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('NavBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })
  test('click through navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Home' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/`)
    await page.getByRole('button', { name: 'Users', exact: true }).click()
    await expect(page).toHaveURL(`${BASE_URL}/users`)
    await page.getByRole('button', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/roles`)
    await page.getByRole('button', { name: 'Rights' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/rights`)
    await page.getByRole('button', { name: 'Translations' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/translations`)

    await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Imprint' })).toBeVisible()
    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/contact`)
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    await expect(
      page.getByText('2023 Essencium License PrivacyImprintContact'),
    ).toBeVisible()
  })

  test('toggle hover state of sidebar', async ({ page }) => {
    await expect(
      page.locator('.mantine-1dpon05 > .tabler-icon-pinned-off'),
    ).not.toBeVisible()
    await page.getByRole('button', { name: 'Home' }).hover()
    await expect(
      page.locator('.mantine-1dpon05 > .tabler-icon-pinned-off'),
    ).toBeVisible()
    await page.getByRole('link', { name: 'Contact' }).hover()
    await expect(
      page.locator('.mantine-1dpon05 > .tabler-icon-pinned-off'),
    ).not.toBeVisible()
  })

  test('toggle fixed state of sidebar', async ({ page }) => {
    await page.getByRole('button', { name: 'Home' }).hover()
    await expect(
      page.locator('.mantine-1dpon05 > .tabler-icon-pinned-off'),
    ).toBeVisible()
    await page.locator('.mantine-1dpon05 > .tabler-icon').click()
    await page.getByRole('link', { name: 'Contact' }).hover()
    await expect(
      page.locator('.mantine-1dpon05 > .tabler-icon-pin-filled'),
    ).toBeVisible()
    await page.locator('.mantine-1dpon05 > .tabler-icon').click()
    await page.getByRole('button', { name: 'Home' }).hover()
    await expect(
      page.locator('.mantine-1dpon05 > .tabler-icon-pinned-off'),
    ).toBeVisible()
  })
})
