/* ChipotleSoftware (c) 2015-2016 MIT License*/
// import { CALL_API, Schemas } from '../middleware/ApiCalls'
import fetch from 'isomorphic-fetch'

/******  Appos API *********/
// export const REQUEST_APPOS   = 'REQUEST_APPOS'
// export const SHOW_APPOS      = 'SHOW_APPOS'
// export const ADD_APPO        = 'ADD_APPO'
export const RECEIVE_APPOS   = 'RECEIVE_APPOS'
// export const SELECT_APPO     = 'SELECT_APPO'
// export const INVALIDATE_APPO = 'INVALIDATE_APPO'

export function fetchAppos(appo_id) {

  let apposArrayProp = []
  let data = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    }
  console.log('in fetchAppos 148')
  return dispatch => {
    // dispatch(requestAppos(apposArrayProp))
    return fetch('/appointments/get_appos', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(apposArrayProp, json)))
  }
}

function receiveAppos(appos, apposArrayProp) {
  console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
  }
}

// export const showAppos = () => {
//   return {
//     type: SHOW_APPOS,
//     apposArrayProp: []
//   }
// }

// export function invalidateAppo(appo) {
//   return {
//     type: INVALIDATE_APPO,
//     appo
//   }
// }

// function requestAppos(appo_id) {
//   return {
//     type: REQUEST_APPOS,
//     appo_id: appo_id
//   }
// }

// function shouldFetchAppos(state, appo) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export function fetchApposIfNeeded(appo_id) {
//   return (dispatch, getState) => {
//     if (shouldFetchAppos(getState(), appo_id)) {
//       return dispatch(fetchPosts(owner))
//     }
//   }
// }
