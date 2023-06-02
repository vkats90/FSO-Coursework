import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted for: ${content}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const filter = useSelector((state) => state.filter)
  return (
    <>
      {anecdotes
        .filter((x) => {
          return RegExp(filter, 'i').test(x.content)
        })
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}
export default AnecdoteList
