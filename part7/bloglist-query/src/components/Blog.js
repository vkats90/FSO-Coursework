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
    <div className="blog_title border border-gray-200 rounded-md p-2 w-96 m-2 bg-white transition-opacity ease-in duration-700 opacity-100">
      <a
        className="hover:text-purple-300 hover:border-purple-300 hover: transition duration-150"
        href=""
        onClick={handleClick}
      >
        {blog.title}
      </a>{' '}
      <span className="blog_author italic text-gray-400">- {blog.author} </span>
    </div>
  )
}

export default Blog
