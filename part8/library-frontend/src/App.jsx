import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recomended from './components/Recomended'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useMutation, useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const result = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      console.log(`A new book was added: ${addedBook.title}`)
      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: '' } }, addedBook)
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
