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

    const firstCellOfFirstRow = page.locator(
      '//*[@id="root"]/div/div/main/div[2]/div/table/tbody/tr[1]/td[1]'
    )
    await expect(firstCellOfFirstRow).toHaveText('ADMIN')
    const sortIcon = page.getByRole('cell', { name: 'Name' }).getByRole('img')
    await sortIcon.click()
    await expect(firstCellOfFirstRow).not.toHaveText('ADMIN')
    await await sortIcon.click()
  })

  test('open and close add role modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Role' }).click()
    const addRoleModal = page.locator('form')
    await expect(addRoleModal).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Add Role' })).toBeVisible()
    const closeButton = page.getByRole('button').first()
    await closeButton.click()
    await expect(page.locator('form')).not.toBeVisible()
    await expect(addRoleModal).not.toBeVisible()
  })
})
