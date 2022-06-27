import { useSelector } from "react-redux"
import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom"
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.slice().map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by ({blog.author})
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
