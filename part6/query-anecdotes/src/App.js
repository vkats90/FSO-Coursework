import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAll, addVote } from "./requests"
import { useContext } from "react"
import notificationContext from "./notificationContext"

const App = () => {
	const [message, dispatch] = useContext(notificationContext)
	const queryClient = useQueryClient()

	const newVoteMutation = useMutation(addVote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes")
			queryClient.setQueryData(
				"anecdotes",
				anecdotes.map((entry) => {
					if (entry.id === newAnecdote.id) entry = newAnecdote
					return entry
				})
			)
		},
	})

	const handleVote = (anecdote) => {
		newVoteMutation.mutate(anecdote)
		dispatch({
			type: "SET_NOTIFICATION",
			payload: `Voted for anecdote: ${anecdote.content} `,
		})
		setTimeout(
			() =>
				dispatch({
					type: "CLEAR_STATE",
				}),
			5000
		)
	}

	const result = useQuery("anecdotes", getAll, {
		refetchOnWindowFocus: false,
		retry: 1,
	})

	if (result.isLoading) return <div>Loading..</div>

	if (result.isError)
		return <div>Couldn't load data due to error: {result.error.message}</div>

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
