import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error.name == 'CastId') res.status(400).json({ error: 'Malformated ID' })
  else next()
}

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
