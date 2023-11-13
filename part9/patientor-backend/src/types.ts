export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn?: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>

export type NewPatientEntry = Omit<PatientEntry, 'id'>
