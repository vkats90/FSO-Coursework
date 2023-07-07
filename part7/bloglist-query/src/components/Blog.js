import { useNavigate } from 'react-router-dom'

const blogStyle = {
  border: '1px solid black',
  borderRadius: 5,
  padding: 5,
  width: 500,
  margin: 5,
}
const Blog = ({ blog }) => {
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault()
    navigate(`/blogs/${blog.id}`)
  }

  return (
    <div style={blogStyle} className="blog_title">
      <a href="" onClick={handleClick}>
        {blog.title}
      </a>{' '}
      <span style={{ fontStyle: 'italic', color: 'gray' }} className="blog_author">
        -{blog.author}{' '}
      </span>
    </div>
  )
}

export default Blog
