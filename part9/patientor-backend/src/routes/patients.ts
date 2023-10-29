import express from 'express'
import patientsService from '../services/patientsService'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients())
})

patientRouter.post('/', (req, res) => {
  const newPatient = patientsService.addNewPatient(req.body)
  res.status(201).json(newPatient)
})

export default patientRouter
