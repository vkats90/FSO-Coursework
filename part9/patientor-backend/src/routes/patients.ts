import express from 'express'
import patientsService from '../services/patientsService'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients())
})

export default patientRouter
