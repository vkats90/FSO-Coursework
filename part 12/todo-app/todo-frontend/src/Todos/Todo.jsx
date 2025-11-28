import React from 'react'

const Todo = ({ todo }) => {
  return (
    <>
      <h1>Todo</h1>
      {todo && <p>Name: {todo.text}</p>}
      {todo && <p>Status: {todo.done ? 'This todo is done' : 'This todo is not done'}</p>}
    </>
  )
}

export default Todo
