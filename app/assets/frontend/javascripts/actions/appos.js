import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';

export const RECEIVE_APPOS   = 'RECEIVE_APPOS'

export function fetchAppos() {
  return function (dispatch) {
    let data = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': cookie.load('csrftoken')
      }
    }

    return fetch('/appointments/get_appos', data)
            .then(response => response.json())
            .then(json => dispatch(receiveAppos(json)))
  }
}

function receiveAppos(apposArrayProp) {
  // console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
  }
}

export function fetchAppo(appo_id) {
  return function (dispatch) {
    let data = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
         'X-CSRFToken': cookie.load('csrftoken')
      }
    } 
  
  return dispatch => {
    return fetch('/appointments/get_appos', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
   }
  }
}
function removeAppo(appo_id) {
  let data = {
      method: 'GET',
      appoid: appo_id,
      credentials: 'same-origin',
      headers: {
         'X-CSRFToken': Cookies.get('csrftoken')
      }
  };

  return dispatch => {
    return fetch('/appointments/delete_appo', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
  }
}

