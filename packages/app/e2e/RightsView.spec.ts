import { expect, test } from '@playwright/test'

import { BASE_URL } from '../playwright.config'

test.describe('RightsView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/rights`)
  })

  test('should render the rights view title', ({ page }) => {
    const title = page.getByText('Rights')
    expect(title).not.toBeNull()
  })

  test('should render the rights table', ({ page }) => {
    const rightsTable = page.getByRole('table')
    expect(rightsTable).not.toBeNull()
  })
})
