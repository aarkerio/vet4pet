import { combineReducers } from 'redux'
import todos from './todos_Rdcer'
import visibilityFilter from './visibilityFilter_Rdcer'
import appointmentsApp from './appointments_Rdcer'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  appointmentsApp
})

export default todoApp
