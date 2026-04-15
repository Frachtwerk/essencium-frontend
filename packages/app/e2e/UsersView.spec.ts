import { expect, Locator, Page, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

const EMAILS = {
  adminUser: 'admin.user@e2e.com',
  regularUser: 'regular.user@e2e.com',
  testPerson: 'test@person.de',
} as const

function getCell(page: Page, name: string): Locator {
  return page.getByRole('cell', { name })
}

test.describe('UsersView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page
      .getByRole('button', { name: 'Show All Users', exact: true })
      .click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/users`)
  })

  test('go to usersView and render table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()

    const columnHeaders = [
      'Active',
      'Name',
      'Phone',
      'E-Mail',
      'Language',
      'Role',
      'Actions',
    ]

    for (const header of columnHeaders) {
      await expect(
        page.getByRole('cell', { name: header, exact: header === 'Name' }),
      ).toBeVisible()
    }
  })

  test('filter users', async ({ page }) => {
    await page.getByText('Show filter').click()

    const filterColumns = ['Name', 'E-Mail', 'Roles']

    for (const column of filterColumns) {
      await expect(
        getCell(page, column).getByPlaceholder('Search'),
      ).toBeVisible()
    }

    // FIXME: searching by name is currently broken

    await getCell(page, 'E-Mail').getByPlaceholder('Search').fill('e2e.com')

    await expect(getCell(page, EMAILS.adminUser)).toBeVisible()

    await getCell(page, 'E-Mail e2e.com').getByRole('img').nth(1).click() // clear filter

    await getCell(page, 'Roles').getByPlaceholder('Search').click()
    await page.getByRole('option', { name: 'ADMIN' }).click()

    await expect(getCell(page, EMAILS.adminUser)).toBeVisible()
  })

  test('sort users', async ({ page }) => {
    // FIXME: as there are two users with firstname "Admin", the sorting is not reliable
    // will be fixed with https://github.com/Frachtwerk/essencium-backend/issues/716

    await getCell(page, 'Name').getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=firstName,desc')

    await getCell(page, 'E-Mail').getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=email,asc')

    await getCell(page, 'E-Mail').getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=email,desc')

    // the exact sorting order is unreliable, so we just check that the correct requests have been made
    await getCell(page, 'Active').getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=enabled,desc')

    await getCell(page, 'Active').getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=enabled,asc')
  })

  test('add, edit and delete user', async ({ page }) => {
    await page.getByRole('link', { name: 'Add User' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/users/add`)

    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill('Max')
    await page.getByLabel('First Name').press('Tab')

    await page.getByLabel('Last Name').fill('Müller')
    await page.getByLabel('Last Name').press('Tab')

    await page.getByLabel('Email').fill(EMAILS.testPerson)

    await page.getByRole('textbox', { name: 'Role' }).click()
    await page.getByRole('option', { name: 'ADMIN' }).click()

    await page.getByRole('button', { name: 'Save User' }).click()

    await page.waitForTimeout(4000)

    await expect(page).toHaveURL(`${BASE_URL}/admin/users`)

    await page.getByText('Show filter').click()
    await getCell(page, 'E-Mail')
      .getByPlaceholder('Search')
      .fill(EMAILS.testPerson)

    await expect(
      page.getByRole('cell', { name: 'Max Müller', exact: true }),
    ).toBeVisible()

    const editIcon = page
      .getByRole('row', { name: 'Max Müller test@person.de' })
      .getByRole('button')
      .first()

    editIcon.click()

    await expect(page.getByText('Update a user').nth(1)).toBeVisible()

    await expect(page.getByLabel('First Name')).toHaveValue('Max')

    await page.getByLabel('Phone Number').click()
    await page.getByLabel('Phone Number').fill('12345')

    await page.getByRole('button', { name: 'Save User' }).click()

    await page.waitForURL(`${BASE_URL}/admin/users`)

    await page.getByText('Show filter').click()
    await getCell(page, 'E-Mail')
      .getByPlaceholder('Search')
      .fill(EMAILS.testPerson)

    await expect(page.getByRole('cell', { name: '12345' })).toBeVisible()

    const deleteIcon = page
      .getByRole('row', { name: 'Max Müller 12345 test@person.de' })
      .getByRole('button')
      .nth(1)

    deleteIcon.click()

    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(
      page.getByRole('row', {
        name: 'Max Müller 12345 test@person.de',
        exact: true,
      }),
    ).not.toBeVisible()
  })
})
