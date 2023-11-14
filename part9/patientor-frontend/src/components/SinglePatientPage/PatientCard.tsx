import { Typography, CardContent, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import * as React from 'react'
import { Patient } from '../../types'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import TransgenderIcon from '@mui/icons-material/Transgender'
import AssignmentIcon from '@mui/icons-material/Assignment'

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
      {patient.entries && (
        <div>
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
            Entries:
          </Typography>
          <List>
            {patient.entries.map((e) => (
              <div key={'key-' + e.id}>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={e.date}
                    secondary={
                      <React.Fragment>
                        {e.description}
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                      </React.Fragment>
                    }
                  />
                  <ul>
                    {e.diagnosisCodes?.map((dc) => (
                      <li key={'key-' + dc}>{dc}</li>
                    ))}
                  </ul>
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      )}
    </CardContent>
  </React.Fragment>
)

export default PatientCard
