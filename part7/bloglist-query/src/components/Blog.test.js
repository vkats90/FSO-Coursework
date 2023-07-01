import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlog = {
  title: 'this should be visible',
  author: 'mock author',
  url: 'url to site',
  likes: 6,
  user: { name: 'vlad' },
}

test('renders blog title and author', () => {
  const { container } = render(<Blog blog={testBlog} />)

  let title = container.querySelector('.blog_title')
  expect(title).toHaveTextContent('this should be visible')

  let author = container.querySelector('.blog_author')
  expect(author).toHaveTextContent('mock author')
})

test('url and likes are hidden', () => {
  const { container } = render(<Blog blog={testBlog} />)

  let url_likes = container.querySelector('.blog_url_likes')
  expect(url_likes).toHaveStyle('display: none')
})

test('when button is clicked url and likes are shown', async () => {
  const { container } = render(<Blog blog={testBlog} />)

  const user = userEvent.setup()
  const button = container.querySelector('.visibleButton')
  await user.click(button)

  let url_likes = container.querySelector('.blog_url_likes')
  expect(url_likes).not.toHaveStyle('display:none')
})

test('clicking like button twice calls the like handler twice', async () => {
  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={testBlog} handleAddLike={mockHandler} />)

  const user = userEvent.setup()
  const button = container.querySelector('.likeButton')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
