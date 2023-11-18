import express from 'express'
import patientsService from '../services/patientsService'
import toNewPatientEntry from '../utils'
import { EntryWithoutId } from '../types'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients())
})

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body)
    const addedPatient = patientsService.addNewPatient(newPatient)
    res.json(addedPatient)
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

patientRouter.post('/:id/entries', (req, res) => {
  try {
    let entry: EntryWithoutId = req.body
    let addedEntry = patientsService.addNewEntry(entry)
    res.send(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default patientRouter
