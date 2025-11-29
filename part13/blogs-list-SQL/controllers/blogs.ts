import { Router, Request, Response } from 'express'
import models from '../models'
import middleware from '../utils/middleware'
import { Op } from 'sequelize'

export const blogRouter = Router()

blogRouter.get('/', async (req: Request, res: Response) => {
  const search = req.query.search
  let where: any = {}
  if (search) {
    where = {
      [Op.or]: [{ title: { [Op.substring]: search } }, { author: { [Op.substring]: search } }],
    }
  }
  const blogs = await models.Blog.findAll({
    include: [
      {
        model: models.User,
      },
      {
        model: models.User,
        as: 'readBy',
        through: {
          attributes: [],
        },
      },
    ],
    where,
    order: [['likes', 'DESC']],
  })
  res.status(200).json(blogs)
})

blogRouter.get('/:id', async (req: Request, res: Response) => {
  const blogs = await models.Blog.findByPk(req.params.id, {
    include: [
      {
        model: models.User,
      },
      {
        model: models.User,
        as: 'readBy',
        through: {
          attributes: [],
        },
      },
    ],
    order: [['likes', 'DESC']],
  })
  res.status(200).json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (req: Request, res: Response) => {
  const newBlog = req.body
  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  if (newBlog.likes == undefined) newBlog.likes = 0
  if (!newBlog.title || !newBlog.url)
    throw { status: 400, error: 'Missing required fields title or url' }
  if (newBlog && (newBlog.year < 1991 || newBlog.year > Number(new Date().getFullYear())))
    throw { status: 400, error: 'The year must be between 1992 and this year' }
  const blog = models.Blog.build({
    ...newBlog,
    userId: req.user.id.toString(),
  })
  const response = await blog.save({
    validate: true,
    fields: ['title', 'url', 'likes', 'author', 'userId'],
  })
  res.status(201).json(response)
})

blogRouter.put('/:id', middleware.userExtractor, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  const blog = await models.Blog.findByPk(id, {
    include: {
      model: models.User,
    },
  })
  if (!blog) throw { status: 400, error: "A blog with this ID doesn't exist" }
  if (blog.toJSON().user.id != req.user.id) throw { status: 401, error: 'Unauthorized' }
  const updatedBlog = { ...blog.toJSON(), ...req.body }
  await models.Blog.update(updatedBlog, {
    where: { id },
    validate: true,
    fields: ['title', 'url', 'likes', 'author', 'userId'],
  })
  res.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  const blog = await models.Blog.findByPk(id, {
    include: {
      model: models.User,
    },
  })

  if (!blog) throw { status: 400, error: "A blog with this ID doesn't exist" }
  if (blog.toJSON().user.id != req.user.id) throw { status: 401, error: 'Unauthorized' }
  await blog.destroy()
  res.status(204).end()
})
