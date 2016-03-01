import fetch from 'isomorphic-fetch'

export const RECEIVE_APPOS   = 'RECEIVE_APPOS'

export function fetchAppos() {
  var cookies = new Cookies();
  let data = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
         'X-CSRFToken': Cookies.get('csrftoken')
      }
    }
  console.log('in fetchAppos 148')
  return dispatch => {
    return fetch('/appointments/get_appos', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(json)))
  }
}

function receiveAppos(apposArrayProp) {
  console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
  }
}
