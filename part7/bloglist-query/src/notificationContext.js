import { useReducer, createContext } from 'react'

const NotificationContext = createContext()

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

export const NotificationContextProvider = (props) => {
  const [message, dispatch] = useReducer(notificationReducer, '')

  const setMessage = (message, color) => {
    console.log(message)
    dispatch({ type: 'SET_COLOR', payload: color })
    dispatch({ type: 'SET_MESSAGE', payload: message })
    setTimeout(() => dispatch({ type: 'SET_MESSAGE', payload: '' }), 3000)
  }

  return (
    <NotificationContext.Provider value={[message, setMessage]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
