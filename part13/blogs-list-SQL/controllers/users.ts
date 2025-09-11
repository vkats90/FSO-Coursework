import { Router, Request, Response } from 'express'
import models from '../models'
import logger from '../utils/logger'
import bcrypt from 'bcrypt'

export const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await models.User.findAll()
  res.status(200).json(users)
})

userRouter.post('/', async (req: Request, res: Response) => {
  const input = req.body
  if (!input.username || !input.password)
    throw { status: 400, error: 'Missing required fields username or password' }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(input.password, saltRounds)
  const user = models.User.build({ username: input.usename, name: input.name, passwordHash })
  const response = await user.save({ validate: true, fields: ['usename', 'name', 'passwordhash'] })
  res.status(200).json(response)
})

userRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const user = await models.User.findByPk(id)
  if (!user) throw { status: 400, error: "A user with this ID doesn't exist" }
  const saltRounds = 10
  let passwordHash = null
  if (req.body.password) passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  const updatedUser = {
    ...user.toJSON(),
    ...req.body,
    passwordHash: passwordHash ? passwordHash : user.passwordHash,
  }
  await models.User.update(updatedUser, {
    where: { id },
    validate: true,
    fields: ['username', 'name', 'passwordHash'],
  })
  res.status(200).json(updatedUser)
})

userRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const user = await models.User.findByPk(id)
  if (!user) throw { status: 400, error: "A user with this ID doesn't exist" }
  await user.destroy()
  res.status(204).end()
})
