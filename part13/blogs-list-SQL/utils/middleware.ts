import logger from './logger'
import { Request, Response, NextFunction } from 'express'

const SECRET: string = process.env.SECRET ? process.env.SECRET : ''

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, _request: Request, response: Response, next: NextFunction) => {
  logger.error(error.name)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.error && error.status) response.status(error.status).json(error)

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
