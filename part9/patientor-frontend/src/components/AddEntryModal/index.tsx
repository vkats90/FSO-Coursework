import { Dialog, DialogTitle, DialogContent, Divider, Alert, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import AddHealthCheckForm from './AddHealthCheckForm'
import AddHospitalForm from './AddHospitalForm'
import AddOccupationalForm from './AddOccupationalForm'
import { EntryWithoutId } from '../../types'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: EntryWithoutId) => void
  error?: string
}

const AddEntrytModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = useState('HealthCheck')
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Select
        label="Health Check Rating"
        sx={{ margin: 1 }}
        value={type}
        onChange={({ target }) => setType(target.value)}
      >
        {['Hospital', 'HealthCheck', 'OccupationalHealthcare'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {type === 'HealthCheck' && (
          <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} type={'HealthCheck'} />
        )}
        {type === 'Hospital' && (
          <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} type={'Hospital'} />
        )}
        {type === 'OccupationalHealthcare' && (
          <AddOccupationalForm
            onSubmit={onSubmit}
            onCancel={onClose}
            type={'OccupationalHealthcare'}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddEntrytModal
