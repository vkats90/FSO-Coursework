import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      return state
        .map((x) => {
          if (x.id === action.payload.id) x = action.payload
          return x
        })
        .sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogSlice.actions

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  } catch (error) {
    dispatch(setBlogs(error))
  }
}

export const addNewBlog =
  ({ title, author, url, user }) =>
  async (dispatch) => {
    const blog = await blogService.addBlog({ title, author, url })
    console.log(blog)
    if (!blog.title) {
      dispatch(setNotification(blog, 'red', 5))
      return console.log(blog)
    }
    dispatch(addBlog({ ...blog, user }))
    console.log(`added blog: ${blog.title}`)
    dispatch(setNotification(`Added blog ${blog.title}`, 'darkgreen', 3))
    return blog
  }

export const likeABlog = (blog) => async (dispatch) => {
  let response = await blogService.addLike(blog)
  if (response && response.error) {
    dispatch(setNotification(response.error, 'red', 3))
    return console.log(JSON.stringify(response))
  }
  dispatch(likeBlog(blog))
}

export const deleteABlog = (blog) => async (dispatch) => {
  let response = 'nothing'
  if (window.confirm('Are you sure you want to delete this blog?'))
    response = await blogService.deleteBlog(blog)
  if (response.error) {
    dispatch(setNotification(response.error, 'red', 3))
    return console.log(JSON.stringify(response))
  }

  dispatch(deleteBlog(response))
}

export default blogSlice.reducer
