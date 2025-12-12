import { error } from 'console'
import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import models from '../models'
import middleware from '../utils/middleware'

export const loginRouter = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
  const input = req.body
  if (!input.username || !input.password)
    throw { status: 400, error: 'Missing username or password' }
  const user = await models.User.findOne({ where: { username: input.username } })
  if (!user) throw { status: 401, error: "User doesn't exist" }
  const passCheck = await bcrypt.compare(input.password, user.toJSON().passwordHash)
  if (!passCheck) throw { status: 401, error: 'Wrong Password' }
  const token = jwt.sign(
    { username: user.toJSON().username, id: user.toJSON().id },
    process.env.SECRET as string,
    {
      expiresIn: 60 * 60,
    }
  )
  const session = await models.activeSessions.destroy({ where: { userId: user.toJSON().id } })
  await models.activeSessions.create({ userId: user.toJSON().id, token })

  res.status(200).json({
    token,
    username: user.toJSON().username,
    name: user.toJSON().name,
    id: user.toJSON().id,
  })
})

loginRouter.delete('/', middleware.userExtractor, async (req: Request, res: Response) => {
  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  await models.activeSessions.destroy({ where: { userId: req.user.id } })
})
