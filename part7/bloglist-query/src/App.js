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
    <Router className=" w-max ">
      <nav className="bg-gray-300 py-3 flex flex-wrap justify-between items-center mx-auto content-end">
        <div>
          <Link className="p-1 px-5 hover:text-purple-300 transition duration-150" to="/">
            Blogs
          </Link>
          <Link className="p-1 hover:text-purple-300 transition duration-150" to="/users">
            Users
          </Link>
        </div>
        {user && (
          <span className="px-5">
            <span className="p-1 px-5">
              Welcome back <span className="text-purple-400">{user.name}</span>!
            </span>

            <button
              className="p-1 hover:text-purple-300 transition duration-150"
              onClick={handleLogout}
            >
              Logout
            </button>
          </span>
        )}
      </nav>

      {notification.message && <Notification />}
      {!user && <LoginForm />}
      {user && (
        <div className="grid justify-items-center ">
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
