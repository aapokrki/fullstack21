import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },

    setBlogs(state, action) {
      return action.payload
    },

    addLike(state, action) {
      return state.map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
    },

    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { appendBlog, setBlogs, deleteBlog, addLike } = blogSlice.actions

export const likeBlog = (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

  return async (dispatch) => {
    const likedBlog = { ...(await blogService.update(blog.id, updatedBlog)), user: blog.user }

    dispatch(addLike(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log(blogs)

    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
