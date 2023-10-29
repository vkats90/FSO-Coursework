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

const addNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: NewPatientEntry): PatientEntry => {
  const id = uuid()
  return { name, dateOfBirth, gender, occupation, ssn, id }
}

export default { getNonSensitivePatients, addNewPatient }
