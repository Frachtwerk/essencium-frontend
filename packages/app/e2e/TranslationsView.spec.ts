import { expect, test } from '@playwright/test'

test.describe('TranslationsView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Translations' }).click()
    await expect(page).toHaveURL('/translations')
  })

  // Commented out due to i18n issues, WIP

  /*   test('go to translationView, update and reset translation', async ({
    page,
  }) => {
    await page.getByText('header').dispatchEvent('click')

    await page.getByText('Essencium', { exact: true }).dispatchEvent('click')

    await page.locator('input[name="translation"]').fill('Essenciumoin')

    await page.locator('button[name="save"]').click()

    await expect(page.getByText('Updated data successfully')).toBeVisible()

    await expect(page.getByText('Essenciumoin', { exact: true })).toBeVisible()

    await page.getByText('Essenciumoin', { exact: true }).dispatchEvent('click')

    await page.locator('button[name="reset"]').click()

    await expect(page.getByText('Deleted data successfully')).toBeVisible()
  }) */

  // Commented out due to i18n issues, WIP
  // test('change language', async ({ page }) => {
  //   await expect(page.getByText('deGerman')).toBeVisible()

  //   await page.getByRole('textbox', { name: 'Choose Language' }).click()

  //   await page.getByRole('option', { name: 'German' }).click()
  //   await expect(page.getByText('deDeutsch')).toBeVisible()
  // })

  // test('search translations', async ({ page }) => {
  //   await page.getByPlaceholder('Search ...').click()
  //   await page.getByPlaceholder('Search ...').fill('Essencium')

  //   await expect(page.getByText('header')).toBeVisible()
  //   await expect(page.getByText('footer')).toBeVisible()
  // })
})
