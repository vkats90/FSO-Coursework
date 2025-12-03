import { Router, Request, Response } from 'express'
import models from '../models'
import bcrypt from 'bcrypt'
import middleware from '../utils/middleware'
import { Op } from 'sequelize'

export const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await models.User.findAll({
    include: [
      {
        model: models.Blog,
      },
      {
        model: models.Blog,
        as: 'readings',
        through: {
          attributes: [],
        },
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      },
    ],
  })
  res.status(200).json(users)
})

userRouter.get('/:id', async (req: Request, res: Response) => {
  const read = req.query.read
  let where = {}
  if (read) where = { read }
  const users = await models.User.findByPk(req.params.id, {
    include: [
      {
        model: models.Blog,
      },
      {
        model: models.Blog,
        as: 'readings',
        through: {
          attributes: [],
        },
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },

        include: [
          {
            model: models.ReadingLists,
            attributes: ['id', 'read'],
            where,
          },
        ],
      },
    ],
  })
  res.status(200).json(users)
})

userRouter.post('/', async (req: Request, res: Response) => {
  const input = req.body
  if (!input.username || !input.password)
    throw { status: 400, error: 'Missing required fields username or password' }
  if (
    !String(input.username)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    throw { status: 400, error: 'Username must be an email' }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(input.password, saltRounds)
  const user = models.User.build({
    username: input.username,
    name: input.name,
    passwordHash,
    disabled: false,
  })
  const response = await user.save({
    validate: true,
    fields: ['username', 'name', 'passwordHash', 'createdAt', 'updatedAt'],
  })
  res.status(201).json(response)
})

userRouter.put('/:id', middleware.userExtractor, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  const user = await models.User.findByPk(id)
  if (!user) throw { status: 400, error: "A user with this ID doesn't exist" }
  if (user.toJSON().id != req.user.id) throw { status: 401, error: 'Unauthorized' }
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

userRouter.delete('/:id', middleware.userExtractor, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!req.user) throw { status: 401, error: 'Unauthorized' }
  const user = await models.User.findByPk(id)
  if (!user) throw { status: 400, error: "A user with this ID doesn't exist" }
  if (user.toJSON().id != req.user.id) throw { status: 401, error: 'Unauthorized' }
  const session = await models.activeSessions.findOne({ where: { userId: user.toJSON().id } })
  await session?.destroy()
  await user.destroy()
  res.status(204).end()
})
