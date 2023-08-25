import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

const Books = () => {
  const [genres, setGenres] = useState([])
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, { variables: { genre: '' } })

  if (loading) return <p>Loading...</p>

  const books = data.allBooks

  if (genres.length == 0) setGenres([...new Set(books.map((b) => b.genres).flat())])

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Filter by genre:
        <select type="text" onChange={({ target }) => refetch({ genre: target.value })}>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={() => refetch({ genre: '' })}>clear</button>
      </p>
    </div>
  )
}

export default Books
