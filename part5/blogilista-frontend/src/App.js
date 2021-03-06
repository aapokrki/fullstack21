import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('error: wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  // LOGOUT
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  /**
   * Adds a blog
   * @param {*} blogObject blogObject from BlogForm
   */
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))

      setNotificationMessage(`Blog: "${blogObject.title}" added to the bloglist`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (error) {
      setNotificationMessage('error: requires title and url')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    }
  }

  const addLike = async (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    // Puts user data back to field 'user', so that blogs dont get empty user field when liking
    const returnedBlog = { ...(await blogService.update(blog.id, changedBlog)), user: blog.user }
    setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
  }

  const deleteBlog = async (blog) => {
    console.log(blog)
    if(!window.confirm(`Delete blog ${blog.title}`)){
      return null
    }

    console.log(`deleted blog ${blog.title}`)

    await blogService.deleteBlog(blog.id)

    setBlogs(blogs.filter(b => b.id !== blog.id))
    setNotificationMessage(`Deleted ${blog.title}`)
  }

  const blogList = () => {

    return(
      <div id='bloglist'>
        {blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id}
              blog={blog}
              username={user.username}
              addLike={() => addLike(blog)}
              deleteBlog={() => deleteBlog(blog)} />
          )}
      </div>)

  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>Login</h2>
          <Notification message={notificationMessage} />
          <LoginForm username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword} />
        </div>
        :
        <div>
          <h2>Blogilista</h2>
          <h3>Logged in as {user.name} <button onClick={handleLogout}>logout</button></h3>

          <Notification message={notificationMessage} />

          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <h3>Add a new blog:</h3>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

          {blogList()}
        </div>
      }
    </div>
  )
}

export default App