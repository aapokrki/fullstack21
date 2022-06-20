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

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("Aap")
  const [password, setPassword] = useState("salasana")
  //const [user, setUser] = useState(null)

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

  return (
    <div>
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
          <h2>Blogilista</h2>
          <h3>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </h3>

          <Notification />

          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <h3>Add a new blog:</h3>
            <BlogForm />
          </Togglable>

          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
