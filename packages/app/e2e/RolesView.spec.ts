import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('RolesView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/roles`)
  })

  test('go to rolesView, render and sort table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Roles' })).toBeVisible()
    await page.waitForTimeout(4000)
    await expect(
      page
        .getByRole('cell', { name: 'Name', exact: true })
        .locator('div')
        .first()
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'Description' }).locator('div').first()
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'Rights' }).locator('div').first()
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'ADMIN', exact: true })
    ).toBeVisible()
    await page.getByRole('cell', { name: 'Name' }).getByRole('img').click()
    await expect(
      page.getByRole('cell', { name: 'USER', exact: true })
    ).toBeVisible()
    await page.getByRole('cell', { name: 'Name' }).getByRole('img').click()
    await expect(
      page.getByRole('cell', { name: 'USER', exact: true })
    ).not.toBeVisible()
  })

  test('open and close add role modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Role' }).click()
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Add Role' })).toBeVisible()
    await page.getByRole('button').first().click()
    await expect(page.locator('form')).not.toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Add Role' })
    ).not.toBeVisible()
  })
})
