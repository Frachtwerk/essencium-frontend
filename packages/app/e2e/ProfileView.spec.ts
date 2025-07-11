import { expect, test } from '@playwright/test'

import { ADMIN } from '../playwright.config'

test.describe('ProfileView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile')
  })

  test('go to profile page and change name', async ({ page }) => {
    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill('TestName')

    const putPromise = page.waitForResponse(
      response =>
        response.url().includes('/v1/users/me') &&
        response.request().method() === 'PUT',
    )

    const getPromise = page.waitForResponse(
      response =>
        response.url().includes('/v1/users/me') &&
        response.request().method() === 'GET',
    )

    await page.getByRole('button', { name: 'Save Changes' }).click()
    await putPromise
    await getPromise

    const InputFirstName = page.getByLabel('First Name')
    await expect(InputFirstName).toHaveValue('TestName')

    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill(ADMIN.firstName)

    const putPromise2 = page.waitForResponse(
      response =>
        response.url().includes('/v1/users/me') &&
        response.request().method() === 'PUT',
    )

    const getPromise2 = page.waitForResponse(
      response =>
        response.url().includes('/v1/users/me') &&
        response.request().method() === 'GET',
    )

    await page.getByRole('button', { name: 'Save Changes' }).click()
    await putPromise2
    await getPromise2

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

  test.skip('change language', async ({ page }) => {
    await page.getByPlaceholder('Language').click()

    await page.getByRole('option', { name: 'Deutsch' }).click()

    await page.getByRole('button', { name: 'Save Changes' }).click()

    await expect(
      page.getByRole('button', { name: 'Änderungen speichern' }),
    ).toBeVisible()

    await page.getByPlaceholder('Sprache').click()

    await page.getByRole('option', { name: 'English' }).click()

    await page.getByRole('button', { name: 'Änderungen speichern' }).click()

    await expect(page.getByPlaceholder('Language')).toBeVisible()
  })
})
