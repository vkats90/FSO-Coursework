import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

let token = null

const setToken = (newToken) => {
  token = 'bearer ' + newToken
}

const addBlog = async ({ title, author, url }) => {
  try {
    const blog = await axios.post(
      baseUrl,
      { title, author, url },
      { headers: { Authorization: token } }
    )
    return blog.data
  } catch (error) {
    return error.response.data
  }
}

const addLike = async (blog) => {
  try {
    const response = await axios.put(baseUrl + '/' + blog.id, blog, {
      headers: { Authorization: token },
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const deleteBlog = async (blog) => {
  try {
    const response = await axios.delete(baseUrl + '/' + blog.id, {
      headers: { Authorization: token },
    })
    if (response.status === 204) return blog
    return response.data
  } catch (error) {
    return error
  }
}

export default { getAll, setToken, addBlog, addLike, deleteBlog }
