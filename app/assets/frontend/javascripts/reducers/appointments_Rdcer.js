'use strict';

import { fetchAppos, RECEIVE_APPOS, RECEIVE_ONE_APPO } from '../actions/appos';

const initialState = {
  apposArrayProp: []
};
const appointments_rdcer = (state = initialState, action) => {
  console.log('RECEIVE_APPOS REDUCER >>>' + JSON.stringify(state));
  switch (action.type) {
    case RECEIVE_APPOS:
      return Object.assign({}, state, {
                apposArrayProp: action.apposArrayProp
      });
      
    case RECEIVE_ONE_APPO:
      console.log('RECEIVE_ONE_APPO reducer >>>' + JSON.stringify(action.appoArrayProp.owner));
      return Object.assign({}, state, {
        owner:  action.appoArrayProp.owner
        //date:    action.appoArrayProp.date,
        // petname: action.appoArrayProp.petname,
        // reason:  action.appoArrayProp.reason,
        // docname: action.appoArrayProp.docname
      });

    default:
      return state;
  }
};

export default appointments_rdcer;
