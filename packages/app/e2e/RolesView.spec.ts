import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('RolesView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/roles`)
  })

  test('open and close add role modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Role' }).click()
    const addRoleModal = page.locator('form')
    await expect(addRoleModal).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Add Role' })).toBeVisible()
    const closeButton = page.getByRole('button', { name: 'Cancel' })
    await closeButton.click()
    await expect(page.locator('form')).not.toBeVisible()
    await expect(addRoleModal).not.toBeVisible()
  })
})
