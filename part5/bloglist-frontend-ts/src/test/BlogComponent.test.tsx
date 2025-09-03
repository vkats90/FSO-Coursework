import { render, screen, within } from '@testing-library/react'
import BlogComponent from '../components/BlogComponent'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import type { BlogType } from '../../types'
import { AppData } from '../context/context'
import userEvent from '@testing-library/user-event'
import blogService from '../../services/blogs'

vi.mock('../../services/blogs', () => ({
  __esModule: true,
  default: {
    getAll: vi.fn(),
    addBlog: vi.fn(),
    editBlog: vi.fn(),
    deleteBlog: vi.fn(),
  },
}))

const blog: BlogType = {
  title: 'A blog created by Vitest',
  author: 'Vitest',
  url: 'www.vitest.com',
  likes: 0,
  user: {
    username: 'BilboBaggins44',
    name: 'Bilbo',
    id: 'safouejnf9e434325r',
    passwordHash: 'sfadlfjkehiofu3t423t34y34yer',
  },
}

const contextValue = {
  user: null,
  setUser: () => {},
  blogs: [blog],
  setBlogs: () => {},
  note: null,
  setNote: () => {},
}

describe('testing unexpanded BlogComponent', () => {
  beforeEach(() => {
    render(
      <AppData.Provider value={contextValue}>
        <BlogComponent blog={blog} />
      </AppData.Provider>
    )
  })
  test('renders content', () => {
    const element = screen.getByText('A blog created by Vitest').parentElement
    expect(element).toBeDefined()
  })

  test('The rendered content contains the title and the author', () => {
    const element = screen.getByText('A blog created by Vitest').parentElement
    expect(element).toBeDefined()

    const childrenElements = within(element as HTMLElement)
    expect(childrenElements.getByText('A blog created by Vitest')).toBeDefined()
    expect(childrenElements.getByText('A blog created by Vitest').tagName).toBe('B')
    expect(childrenElements.getByText('- Vitest')).toBeDefined()
    expect(childrenElements.getByText('- Vitest').tagName).toBe('I')
  })
  test('The rendered content does not contains the likes and the url', () => {
    const element = screen.getByText('A blog created by Vitest').parentElement
    expect(element).toBeDefined()

    const childrenElements = within(element as HTMLElement)

    expect(childrenElements.queryByText('www.vitest.com')).toBeNull()
    expect(childrenElements.queryByText('0')).toBeNull()
  })
})

describe('testing the expanded BlogComponent', () => {
  beforeEach(async () => {
    render(
      <AppData.Provider value={contextValue}>
        <BlogComponent blog={blog} />
      </AppData.Provider>
    )
    const user = userEvent.setup()
    const element = screen.getByText('A blog created by Vitest').parentElement
    await user.click(element as HTMLElement)
  })

  test('Clicking the name of a blog reveals more fields', () => {
    const expandedElement = screen.getByText('A blog created by Vitest').parentElement

    const childrenElements = within(expandedElement as HTMLElement)
    expect(childrenElements.getByText('www.vitest.com')).toBeDefined()
    expect(childrenElements.getByText('0')).toBeDefined()
  })

  test('Clicking the like button twice increases the likes by 2', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByTestId('like-button')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.editBlog).toHaveBeenCalledTimes(2)
  })
})
