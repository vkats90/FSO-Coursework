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
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
          className="border rounded-md text-center m-1"
        />
      </div>
      <div>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
          className="border rounded-md text-center m-1"
        />
      </div>
      <div>
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="URL"
          className="border rounded-md text-center m-1"
        />
      </div>
      <button
        className=" hover:text-purple-300  hover:border-purple-300 transition duration-150 font-medium border rounded-md p-1 px-3"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default AddBlog
