import { NonSensitivePatientEntry } from '../types'
import patientsData from '../../data/patients'

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

export default { getNonSensitivePatients }
