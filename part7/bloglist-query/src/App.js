import { useEffect, useContext } from 'react'
import Users from './Routes/Users'
import Blogs from './Routes/Blogs'
import DetailedUser from './Routes/DetailedUser.js'
import DetailedBlog from './Routes/DetailedBlog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Context from './Context'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const headerStyle = { padding: 5 }

const App = () => {
  const [notification, setMessage, user, setUser] = useContext(Context)

  useEffect(() => {
    const localStorage = window.localStorage.getItem('user')
    if (localStorage) {
      setUser(JSON.parse(localStorage))
      blogService.setToken(JSON.parse(localStorage).token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setMessage(`See you later  ${user.name}`, 'darkgreen')
    setUser('')
  }

  return (
    <Router stlye={{ width: '100%' }}>
      <div style={{ width: '100%', background: 'darkgray', padding: 5 }}>
        <Link style={headerStyle} to="/">
          Blogs
        </Link>
        <Link style={headerStyle} to="/users">
          Users
        </Link>
        {user && (
          <span>
            <span style={headerStyle}>Welcome back {user.name}</span>!
            <button style={headerStyle} onClick={handleLogout}>
              Logout
            </button>
          </span>
        )}
      </div>

      {notification.message && <Notification />}
      {!user && <LoginForm />}
      {user && (
        <div>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<DetailedUser />} />
            <Route path="/blogs/:id" element={<DetailedBlog />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App
