import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'

import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

store.dispatch({
  type: 'notes/createNote',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 3,
  },
})

store.dispatch({
  type: 'notes/createNote',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 4,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
