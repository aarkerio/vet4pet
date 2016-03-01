import { combineReducers } from 'redux'
import appointments_rdcer from './appointments_Rdcer'

export default function rootReducer(state = {}, action) {
  return {
    appointments_rdcer: appointments_rdcer(state.appointments_rdcer, action)
  }
}
