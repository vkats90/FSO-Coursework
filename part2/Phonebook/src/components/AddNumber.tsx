import { FormEvent, useState } from 'react'
import { Person, Message } from '../../types'
import personService from '../../services/persons'

interface PropType {
  persons: Person[]
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>
  notification: (notification: Message) => void
}

const AddNumber = ({ persons, setPersons, notification }: PropType) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handAddName = (event: FormEvent) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() }
    const search = persons.find(({ name }) => name === newName)

    if (search)
      window.confirm('Are you sure you want to update this record?') &&
        personService
          .changeNumber({ ...search, number: newNumber })
          .then((res) => {
            setPersons(persons.map((x) => (x.id === res.id ? res : x)))
            notification({ type: 'success', message: 'Record edited successfully' })
          })
          .catch((_err) => {
            notification({ type: 'error', message: 'This phone number has already been deleted' })
            setPersons(persons.filter((x) => x.id != search.id))
          })
    else {
      personService
        .addNumber(newPerson)
        .then((_res) => notification({ type: 'success', message: 'Record added' }))
        .catch((error) => console.log('error:', error))
      setPersons((prev) => prev.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Add New</h2>
      <form>
        <div>
          name: <input value={newName} onChange={({ target }) => setNewName(target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />
        </div>

        <div>
          <button type="submit" onClick={handAddName}>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNumber
