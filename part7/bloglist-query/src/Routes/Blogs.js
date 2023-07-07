import { useRef } from 'react'
import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import AddBlog from '../components/AddBlog'
import Toggable from '../components/Toggable'

const Blogs = () => {
  const noteFormRef = useRef()
  const blogs = useQuery(
    'blogs',
    () => blogService.getAll().then((blogs) => blogs.sort((a, b) => b.likes - a.likes)),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )

  const toggleForm = () => {
    noteFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-800">Blogs</h2>
      <Toggable text="Add a note" ref={noteFormRef}>
        <AddBlog toggleForm={toggleForm} />
      </Toggable>
      <br />
      {blogs.isLoading ? (
        <p>Loading...</p>
      ) : blogs.isError ? (
        <p>{blogs.error.message}</p>
      ) : (
        blogs.data.map((blog) => <Blog key={blog.id} blog={blog} />)
      )}
    </div>
  )
}

export default Blogs
