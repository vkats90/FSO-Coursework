import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Context from '../Context'
import blogService from '../services/blogs'

const AddBlog = ({ toggleForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage, user] = useContext(Context)

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(blogService.addBlog, {
    onSuccess: (blog) => {
      console.log(blog)
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat({ ...blog, user }))
      setMessage(`Added blog ${blog.title}`, 'darkgreen')
      console.log(`added blog: ${blog.title}`)
    },
    onError: (error) => {
      setMessage(error.response.data, 'red')
      return console.log(error.response.data)
    },
  })

  const createBlog = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url, user })
    toggleForm()
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
