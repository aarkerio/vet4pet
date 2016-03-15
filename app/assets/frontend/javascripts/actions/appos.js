import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';
import 'babel-polyfill';

export const RECEIVE_APPOS    = 'RECEIVE_APPOS';
export const RECEIVE_ONE_APPO = 'RECEIVE_ONE_APPO';
export const REMOVE_APPO      = 'REMOVE_APPO';
export const REQUEST_POSTS    = 'REQUEST_POSTS';

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function fetchPosts(subreddit) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPosts(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receivePosts(subreddit, json))
      )
      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

function requestAppo(appo_id) {
  return {
    type: REQUEST_POSTS,
    appo_id
  }
}

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
          .then(json => dispatch(receiveAppos(json)))
  }
};

    
export function fetchAppo(appo_id=0) {
    return function (dispatch) {
      dispatch(requestAppo(appo_id));
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
          .then(json => dispatch(receiveAppo(json)))
  }
};
    
export function receiveAppos(apposArrayProp) {
  // console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_APPOS,
    apposArrayProp
  }
};

function receiveAppo(appoArrayProp) {
  // console.log(' receiveAppos Action JJJ>>>>>' + JSON.stringify(apposArrayProp))
  return {
    type:  RECEIVE_ONE_APPO,
    appoArrayProp: appoArrayProp.shift()
  }
};

export function removeAppo(appo_id) {
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
};

