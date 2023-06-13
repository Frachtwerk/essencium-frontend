import { test as setup } from '@playwright/test'

import { BASE_URL } from './playwright.config'

const authFile = './playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`)
  await page.getByPlaceholder('E-Mail').click()
  await page.getByPlaceholder('E-Mail').fill('end2end@test.de')
  await page.getByPlaceholder('Password').click()
  await page.getByPlaceholder('Password').fill('end2endtest')
  await page.getByRole('button', { name: 'Login' }).click()

  await page.waitForURL(BASE_URL)

  await page.context().storageState({ path: authFile })
})
