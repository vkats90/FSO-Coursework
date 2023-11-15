import { Typography, List, ListItem, ListItemText, ListItemIcon, Card } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import { Diagnosis, Entry, HealthCheckRating } from '../../types'
import * as React from 'react'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const EntryCard = ({ diagnoses, entry }: { diagnoses: Diagnosis[]; entry: Entry }) => {
  const borderColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'green'
      case HealthCheckRating.LowRisk:
        return 'blue'
      case HealthCheckRating.HighRisk:
        return 'yellow'
      case HealthCheckRating.CriticalRisk:
        return 'red'
      default:
        return 'black'
    }
  }
  const EntryType = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospitalIcon />
      case 'OccupationalHealthcare':
        return <MedicalServicesIcon />
      case 'HealthCheck':
        return <MonitorHeartIcon />
      default:
        assertNever(entry)
    }
  }
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: entry.type === 'HealthCheck' ? borderColor(entry.healthCheckRating) : '',
        marginBottom: 2,
      }}
    >
      <ListItem>
        <ListItemIcon>{EntryType(entry)}</ListItemIcon>
        <ListItemText
          primary={entry.date}
          secondary={
            <React.Fragment>
              {entry.description}
              <Typography component="span" variant="body2" color="text.primary"></Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {entry.type === 'OccupationalHealthcare' && (
        <ListItem sx={{ paddingY: 0 }}>
          <ListItemText>Employer: {entry.employerName}</ListItemText>
        </ListItem>
      )}

      {entry.diagnosisCodes && (
        <ListItem>
          <List dense={true}>
            {entry.diagnosisCodes?.map((dc) => (
              <ListItem key={'key-' + dc}>
                <ListItemText>
                  {dc} - <i>{diagnoses?.filter((dia): boolean => dia.code === dc)[0].name}</i>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </ListItem>
      )}
      <ListItem>
        <ListItemText>diagnosed by {entry.specialist}</ListItemText>
      </ListItem>
    </Card>
  )
}

export default EntryCard
