import { useState } from "react"
import { useDispatch } from "react-redux/es/exports"
import { likeBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { removeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, username }) => {
  const [moreinfo, setMoreInfo] = useState(false)
  const [createdByCurrentUser, setCreatedByCurrentUser] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDeleteButton = { display: createdByCurrentUser ? "" : "none" }

  const handleOnClick = () => {
    setMoreInfo(!moreinfo)

    if (username === blog.user.username) {
      setCreatedByCurrentUser(true)
    }
  }

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
  }

  if (moreinfo) {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} by {blog.author}
        <button id="hide-button" onClick={() => handleOnClick()}>
          hide
        </button>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}{" "}
          <button id="like-button" onClick={() => handleLike()}>
            like
          </button>
        </div>
        <div>Added by: {blog.user ? blog.user.username : "unknown"}</div>
        <button id="delete-button" style={showDeleteButton} onClick={() => handleDelete()}>
          delete blog
        </button>
      </div>
    )
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <button id="view-button" onClick={() => handleOnClick()}>
        view
      </button>
    </div>
  )
}

export default Blog
