import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types'
import patientsData from '../../data/patients'
import { v1 as uuid } from 'uuid'

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const getOnePatient = (patientId: string): PatientEntry | null => {
  let patient = patientsData.filter(({ id }) => id === patientId)[0]
  if (patient && !patient.entries) patient = { ...patient, entries: [] }
  return patient
}

const addNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
  entries,
}: NewPatientEntry): PatientEntry => {
  const id = uuid()
  return { name, dateOfBirth, gender, occupation, ssn, id, entries }
}

export default { getNonSensitivePatients, addNewPatient, getOnePatient }
