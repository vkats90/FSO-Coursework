import axios from 'axios'

const baseURL = 'http://localhost:3001/api/login'

const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(baseURL, { username, password })
    window.sessionStorage.setItem('user', JSON.stringify(res.data))
    return res.data
  } catch (err: any) {
    return err.response.data
  }
}

export default { login }
