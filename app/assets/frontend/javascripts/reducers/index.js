import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import appointmentsApp from './AppointmentsReducer'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  appointmentsApp
})

export default todoApp
