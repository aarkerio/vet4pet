import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';
import 'babel-polyfill';

export const RECEIVE_APPOS    = 'RECEIVE_APPOS';
export const RECEIVE_ONE_APPO = 'RECEIVE_ONE_APPO';
export const REMOVE_APPO      = 'REMOVE_APPO';
export const REQUEST_POSTS    = 'REQUEST_POSTS';
export const CREATE_APPO      = 'CREATE_APPO';
export const UPDATED_APPO     = 'UPDATED_APPO';


function requestAppo(appo_id) {
  return {
    type: REQUEST_POSTS,
    appo_id
  }
}

export function fetchAppos() {
    return function (dispatch) {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        appoid: 0  // get all
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken':  cookie.load('csrftoken')
      }
    }
    return fetch('/appointments/get_appos', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveAppos(json)))
  }
};

    
export function getAppo(appo_id=0) {
    return function (dispatch) {
      // dispatch(requestAppo(appo_id));
      console.log('fecthAppo Action appo_id >>>>>' + appo_id);
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          appoid: appo_id
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
        }
      }
      return fetch('/appointments/get_appos', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveAppo(json)));
  }
};
 
export function receiveAppos(apposArrayProp) {
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
  }
};

function receiveAppo(appoObjProp) {
  return {
    type:  RECEIVE_ONE_APPO,
    oneAppo: appoObjProp.shift()
  }
};


export function createAppo(fields) {

  let data = {
      method: 'POST',
      fields: JSON.stringify(fields),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken')
      }
  };
  console.log('Fields create action: ' + JSON.stringify(fields));
  return dispatch => {
    return fetch('/appointments', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
  }
};


export function updateAppo(fields) {
  let data = {
      method: 'PATCH',
      body:  {appointment: JSON.stringify(fields)},
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken':  cookie.load('csrftoken')
      }
  };

  console.log('Fields update PATCH action: ' + JSON.stringify(fields));

  return dispatch => {
    return fetch('/appointments/'+fields['id'], data)
           .then(response => response.json())
           .then(json => dispatch(updatedAppo(json)))
  }
};

function updatedAppo(apposArrayProp) {
  console.log('PARAMS RAILS response: ' + JSON.stringify(apposArrayProp));
  
  return {
    type:  UPDATED_APPO,
    apposArrayProp
  }
};

export function removeAppo(appo_id) {
  let data = {
      method: 'GET',
      appoid: appo_id,
      credentials: 'same-origin',
      headers: {
          'X-CSRFToken': cookie.load('csrftoken')
      }
  };

  return dispatch => {
    return fetch('/appointments/delete_appo', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
  }
};

