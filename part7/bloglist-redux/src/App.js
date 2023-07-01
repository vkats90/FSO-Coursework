import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { getBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { logout, initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const noteFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])
  const user = useSelector((state) => state.user)

  const toggleForm = () => {
    noteFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <h3>Welcome back {user.name}!</h3>
          <button onClick={() => dispatch(logout(user))}>Logout</button>
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
