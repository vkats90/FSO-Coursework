import { Router, Request, Response } from 'express'
import middleware from '../utils/middleware'
import models from '../models'
import type { ReadingLists } from '../models/readingLists'

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

readingsRouter.put('/:id', middleware.userExtractor, async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body

  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  let reading = await models.ReadingLists.findByPk(id)
  if (!reading) throw { status: 400, error: "A list with this ID doesn't exist" }

  reading = reading.toJSON()

  if ((reading as ReadingLists).userId != req.user.id) throw { status: 401, error: 'Unauthorized' }

  const response = models.ReadingLists.update({ read: body.read }, { where: { id } })
  res.sendStatus(204)
})
