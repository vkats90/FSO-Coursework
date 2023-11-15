import { Box, Card } from '@mui/material'
import { useParams } from 'react-router-dom'
import PatientCard from './PatientCard'
import patientService from '../../services/patients'
import diagnosesService from '../../services/diagnoses'
import { useEffect, useState } from 'react'
import { Diagnosis, Patient } from '../../types'

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient | string>('')
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  const id = useParams().id || ''

  useEffect(() => {
    const getPatient = async (id: string) => {
      try {
        let result = await patientService.getOne(id)
        let response = await diagnosesService.getAll()
        setPatient(result)
        setDiagnoses(response)
      } catch (error) {
        setPatient('not found')
      }
    }

    getPatient(id)
  }, [])

  if (!patient) return <div>Loading...</div>
  else if (patient === 'not found') return <div>Not Found</div>

  return (
    <Box style={{ margin: '20px' }}>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <PatientCard patient={patient as Patient} diagnoses={diagnoses} />
      </Card>
    </Box>
  )
}

export default SinglePatientPage
