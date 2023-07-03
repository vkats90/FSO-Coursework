import { useEffect, useContext } from 'react'
import Users from './Routes/Users'
import Blogs from './Routes/Blogs'
import DetailedUser from './Routes/DetailedUser.js'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Context from './Context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
            <Route path="/users/:id" element={<DetailedUser />} />
          </Routes>
        </div>
      )}
    </Router>
  )
}

export default App
