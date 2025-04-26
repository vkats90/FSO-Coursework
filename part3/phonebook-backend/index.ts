import express from 'express'
import cors from 'cors'
const morgan = require('morgan')
const PORT = process.env.PORT || 3001
import { getAll, getOne, addOne, deleteOne, info } from './db/services'
import { connect } from './db/connection'
import { errorHandler, unknownEndpoint } from './utils'

connect()

const app = express()

morgan.token('reqbody', (req: Request) => {
  return req.body ? JSON.stringify(req.body) : ''
})

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))

app.get('/api/persons', getAll)

app.get('/api/persons/:id', getOne)

app.delete('/api/persons/:id', deleteOne)

app.post('/api/persons', addOne)

app.put('/api/persons/:id', addOne)

app.get('/info', info)

app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
