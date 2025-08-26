import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import { blogRouter } from './controllers/blogs'
import { userRouter } from './controllers/users'
import { loginRouter } from './controllers/login'
import middleware from './utils/middleware'
import logger from './utils/logger'

const app = express()

const MONGODB_URI =
  process.env.NODE_ENV == 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI || '')
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
process.env.NODE_ENV != 'test' && app.use(middleware.requestLogger)
app.use(cors())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
