const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'
import axios from 'axios'

export const getAll = () => {
  return axios
    .get(baseURL + 'all')
    .then((res) => res.data)
    .catch((err) => console.log('error:', err))
}

export const getOne = (name: string) => {
  return axios
    .get(baseURL + 'name/' + name)
    .then((res) => res.data)
    .catch((err) => console.log('error:', err))
}
