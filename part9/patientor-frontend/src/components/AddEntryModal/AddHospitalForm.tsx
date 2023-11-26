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
import { EntryWithoutId, HospitalEntry, Diagnosis } from '../../types'
import DiagnosisService from '../../services/diagnoses'

type HospitalEntryNoID = Omit<HospitalEntry, 'id'>

interface Props {
  onCancel: () => void
  onSubmit: (values: EntryWithoutId) => void
  type: 'Hospital'
}

const AddHospitalForm = ({ onCancel, onSubmit, type }: Props) => {
  const [availableCodes, setAllCodes] = useState<Diagnosis[]>([])
  const [entry, setEntry] = useState<HospitalEntryNoID>({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    type: type,
    discharge: { date: '', criteria: '' },
  })

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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ marginY: 1 }}
            label="Discharge Date"
            value={(entry as HospitalEntry).discharge.date}
            onChange={(newValue) =>
              setEntry((prev) => ({
                ...prev,
                discharge: { criteria: prev.discharge.criteria, date: newValue ? newValue : '' },
              }))
            }
          />
        </LocalizationProvider>
        <TextField
          sx={{ marginY: 1 }}
          label="Critria"
          fullWidth
          value={(entry as HospitalEntry).discharge.criteria}
          onChange={({ target }) =>
            setEntry((prev) => ({
              ...prev,
              discharge: { date: prev.discharge.date, criteria: target.value },
            }))
          }
        />

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

export default AddHospitalForm
