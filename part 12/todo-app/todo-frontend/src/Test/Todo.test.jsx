import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Todo from '../Todos/Todo'
import React from 'react'

const todo = {
  text: 'A bogus todo',
  done: false,
}

describe('testing the todo component', () => {
  beforeEach(() => {
    render(<Todo todo={todo} />)
  })

  test('the todo component appears and displays the provided text', () => {
    const element = screen.getByText('Name: A bogus todo')
    expect(element).toBeDefined()
  })
})
