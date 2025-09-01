import { Router, Request, Response } from 'express'
import { Blog } from '../models/blogs'
import middleware from '../utils/middleware'
import { BlogType } from '../types'

export const blogRouter = Router()

blogRouter.get('/', async (request: Request, response: Response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request: Request, response: Response) => {
  if (!request.user) throw { status: 401, error: 'Unauthorized' }
  const newBlog = request.body
  if (newBlog.likes == undefined) newBlog.likes = 0
  if (!newBlog.title || !newBlog.url)
    throw { status: 400, error: 'Missing required fields title or url' }

  const blog = new Blog({ ...request.body, user: request.user.id })

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request: Request, response: Response) => {
    if (!request.user) throw { status: 401, error: 'Unauthorized' }
    const id = request.params.id.toString()
    const blog: any = await Blog.findById(id).populate('user')
    if (!blog) throw { status: 400, error: "A blog with this ID doesn't exist" }
    else if (blog.user.username != request.user.username) {
      throw { status: 401, error: 'Unauthorized' }
    } else {
      await blog.deleteOne()
      response.status(204).json(blog)
    }
  }
)

blogRouter.put('/:id', middleware.userExtractor, async (request: Request, response: Response) => {
  if (!request.user) throw { status: 401, error: 'Unauthorized' }
  const id = request.params.id.toString()
  const newBlog = { ...request.body, user: request.user.id }
  const oldBlog: any = await Blog.findById(id)
  if (!oldBlog) throw { status: 400, error: "A blog with this ID doesn't exist" }
  else {
    const res = await Blog.findByIdAndUpdate(id, { ...oldBlog.toJSON(), ...newBlog }, { new: true })
    response.status(200).json(res)
  }
})
