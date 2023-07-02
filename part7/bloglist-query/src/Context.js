import { useReducer, createContext } from 'react'

const Context = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.payload }
    case 'SET_COLOR':
      return { ...state, color: action.payload }
    default:
      return { message: '', color: 'red' }
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    default:
      return ''
  }
}

export const NotificationContextProvider = (props) => {
  const [message, dispatch] = useReducer(notificationReducer, '')
  const [user, dispatchUser] = useReducer(userReducer, '')

  const setMessage = (message, color) => {
    console.log(message)
    dispatch({ type: 'SET_COLOR', payload: color })
    dispatch({ type: 'SET_MESSAGE', payload: message })
    setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: '' }), 3000)
  }

  const setUser = (newuUser) => {
    dispatchUser({ type: 'SET_USER', payload: newuUser })
  }

  return (
    <Context.Provider value={[message, setMessage, user, setUser]}>
      {props.children}
    </Context.Provider>
  )
}

export default Context
