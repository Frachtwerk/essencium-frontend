import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('ProfileView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/profile`)
  })

  test('go to profile page and change name', async ({ page }) => {
    await page.getByPlaceholder('First Name').click()
    await page.getByPlaceholder('First Name').fill('TestName')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    const InputFirstName = page.getByPlaceholder('First Name')
    await expect(InputFirstName).toHaveValue('TestName')

    await page.getByPlaceholder('First Name').click()
    await page.getByPlaceholder('First Name').fill('End2End')
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(InputFirstName).toHaveValue('End2End')
  })

  test('change language', async ({ page }) => {
    await page.getByPlaceholder('Language').click()
    await page.getByRole('option', { name: 'Deutsch' }).click()
    await page.getByRole('button', { name: 'Save Changes' }).click()
    await expect(
      page.getByRole('button', { name: 'Änderungen speichern' })
    ).toBeVisible()
    await page.getByPlaceholder('Sprache').click()
    await page.getByRole('option', { name: 'English' }).click()
    await page.getByRole('button', { name: 'Änderungen speichern' }).click()
    await expect(page.getByPlaceholder('Language')).toBeVisible()
  })
})
