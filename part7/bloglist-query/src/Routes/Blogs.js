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
    <div className="w-max bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 m-8 p-5 rounded-lg pb-10">
      <h2 className="text-3xl py-5 font-bold text-purple-800 ">Blogs</h2>
      <Toggable className="" text="New blog" ref={noteFormRef}>
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
