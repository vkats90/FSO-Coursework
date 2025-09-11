import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import middleware from './utils/middleware'
import { blogRouter } from './controllers/blogs'

const app = express()

app.use(express.json())
process.env.NODE_ENV != 'test' && app.use(middleware.requestLogger)
app.use(cors())

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
