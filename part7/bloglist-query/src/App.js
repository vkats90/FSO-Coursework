import { useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import Context from './Context'
import { useQuery } from 'react-query'

const App = () => {
  const [notification, setMessage, user, setUser] = useContext(Context)
  const noteFormRef = useRef()

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
    if (localStorage) {
      setUser(JSON.parse(localStorage))
      blogService.setToken(JSON.parse(localStorage).token)
    }
  }, [])

  const toggleForm = () => {
    noteFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setMessage(`See you later  ${user.name}`, 'darkgreen')
    setUser('')
  }

  return (
    <div>
      {notification.message && <Notification />}
      {!user && <LoginForm />}
      {user && (
        <div>
          <h3>Welcome back {user.name}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          <Toggable text="Add a note" ref={noteFormRef}>
            <AddBlog toggleForm={toggleForm} />
          </Toggable>
          <br />
          {blogs.isLoading ? (
            <p>Loading...</p>
          ) : blogs.isError ? (
            <p>{blogs.error.message}</p>
          ) : (
            blogs.data.map((blog) => <Blog key={blog.id} blog={blog} />)
          )}
        </div>
      )}
    </div>
  )
}

export default App
