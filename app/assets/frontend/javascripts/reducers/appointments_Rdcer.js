import { combineReducers } from 'redux'

import { fetchAppos, showAppos, RECEIVE_APPOS } from '../actions/index'

const initialState = {
  apposArrayProp: []
}
// keep it pure
const appointments_Rdcer = (state = initialState, action) => {

  switch (action.type) {
    case RECEIVE_APPOS:
      console.log('I am in RECEIVE_APPOS appointments_Rdcer:  ' + JSON.stringify(action.apposArrayProp))
      return {
               apposArrayProp: action.apposArrayProp
             }

    default:
      return state
  }
}

export default appointments_Rdcer
