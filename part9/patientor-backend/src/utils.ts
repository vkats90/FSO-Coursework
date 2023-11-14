import { NewPatientEntry, Gender, Entry } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (visibility: unknown): Gender => {
  if (!visibility || !isString(visibility) || !isGender(visibility)) {
    throw new Error('Incorrect gender: ' + visibility)
  }
  return visibility
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

function isEntry(entry: unknown): entry is Entry {
  return (
    !!entry &&
    typeof entry === 'object' &&
    'type' in entry &&
    typeof (entry as Entry).type === 'string' &&
    ((entry as Entry).type === 'HealthCheck' ||
      (entry as Entry).type === 'Hospital' ||
      (entry as Entry).type === 'OccupationalHealthcare') &&
    Object.keys(entry as Entry).every((key) =>
      [
        'type',
        'id',
        'description',
        'date',
        'specialist',
        'diagnosisCodes',
        'healthCheckRating',
        'discharge',
        'sickLeave',
        'employerName',
      ].includes(key)
    )
  )
}

const parseEntry = (entries: unknown): Entry[] => {
  if (entries instanceof Array) {
    if (entries.length === 0) return entries
    entries.map((entry) => {
      if (!isEntry(entry)) throw new Error('Incorrect  Entry')
    })
  } else throw new Error('Incorrect Entry')

  return entries
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

export default toNewPatientEntry
