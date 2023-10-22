import diagnosisData from '../../data/diagnoses'
import { Diagnosis } from '../types'

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData
}

export default { getDiagnoses }
