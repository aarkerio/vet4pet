/* ChipotleSoftware (c) 2015-2016 MIT License*/
// import { CALL_API, Schemas } from '../middleware/ApiCalls'
import fetch from 'isomorphic-fetch'

/******  Appos API *********/
export const REQUEST_APPOS   = 'REQUEST_APPOS'
export const SHOW_APPOS      = 'SHOW_APPOS'
export const ADD_APPO        = 'ADD_APPO'
export const RECEIVE_APPOS   = 'RECEIVE_APPOS'
export const SELECT_APPO     = 'SELECT_APPO'
export const INVALIDATE_APPO = 'INVALIDATE_APPO'

export const showAppos = () => {
  return {
    type: SHOW_APPOS,
    apposArrayProp: []
  }
}

export function invalidateAppo(appo) {
  return {
    type: INVALIDATE_APPO,
    appo
  }
}

function receiveAppos(appos, json) {
  console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(json))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp: json
  }
}

function requestAppos(appo_id) {
  return {
    type: REQUEST_APPOS,
    appo_id: appo_id
  }
}

export const fetchAppos = (appo_id) => {
  let appos = []
  let data = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    }
  console.log('in fetchAppos 148')
  return dispatch => {
    // dispatch(requestAppos(appos))
    return fetch('/appointments/get_appos', data)
           .then(response => response.json())
           .then(json => dispatch(receiveAppos(appos, json)))
  }
}

function shouldFetchAppos(state, appo) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchApposIfNeeded(owner_id) {
  return (dispatch, getState) => {
    if (shouldFetchAppos(getState(), owner_id)) {
      return dispatch(fetchPosts(owner))
    }
  }
}

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${login}`,
      schema: Schemas.USER
    }
  }
}

