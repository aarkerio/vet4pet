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

// binding reducers with the store
// Provider make the store available to all container components in the application without passing it explicitly
// render all the html from React components.
render(
  <Provider store={my_store}>
    <App />
  </Provider>,
  document.getElementById('reactroot')
)