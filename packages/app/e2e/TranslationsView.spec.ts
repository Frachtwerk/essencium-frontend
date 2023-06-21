import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('TranslationsView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'Translations' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/translations`)
  })

  // Not active due to re-render issue

  /* test('go to translationView, update and reset translation', async ({
  page,
}) => {
  await page.goto('https://staging.essencium.dev')
  await page.getByRole('button', { name: 'Translations' }).click()
  await expect(page).toHaveURL('https://staging.essencium.dev/translations')

  await page.getByText('header').click()

  await page.getByRole('main').getByText('Essencium').click()
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('Essenciumoin')
  await page.getByRole('main').getByRole('button').first().click()
  await expect(page.getByText('Updated translation successfully')).toBeVisible()
  await expect(page.getByRole('banner').getByText('Essenciumoin')).toBeVisible()
  await page.getByRole('main').getByText('Essenciumoin').click()
  await page.getByRole('main').getByRole('button').nth(2).click()
  await expect(page.getByText('Translation successfully reset')).toBeVisible()
}) */

  test('change language', async ({ page }) => {
    await expect(page.getByText('deGerman')).toBeVisible()
    await page.getByLabel('Choose Language').click()
    await page.getByRole('option', { name: 'German' }).click()
    await expect(page.getByText('deDeutsch')).toBeVisible()
  })

  test('search translations', async ({ page }) => {
    await page.getByPlaceholder('Search ...').click()
    await page.getByPlaceholder('Search ...').fill('Essencium')
    await expect(page.getByText('header')).toBeVisible()
    await expect(page.getByText('footer')).toBeVisible()
    await expect(page.getByText('actions')).not.toBeVisible()
    await expect(page.getByText('navigation')).not.toBeVisible()
  })
})
