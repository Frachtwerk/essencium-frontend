import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('RolesView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('link', { name: 'Roles' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/roles`)
  })

  test.skip('open and close add role modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Role' }).click()

    const addRoleModal = page.locator('form')
    await expect(addRoleModal).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Add Role' })).toBeVisible()

    const closeButton = page.getByRole('button', { name: 'Cancel' })
    await closeButton.click()

    await expect(page.locator('form')).not.toBeVisible()
    await expect(addRoleModal).not.toBeVisible()
  })

  test.skip('add, edit and delete a role', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Role' }).click()

    const addRoleModal = page.locator('form')
    await expect(addRoleModal).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Add Role' })).toBeVisible()

    const nameInput = page.getByPlaceholder('USER', { exact: true })
    await nameInput.fill('TestRole')

    const descriptionInput = page.getByPlaceholder('Application User')
    await descriptionInput.fill('TestDescription')

    const rightsPill = page.getByLabel('Add Role').getByText('USER_DELETE')
    await rightsPill.click()

    const saveButton = page.getByRole('button', { name: 'Add Role' })
    await saveButton.click()

    await page.waitForTimeout(4000)
    await expect(page).toHaveURL(`${BASE_URL}/roles`)

    await expect(
      page.getByRole('cell', { name: 'TestRole', exact: true }),
    ).toBeVisible()

    const editIcon = page.getByLabel('table-body').getByRole('button').nth(2)
    await editIcon.click()

    expect(page.getByRole('heading', { name: 'Edit Role' })).toBeVisible()

    await expect(nameInput).toHaveValue('TestRole')

    await descriptionInput.fill('TestDescription edited')
    await expect(descriptionInput).toHaveValue('TestDescription edited')

    const updateRoleButton = page.getByRole('button', { name: 'Update Role' })
    await updateRoleButton.click()

    await page.waitForTimeout(4000)
    await expect(page).toHaveURL(`${BASE_URL}/roles`)

    await expect(
      page.getByRole('cell', { name: 'TestDescription edited', exact: true }),
    ).toBeVisible()

    const deleteIcon = page.getByLabel('table-body').getByRole('button').nth(3)
    await deleteIcon.click()

    await expect(
      page.getByRole('heading', { name: 'Delete a role' }),
    ).toBeVisible()

    const deleteButton = page.getByRole('button', { name: 'Delete' })
    await deleteButton.click()

    await page.waitForTimeout(4000)

    await expect(
      page.getByRole('cell', { name: 'TestRole', exact: true }),
    ).not.toBeVisible()
  })
})
