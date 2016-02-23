import { combineReducers } from 'redux'
import todos from './todos_Rdcer'
import visibilityFilter from './visibilityFilter_Rdcer'
import appointmentsApp from './appointments_Rdcer'

// const allReducersApp = combineReducers({
//   todos,
//   visibilityFilter,
//   appointmentsApp
// })

// export default allReducersApp

export default function allReducersApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    appointmentsApp: appointmentsApp(state.appointmentsApp, action)
  }
}

