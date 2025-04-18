import express from 'express'
import { Person } from './types'
const morgan = require('morgan')
const PORT = 3001

let db = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
  {
    id: '5',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const app = express()

morgan.token('reqbody', (req: Request) => {
  return req.body ? JSON.stringify(req.body) : ''
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))

app.get('/api/persons', (req, res) => {
  res.json(db)
})

app.get('/api/persons/:id', (req, res) => {
  const person = db.find(({ id }) => id == req.params.id)
  if (person) res.json(person)
  else
    res.status(404).json({
      error: 'person does not exist',
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const person = db.find(({ id }) => id == req.params.id)
  if (!person)
    res.status(404).json({
      error: 'person does not exist',
    })
  else {
    db = db.filter(({ id }) => id != req.params.id)
    res.status(204).end()
  }
})

app.post('/api/persons', (req, res) => {
  if (!req.body || !req.body.name || !req.body.number)
    res.status(400).json({ error: 'Missing fields, fill out all the fields' })
  else if (db.find(({ name }) => name.toLowerCase() === req.body.name.toLowerCase()))
    res.status(500).json({ error: 'Name already exists' })
  else {
    const newPers = { ...req.body, id: Math.floor(Math.random() * 1000).toString() }
    db = [...db, newPers]
    res.json(newPers)
  }
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${db.length} people <br/> ${Date()}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
