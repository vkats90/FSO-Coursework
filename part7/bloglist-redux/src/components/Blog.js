import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeABlog, deleteABlog } from '../reducers/blogReducer'

const blogStyle = {
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
  width: 500,
  margin: 5,
}
const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const addLike = () => {
    dispatch(likeABlog({ ...blog, likes: blog.likes + 1 }))
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
            onClick={() => dispatch(deleteABlog(blog))}
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
