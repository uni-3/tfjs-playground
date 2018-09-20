// reducers/index.js
//ここで全てのreducerをimportする
import counter from './Counter'
import libraryApi from './LibraryApi'
import nlpApi from './NlpApi'
import uploadAudioToGcs from './UploadAudioToGcs'
import googleSpeechToText from './GoogleSpeechToText'
import mnistCnn from './MnistCnn'
import login from './Login'
 
//複数reducerをimportした場合には、combineReducerでまとめる
 import { combineReducers } from 'redux'
 
const main = combineReducers({
  counter,
  libraryApi,
  nlpApi,
  uploadAudioToGcs,
  googleSpeechToText,
  mnistCnn,
  login
})
 
export default main