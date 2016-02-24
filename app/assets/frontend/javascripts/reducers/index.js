import { combineReducers } from 'redux'
import todos from './todos_Rdcer'
import visibilityFilter from './visibilityFilter_Rdcer'
import appointmentsApp from './appointments_Rdcer'
import selectedReddit from './reddit_Rdcer'
import postsByReddit from './posts_Rdcer'


export default function rootReducer(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    appointmentsApp:  appointmentsApp(state.appointmentsApp, action),
    selectedReddit: appointmentsApp(state.appointmentsApp, action),
    postsByReddit: postsByReddit(state.postsByReddit, action),
    selectedReddit: selectedReddit(state.selectedReddit, action)
  }
}
