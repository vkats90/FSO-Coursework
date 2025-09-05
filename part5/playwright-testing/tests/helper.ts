import { test, expect, type Page } from '@playwright/test'

export const loginWith = async (page: Page, username: string, password: string) => {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button').click()
}

export const addBlog = async (page: Page, title: string, author: string, url: string) => {
  await page.getByRole('button', { name: 'Add Blog' }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('URL').fill(url)
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText(title).waitFor()
}

export const likeBlog = async (page: Page, title: string) => {
  await page.getByText(title, { exact: true }).click()
  await page.getByTestId('like-button').click()
  let likes = await page.getByText('Likes:').locator('..').textContent()
  await page.getByText((Number(likes?.replace('Likes:', '')) + 1).toString()).waitFor()
  await page.getByRole('button', { name: 'x' }).click()
}
