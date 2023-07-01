import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const login = (user) => async (dispatch) => {
  console.log(`${user.username} is logging in`)

  let loggedUser = await userService.login(user)

  if (loggedUser.error) {
    dispatch(setNotification(loggedUser.error, 'red', 3))
    return console.log(JSON.stringify(loggedUser))
  }

  console.log(`${loggedUser.data.name} has logged in`)
  window.localStorage.setItem('user', JSON.stringify(loggedUser.data))
  dispatch(setUser(loggedUser.data))
  blogService.setToken(loggedUser.data.token)
  dispatch(setNotification(`${loggedUser.data.username} logged in`, 'darkgreen', 3))
}

export const logout = (user) => async (dispatch) => {
  window.localStorage.removeItem('user')
  dispatch(setNotification(`See you later  ${user.name}`, 'darkgreen', 3))
  dispatch(setUser(null))
}

export const initializeUser = () => (dispatch) => {
  const localStorage = window.localStorage.getItem('user')
  // need to test if token is still valid too,
  if (localStorage) {
    dispatch(setUser(JSON.parse(localStorage)))
    blogService.setToken(JSON.parse(localStorage).token)
  }
}

export default userSlice.reducer
