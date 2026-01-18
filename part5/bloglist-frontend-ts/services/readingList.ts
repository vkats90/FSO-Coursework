import axios from 'axios'
import type { BlogType, UserType } from '../types'

const baseURL = 'http://localhost:3001/api/readinglists/'

const getReading = async (user: UserType, blog: BlogType) => {
  try {
    const token = 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user') as string).token
    const queryString = baseURL + '?userId=' + user.id + '&blogId=' + blog.id
    const res = await axios.get(queryString, { headers: { Authorization: token } })

    return res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) return err.response.data
    throw err
  }
}

const addReading = async (blog: BlogType, user: UserType, read: boolean) => {
  try {
    const token = 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user') as string).token
    const reading = { userId: user.id, blogId: blog.id, read }
    const res = await axios.post(baseURL, reading, { headers: { Authorization: token } })
    return res
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) return err.response.data
    throw err
  }
}

export default { addReading, getReading }
