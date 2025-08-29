import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from '../services/blogs'
import type { BlogType } from '../types'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    ;(async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  return (
    <div className="w-full p-10 flex flex-col text-center">
      <div className="my-8 text-4xl">Blog List App TypeScript</div>
      <BlogList blogs={blogs} />
    </div>
  )
}

export default App
