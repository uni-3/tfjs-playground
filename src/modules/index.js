// reducers/index.js
//ここで全てのreducerをimportする
import counter from './Counter'
import libraryApi from './LibraryApi'
 
//複数reducerをimportした場合には、combineReducerでまとめる
 import { combineReducers } from 'redux'
 
const main = combineReducers({
  counter,
  libraryApi 
})
 
export default main