import { useState, useEffect, useRef } from "react"
// import Blog from "./components/Blog"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { setNotification } from "./reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import BlogList from "./components/BlogList"
import { setUserToken, setUser } from "./reducers/userReducer"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { getUsers } from "./reducers/usersReducer"
import Table from "react-bootstrap/Table"
import User from "./components/User"
import Blog from "./components/Blog"

const App = () => {
  const [username, setUsername] = useState("Aap")
  const [password, setPassword] = useState("salasana")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserToken(user))
    }
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      dispatch(setUserToken(user))
      setUsername("")
      setPassword("")
      navigate("/blogs")
    } catch (exception) {
      dispatch(setNotification("error: wrong credentials", 5, "error"))
    }
  }

  // LOGOUT
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogappUser")
    dispatch(setUser(null))
  }

  const blogFormRef = useRef()

  const users = useSelector((state) => state.users)

  const UserList = () => {
    console.log(users)
    if (!users) {
      return null
    }
    return (
      <div>
        <h3>USERS</h3>
        <Table striped>
          <tbody>
            {users.slice().map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name} ({user.username})
                  </Link>
                </td>
                <td>{user.blogs.length} blogs</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container">
      {user === null ? (
        <div>
          <h2>Login</h2>
          <Notification />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <Link style={{ padding: 5 }} to="/users">
            users
          </Link>
          <Link to="/blogs">blogs</Link>
          <h2>Blogilista</h2>
          <h3>
            Logged in as {user.name}
            <Link to="/login">
              <button onClick={handleLogout}>logout</button>
            </Link>
          </h3>

          <Notification />
          <Routes>
            <Route
              path="/blogs"
              element={
                <div>
                  <h3>BLOGS</h3>
                  <Togglable buttonLabel="Create blog" ref={blogFormRef}>
                    <h3>Add a new blog:</h3>
                    <BlogForm />
                  </Togglable>
                  <BlogList />
                </div>
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
