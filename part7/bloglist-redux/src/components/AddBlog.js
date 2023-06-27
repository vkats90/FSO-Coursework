import { useState } from 'react'

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <form onSubmit={createBlog}>
      <h3>Add a new blog:</h3>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="blog title"
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author name"
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="link to blog"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddBlog
