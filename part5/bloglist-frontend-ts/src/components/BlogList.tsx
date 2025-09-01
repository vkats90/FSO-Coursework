import type { BlogType } from '../../types'
import BlogComponent from './BlogComponent'

const BlogList = ({ blogs }: { blogs: BlogType[] }) => {
  return (
    <div className="w-fit  m-auto bg-slate-100 p-4 rounded-lg">
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
