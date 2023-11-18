import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
  Entry,
  EntryWithoutId,
} from '../types'
import patientsData from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { isEntry } from '../utils'

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }
  })
}

const getOnePatient = (patientId: string): PatientEntry | null => {
  let patient = patientsData.filter(({ id }) => id === patientId)[0]
  if (!patient) throw new Error('Patient Not Found')
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

const addNewEntry = (entry: EntryWithoutId): Entry => {
  const id = uuid()
  return isEntry({ ...entry, id })
}

export default { getNonSensitivePatients, addNewPatient, getOnePatient, addNewEntry }
