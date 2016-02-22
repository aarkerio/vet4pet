import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// My App
import todoApp from './reducers'
import App from './containers/App'  // root container

let my_store = createStore(todoApp)

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = my_store.subscribe(() =>
  console.log(my_store.getState())
)

// binding reducers with the store
// Provider make the store available to all container components in the application without passing it explicitly
render(
  <Provider store={my_store}>
    <App />
  </Provider>,
  document.getElementById('reactroot')
)