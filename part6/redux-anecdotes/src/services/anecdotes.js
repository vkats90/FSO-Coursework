import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl)
  return anecdotes.data
}
const createAnecdote = async (content) => {
  const object = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const anecdoteVote = async (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return response.data
}

const exports = { getAll, createAnecdote, anecdoteVote }
export default exports
