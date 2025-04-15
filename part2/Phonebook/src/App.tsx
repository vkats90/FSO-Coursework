import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import AddNumber from './components/AddNumber'
import { Person, Message } from '../types'

import personService from '../services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [filter, setFilter] = useState('')
  const [notify, setNotify] = useState<Message>({ type: 'success', message: '' })

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data))
  }, [])

  const handleNotify = (notification: Message) => {
    console.log(notification)
    setNotify(notification)
    setTimeout(() => setNotify({ ...notify, message: '' }), 5000)
  }

  return (
    <div>
      <Notification notification={notify} />
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <AddNumber persons={persons} setPersons={setPersons} notification={handleNotify} />
      <Numbers
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        notification={handleNotify}
      />
    </div>
  )
}

export default App
