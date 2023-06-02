import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}
export default AnecdoteList
