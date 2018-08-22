// reducers/index.js
//ここで全てのreducerをimportする
import counter from './Counter'
import libraryApi from './LibraryApi'
import nlpApi from './NlpApi'
 
//複数reducerをimportした場合には、combineReducerでまとめる
 import { combineReducers } from 'redux'
 
const main = combineReducers({
  counter,
  libraryApi,
  nlpApi
})
 
export default main