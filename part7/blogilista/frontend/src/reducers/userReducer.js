import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      //console.log(action.payload)
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const setUserToken = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))

    if (user) {
      console.log(user.name, user.token.substring(189, 194))
      await blogService.setToken(user.token)
    }
  }
}

export default userSlice.reducer
