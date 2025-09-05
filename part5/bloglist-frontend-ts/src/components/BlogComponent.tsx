import { useState } from 'react'
import { useAppData } from '../context/context'
import type { BlogType } from '../../types'
import blogService from '../../services/blogs'

const BlogComponent = ({ blog }: { blog: BlogType }) => {
  const [expand, setExpand] = useState(false)
  const { setBlogs, setNote, user } = useAppData()

  const handleDelete = () => {
    ;(async () => {
      await blogService.deleteBlog(blog)
      setBlogs((prev) => prev.filter((x) => x.id != blog.id))
      setNote({ message: 'Successfully delted' })
    })()
  }

  const handleAddLike = () => {
    ;(async () => {
      await blogService.editBlog({ ...blog, likes: blog.likes + 1 })
      setBlogs((prev) =>
        prev
          .map((b) => (b.id === blog.id ? { ...b, likes: b.likes + 1 } : b))
          .sort((a: BlogType, b: BlogType) => b.likes - a.likes)
      )
      setNote({ message: `Liked blog "${blog.title}"` })
    })()
  }

  return (
    <div
      data-testid="blog-component"
      className="relative border-0 my-2 flex justify-start rounded-sm p-2 md:w-[400px] w-[95%] bg-white hover:bg-slate-200"
    >
      {!expand && (
        <div className="cursor-pointer" onClick={() => setExpand(!expand)}>
          <b> {blog.title} </b>
          <i className="text-gray-600">- {blog.author} </i>
        </div>
      )}
      {expand && (
        <div className="p-2 text-left">
          <button
            onClick={() => setExpand(!expand)}
            className="absolute text-red-500 text-xl right-2 top-0 cursor-pointer"
          >
            x
          </button>
          <div className="font-bold text-xl m-auto">{blog.title}</div>
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
          <div className="flex gap-2">
            {' '}
            <b>Likes: </b>
            {blog.likes}
            <span
              data-testid="like-button"
              onClick={handleAddLike}
              className="cursor-pointer stroke-black hover:stroke-slate-400"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6049 5.78212L11.8341 3.41331C11.9263 2.46119 12.8146 1.81535 13.7128 2.04742C15.0643 2.39662 16.0125 3.65163 16.0125 5.09141V8.12624C16.0125 8.80124 16.0125 9.13874 16.159 9.3869C16.2419 9.52729 16.3561 9.64523 16.4919 9.73092C16.732 9.88239 17.0586 9.88239 17.7117 9.88239H18.108C19.8108 9.88239 20.6622 9.88239 21.1864 10.2729C21.5786 10.5649 21.8552 10.9937 21.9652 11.4801C22.1124 12.1304 21.7849 12.9426 21.13 14.5671L20.8035 15.3769C20.6149 15.8447 20.5377 16.3523 20.5784 16.8573C20.8101 19.7306 18.5307 22.1524 15.7451 21.9925L5.32067 21.394C4.18227 21.3286 3.61307 21.2959 3.09856 20.8408C2.58406 20.3856 2.48726 19.9169 2.29365 18.9797C2.12862 18.1807 2 17.2012 2 16.0888C2 14.855 2.15821 13.7847 2.34883 12.943C2.63157 11.6945 3.8242 11.0232 5.05534 11.1822C8.31887 11.6038 11.2777 9.16429 11.6049 5.78212Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.00008 11.5L6.86309 11.9566C5.97611 14.9132 6.02395 18.0716 7.00008 21"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>{' '}
          {blog.user && (
            <div>
              <b>User: </b>
              {blog.user.name}{' '}
            </div>
          )}
          {blog.user?.username == user?.username && (
            <button
              className="absolute right-0 bottom-0 m-2 text-red-500 font-bold rounded-md  cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogComponent
