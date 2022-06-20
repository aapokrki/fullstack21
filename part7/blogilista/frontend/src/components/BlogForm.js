import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    console.log(blog)
    try {
      await dispatch(createBlog(blog))
      dispatch(setNotification(`Blog: "${blog.title}" added to the bloglist`, 5, "notification"))
    } catch (error) {
      dispatch(setNotification("error: requires title and url", 5, "error"))
    }

    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input name="title" id="title-input" />
      </div>

      <div>
        author:
        <input name="author" id="author-input" />
      </div>

      <div>
        url:
        <input name="url" id="url-input" />
      </div>

      <button id="submit-button" type="submit">
        add blog
      </button>
    </form>
  )
}
export default BlogForm
