import { expect, Page, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

async function expectOrderOfUsers(
  page: Page,
  expectedOrder: string[],
): Promise<void> {
  await Promise.all(
    expectedOrder.map((name, index) =>
      expect(page.locator(`tbody > tr:nth-child(${index + 1})`)).toContainText(
        name,
      ),
    ),
  )
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
    await expect(page.getByRole('cell', { name: 'Active' })).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'Name', exact: true }),
    ).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Phone' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'E-Mail' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Language' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Role' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible()
  })

  test('filter users', async ({ page }) => {
    await page.getByText('Show filter').click()

    await expect(
      page.getByRole('cell', { name: 'Name' }).getByPlaceholder('Search'),
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'E-Mail' }).getByPlaceholder('Search'),
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'Roles' }).getByPlaceholder('Search'),
    ).toBeVisible()

    await expect(
      page.getByRole('cell', { name: 'andrii.udodenko@frachtwerk.de' }),
    ).toBeVisible()

    // FIXME: searching by name is currently broken

    await page
      .getByRole('cell', { name: 'E-Mail' })
      .getByPlaceholder('Search')
      .fill('e2e.com')
    await expect(
      page.getByRole('cell', { name: 'test.user@e2e.com' }),
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'andrii.udodenko@frachtwerk.de' }),
    ).not.toBeVisible()
    await page
      .getByRole('cell', { name: 'E-Mail e2e.com' })
      .getByRole('img')
      .nth(1)
      .click() // clear filter

    await expect(
      page.getByRole('cell', { name: 'andrii.udodenko@frachtwerk.de' }),
    ).toBeVisible()

    await page
      .getByRole('cell', { name: 'Roles' })
      .getByPlaceholder('Search')
      .click()
    await page.getByRole('option', { name: 'ADMIN' }).click()
    await expect(
      page.getByRole('cell', { name: 'devnull@frachtwerk.de' }),
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'test.user@e2e.com' }),
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: 'andrii.udodenko@frachtwerk.de' }),
    ).not.toBeVisible()
  })

  test('sort users', async ({ page }) => {
    await expectOrderOfUsers(page, [
      'test.user@e2e.com',
      'devnull@frachtwerk.de',
      'andrii.udodenko@frachtwerk.de',
    ])

    await page.getByRole('cell', { name: 'Name' }).getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=firstName,desc')

    await expectOrderOfUsers(page, [
      'devnull_user@frachtwerk.de',
      'tuan.vu-extern@frachtwerk.de',
      'tobias.dillig@frachtwerk.de',
    ])

    await page.getByRole('cell', { name: 'E-Mail' }).getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=email,asc')

    await expectOrderOfUsers(page, [
      'andrii.udodenko@frachtwerk.de',
      'cathrin.truchan+100@frachtwerk.de',
      'cathrin.truchan+1@frachtwerk.de',
    ])

    await page.getByRole('cell', { name: 'E-Mail' }).getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=email,desc')

    await expectOrderOfUsers(page, [
      'tuan.vu-extern@frachtwerk.de',
      'tobias.dillig@frachtwerk.de',
      'test.user@e2e.com',
    ])

    // the exact sorting order is unreliable, so we just check that the correct requests have been made
    await page.getByRole('cell', { name: 'Active' }).getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=enabled,desc')

    await page.getByRole('cell', { name: 'Active' }).getByRole('img').click()
    await page.waitForResponse('**/v1/users?page=0&size=20&sort=enabled,asc')
  })

  test('add, edit and delete user', async ({ page }) => {
    await page.getByRole('link', { name: 'Add User' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/admin/users/add`)

    await page.getByLabel('First Name').click()
    await page.getByLabel('First Name').fill('Test')
    await page.getByLabel('First Name').press('Tab')

    await page.getByLabel('Last Name').fill('Person')
    await page.getByLabel('Last Name').press('Tab')

    await page.getByLabel('Email').fill('test@person.de')

    await page.getByRole('textbox', { name: 'Role' }).click()

    await page.getByRole('option', { name: 'ADMIN' }).click()

    await page.getByRole('button', { name: 'Save User' }).click()

    await page.waitForTimeout(4000)

    await expect(page).toHaveURL(`${BASE_URL}/admin/users`)

    await page.getByText('Show filter').click()
    await page
      .getByRole('cell', { name: 'E-Mail' })
      .getByPlaceholder('Search')
      .fill('test@person.de')

    await expect(
      page.getByRole('cell', { name: 'Test Person', exact: true }),
    ).toBeVisible()

    const editIcon = page
      .getByRole('row', {
        name: 'Test Person test@person.de',
      })
      .getByRole('button')
      .first()

    editIcon.click()

    await expect(page.getByText('Update a user').nth(1)).toBeVisible()

    await expect(page.getByLabel('First Name')).toHaveValue('Test')

    await page.getByLabel('Phone Number').click()
    await page.getByLabel('Phone Number').fill('12345')

    await page.getByRole('button', { name: 'Save User' }).click()

    await page.waitForURL(`${BASE_URL}/admin/users`)

    await page.getByText('Show filter').click()
    await page
      .getByRole('cell', { name: 'E-Mail' })
      .getByPlaceholder('Search')
      .fill('test@person.de')

    await expect(page.getByRole('cell', { name: '12345' })).toBeVisible()

    const deleteIcon = page
      .getByRole('row', {
        name: 'Test Person 12345 test@person.de',
      })
      .getByRole('button')
      .nth(1)

    deleteIcon.click()

    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(
      page.getByRole('row', {
        name: 'Test Person 12345 test@person.de',
        exact: true,
      }),
    ).not.toBeVisible()
  })
})
