import { Box, Card } from '@mui/material'
import { useParams } from 'react-router-dom'
import PatientCard from './PatientCard'
import patientService from '../../services/patients'
import { useEffect, useState } from 'react'
import { Patient } from '../../types'

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient | string>('')

  const id = useParams().id || ''

  useEffect(() => {
    const getPatient = async (id: string) => {
      try {
        let result = await patientService.getOne(id)
        setPatient(result)
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
      <Card variant="outlined" sx={{ maxWidth: 400 }}>
        <PatientCard patient={patient as Patient} />
      </Card>
    </Box>
  )
}

export default SinglePatientPage
