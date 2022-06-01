import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }

  const blogList = () => (
    <>
      <h3>Logged in as "{user.name}" <button onClick={handleLogout}>logout</button></h3>
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
        <Notification message={errorMessage} />
        <LoginForm  username={username} 
                    password={password} 
                    handleLogin={handleLogin} 
                    setUsername={setUsername} 
                    setPassword={setPassword}/>
      </div>
      :
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        {blogList()}
      </div>
      }
    </div>
  )
}

export default App