import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types'
import patientsData from '../../data/patients'
import { v1 as uuid } from 'uuid'
//  import { Entry } from '../types'

/*const entryType = (entries:Entry[]) =>{
  entries.map(e=>{
    switch e.
  })
}*/

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
  if (patient && !patient.entries) patient = { ...patient, entries: [] }
  else throw new Error('Not Found')
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
