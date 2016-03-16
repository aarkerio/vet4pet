'use strict';

import { REQUEST_POSTS, RECEIVE_APPOS, RECEIVE_ONE_APPO } from '../actions/appos';

const initialState = {
    owner: 'initial'
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
        didInvalidate: false,
        owner: 'POSTS'
      });
    
    case RECEIVE_ONE_APPO:
      return Object.assign({}, state, {
          owner: action.appoArrayProp.owner
      });

    default:
      return state;
  }
};

export default appointments_rdcer;
