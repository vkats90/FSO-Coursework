import axios from 'axios'
import { Person } from '../types'

const baseURL = '/api/persons' //'http://localhost:3001/api/persons'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const addNumber = (newNumber: Person) => {
  return axios.post(baseURL, newNumber).then((response) => response.data)
}

const changeNumber = (changedNumber: Person) => {
  return axios
    .put(baseURL + '/' + changedNumber.id, changedNumber)
    .then((response) => response.data)
}

const deleteNumber = (id: string) => {
  return axios.delete(baseURL + '/' + id).then((response) => response.data)
}

export default { getAll, addNumber, changeNumber, deleteNumber }
