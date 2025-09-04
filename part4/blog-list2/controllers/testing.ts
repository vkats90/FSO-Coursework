import { Router, Request, Response } from 'express'
import { Blog } from '../models/blogs'
import { User } from '../models/users'

export const testingRouter = Router()

testingRouter.post('/', async (req: Request, res: Response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
})
