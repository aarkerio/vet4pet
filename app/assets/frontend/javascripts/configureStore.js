import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/index'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  return createStore(
    rootReducer, // loads all my reducers
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}