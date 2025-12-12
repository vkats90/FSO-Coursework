import { test, expect, type Page, request } from '@playwright/test'
import { loginWith, addBlog, likeBlog } from './helper'
import models from '../models'

test.beforeEach(async ({ page, request }) => {
  // Clear database before creating test data
  await models.Blog.truncate({ cascade: true, restartIdentity: true })
  await models.User.truncate({ cascade: true, restartIdentity: true })

  // Create test users
  await request.post('http://localhost:3001/api/users', {
    data: {
      username: 'testingUser@abc.com',
      name: 'Tess Ting Us Err',
      password: '12345',
    },
  })
  await request.post('http://localhost:3001/api/users', {
    data: {
      username: 'otherTestUser@abc.com',
      name: 'Tess Tyoo Sir',
      password: '12345',
    },
  })

  // Navigate after setup is complete
  await page.goto('http://localhost:3001/')
})

test.describe('Blog App testing', () => {
  test('App displays the login screen on load', async ({ page }) => {
    await expect(page.getByText('Blog List App TypeScript')).toBeVisible()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button')).toBeVisible()
    await expect(page.getByRole('button')).toContainText('Login')
  })

  test.describe('Testing Log In functionality', () => {
    test('attempting to Log In with the wrong username returns an error', async ({ page }) => {
      await loginWith(page, 'SomeUser', 'WrongPassword')

      const errorMessage = page.locator('.bg-red-200')
      await expect(errorMessage).toContainText("User doesn't exist")
    })

    test('attempting to Log In with the wrong password returns an error', async ({ page }) => {
      await loginWith(page, 'testingUser@abc.com', 'WrongPassword')

      const errorMessage = page.locator('.bg-red-200')
      await expect(errorMessage).toContainText('Wrong Password')
    })

    test('Logging in with the correct credentials works', async ({ page }) => {
      await loginWith(page, 'testingUser@abc.com', '12345')

      await expect(page.getByText('Log Out')).toBeVisible()
      await expect(page.locator('.bg-green-200')).toContainText('Welcome Tess Ting Us Err')
    })
  })

  test.describe('testing Add Blog functionality', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'testingUser@abc.com', '12345')
    })

    test('when clicking the add blog button it expands revealing input fields', async ({
      page,
    }) => {
      expect(page.getByRole('button').last()).toBeVisible()

      await page.getByRole('button', { name: 'Add Blog' }).click()
      await expect(page.getByLabel('Title')).toBeVisible()
      await expect(page.getByLabel('Author')).toBeVisible()
      await expect(page.getByLabel('URL')).toBeVisible()
      await expect(page.getByText('Submit')).toBeVisible()
    })

    test('adding a blog works', async ({ page }) => {
      await addBlog(page, 'A blog added by Playwright', 'Playwright', 'www.playwright.com')

      await expect(page.getByText('A blog added by Playwright')).toBeVisible()
      await expect(page.getByText('- Playwright')).toBeVisible()
    })

    test('adding a blog without a title or url fails', async ({ page }) => {
      await page.getByRole('button', { name: 'Add Blog' }).click()
      await page.getByLabel('Title').fill('')
      await page.getByLabel('Author').fill('Playwright')
      await page.getByLabel('URL').fill('www.playwright.com')
      await page.getByRole('button', { name: 'Submit' }).click()
      let errorMessage = page.locator('.bg-red-200')
      await expect(errorMessage).toContainText('Missing required fields title or url')

      await page.getByRole('button', { name: 'Add Blog' }).click()
      await page.getByLabel('Title').fill('A blog added by Playwright')
      await page.getByLabel('Author').fill('Playwright')
      await page.getByLabel('URL').fill('')
      await page.getByRole('button', { name: 'Submit' }).click()
      errorMessage = page.locator('.bg-red-200')
      await expect(errorMessage).toContainText('Missing required fields title or url')
    })
  })

  test.describe('testing the liking a blog functionality', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'testingUser@abc.com', '12345')
      await addBlog(page, 'A blog added by Playwright', 'Playwright', 'www.playwright.com')
    })

    test('by default the likes count is 0', async ({ page }) => {
      await page.getByText('A blog added by Playwright').click()
      let likes = page.getByText('Likes').locator('..')
      await expect(likes).toBeVisible()
      await expect(likes).toContainText('0')
    })

    test('liking a blog once works and increases the like count by one', async ({ page }) => {
      await page.getByText('A blog added by Playwright').click()

      await page.getByTestId('like-button').click()
      let likes = page.getByText('Likes').locator('..')
      await expect(likes).toBeVisible()
      await expect(likes).toContainText('1')
      await expect(page.locator('.bg-green-200')).toContainText(
        'Liked blog "A blog added by Playwright"'
      )
    })

    test('liking a blog twice works and increases the like count by two', async ({ page }) => {
      await page.getByText('A blog added by Playwright').click()

      await page.getByTestId('like-button').click()
      await page.getByTestId('like-button').click()
      let likes = page.getByText('Likes').locator('..')
      await expect(likes).toBeVisible()
      await expect(likes).toContainText('2')
      await expect(page.locator('.bg-green-200')).toContainText(
        'Liked blog "A blog added by Playwright"'
      )
    })
  })

  test.describe('Testing the delete button functionality', () => {
    test.beforeEach(async ({ page, request }) => {
      await loginWith(page, 'otherTestUser@abc.com', '12345')
      await addBlog(page, 'A blog by a different user', 'Tess Tao Thor', 'www.someurl.com')
      await page.getByRole('button', { name: 'Log Out' }).click()
      await loginWith(page, 'testingUser@abc.com', '12345')
      await addBlog(page, 'A blog added by Playwright ', 'Playwright', 'www.playwright.com')
    })

    test('clicking the delete button removes the blog from the list', async ({ page }) => {
      await page.getByText('A blog added by Playwright').click()
      await page.getByRole('button', { name: 'Delete' }).click()
      await expect(page.getByText('A blog added by Playwright')).not.toBeVisible()
    })

    test('opening a blog created by a different user doesnt display the delete button', async ({
      page,
    }) => {
      await page.getByText('A blog by a different user').click()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })
  })

  test.describe('Test the sort order of the blogs', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'testingUser@abc.com', '12345')
      await addBlog(page, 'A blog added by Playwright', 'Playwright', 'www.playwright.com')
      await addBlog(page, 'A blog by a different author', 'Tess Tao Thor', 'www.someurl.com')
      await addBlog(
        page,
        'And a third blog with the most likes',
        'Tess Tao Thor',
        'www.someurl.com'
      )
    })

    test('initially the blogs are in the order they were created', async ({ page }) => {
      const allBlogs = await page.getByTestId('blog-component').all()
      await expect(allBlogs[0]).toContainText('A blog added by Playwright')
      await expect(allBlogs[0]).not.toContainText('A blog by a different author')
      await expect(allBlogs[1]).toContainText('A blog by a different author')
      await expect(allBlogs[2]).toContainText('And a third blog with the most likes')
    })

    test('when clicking the like botton on the bottom blog it shoots it to the top', async ({
      page,
    }) => {
      await likeBlog(page, 'And a third blog with the most likes')
      const allBlogs = await page.getByTestId('blog-component').all()
      await expect(allBlogs[1]).toContainText('A blog added by Playwright')
      await expect(allBlogs[1]).not.toContainText('A blog by a different author')
      await expect(allBlogs[2]).toContainText('A blog by a different author')
      await expect(allBlogs[0]).toContainText('And a third blog with the most likes')
    })

    test('when liking blogs serveral times they rearange themselves according to the number of likes', async ({
      page,
    }) => {
      const allBlogs = await page.getByTestId('blog-component').all()
      await likeBlog(page, 'A blog by a different author')
      await likeBlog(page, 'A blog by a different author')
      await expect(allBlogs[0]).toContainText('A blog by a different author')
      await likeBlog(page, 'And a third blog with the most likes')
      await likeBlog(page, 'And a third blog with the most likes')
      await likeBlog(page, 'And a third blog with the most likes')
      await expect(allBlogs[0]).toContainText('And a third blog with the most likes')
      await expect(allBlogs[1]).toContainText('A blog by a different author')
      await likeBlog(page, 'A blog added by Playwright')
      await expect(allBlogs[2]).toContainText('A blog added by Playwright')
      await expect(allBlogs[2]).not.toContainText('A blog by a different author')
      await expect(allBlogs[1]).toContainText('A blog by a different author')
      await expect(allBlogs[0]).toContainText('And a third blog with the most likes')
    })
  })
})
