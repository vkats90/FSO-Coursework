import {
  NewPatientEntry,
  Gender,
  Entry,
  Diagnosis,
  HealthCheckRating,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from './types'
import diagnosisData from '../data/diagnoses'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender)
  }
  return gender
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }

  return name
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }

  return occupation
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN')
  }

  return ssn
}

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      gender: parseGender(object.gender),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      occupation: parseOccupation(object.occupation),
      entries: parseEntry(object.entries),
    }

    return newEntry
  }

  throw new Error('Incorrect data: some fields are missing')
}

// anything below here deals with entries

const parseSickLeave = (object: unknown): { startDate: string; endDate: string } => {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect or missing sick leave')
  }
  if (!isDate(object.startDate as string) || !isDate(object.endDate as string))
    throw new Error('Incorrect or missing sick leave')

  return object as { startDate: string; endDate: string }
}

const parseDischarge = (object: unknown): { date: string; criteria: string } => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    // we will just trust the data to be in correct form
    throw new Error('Incorrect or missing discharge')
  }
  if (!isString(object.criteria) || !isDate(object.date as string))
    throw new Error('Incorrect or missing dates in discharge')

  return object as { date: string; criteria: string }
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>
  }
  let diagnosisCodes = diagnosisData.map((e) => e.code)
  ;(object.diagnosisCodes as string[]).map((d: string) => {
    if (!diagnosisCodes.includes(d)) throw new Error('Diagnosis code does not exist')
  })

  return object.diagnosisCodes as Array<Diagnosis['code']>
}

const parseType = (type: unknown): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (!type || isString(type)) {
    if (!['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type as string))
      throw new Error('Type of health check does not exist')
    throw new Error('Incorrect or missing type')
  }
  return type as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'
}

const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Incorrect or missing field')
  }

  return value
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== 'number' || !Object.values(HealthCheckRating).includes(rating as number)) {
    throw new Error('Incorrect health check rating: ' + rating)
  }
  return rating as HealthCheckRating
}

export function isEntry(entry: unknown): Entry {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing data')
  }
  parseType(entry)
  if (
    'type' in entry &&
    'id' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'description' in entry &&
    'healthCheckRating' in entry
  )
    return <HealthCheckEntry>{
      type: 'HealthCheck',
      id: parseString(entry.id),
      date: parseDate(entry.date),
      specialist: parseString(entry.specialist),
      description: parseString(entry.description),
      diagnosisCodes: parseDiagnosisCodes(entry),
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    }
  else if (
    'type' in entry &&
    'id' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'description' in entry
  )
    return <HealthCheckEntry>{
      type: 'HealthCheck',
      id: parseString(entry.id),
      date: parseDate(entry.date),
      specialist: parseString(entry.specialist),
      description: parseString(entry.description),
      diagnosisCodes: parseDiagnosisCodes(entry),
    }
  else if (
    'type' in entry &&
    'id' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'description' in entry &&
    'discharge' in entry
  )
    return <HospitalEntry>{
      type: 'Hospital',
      id: parseString(entry.id),
      date: parseDate(entry.date),
      specialist: parseString(entry.specialist),
      description: parseString(entry.description),
      diagnosisCodes: parseDiagnosisCodes(entry),
      discharge: parseDischarge(entry.discharge),
    }
  else if (
    'type' in entry &&
    'id' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'description' in entry &&
    'employerName' in entry &&
    'sickLeave' in entry
  )
    return <OccupationalHealthcareEntry>{
      type: 'OccupationalHealthcare',
      id: parseString(entry.id),
      date: parseDate(entry.date),
      specialist: parseString(entry.specialist),
      description: parseString(entry.description),
      diagnosisCodes: parseDiagnosisCodes(entry),
      employerName: parseString(entry.employerName),
      sickLeave: parseSickLeave(entry.sickLeave),
    }
  else throw new Error('Bad entry')
}

export const parseEntry = (entries: unknown): Entry[] => {
  if (entries instanceof Array) {
    if (entries.length === 0) return entries
    entries.map((entry) => {
      isEntry(entry)
    })
  } else throw new Error('Incorrect Entry')

  return entries
}

export default toNewPatientEntry
