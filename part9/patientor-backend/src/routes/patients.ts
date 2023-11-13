import express from 'express'
import patientsService from '../services/patientsService'
import toNewPatientEntry from '../utils'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients())
})

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedEntry = patientsService.addNewPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

patientRouter.get('/:id', (req, res) => {
  let id = req.params.id
  let patient = patientsService.getOnePatient(id)
  res.send(patient ? patient : 'No patient found')
})

export default patientRouter
