'use strict';

import { RECEIVE_ONE_APPO,RECEIVE_OWNERS, RECEIVE_DOCTORS, UPDATE_FORM, SET_PETS } from '../actions/appos';

const initialState = {
   oneAppo: {},
   owners_options: [],
   doctors_options: [], 
   pets_options: []
};

const appo_rdcer = (state = initialState, action) => { 
  switch (action.type){
    case RECEIVE_ONE_APPO:
      console.log( 'action.oneAppo at reducer' + JSON.stringify(action.oneAppo));
      return Object.assign({}, state, {
        oneAppo: action.oneAppo
      });
   
    case RECEIVE_OWNERS:
      // console.log('+++++ RECEIVE_OWNERS rdcr >> +++++++>>' + JSON.stringify(action.owners_options));
      return Object.assign({}, state, {
        owners_options: action.owners_options
      });

    case SET_PETS:
      // console.log('+++++ RECEIVE_OWNERS rdcr >> +++++++>>' + JSON.stringify(action.owners_options));
      return Object.assign({}, state, {
        pets_options: action.pets_options
      });
    
    case UPDATE_FORM:
      return Object.assign({}, state);

    default:
      return state;
  }
};

export default appo_rdcer;
