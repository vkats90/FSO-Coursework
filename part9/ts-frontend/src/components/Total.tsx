import { CoursePart } from '../types'

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0)
  return <p>Number of exercises {totalExercises}</p>
}

export default Total
