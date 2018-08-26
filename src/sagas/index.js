// sagaまとめてexport
import { all } from 'redux-saga/effects'
import { nlpApiSagas } from './NlpApi'
import { libraryApiSagas } from './LibraryApi'
import { loginSagas } from './Login'

console.log('lib saga', nlpApiSagas)
console.log('nlp saga', libraryApiSagas)
console.log('login saga', loginSagas)

export default function* rootSagas() {
  yield all([
    ...nlpApiSagas,
    ...libraryApiSagas,
    ...loginSagas
  ])
}