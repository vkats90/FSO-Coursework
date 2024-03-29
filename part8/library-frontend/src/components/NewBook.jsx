import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'
import { updateCache } from '../App'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(ADD_BOOK)

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published, genres },
      refetchQueries: [{ query: ALL_BOOKS, variables: { genre: '' } }],
      onError: (error) => {
        console.log(error.graphQLErrors[0].message)
      },
      update: (cache, response) => {
        updateCache(cache, { query: ALL_BOOKS, variables: { genre: '' } }, response.data.addBook)
      },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add a book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
