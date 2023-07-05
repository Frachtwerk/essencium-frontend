import { expect, test } from '@playwright/test'

import { ADMIN, BASE_URL } from '../playwright.config'

test.use({ storageState: './playwright/.auth/noAuth.json' })

test('LoginView > redirect to login page', async ({ page }) => {
  await page.goto(BASE_URL)
  await expect(page).toHaveURL(`${BASE_URL}/login`)

  await expect(page).toHaveTitle(/Essencium/)
  const heading = page.getByRole('heading', { name: 'Login' })
  await expect(heading).toBeVisible()
})

test.describe('LoginView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`)
  })

  test('login', async ({ page }) => {
    await page.getByLabel('E-Mail').click()
    await page.getByLabel('E-Mail').fill(ADMIN.username)
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill(ADMIN.password)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL(BASE_URL)
    const logoutButton = page.getByRole('button', { name: 'Logout' })
    await expect(logoutButton).toBeVisible()
  })

  test('reset password', async ({ page }) => {
    await page.getByText('Reset Password').click()
    await page.getByLabel('Your Email').click()
    await page.getByLabel('Your Email').fill(ADMIN.username)
    await page.getByRole('button', { name: 'Reset Password' }).click()
    const passwordResetSuccessMessage = page.getByRole('heading', {
      name: 'Email sent',
    })
    await page.waitForLoadState('networkidle')
    await expect(passwordResetSuccessMessage).toBeVisible()
  })

  test('reset password cancel', async ({ page }) => {
    await page.getByText('Reset Password').click()
    const text = page.getByText(
      'Forgot your password? Enter your E-Mail and we will send you a link to reset you'
    )
    await expect(text).toBeVisible()
    await page.getByRole('button', { name: 'Cancel' }).click()
    const loginForm = await page
      .locator('div')
      .filter({ hasText: 'E-Mail *Password *Reset PasswordLogin' })
      .nth(3)
    await expect(loginForm).toBeVisible()
  })

  test('login form validation', async ({ page }) => {
    await page.getByLabel('E-Mail').click()
    await page.getByLabel('E-Mail').fill('a')
    await page.getByLabel('Password').click()
    const errorMessageEmail = page.getByText('E-Mail is not valid')
    await expect(errorMessageEmail).toBeVisible()
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill('123')
    await page.getByLabel('E-Mail').click()
    const errorMessagePassword = page.getByText(
      'Password must be at least 8 characters long'
    )
    await expect(errorMessagePassword).toBeVisible()
  })
})
