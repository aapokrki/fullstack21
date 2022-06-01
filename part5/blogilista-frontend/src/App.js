import { useState, useEffect } from 'react'
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

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }

  // ADD BLOG
  const addBlog = async (event) => {
    event.preventDefault()

    try {
        const blogObject = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }

      const returnedNote = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedNote))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      
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

  const blogList = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

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
          <h3>Logged in as "{user.name}" <button onClick={handleLogout}>logout</button></h3>

          <Notification message={notificationMessage} />

          <Togglable buttonLabel="Create note">
            <h3>Add a new blog:</h3>
            <BlogForm addBlog={addBlog}
              newBlogTitle={newBlogTitle}
              newBlogAuthor={newBlogAuthor}
              newBlogUrl={newBlogUrl}
              setNewBlogTitle={setNewBlogTitle}
              setNewBlogAuthor={setNewBlogAuthor}
              setNewBlogUrl={setNewBlogUrl}/>
          </Togglable>


          {blogList()}
        </div>
      }
    </div>
  )
}

export default App