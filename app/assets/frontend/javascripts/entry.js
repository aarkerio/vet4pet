import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//import appointmentsApp from './reducers'
import App from './components/App'

let store = createStore(appointmentsApp)

console.log("Webpack works GGGGGGGGGGGGGGGGGGGGGreat!")

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('reactroot')
)

console.log("Webpack worked so nice!")