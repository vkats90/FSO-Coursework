import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/users'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const noteFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blog)

  useEffect(() => {
    const localStorage = window.localStorage.getItem('user')
    // need to test if token is still valid too,
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
  const toggleForm = () => {
    noteFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setNotification(`See you later  ${user.name}`, 'darkgreen', 3))
    setUser(null)
  }

  console.log(blogs)
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
            <AddBlog user={user} toggleForm={toggleForm} />
          </Toggable>
          <br />
          {!blogs.length ? (
            <p>Loading...</p>
          ) : (
            blogs.map((blog) => <Blog key={blog.id} blog={blog} username={user.username} />)
          )}
        </div>
      )}
    </div>
  )
}

export default App
