import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useParams, useNavigate } from 'react-router-dom'
import Context from '../Context'
import Comments from '../components/Comments'

const DetailedBlog = () => {
  const [message, setMessage, user] = useContext(Context)

  const navigate = useNavigate()

  const id = useParams().id
  const queryClient = useQueryClient()

  /*
  const blog = {
    author: "George Lucas",
    id: "6457d1a310cd35da04c348b0",
    likes: 6,
    title: "A new hope",
    url: "www.starwars.com",
    user: {
      id: "644b2abc042846877cb9e7a6",
    name: "vlad",
    username: "marsimillian77"
  }} */
  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: (res) => {
      const response = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        response
          .map((x) => {
            if (x.id === blog.id) x = res
            return x
          })
          .sort((a, b) => b.likes - a.likes)
      )
    },
    onError: (error) => {
      setMessage(error.message, 'red')
      return console.log(error.message)
    },
  })

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: (res) => {
      console.log(res)
      const response = queryClient.getQueryData('blogs')

      queryClient.setQueryData(
        'blogs',
        response.filter((x) => x.id !== res.id)
      )
      setMessage(`deleted blog ${blog.title}`, 'green')
    },
    onError: (error) => {
      setMessage(error.message, 'red')
      return console.log(error.message)
    },
  })

  const addLike = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const addComment = (comment) => (event) => {
    event.preventDefault()
    updateBlogMutation.mutate({ ...blog, comments: blog.comments.concat(comment) })
  }

  const handleDelete = (blog) => {
    if (window.confirm('Are you sure you want to delete this blog?'))
      deleteBlogMutation.mutate(blog)
    navigate('/')
  }

  const blogs = useQuery(
    'blogs',
    () => blogService.getAll().then((res) => res.sort((a, b) => b.likes - a.likes)),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )
  console.log(blogs)

  if (blogs.isLoading) return <p>Loading...</p>

  const blog = blogs.data.find((n) => n.id === id)
  console.log(blog)

  return (
    <div className="blog_url_likes">
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: <span className="likes">{blog.likes} </span>
        <button onClick={addLike} className="likeButton">
          like
        </button>{' '}
      </div>
      added by: {blog.user.name}
      <Comments blog={blog} addComment={addComment} />
      <form></form>
      {blog.user.username === user.username ? (
        <button
          className="deleteButton"
          style={{
            background: 'red',
            color: 'white',
            borderColor: 'white',
          }}
          onClick={() => handleDelete(blog)}
        >
          delete
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default DetailedBlog
