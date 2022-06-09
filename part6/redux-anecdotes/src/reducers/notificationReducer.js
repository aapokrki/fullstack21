import { createSlice } from '@reduxjs/toolkit'

const initialState = 'wtf testi'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNote(state, action) {
      const content = action.payload
      state.push({
        content
      })
    }
  }
})

export const { showNote } = notificationSlice.actions
export default notificationSlice.reducer