//import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { Link } from "react-router-dom"
const User = () => {
  const users = useSelector((state) => state.users)

  const match = useMatch("/users/:id")
  const user = match ? users.find((user) => user.id === match.params.id) : null

  return (
    <div>
      {user ? (
        <div>
          <h1>
            {user.name} ({user.username})
          </h1>
          <h4>Added blogs</h4>

          {user.blogs.length ? (
            user.blogs.slice().map((blog) => (
              <div key={blog.id}>
                <ul>
                  <li>
                    {" "}
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} by ({blog.author})
                    </Link>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>no blogs</p>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default User
