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
  const blog = await axios.post(
    baseUrl,
    { title, author, url },
    { headers: { Authorization: token } }
  )
  return blog.data
}

const addLike = async (blog) => {
  await axios.put(baseUrl + '/' + blog.id, blog, {
    headers: { Authorization: token },
  })
  return blog
}

const deleteBlog = async (blog) => {
  await axios.delete(baseUrl + '/' + blog.id, {
    headers: { Authorization: token },
  })
  return blog
}

export default { getAll, setToken, addBlog, addLike, deleteBlog }
