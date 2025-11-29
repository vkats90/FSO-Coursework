import { Router, Request, Response } from 'express'
import middleware from '../utils/middleware'
import models from '../models'

export const readingsRouter = Router()

readingsRouter.post('/', middleware.userExtractor, async (req: Request, res: Response) => {
  const reading = req.body
  if (!req.user || req.user.id != reading.userId) throw { status: 401, error: 'Unauthorized' }
  const newReading = models.ReadingLists.build({
    ...reading,
    read: reading.read || false,
  })
  const response = await newReading.save({
    validate: true,
    fields: ['userId', 'blogId', 'read'],
  })
  res.status(200).json(response)
})
