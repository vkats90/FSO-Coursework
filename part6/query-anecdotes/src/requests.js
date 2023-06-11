import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = () => axios.get(baseUrl).then((res) => res.data)

export const addAnecdote = (anecdote) =>
	axios.post(baseUrl, anecdote).then((res) => res.data)

export const addVote = (anecdote) =>
	axios
		.put(`${baseUrl}/${anecdote.id}`, {
			...anecdote,
			votes: anecdote.votes + 1,
		})
		.then((res) => res.data)
