import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';

export const RECEIVE_APPOS    = 'RECEIVE_APPOS';
export const RECEIVE_ONE_APPO = 'RECEIVE_ONE_APPO';

export function fetchAppos(appo_id=0) {
  return function (dispatch) {
    console.log('fecthAppos Action appo_id >>>>>' + appo_id);
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
          .then(json => appo_id==0 ? dispatch(receiveAppos(json)) : dispatch(receiveAppo(json)) )
  }
}

function receiveAppos(apposArrayProp) {
  // console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
  }
}

function receiveAppo(appoArrayProp) {
  // console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_ONE_APPO,
    appoArrayProp: appoArrayProp.shift()
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

