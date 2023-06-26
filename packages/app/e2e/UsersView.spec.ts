import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('UsersView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'Users' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/users`)
  })

  test('go to usersView and render table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'ID' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Active' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'First Name' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Last Name' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Phone' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'E-Mail' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Language' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Role' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible()
  })

  test('add, edit and delete user', async ({ page }) => {
    await page.getByRole('link', { name: 'Add User' }).click()
    await expect(page).toHaveURL(`${BASE_URL}/users/add`)
    await page.getByPlaceholder('First Name').click()
    await page.getByPlaceholder('First Name').fill('Test')
    await page.getByPlaceholder('First Name').press('Tab')
    await page.getByPlaceholder('Last Name').fill('Person')
    await page.getByPlaceholder('Last Name').press('Tab')
    await page.getByPlaceholder('Email').fill('test@person.de')
    await page.getByPlaceholder('Role').click()
    await page.getByRole('option', { name: 'ADMIN' }).click()
    await page.getByRole('button', { name: 'Save User' }).click()

    await page.waitForTimeout(4000)
    await page.goto(`${BASE_URL}/users`)
    const sortIcon = page.getByRole('cell', { name: 'ID' }).getByRole('img')
    await sortIcon.click()
    await expect(
      page.getByRole('cell', { name: 'Test', exact: true })
    ).toBeVisible()

    const editIcon = page
      .getByRole('row', { name: 'Test Person test@person.de German ADMIN' })
      .getByRole('button')
      .first()
    await editIcon.click()

    await expect(
      page.getByRole('heading', { name: 'Update a user' })
    ).toBeVisible()
    await expect(page.getByPlaceholder('First Name')).toHaveValue('Test')
    await page.getByPlaceholder('Phone Number').click()
    await page.getByPlaceholder('Phone Number').fill('12345')
    await page.getByRole('button', { name: 'Save User' }).click()

    await page.waitForURL(`${BASE_URL}/users`)
    await sortIcon.click()
    await expect(page.getByRole('cell', { name: '12345' })).toBeVisible()

    const deleteIcon = page
      .getByRole('row', {
        name: 'Test Person 12345 test@person.de German ADMIN',
      })
      .getByRole('button')
      .nth(1)
    await deleteIcon.click()

    await expect(
      page.getByRole('row', {
        name: 'Test Person 12345 test@person.de German ADMIN',
      })
    ).not.toBeVisible()
  })
})
