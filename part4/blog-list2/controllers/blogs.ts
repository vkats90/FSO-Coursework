import { Router, Request, Response } from 'express'
import { Blog } from '../models/blogs'
import { error } from 'node:console'

export const blogRouter = Router()

blogRouter.get('/', async (request: Request, response: Response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request: Request, response: Response) => {
  const newBlog = request.body
  if (newBlog.likes == undefined) newBlog.likes = 0
  if (!newBlog.title || !newBlog.url)
    response.status(400).json({ error: 'Missing required fields title or url' })
  const blog = new Blog(request.body)

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
  const newBlog = request.body
  const oldBlog = await Blog.findById(id)
  if (!oldBlog) response.status(400).json({ error: "A blog with this ID doesn't exist" })
  else {
    const res = await Blog.findByIdAndUpdate(id, { ...oldBlog, newBlog }, { new: true })
    response.status(200).json(res)
  }
})
