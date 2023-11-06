import { createContext, useState, ReactNode } from 'react'

interface contextContent {
  message: string
  setMessage: (c: string) => void
  color: 'red' | 'green'
  setColor: (c: 'red' | 'green') => void
}

export const MessageContext = createContext<contextContent>({
  message: '',
  setMessage: () => {},
  color: 'green',
  setColor: () => {},
})

export const MessageContextProvider = ({ children }: { children?: ReactNode }) => {
  const [message, setMessage] = useState('')
  const [color, setColor] = useState<'green' | 'red'>('green')

  return (
    <MessageContext.Provider value={{ message, setMessage, color, setColor }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageContext
