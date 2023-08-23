import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <nav>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                display: isActive ? 'none' : '',
                padding: 5,
              }
            }}
            to="/"
          >
            authors
          </NavLink>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                display: isActive ? 'none' : '',
                padding: 5,
              }
            }}
            to="/books"
          >
            books
          </NavLink>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                display: isActive ? 'none' : '',
                padding: 5,
              }
            }}
            to="/newbook"
          >
            add book
          </NavLink>
          <button onClick={logout}>logout</button>
        </nav>

        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/newbook" element={<NewBook />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
