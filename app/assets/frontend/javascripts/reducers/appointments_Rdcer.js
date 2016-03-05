'use strict';

import { fetchAppos, RECEIVE_APPOS } from '../actions/appos';

const initialState = {
  apposArrayProp: []
};
const appointments_rdcer = (state = initialState, action) => {
  console.log('RECEIVE_APPOS REDUCER >>>' + JSON.stringify(state));
  switch (action.type) {
    case RECEIVE_APPOS:
      return Object.assign({}, state, {
                apposArrayProp: action.apposArrayProp
            })

    default:
      return state;
  }
};

export default appointments_rdcer;
