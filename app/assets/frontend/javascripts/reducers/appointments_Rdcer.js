import { combineReducers } from 'redux'

import { fetchAppos, showAppos } from '../actions/index'

const initialState = {
  apposArrayProp: []
}
// keep it pure
const appointments_Rdcer = (state = initialState, action) => {

  switch (action.type) {
    case 'RECEIVE_APPOS':
      return [
        ...state,
        Object.assign({}, state, {
            state: action.apposArrayProp
        })
      ]
      // return {
      //           apposArrayProp: action.apposArrayProp
      //         }

    // case types.SHOW_OWNER_LIST:
    //    return Object.assign({}, state, {
    //      appointmentsById: mapValues(state.appointmentsById, (friend) => {
    //        return friend.id === action.id ?
    //          assign({}, friend, { starred: !friend.starred }) :
      //          friend
      //      })
      //    })
      console.log('dsgdfsgdfgdfg dfg dfgXXXXXXXXXXXXXXXXXX')
    default:
      return state
  }
}

export default appointments_Rdcer
