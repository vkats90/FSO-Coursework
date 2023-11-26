import { Box, Card, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import PatientCard from './PatientCard'
import patientService from '../../services/patients'
import diagnosesService from '../../services/diagnoses'
import { useEffect, useState } from 'react'
import { Diagnosis, EntryWithoutId, Patient } from '../../types'
import AddEntrytModal from '../AddEntryModal'
import axios from 'axios'

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient | string>('')
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.addEntry(values, (patient as Patient).id)
      if (patient && typeof patient !== 'string')
        setPatient({ ...patient, entries: patient.entries?.concat(entry) })
      setModalOpen(false)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '')
          console.error(message)
          setError(message)
        } else {
          setError('Unrecognized axios error')
        }
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

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
        <Button size="small" sx={{ margin: 1 }} variant="contained" onClick={() => openModal()}>
          New Entry
        </Button>
      </Card>
      <AddEntrytModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </Box>
  )
}

export default SinglePatientPage
