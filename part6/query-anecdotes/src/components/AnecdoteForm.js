import { addAnecdote } from "../requests"
import { useMutation, useQueryClient } from "react-query"
import { useContext } from "react"
import notificationContext from "../notificationContext"

const AnecdoteForm = () => {
	const [message, dispatch] = useContext(notificationContext)
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(addAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes")
			queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
			dispatch({
				type: "SET_NOTIFICATION",
				payload: `Added Anecdote: ${newAnecdote.content} `,
			})
			setTimeout(
				() =>
					dispatch({
						type: "CLEAR_STATE",
					}),
				5000
			)
		},
		onError: (data) => {
			dispatch({
				type: "SET_NOTIFICATION",
				payload: data.response.data.error,
			})
			setTimeout(
				() =>
					dispatch({
						type: "CLEAR_STATE",
					}),
				5000
			)
		},
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		newAnecdoteMutation.mutate({ content, votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
