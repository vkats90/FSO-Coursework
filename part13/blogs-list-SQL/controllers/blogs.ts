import { Router, Request, Response } from 'express'
import { Blog } from '../models/blogs'

export const blogRouter = Router()

blogRouter.get('/', async (req: Request, res: Response) => {
  const blogs = await Blog.findAll()
  res.status(200).json(blogs)
})

blogRouter.post('/', async (req: Request, res: Response) => {
  const newBlog = req.body
  if (newBlog.likes == undefined) newBlog.likes = 0
  if (!newBlog.title || !newBlog.url)
    throw { status: 400, error: 'Missing required fields title or url' }
  const blog = Blog.build(newBlog)
  const response = await blog.save()
  res.status(200).json(response)
})

blogRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const blog = await Blog.findByPk(id)
  if (!blog) throw { status: 400, error: "A blog with this ID doesn't exist" }
  await blog.destroy()
  res.status(204).end()
})
