import { Person, Message } from '../../types'
import personService from '../../services/persons'

interface PropType {
  persons: Person[]
  filter: string
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>
  notification: (notification: Message) => void
}

const Numbers = ({ persons, filter, setPersons, notification }: PropType) => {
  const handleDelete = (id: string) => {
    window.confirm('Are you sure you want to delete this record?')
      ? personService
          .deleteNumber(id)
          .then((res: Person) => {
            notification({ type: 'success', message: 'Record deleted successfully' })
            setPersons(persons.filter((x) => x.id != res.id))
          })
          .catch((_error) => {
            notification({ type: 'error', message: 'This phone number has already been deleted' })
            setPersons(persons.filter((x) => x.id != id))
          })
      : ''
  }
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((record, i) => {
          if (
            (filter && record.name.toLowerCase().includes(filter.toLowerCase())) ||
            (filter && record.number.toLowerCase().includes(filter.toLowerCase())) ||
            !filter
          )
            return (
              <li key={'person' + i}>
                {record.name} {record.number}{' '}
                <button onClick={() => handleDelete(record.id)}>delete</button>
              </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Numbers
