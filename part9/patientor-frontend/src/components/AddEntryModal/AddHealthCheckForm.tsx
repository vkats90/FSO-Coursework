import { useState, SyntheticEvent, useEffect } from 'react'

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
} from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { EntryWithoutId, HealthCheckRating, HealthCheckEntry, Diagnosis } from '../../types'

import DiagnosisService from '../../services/diagnoses'

interface Props {
  onCancel: () => void
  onSubmit: (values: EntryWithoutId) => void
  type: 'HealthCheck'
}

type HealthCheckEntryNoId = Omit<HealthCheckEntry, 'id'>

const AddHealthCheckForm = ({ onCancel, onSubmit, type }: Props) => {
  const [availableCodes, setAllCodes] = useState<Diagnosis[]>([])
  const [entry, setEntry] = useState<HealthCheckEntryNoId>({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    type: type,
    healthCheckRating: 3,
  })

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const dCodes = await DiagnosisService.getAll()
      setAllCodes(dCodes)
    }
    fetchDiagnosisCodes()
  }, [])

  const onRatingChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    event.preventDefault()
    const value = event.target.value as keyof typeof HealthCheckRating
    const healthCheckRatingValue = HealthCheckRating[value]
    if (healthCheckRatingValue !== undefined) {
      // Assuming setEntry follows a pattern like this
      setEntry({ ...entry, healthCheckRating: healthCheckRatingValue })
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    onSubmit(entry)
  }

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

        <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
        <Select
          sx={{ marginY: 1 }}
          label="Health Check Rating"
          fullWidth
          // @ts-ignore: Unreachable code error
          defaultValue={HealthCheckRating[0]}
          onChange={onRatingChange}
        >
          {Object.values(HealthCheckRating)
            .filter((_value, index) => index < 4)
            .map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </Select>

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

export default AddHealthCheckForm
