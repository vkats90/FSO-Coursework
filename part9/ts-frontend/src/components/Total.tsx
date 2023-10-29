interface ContentProps {
  name: string
  exerciseCount: number
}

const Total = ({ parts }: { parts: ContentProps[] }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0)
  return <p>Number of exercises {totalExercises}</p>
}

export default Total
