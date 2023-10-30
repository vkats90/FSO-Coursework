import { CoursePart, assertNever } from '../types'

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <li>
          <b>
            {part.name} {part.exerciseCount}
          </b>

          {part.description && (
            <div>
              <i>{part.description}</i>
            </div>
          )}
          <br />
        </li>
      )
    case 'group':
      return (
        <li>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>project exercises: {part.groupProjectCount}</div>
          <br />
        </li>
      )
    case 'background':
      return (
        <li>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          {part.description && (
            <div>
              <i>{part.description}</i>
            </div>
          )}
          <div>submit to: {part.backgroundMaterial}</div>
          <br />
        </li>
      )
    case 'special':
      return (
        <li>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          {part.description && (
            <div>
              <i>{part.description}</i>
            </div>
          )}
          <div>required skills: {part.requirements.join(',')}</div>
          <br />
        </li>
      )
    default:
      return assertNever(part)
  }
}

export default Part
