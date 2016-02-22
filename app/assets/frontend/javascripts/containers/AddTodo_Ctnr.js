import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>in container addTodo <br />
      <input ref={node => { input = node }} />
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Aufgabe hinzufügen
      </button>
    </div>
  )
}
AddTodo = connect()(AddTodo) // connect react with redux

export default AddTodo
