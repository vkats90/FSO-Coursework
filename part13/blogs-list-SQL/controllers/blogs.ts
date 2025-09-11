import { Router, Request, Response } from 'express'
import models from '../models'
import logger from '../utils/logger'

export const blogRouter = Router()

blogRouter.get('/', async (req: Request, res: Response) => {
  const blogs = await models.Blog.findAll()
  res.status(200).json(blogs)
})

blogRouter.post('/', async (req: Request, res: Response) => {
  const newBlog = req.body
  if (newBlog.likes == undefined) newBlog.likes = 0
  if (!newBlog.title || !newBlog.url)
    throw { status: 400, error: 'Missing required fields title or url' }
  const blog = models.Blog.build(newBlog)
  const response = await blog.save({ validate: true, fields: ['title', 'url', 'likes', 'author'] })
  res.status(200).json(response)
})

blogRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const blog = await models.Blog.findByPk(id)
  if (!blog) throw { status: 400, error: "A blog with this ID doesn't exist" }
  const updatedBlog = { ...blog.toJSON(), ...req.body }
  await models.Blog.update(updatedBlog, {
    where: { id },
    validate: true,
    fields: ['title', 'url', 'likes', 'author'],
  })
  res.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const blog = await models.Blog.findByPk(id)
  if (!blog) throw { status: 400, error: "A blog with this ID doesn't exist" }
  await blog.destroy()
  res.status(204).end()
})
