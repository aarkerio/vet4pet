'use strict';

import { RECEIVE_ONE_APPO } from '../actions/appos';

const initialState = {
   eigentumer:  'initial'
};

const appo_rdcer = (state = initialState, action) => { 
  switch (action.type){
    case RECEIVE_ONE_APPO:
      return Object.assign({}, state, {
        appo: action.appo
      });
   
    default:
      return state;
  }
};

export default appo_rdcer;
