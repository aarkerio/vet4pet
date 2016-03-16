'use strict';

import { REQUEST_POSTS, RECEIVE_APPOS, RECEIVE_ONE_APPO } from '../actions/appos';

const initialState = {
    appoArrayProp: []
};

const appointments_rdcer = (state = initialState, action) => { 
  switch (action.type) {
    case RECEIVE_APPOS:
      return Object.assign({}, state, {
           apposArrayProp: action.apposArrayProp
      });
     
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        inhaber: 'POSTS',  
        didInvalidate: false
      });
  
    case RECEIVE_ONE_APPO:
      return Object.assign({}, state, {
          appoArrayProp: action.appoArrayProp
      });
   
      
    default:
      return state;
  }
};

export default appointments_rdcer;
