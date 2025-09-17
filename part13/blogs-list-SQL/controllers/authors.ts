import { Router, Request, Response } from 'express'
import models from '../models'
import { sequelize } from '../dbConnection'

export const authorRouter = Router()

authorRouter.get('/', async (req: Request, res: Response) => {
  const blogs = await models.Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  })
  res.status(200).json(blogs)
})
