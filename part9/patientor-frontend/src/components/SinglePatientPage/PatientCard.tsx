import { Typography, CardContent } from '@mui/material'
import * as React from 'react'
import { Patient } from '../../types'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import TransgenderIcon from '@mui/icons-material/Transgender'

const PatientCard = ({ patient }: { patient: Patient }) => (
  <React.Fragment>
    <CardContent>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
        {patient.name}
        <span>
          {patient.gender === 'male' ? (
            <MaleIcon fontSize="inherit" />
          ) : patient.gender === 'female' ? (
            <FemaleIcon fontSize="inherit" />
          ) : (
            <TransgenderIcon fontSize="inherit" />
          )}
        </span>
      </Typography>
      <Typography variant="body2">
        <b>Date of Birth:</b> {patient.dateOfBirth}
        <br />
        <b>Occupation:</b> {patient.occupation}
        <br />
        <b>SSN:</b> {patient.ssn}
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
)

export default PatientCard
