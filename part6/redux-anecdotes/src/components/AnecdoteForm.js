import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import noteServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newAnecdote = await noteServices.createAnecdote(event.target.anecdote.value)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`Added note: ${event.target.anecdote.value}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
    event.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
