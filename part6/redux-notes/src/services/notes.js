import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const changeImportance = async (id) => {
  const content = (await axios.get(`${baseUrl}/${id}`)).data
  const object = { ...content, important: content.important ? false : true }
  console.log(object)
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

let exports = { getAll, createNew, changeImportance }
export default exports
