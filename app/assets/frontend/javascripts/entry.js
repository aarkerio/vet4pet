import 'babel-polyfill'

import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// My App
//import App from './containers/App'  // root container
import App from './containers/App'

import configureStore from './configureStore'

const my_store = configureStore()

// let my_store = createStore(allReducersApp) // load states from reducers to the store
// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = my_store.subscribe(() =>
  console.log(my_store.getState())
)

// binding reducers with the store
// Provider make the store available to all container components in the application without passing it explicitly
// render all the html from React components.
render(
  <Provider store={my_store}>
    <App />
  </Provider>,
  document.getElementById('reactroot')
)