import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  try {
    return await axios.post(baseUrl, { username, password })
  } catch (error) {
    return { error: 'Username or Password are incorrect' }
  }
}

const getUsers = async () => {
  try {
    return await axios.get('/api/users')
  } catch (error) {
    return { error: error.message }
  }
}

export default { login, getUsers }
