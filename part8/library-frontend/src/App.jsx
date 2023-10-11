import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recomended from './components/Recomended'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`A new book was added: ${data.data.bookAdded.title}`)
    },
  })

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
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                display: isActive ? 'none' : '',
                padding: 5,
              }
            }}
            to="/recomended"
          >
            Recommended
          </NavLink>
          <button onClick={logout}>logout</button>
        </nav>

        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/newbook" element={<NewBook />} />
          <Route path="/recomended" element={<Recomended />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
