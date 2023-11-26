import { useState, SyntheticEvent, useEffect } from 'react'

import {
  TextField,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
} from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { EntryWithoutId, OccupationalHealthcareEntry, Diagnosis } from '../../types'
import DiagnosisService from '../../services/diagnoses'

interface Props {
  onCancel: () => void
  onSubmit: (values: EntryWithoutId) => void
  type: 'OccupationalHealthcare'
}

type OccupationalHealthcareNoId = Omit<OccupationalHealthcareEntry, 'id'>

const AddOccupationalForm = ({ onCancel, onSubmit, type }: Props) => {
  const [availableCodes, setAllCodes] = useState<Diagnosis[]>([])
  const [entry, setEntry] = useState<OccupationalHealthcareNoId>({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    type: type,
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
  })

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    onSubmit(entry)
  }

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const dCodes = await DiagnosisService.getAll()
      setAllCodes(dCodes)
    }
    fetchDiagnosisCodes()
  }, [])

  const handleChecked = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    if (target.nodeName === 'INPUT' && target.type === 'checkbox') {
      if (target.checked) {
        setEntry({
          ...entry,
          diagnosisCodes: entry.diagnosisCodes?.concat(target.name),
        })
      } else {
        setEntry({
          ...entry,
          diagnosisCodes: entry.diagnosisCodes?.filter((c) => c !== target.name),
        })
      }
    }
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ marginY: 1 }}
            label="Date"
            value={entry.date}
            onChange={(newValue) => setEntry((prev) => ({ ...prev, date: newValue as string }))}
          />
        </LocalizationProvider>
        <TextField
          sx={{ marginY: 1 }}
          label="Specialist"
          fullWidth
          value={entry.specialist}
          onChange={({ target }) => setEntry((prev) => ({ ...prev, specialist: target.value }))}
        />
        <TextField
          sx={{ marginY: 1 }}
          label="Description"
          fullWidth
          value={entry.description}
          onChange={({ target }) => setEntry((prev) => ({ ...prev, description: target.value }))}
        />
        {availableCodes && (
          <FormControl>
            <FormLabel>Diagnosis Codes</FormLabel>
            <FormGroup row>
              {availableCodes.map((e) => (
                <FormControlLabel
                  key={e.code}
                  sx={{ margin: 0 }}
                  control={<Checkbox name={e.code} onChange={handleChecked} />}
                  label={e.code}
                />
              ))}
            </FormGroup>
          </FormControl>
        )}

        <TextField
          sx={{ marginY: 1 }}
          label="Employer Name"
          fullWidth
          value={(entry as OccupationalHealthcareEntry).employerName}
          onChange={({ target }) => setEntry((prev) => ({ ...prev, employerName: target.value }))}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ marginY: 1 }}
            label="Sick Leave Start Date"
            value={entry.sickLeave?.startDate}
            onChange={(newValue) =>
              setEntry((prev) => ({
                ...prev,
                discharge: { endDate: prev.sickLeave?.endDate, startDate: newValue },
              }))
            }
          />
          <DatePicker
            sx={{ marginY: 1 }}
            label="Sick Leave End Date"
            value={(entry as OccupationalHealthcareEntry).sickLeave?.endDate}
            onChange={(newValue) =>
              setEntry((prev) => ({
                ...prev,
                discharge: { startDate: prev.sickLeave?.endDate, endDate: newValue },
              }))
            }
          />
        </LocalizationProvider>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddOccupationalForm
