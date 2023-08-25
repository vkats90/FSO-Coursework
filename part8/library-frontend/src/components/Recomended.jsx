import { ALL_BOOKS } from '../queries'
import { ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recomended = () => {
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: 'none' },
  })

  let user
  useQuery(ME, {
    onCompleted: (user) => {
      refetch({ genre: user.me.favoriteGenre })
    },
  })

  if (loading) return <p>Loading...</p>

  const books = data.allBooks

  return (
    <div>
      <h2>Recommended Books:</h2>

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
    </div>
  )
}

export default Recomended
