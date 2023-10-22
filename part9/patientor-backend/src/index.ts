import express from 'express'
import cors from 'cors'
import diagnosesRouter from './routes/diagnoses'
import patientRouter from './routes/patients'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.get('/api/ping', (_req, res) => {
  console.log('something is pinging the server')
  res.send('pong')
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
