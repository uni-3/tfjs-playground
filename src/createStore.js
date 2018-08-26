import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'

import reducer from './modules'
import rootSagas from './sagas'
console.log('rootsage', rootSagas)

// create saga middleware
const sagaMiddleware = createSagaMiddleware()

export default function createStore() {
  const store = reduxCreateStore(
    reducer,
    applyMiddleware(
      logger,
      sagaMiddleware
    )
  )
  // run saga
  sagaMiddleware.run(rootSagas)

  return store
}