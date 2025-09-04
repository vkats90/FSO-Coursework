import { test, expect, type Page } from '@playwright/test'

test.describe('Blog App testing', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('App displays the login screen on load', async ({ page }: { page: Page }) => {
    await expect(page.getByText('Blog List App TypeScript')).toBeVisible()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button')).toBeVisible()
    await expect(page.getByRole('button')).toContainText('Login')
  })
})
