'use strict';

import { REQUEST_POSTS, RECEIVE_APPOS, RECEIVE_ONE_APPO } from '../actions/appos';

const initialState = {
    inhaber: 'initial'
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
        didInvalidate: false
      });
  
    case RECEIVE_ONE_APPO:
      console.log('RECEIVE_ONE_APPO >> action.appoArrayProp.owner => ' + action.appoArrayProp.owner);  
      return Object.assign({}, state, {
          date: 'dsfdsfdsfdsfdsf', 
          inhaber: action.appoArrayProp.owner
      });
   
      
    default:
      return state;
  }
};

export default appointments_rdcer;
