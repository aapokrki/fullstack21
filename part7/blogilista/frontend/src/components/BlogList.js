import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  return (
    <div>
      <div>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  )
}

export default BlogList
