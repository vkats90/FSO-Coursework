import express from 'express'
import cors from 'cors'
import router from './routes/diagnoses'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/diagnoses', router)

app.get('/api/ping', (_req, res) => {
  console.log('something is pinging the server')
  res.send('pong')
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
