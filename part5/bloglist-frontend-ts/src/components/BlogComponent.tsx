import { useState } from 'react'
import { useAppData } from '../App'
import type { BlogType } from '../../types'
import blogService from '../../services/blogs'

const BlogComponent = ({ blog }: { blog: BlogType }) => {
  const [expand, setExpand] = useState(false)
  const { setBlogs, setNote } = useAppData()

  const handleDelete = () => {
    ;(async () => {
      await blogService.deleteBlog(blog)
      setBlogs((prev) => prev.filter((x) => x.id != blog.id))
      setNote({ message: 'Successfully delted' })
    })()
  }

  return (
    <div
      onClick={() => setExpand(!expand)}
      className="relative border-0 my-2 flex justify-start rounded-sm p-2 md:w-[400px] w-[95%] cursor-pointer bg-white hover:bg-slate-200"
    >
      {!expand && (
        <div>
          <b> {blog.title} </b>
          <i className="text-gray-600">- {blog.author} </i>
        </div>
      )}
      {expand && (
        <div className="p-2 text-left">
          <div className="font-bold text-xl m-auto" onClick={() => setExpand(!expand)}>
            {blog.title}
          </div>
          <div>
            {' '}
            <b>Author: </b>
            {blog.author}
          </div>
          <div>
            {' '}
            <b>Url: </b>
            {blog.url}
          </div>
          <div>
            {' '}
            <b>Likes: </b>
            {blog.likes}
          </div>{' '}
          {blog.user && (
            <div>
              <b>User: </b>
              {blog.user.name}{' '}
            </div>
          )}
          <button
            className="absolute right-0 bottom-0 m-2 bg-red-300 rounded-md p-2 cursor-pointer"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogComponent
