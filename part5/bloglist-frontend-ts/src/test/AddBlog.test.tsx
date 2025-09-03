import { render, screen, within } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi, type Mock } from 'vitest'
import type { BlogType } from '../../types'
import { AppData } from '../context/context'
import userEvent from '@testing-library/user-event'
import blogService from '../../services/blogs'
import AddBlog from '../components/AddBlog'

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

describe('Testing the display of the unexpanded addBlog component', () => {
  beforeEach(() => {
    render(
      <AppData.Provider value={contextValue}>
        <AddBlog />
      </AppData.Provider>
    )
  })

  test('renders content', () => {
    const element = screen.getByRole('button')
    expect(element).toBeDefined()
    expect(within(element).getByText('Add Blog')).toBeDefined()
  })

  test('The rendered content doesnt contains the the input fields', () => {
    let element = screen.queryByLabelText('Title')
    expect(element).toBeNull
    element = screen.queryByLabelText('Author')
    expect(element).toBeNull
    element = screen.queryByLabelText('Url')
    expect(element).toBeNull
  })
})

describe('Testing the display of the expanded addBlog component', () => {
  beforeEach(async () => {
    render(
      <AppData.Provider value={contextValue}>
        <AddBlog />
      </AppData.Provider>
    )
    const user = userEvent.setup()
    const element = screen.getByRole('button')
    await user.click(element)
  })

  test('renders content', () => {
    const element = screen.getByText('Add Blog')
    expect(element).toBeDefined()
  })

  test('The rendered content contains the the input fields', () => {
    let element = screen.queryByLabelText('Title')
    expect(element).toBeDefined()
    element = screen.queryByLabelText('Author')
    expect(element).toBeDefined()
    element = screen.queryByLabelText('Url')
    expect(element).toBeDefined()
  })
})

describe('Testing the functionality of the form', () => {
  beforeEach(async () => {
    render(
      <AppData.Provider value={contextValue}>
        <AddBlog />
      </AppData.Provider>
    )
    const user = userEvent.setup()
    const element = screen.getByRole('button')
    await user.click(element)
  })

  test('filling in the input fields actually changes them', async () => {
    const user = userEvent.setup()
    let titleInput = screen.getAllByRole('textbox')[0]
    await user.type(titleInput, 'A new Blog is added by React Test')
    titleInput = screen.getAllByRole('textbox')[0]
    expect((titleInput as HTMLInputElement).value).toBe('A new Blog is added by React Test')

    let authorInput = screen.getAllByRole('textbox')[1]
    await user.type(authorInput, 'Vitest+React-testing')
    authorInput = screen.getAllByRole('textbox')[1]
    expect((authorInput as HTMLInputElement).value).toBe('Vitest+React-testing')
  })

  test('submitting a filled form actually submits the data', async () => {
    const user = userEvent.setup()
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'A new Blog is added by React Test')
    await user.type(inputs[1], 'Vitest+React-testing')
    await user.type(inputs[2], 'www.vitest.com')

    const submitButton = screen.getByRole('button')
    await user.click(submitButton)

    expect(blogService.addBlog).toHaveBeenCalledTimes(1)
    const lastCall = (blogService.addBlog as Mock).mock.lastCall
    expect(lastCall).toHaveLength(1)
    expect(JSON.stringify(lastCall ? lastCall[0] : '')).toBe(
      JSON.stringify({
        title: 'A new Blog is added by React Test',
        author: 'Vitest+React-testing',
        url: 'www.vitest.com',
      })
    )
  })
})
