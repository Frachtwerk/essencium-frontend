import { test as setup } from '@playwright/test'

setup('language settings', async ({ page }) => {
  await page.goto('/')
  await page
    .getByLabel('Profil ansehen')
    .or(page.getByLabel('View profile'))
    .click()
  await page
    .getByPlaceholder('Sprache')
    .or(page.getByPlaceholder('Language'))
    .click()
  await page
    .getByRole('option', { name: 'Englisch' })
    .or(page.getByRole('option', { name: 'English' }))
    .click()
  await page
    .getByRole('button', { name: 'Save Changes' })
    .or(page.getByRole('button', { name: 'Änderungen speichern' }))
    .click()
  await page.goto('/')
})
