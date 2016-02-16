import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// My App
import todoApp from './reducers'
import App from './components/App'

let my_store = createStore(todoApp)

render(
  <Provider store={my_store}>
    <App />
  </Provider>,
  document.getElementById('reactroot')
)