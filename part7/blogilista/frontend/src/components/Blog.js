import { useDispatch } from "react-redux/es/exports"
import { likeBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { removeBlog } from "../reducers/blogReducer"
import { useSelector } from "react-redux/es/exports"
import { useMatch, useNavigate } from "react-router-dom"

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find((user) => user.id === match.params.id) : null
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDeleteButton = { display: user.username === blog.user.username ? "" : "none" }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked ${blog.title}`, 5, "notification"))
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete blog ${blog.title}`)) {
      return null
    }
    dispatch(removeBlog(blog.id))
    dispatch(setNotification(`Deleted ${blog.title}`, 5, "notification"))
    navigate("/blogs")
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <div>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}{" "}
          <button id="like-button" onClick={() => handleLike()}>
            like
          </button>
        </div>
        <div>Added by: {blog.user ? blog.user.username : "unknown"}</div>
        <div>
          <button id="delete-button" style={showDeleteButton} onClick={() => handleDelete()}>
            delete blog
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
