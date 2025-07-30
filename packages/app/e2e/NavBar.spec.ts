import { expect, test } from '@playwright/test'

// TODO: These tests rely on the UI being rendered in english.
// Add separate test user that won't be used by actual users on Staging.
test.describe('NavBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('click through navigation', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL('/')

    const adminstrationMenu = page.getByRole('button', {
      name: 'Administration',
    })
    await expect(adminstrationMenu).toBeVisible()
    await adminstrationMenu.click()

    const usersMenuItem = page.getByRole('link', { name: 'Users' })
    await expect(usersMenuItem).toBeVisible()
    await usersMenuItem.click()
    await expect(page).toHaveURL('/admin/users')

    const rolesMenuItem = page.getByRole('link', { name: 'Roles' })
    await expect(rolesMenuItem).toBeVisible()
    await rolesMenuItem.click()
    await expect(page).toHaveURL('/admin/roles')

    const rightsMenuItem = page.getByRole('link', { name: 'Rights' })
    await expect(rightsMenuItem).toBeVisible()
    await rightsMenuItem.click()
    await expect(page).toHaveURL('/admin/rights')

    const translationsMenuItem = page.getByRole('link', {
      name: 'Translations',
    })
    await expect(translationsMenuItem).toBeVisible()
    await translationsMenuItem.click()
    await expect(page).toHaveURL('/admin/translations')

    await expect(
      page.getByRole('link', { name: 'Privacy Policy' }),
    ).toBeVisible()

    await expect(page.getByRole('link', { name: 'Legal Notice' })).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL('/contact')

    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()

    await expect(page.getByText('2024 Essencium License')).toBeVisible()
  })

  test('toggle hover state of sidebar', async ({ page }) => {
    await expect(page.locator('.tabler-icon-pinned-off')).not.toBeVisible()

    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).not.toBeVisible()
  })

  test('toggle fixed state of sidebar', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).hover()

    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.locator('.tabler-icon-pinned-off').click()
    await expect(page.locator('.tabler-icon-pin-filled')).toBeVisible()

    await page.getByRole('link', { name: 'Contact' }).hover()

    await page.locator('.tabler-icon-pin-filled').click()
    await expect(page.locator('.tabler-icon-pinned-off')).toBeVisible()

    await page.getByRole('link', { name: 'Home' }).hover()
  })
})
