import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  return (
    <div id="bloglist">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={user.username} />
        ))}
    </div>
  )
}

export default BlogList
