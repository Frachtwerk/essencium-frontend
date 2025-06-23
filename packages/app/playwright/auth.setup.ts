import { test as setup } from '@playwright/test'

import { ADMIN } from '../playwright.config'

const authFile = './playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto(`/login`)
  await page.getByLabel('E-Mail').click()
  await page.getByLabel('E-Mail').fill(ADMIN.username)
  await page.getByLabel('Password').click()
  await page.getByLabel('Password').fill(ADMIN.password)
  await page
    .locator('div')
    .filter({ hasText: /^Password \*$/ })
    .locator('button')
    .click()
  await page.getByRole('button', { name: 'Login' }).click()

  await page.waitForURL('/')

  await page.context().storageState({ path: authFile })
})
