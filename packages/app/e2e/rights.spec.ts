import { expect, test } from '@playwright/test'

const RIGHTS_VIEW_URL = 'https://essencium-frontend.vercel.app/rights'

test.describe('RightsView', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(RIGHTS_VIEW_URL)
  })

  test('should render the rights view title', ({ page }) => {
    const title = page.getByText('Rights')
    expect(title).not.toBeNull()
  })

  test('should render the rights table', ({ page }) => {
    const rightsTable = page.getByRole('table')
    expect(rightsTable).not.toBeNull()
  })

  test('should render the refresh button', ({ page }) => {
    const refreshButton = page.getByText('Refresh data')
    expect(refreshButton).not.toBeNull()
  })
})
