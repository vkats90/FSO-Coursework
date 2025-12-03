import logger from './logger'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import models from '../models'
import { activeSessions } from '../models/activeSessions'

const SECRET: string = process.env.SECRET ? process.env.SECRET : ''

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const userExtractor = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.get('Authorization')) throw { status: 401, error: 'Unauthorized' }
  const token = req.get('Authorization')?.replace('Bearer ', '')
  const user = jwt.verify(token ? token : '', process.env.SECRET as string)
  if (!user || typeof user != 'object') throw { status: 401, error: 'Unauthorized' }

  let session = await activeSessions.findOne({ where: { userId: user.id } })
  if (!session || session.toJSON().token != token) throw { status: 401, error: 'Unauthorized' }
  let disabled = await models.User.findByPk(user.id)
  if (!disabled || disabled.toJSON().disabled) throw { status: 401, error: 'Unauthorized' }

  req.user = { username: user.username, id: user.id }

  next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, _request: Request, response: Response, next: NextFunction) => {
  logger.error(error)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.message?.includes('invalid input')) {
    response.status(400).json({ error: 'One of the fields has a invalid type' })
  } else if (error.name?.includes('SequelizeUniqueConstraintError')) {
    response.status(400).json({ error: 'Username must be unique' })
  } else if (error.error && error.status) response.status(error.status).json(error)

  next(error)
}

export default {
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
