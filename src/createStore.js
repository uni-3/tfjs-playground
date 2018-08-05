import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import counterReducer from './modules/Counter';

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      counter: counterReducer,
    }),
    applyMiddleware(
      logger,
    )
  )

  return store
}