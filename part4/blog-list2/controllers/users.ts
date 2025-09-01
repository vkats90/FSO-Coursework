import { Router, Request, Response } from 'express'
import { User } from '../models/users'
import bcrypt from 'bcrypt'

export const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.find({}).populate('blogs')

  res.json(users)
})

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const input = req.body
    if (input.username.length < 3) {
      throw { status: 400, message: 'Username is too short' }
    }
    if (input.password.length < 3) {
      throw { status: 400, message: 'Password is too short' }
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(input.password, saltRounds)
    const user = new User({ name: input.name, username: input.username, passwordHash })
    await user.save()

    res.json(user)
  } catch (error: any) {
    if (error.errorResponse?.code == 11000)
      res.status(400).json({ error: 'a User with this name already exists' })
    if (error.status) {
      res.status(error.status).json({ error: error.message })
    }
  }
})

userRouter.put('/:id', async (req: Request, res: Response) => {
  const input = req.body
  if (!req.user || req.user.username != input.username) throw { status: 401, error: 'Unauthorized' }
  if (input.username.length < 3) {
    throw { status: 400, message: 'Username is too short' }
  }
  if (input.password.length < 3) {
    throw { status: 400, message: 'Password is too short' }
  }
  const foundUser = await User.findById(req.params.id)
  console.log(foundUser)
  const user = await User.findByIdAndUpdate(req.params.id, { ...foundUser?.toJSON(), ...req.body })

  res.json(user)
})
