import { useState } from 'react'
import type { BlogType } from '../../types'

const BlogComponent = ({ blog }: { blog: BlogType }) => {
  const [expand, setExpand] = useState(false)
  return (
    <div
      onClick={() => setExpand(!expand)}
      className="border my-2 flex justify-start rounded-sm border-black p-2 w-[400px] cursor-pointer"
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
              blog.user.name{' '}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogComponent
