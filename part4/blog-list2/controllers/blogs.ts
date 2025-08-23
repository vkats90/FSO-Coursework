import { Router, Request, Response } from 'express'
import { Blog } from '../models/blogs'
import { User } from '../models/users'

export const blogRouter = Router()

blogRouter.get('/', async (request: Request, response: Response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request: Request, response: Response) => {
  const newBlog = request.body
  if (newBlog.likes == undefined) newBlog.likes = 0
  if (!newBlog.title || !newBlog.url)
    response.status(400).json({ error: 'Missing required fields title or url' })

  const user = await User.find({})
  const blog = new Blog({ ...request.body, user: user[0].id })

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id.toString()
  const blog = await Blog.findById(id)
  if (!blog) response.status(400).json({ error: "A blog with this ID doesn't exist" })
  else {
    await blog.deleteOne()
    response.status(204).json(blog)
  }
})

blogRouter.put('/:id', async (request: Request, response: Response) => {
  const id = request.params.id.toString()
  const user = await User.find({})
  const newBlog = { ...request.body, user: user[0].id }
  const oldBlog: any = await Blog.findById(id)
  if (!oldBlog) response.status(400).json({ error: "A blog with this ID doesn't exist" })
  else {
    const res = await Blog.findByIdAndUpdate(id, { ...oldBlog.toJSON(), ...newBlog }, { new: true })
    response.status(200).json(res)
  }
})
