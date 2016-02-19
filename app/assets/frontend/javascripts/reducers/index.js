import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import appointmentsApp from './AppointmentsReducer'

// root reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter,
  appointmentsApp
})

export default todoApp
