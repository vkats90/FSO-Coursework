import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/users'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import NotificationContext from './notificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setMessage] = useContext(NotificationContext)
  const noteFormRef = useRef()

  const queryClient = useQueryClient()

  const blogs = useQuery(
    'blogs',
    () => blogService.getAll().then((blogs) => blogs.sort((a, b) => b.likes - a.likes)),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )

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
  const toggleForm = () => {
    noteFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setMessage(`See you later  ${user.name}`, 'darkgreen')
    setUser(null)
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
            <AddBlog user={user} toggleForm={toggleForm} />
          </Toggable>
          <br />
          {blogs.isLoading ? (
            <p>Loading...</p>
          ) : blogs.isError ? (
            <p>{blogs.error.message}</p>
          ) : (
            blogs.data.map((blog) => <Blog key={blog.id} blog={blog} username={user.username} />)
          )}
        </div>
      )}
    </div>
  )
}

export default App
