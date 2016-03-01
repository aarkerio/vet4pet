import fetch from 'isomorphic-fetch'
// import Cookies from 'cookies'
var Cookies = require( "cookies" );

export const RECEIVE_APPOS   = 'RECEIVE_APPOS'

export function fetchAppos() {
  var cookies = new Cookies();
  let data = {
      method: 'GET',
      credentials: 'same-origin',
      // headers: {
      //   'X-CSRFToken': cookies.get('csrftoken')
      // }
    }
  console.log('in fetchAppos 148')
  return dispatch => {
    return fetch('http://jsonplaceholder.typicode.com/posts', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
  }
}

function receiveAppos(apposArrayProp) {
  console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp: apposArrayProp
  }
}
