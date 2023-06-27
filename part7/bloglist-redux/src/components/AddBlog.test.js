import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

let newBlog = {
  title: 'smokies are nutritious',
  author: 'BBQ king',
  url: 'www.bbqworld.com',
}

test('submitting the form calls the handle with title,author and url fields', async () => {
  const mockHandler = jest.fn()

  render(<AddBlog addBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.queryByText('Submit')
  const titleInput = screen.queryByPlaceholderText('blog title')
  const authorInput = screen.queryByPlaceholderText('author name')
  const urlInput = screen.queryByPlaceholderText('link to blog')

  await user.type(titleInput, 'smokies are nutritious')
  await user.type(authorInput, 'BBQ king')
  await user.type(urlInput, 'www.bbqworld.com')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual(newBlog)
})
