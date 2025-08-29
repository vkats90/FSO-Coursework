import type { BlogType } from '../../types'
import BlogComponent from './BlogComponent'

const BlogList = ({ blogs }: { blogs: BlogType[] }) => {
  return (
    <div className="w-fit  m-auto">
      {blogs &&
        blogs.map((b) => (
          <div key={b.id}>
            <BlogComponent blog={b} />
          </div>
        ))}
    </div>
  )
}

export default BlogList
