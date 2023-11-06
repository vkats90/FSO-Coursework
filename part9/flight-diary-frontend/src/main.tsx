import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MessageContextProvider } from './context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  </React.StrictMode>
)
