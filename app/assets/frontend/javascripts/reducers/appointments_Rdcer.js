import { combineReducers } from 'redux'

import { fetchAppos, RECEIVE_APPOS } from '../actions/appos'

const initialState = {
  apposArrayProp: []
}
const appointments_rdcer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_APPOS:
      console.log('RECEIVE_APPOS REDUCER >>>' + JSON.stringify(action.apposArrayProp))
      return Object.assign({}, state, {
                apposArrayProp: action.apposArrayProp
            })

    default:
      return state
  }
}

export default appointments_rdcer
