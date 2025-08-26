const blogRouter = require('express').Router()
import Blog, { find, findById, findByIdAndRemove, findByIdAndUpdate } from '../models/blog'
import { userExtract } from '../utils/middleware'

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await find({}).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', userExtract, async (request, response, next) => {
  const user = request.user

  const blog = new Blog(request.body)
  blog.user = user.id

  try {
    const result = await blog.save()
    user.blogs.push(result.id)
    await user.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', userExtract, async (request, response, next) => {
  try {
    const user = request.user
    const blog = await findById(request.params.id)
    if (!blog) {
      return response.status(400).json({ error: 'blog with this id does not exist' })
    }
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'unauthorized, you did not create this blog' })
    }
    await findByIdAndRemove(request.params.id)
    response.status(204).json({ success: `Blog ${request.params.id} removed` })
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', userExtract, async (request, response, next) => {
  try {
    const { title, author, url, likes, comments } = request.body
    const blog = await findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes, comments },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    )
    response.json(blog)
  } catch (error) {
    next(error)
  }
})

export default blogRouter
