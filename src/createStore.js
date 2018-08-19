import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'

import reducer from './modules'
import runTakeEvery from './sagas/LibraryApi'

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
  sagaMiddleware.run(runTakeEvery)

  return store
}