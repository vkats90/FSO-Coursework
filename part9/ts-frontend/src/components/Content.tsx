import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <ul>
      {parts &&
        parts.map((part) => {
          return <Part part={part} />
        })}
    </ul>
  )
}

export default Content
