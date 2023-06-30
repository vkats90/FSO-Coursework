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
  },
})

export const { setBlogs, addBlog } = blogSlice.actions

export const getBlogs = () => (dispatch) => {
  blogService.getAll().then((blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  })
}

export const addNewBlog =
  ({ title, author, url, user }) =>
  (dispatch) => {
    blogService.addBlog({ title, author, url }).then((blog) => {
      console.log(blog)
      if (!blog.title) {
        dispatch(setNotification(blog, 'red', 5))
        return console.log(blog)
      }
      dispatch(addBlog({ ...blog, user }))
      console.log(`added blog: ${blog.title}`)
      dispatch(setNotification(`Added blog ${blog.title}`, 'darkgreen', 3))
      return blog
    })
  }

export default blogSlice.reducer
