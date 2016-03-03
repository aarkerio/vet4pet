import 'babel-polyfill'

import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import ApposComponent from './containers/Appos_Ctnr'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// My App
//import App from './containers/App'  // root container
import App from './containers/App'

import configureStore from './configureStore'

const my_store = configureStore()

const history = syncHistoryWithStore(browserHistory, my_store)

render(
  <Provider store={my_store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/appointments" component={ApposComponent}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
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