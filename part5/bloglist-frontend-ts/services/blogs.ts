import axios from 'axios'
import type { BlogType } from '../types'

const baseURL = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const addBlog = async (blog: BlogType) => {
  try {
    const res = await axios.post(baseURL, blog)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const editBlog = async (blog: BlogType) => {
  try {
    const res = await axios.put(baseURL + `/${blog.id}`, {
      ...blog,
      id: undefined,
      user: undefined,
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default { getAll, addBlog, editBlog }
