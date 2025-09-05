import type { BlogType } from '../../types'
import BlogComponent from './BlogComponent'

const BlogList = ({ blogs }: { blogs: BlogType[] }) => {
  if (blogs.length == 0)
    return (
      <div className="text-xl bg-slate-100 py-4 px-10 w-fit m-auto rounded-lg">
        No blogs to display yet
      </div>
    )
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
