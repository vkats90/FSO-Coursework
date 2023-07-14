import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import SetBirthYear from './SetBirthYear'

const Authors = () => {
  const res = useQuery(ALL_AUTHORS)

  if (res.loading) {
    return <div>loading...</div>
  }

  const authors = res.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th width={100}>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td width={100} style={{ textAlign: 'center' }}>
                {a.born}
              </td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear />
    </div>
  )
}

export default Authors
