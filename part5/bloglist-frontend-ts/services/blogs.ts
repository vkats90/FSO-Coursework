import axios from 'axios'
import type { BlogType } from '../types'

const baseURL = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const addBlog = async (blog: BlogType) => {
  try {
    const token = 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user') as string).token
    const res = await axios.post(baseURL, blog, { headers: { Authorization: token } })
    console.log(res)
    return res.data
  } catch (err: any) {
    return err.response.data
  }
}

const editBlog = async (blog: BlogType) => {
  try {
    const token = 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user') as string).token
    const res = await axios.put(
      baseURL + `/${blog.id}`,
      {
        ...blog,
        id: undefined,
        user: undefined,
      },
      { headers: { Authorization: token } }
    )
    return res.data
  } catch (err: any) {
    return err.response.data
  }
}

const deleteBlog = async (blog: BlogType) => {
  try {
    const token = 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user') as string).token
    const res = await axios.delete(baseURL + `/${blog.id}`, { headers: { Authorization: token } })
    return res.data
  } catch (err: any) {
    return err.response.data
  }
}

export default { getAll, addBlog, editBlog, deleteBlog }
