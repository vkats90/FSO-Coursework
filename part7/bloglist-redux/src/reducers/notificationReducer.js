import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', color: 'green' },
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
  },
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (message, color, time) => {
  return (dispatch) => {
    dispatch(updateNotification({ message, color }))
    setTimeout(() => dispatch(updateNotification({ message: '', color })), time * 1000)
  }
}

export default notificationSlice.reducer
