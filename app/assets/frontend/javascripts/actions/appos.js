import fetch from 'isomorphic-fetch'

export const RECEIVE_APPOS   = 'RECEIVE_APPOS'

export function fetchAppos() {
  return function (dispatch) {
    let data = {
      method: 'GET',
      credentials: 'same-origin',
      // headers: { return function (dispatch) {
      //    'X-CSRFToken': Cookies.get('csrftoken')
      // }
    };
      let json = [{id: 14, petname: 'Barry', docname: 'R White', reason: 'vaccines', date: 'some date', owner: 'Negro'},
                {id: 17, petname: 'Maclo', docname: 'R Lewis', reason: 'little limping', date: 'some date', owner: 'Leo'},
               ];
    
      dispatch(receiveAppos(json));
  } 
  // return dispatch => {
  //   return fetch('/appointments/get_appos', data)
  //          .then(response => response.json())
  //          .then(json => dispatch(receiveAppos(json)))
  //  }
}

function receiveAppos(apposArrayProp) {
  // console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
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

