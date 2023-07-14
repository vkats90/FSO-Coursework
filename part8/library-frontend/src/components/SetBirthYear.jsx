import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [setBornTo] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()

    setBornTo({
      variables: { name, setBornTo: birthYear },
      refetchQueries: [{ query: ALL_AUTHORS }],
      onError: (error) => {
        console.log(error.graphQLErrors[0].message)
      },
    })

    setBirthYear('')
    setName('')
  }

  return (
    <div>
      <h2>Set author birthyear</h2>
      <form onSubmit={submit}>
        name:
        <select type="text" value={name} onChange={({ target }) => setName(target.value)}>
          {authors &&
            authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
        </select>
        <br />
        born:
        <input
          type="number"
          value={birthYear}
          onChange={({ target }) => setBirthYear(Number(target.value))}
        />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
