import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message)
  if (error.name == 'CastId') res.status(400).json({ error: 'Malformated ID' })
  else if (error.name == 'ValidationError') res.status(400).json({ error: error.message })
  else next()
}

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
