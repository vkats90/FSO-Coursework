import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/users'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

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
      dispatch(setNotification(loggedUser.error, 'red', 3))
      return console.log(JSON.stringify(loggedUser))
    }

    console.log(`${loggedUser.data.name} has logged in`)
    window.localStorage.setItem('user', JSON.stringify(loggedUser.data))
    setUser(loggedUser.data)
    blogService.setToken(loggedUser.data.token)
    dispatch(setNotification(`${loggedUser.data.username} logged in`, 'darkgreen', 3))
  }
  const handleAddBlog = async ({ title, author, url }) => {
    const blog = await blogService.addBlog({ title, author, url })
    if (blog.error) {
      dispatch(setNotification(blog.error, 'red', 3))
      return console.log(blog)
    }

    blog.user = user
    noteFormRef.current.toggleVisibility()
    console.log(`added blog: ${blog.title}`)
    setBlogs(blogs.concat(blog))
    dispatch(setNotification(`Added blog ${blog.title}`, 'darkgreen', 3))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setNotification(`See you later  ${user.name}`, 'darkgreen', 3))
    setUser(null)
  }

  const handleAddLike = async (blog) => {
    let response = await blogService.addLike(blog)
    if (response && response.error) {
      dispatch(setNotification(response.error, 'red', 3))
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
      dispatch(setNotification(response.error, 'red', 3))
      return console.log(JSON.stringify(response))
    }
    setBlogs(blogs.filter((x) => x.id !== blog.id))
  }

  return (
    <div>
      <Notification />
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
