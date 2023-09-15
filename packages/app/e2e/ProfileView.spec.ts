import { expect, test } from '@playwright/test'

import { ADMIN, BASE_URL } from '../playwright.config'

test.describe('ProfileView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/profile`)
  })

  test('go to profile page and change name', async ({ page }) => {
    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill('TestName')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    const InputFirstName = page.getByLabel('First Name')
    await expect(InputFirstName).toHaveValue('TestName')

    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill(ADMIN.firstName)
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(InputFirstName).toHaveValue(ADMIN.firstName)
  })

  test('form validation', async ({ page }) => {
    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill('T')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    const firstNameErrorMessage = page.getByText(
      'First Name must be at least 2 characters long',
    )
    await expect(firstNameErrorMessage).toBeVisible()
    await page.getByLabel('Last Name').click()
    await page.getByLabel('Last Name').fill('T')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    const lastNameErrorMessage = page.getByText(
      'Last Name must be at least 2 characters long',
    )
    await expect(lastNameErrorMessage).toBeVisible()
    await page.getByLabel('E-Mail').click()
    await page.getByLabel('E-Mail').fill('admin')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    const emailErrorMessage = page.getByText('E-Mail is not valid')
    await expect(emailErrorMessage).toBeVisible()
  })

  test('change language', async ({ page }) => {
    await page.getByLabel('Language').click()
    await page.getByRole('option', { name: 'Deutsch' }).click()
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(
      page.getByRole('button', { name: 'Änderungen speichern' }),
    ).toBeVisible()
    await page.getByLabel('Sprache').click()
    await page.getByRole('option', { name: 'English' }).click()
    await page.getByRole('button', { name: 'Änderungen speichern' }).click()
    await expect(page.getByLabel('Language')).toBeVisible()
  })
})
