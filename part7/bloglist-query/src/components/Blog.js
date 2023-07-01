import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import NotificationContext from '../notificationContext'
import blogService from '../services/blogs'

const blogStyle = {
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
  width: 500,
  margin: 5,
}
const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation(blogService.addLike, {
    onSuccess: (res) => {
      console.log(res)
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs
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
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((x) => x.id !== res.id)
      )
      setMessage(`deleted blog ${blog.title}`, 'green')
    },
    onError: (error) => {
      setMessage(error.message, 'red')
      return console.log(error.message)
    },
  })

  const addLike = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = (blog) => {
    if (window.confirm('Are you sure you want to delete this blog?'))
      deleteBlogMutation.mutate(blog)
  }

  return (
    <div style={blogStyle} className="blog_title">
      {blog.title}{' '}
      <span style={{ fontStyle: 'italic', color: 'gray' }} className="blog_author">
        -{blog.author}{' '}
      </span>
      <button className="visibleButton" onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      <div style={{ display: visible ? '' : 'none' }} className="blog_url_likes">
        <div>{blog.url}</div>
        likes: <span className="likes">{blog.likes} </span>
        <button onClick={addLike} className="likeButton">
          like
        </button>{' '}
        <br />
        {blog.user.name} <br />
        {blog.user.username === username ? (
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
    </div>
  )
}

export default Blog
