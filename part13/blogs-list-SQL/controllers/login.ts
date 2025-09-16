import { error } from 'console'
import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import models from '../models'
import logger from '../utils/logger'

export const loginRouter = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
  const input = req.body
  if (!input.username || !input.password)
    throw { status: 400, error: 'Missing username or password' }
  const user = await models.User.findOne({ where: { username: input.username } })
  if (!user) throw { status: 401, error: "User doesn't exist" }
  await bcrypt.compare(input.password, user.toJSON().passwordHash)
  const token = jwt.sign(
    { username: user.toJSON().username, id: user.toJSON().id },
    process.env.SECRET as string,
    {
      expiresIn: 60 * 60,
    }
  )
  res
    .status(200)
    .json({
      token,
      username: user.toJSON().username,
      name: user.toJSON().name,
      id: user.toJSON().id,
    })
})
