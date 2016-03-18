'use strict';

import { RECEIVE_ONE_APPO } from '../actions/appos';

const initialState = {
   oneAppo: {}
};

const appo_rdcer = (state = initialState, action) => { 
  switch (action.type){
    case RECEIVE_ONE_APPO:
      console.log( 'action.oneAppo at reducer' + JSON.stringify(action.oneAppo));
      return Object.assign({}, state, {
        oneAppo: action.oneAppo
      });
   
    default:
      return state;
  }
};

export default appo_rdcer;
