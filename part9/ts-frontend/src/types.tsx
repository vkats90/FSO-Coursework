interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
  description?: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string
  kind: 'background'
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[]
  kind: 'special'
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}
