import logger from './logger'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/users'
import jwt from 'jsonwebtoken'

const SECRET: string = process.env.SECRET ? process.env.SECRET : ''

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const userExtractor = (request: Request, response: Response, next: NextFunction) => {
  let auth = request.get('Authorization')
  if (auth) {
    try {
      auth = auth.replace('Bearer ', '')
      const compare = jwt.verify(auth, SECRET)
      if (compare && typeof compare == 'object')
        request.user = { username: compare.username, id: compare.id }
    } catch (error) {
      next(error)
    }
  }
  next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, _request: Request, response: Response, next: NextFunction) => {
  logger.error(error.name)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.code == 11000) {
    response.status(400).json({ error: 'a User with this name already exists' })
  } else if (error.name == 'JsonWebTokenError') response.status(401).json({ error: 'Unauthorized' })
  else if (error.name == 'TokenExpiredError')
    response.status(401).json({ error: 'Token expired, re-log in' })
  else if (error.error && error.status) response.status(error.status).json(error)

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
}
