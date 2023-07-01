import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/users'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import NotificationContext from './notificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setMessage] = useContext(NotificationContext)
  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const localStorage = window.localStorage.getItem('user')
    // need to test if token is still valid too, but it's not required in this exercise
    if (localStorage) {
      setUser(JSON.parse(localStorage))
      blogService.setToken(JSON.parse(localStorage).token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    console.log(`${username} is logging in`)

    let loggedUser = await loginService.login({ username, password })

    if (loggedUser.error) {
      setMessage(loggedUser.error, 'red')
      return console.log(JSON.stringify(loggedUser))
    }

    console.log(`${loggedUser.data.name} has logged in`)
    window.localStorage.setItem('user', JSON.stringify(loggedUser.data))
    setUser(loggedUser.data)
    blogService.setToken(loggedUser.data.token)
    setMessage(`${loggedUser.data.username} logged in`, 'darkgreen')
  }
  const handleAddBlog = async ({ title, author, url }) => {
    const blog = await blogService.addBlog({ title, author, url })
    if (blog.error) {
      setMessage(blog.error, 'red')
      return console.log(blog)
    }

    blog.user = user
    noteFormRef.current.toggleVisibility()
    console.log(`added blog: ${blog.title}`)
    setBlogs(blogs.concat(blog))
    setMessage(`Added blog ${blog.title}`, 'darkgreen')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setMessage(`See you later  ${user.name}`, 'darkgreen')
    setUser(null)
  }

  const handleAddLike = async (blog) => {
    let response = await blogService.addLike(blog)
    if (response && response.error) {
      setMessage(response.error, 'red')
      return console.log(JSON.stringify(response))
    }
    setBlogs(
      blogs
        .map((x) => {
          if (x.id === blog.id) x = blog
          return x
        })
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const handleDelete = async (blog) => {
    let response
    if (window.confirm('Are you sure you want to delete this blog?'))
      response = await blogService.deleteBlog(blog)
    if (response) {
      setMessage(response.error, 'red')

      return console.log(JSON.stringify(response))
    }
    setBlogs(blogs.filter((x) => x.id !== blog.id))
  }

  return (
    <div>
      {notification.message && <Notification />}
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h3>Welcome back {user.name}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          <Toggable text="Add a note" ref={noteFormRef}>
            <AddBlog addBlog={handleAddBlog} />
          </Toggable>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleAddLike={handleAddLike}
              username={user.username}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
