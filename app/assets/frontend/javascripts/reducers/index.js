import { combineReducers } from 'redux'
import todos from './todos_Rdcer'
import visibilityFilter from './visibilityFilter_Rdcer'
import appointmentsApp from './appointments_Rdcer'
import redditReducer from './reddit_Rdcer'

export default function rootReducer(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    appointmentsApp:  appointmentsApp(state.appointmentsApp, action),
    redditReducer:    redditReducer(state.redditReducer, action)
  }
}

