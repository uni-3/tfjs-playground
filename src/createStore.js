import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'

import reducer from './modules'
import runSearchEvery from './sagas/LibraryApi'
import runTextParseEvery from './sagas/NlpApi'

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
  sagaMiddleware.run(runSearchEvery)
  sagaMiddleware.run(runTextParseEvery)

  return store
}