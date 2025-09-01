import { Router, Request, Response } from 'express'
import { User } from '../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserType } from '../types'

const SECRET: string = process.env.SECRET ? process.env.SECRET : ''
export const loginRouter = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
  const credentials = req.body
  const user: (UserType & { _id: string }) | null = await User.findOne({
    username: credentials.username,
  })
  if (!user) throw { status: 400, error: "A user with this username doesn't exist" }
  else {
    const compare = await bcrypt.compare(credentials.password, user.passwordHash)
    if (compare) {
      const token = jwt.sign({ username: user.username, id: user._id }, SECRET, {
        expiresIn: 60 * 60,
      })
      res.status(200).json({ token, username: user.username, name: user.name })
    } else throw { status: 400, error: 'password is incorrect' }
  }
})
