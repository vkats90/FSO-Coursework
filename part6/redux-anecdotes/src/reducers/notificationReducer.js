import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
  },
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return (dispatch) => {
    dispatch(updateNotification(text))
    setTimeout(() => dispatch(updateNotification('')), time * 1000)
  }
}
export default notificationSlice.reducer
