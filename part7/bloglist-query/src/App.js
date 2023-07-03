import { useEffect, useRef, useContext } from 'react'
import Users from './Routes/Users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Context from './Context'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blogs from './Routes/Blogs'

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
    <Router>
      {notification.message && <Notification />}
      {!user && <LoginForm />}
      {user && (
        <div>
          <h3>Welcome back {user.name}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App
