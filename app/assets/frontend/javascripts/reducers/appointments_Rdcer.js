import { combineReducers } from 'redux'
import { fetchAppos, showAppos, RECEIVE_APPOS, REQUEST_APPOS,
SHOW_APPOS, ADD_APPO, SELECT_APPO, INVALIDATE_APPO,
 } from '../actions/appos'

const initialState = {
  apposArrayProp: []
}
// keep it pure
const appointments_Rdcer = (state = initialState, action) => {

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

export default appointments_Rdcer
