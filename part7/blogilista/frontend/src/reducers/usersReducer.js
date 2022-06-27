import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const usersSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setAllUsers(state, action) {
      //console.log(action.payload)
      return action.payload
    },
  },
})

export const { setAllUsers } = usersSlice.actions

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log(users)
    dispatch(setAllUsers(users))
  }
}

export default usersSlice.reducer
