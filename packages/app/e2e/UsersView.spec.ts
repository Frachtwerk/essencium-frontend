import { expect, test } from '@playwright/test'

test.describe('UsersView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('button', { name: 'Show All Users', exact: true })
      .click()
    await expect(page).toHaveURL('/admin/users')
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

  test.skip('add, edit and delete user', async ({ page }) => {
    await page.getByRole('link', { name: 'Add User' }).click()
    await expect(page).toHaveURL('/admin/users/add')

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

    await expect(page).toHaveURL('/admin/users')

    // FIXME: add filter to find the user by mail address
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

    await page.waitForURL('/admin/users')

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
