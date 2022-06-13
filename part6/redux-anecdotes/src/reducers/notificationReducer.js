import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 1000 * time)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return content

    },
    hideNotification(state,action) {
      return null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer