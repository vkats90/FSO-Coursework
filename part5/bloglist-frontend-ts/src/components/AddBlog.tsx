import blogService from '../../services/blogs'
import { useAppData } from '../App'
import { useState, type FormEvent } from 'react'
import { type BlogType } from '../../types'

const AddBlog = () => {
  const { setBlogs, setNote } = useAppData()
  const [expand, setExpand] = useState(false)
  const [newBlog, setNewBlog] = useState<BlogType | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    ;(async () => {
      if (!newBlog) throw new Error("Can't submit empty fields")
      const res = await blogService.addBlog(newBlog)
      if (res.error) {
        setNewBlog(null)
        setExpand(!expand)
        return setNote(res)
      }
      setBlogs((prev) => prev.concat([res]))
      setNewBlog(null)
      setExpand(!expand)
    })()
  }

  return (
    <div>
      <h1 className="text-2xl my-4">Add Blog</h1>
      {!expand && (
        <button
          className="p-2 rounded-md bg-slate-200 cursor-pointer hover:bg-slate-400"
          onClick={() => setExpand(!expand)}
        >
          Add Blog
        </button>
      )}
      {expand && (
        <form
          className="flex flex-col my-4 gap-2 border-0 rounded-md w-fit p-4 bg-slate-100 items-end m-auto"
          onSubmit={handleSubmit}
        >
          <label className="flex justify-between w-full">
            Title
            <input
              className="bg-white rounded-sm ml-2"
              value={newBlog?.title}
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value } as BlogType)}
            />
          </label>
          <label className="flex justify-between w-full">
            Author
            <input
              className="bg-white rounded-sm ml-2"
              value={newBlog?.author}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value } as BlogType)
              }
            />
          </label>
          <label className="flex justify-between w-full">
            Url
            <input
              className="bg-white rounded-sm ml-2"
              value={newBlog?.url}
              onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value } as BlogType)}
            />
          </label>
          <button
            className="bg-slate-200 rounded-md w-full p-2 self-center cursor-pointer hover:bg-slate-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default AddBlog
