// sagaまとめてexport
import { all } from 'redux-saga/effects'
import { nlpApiSagas } from './NlpApi'
import { libraryApiSagas } from './LibraryApi'
import { mnistCnnSagas } from './MnistCnn'
import { loginSagas } from './Login'

console.log('mnist saga', mnistCnnSagas)
console.log('nlp saga', nlpApiSagas)
console.log('lib saga', libraryApiSagas)
console.log('login saga', loginSagas)

export default function* rootSagas() {
  yield all([
    ...nlpApiSagas,
    ...libraryApiSagas,
    ...mnistCnnSagas,
    ...loginSagas
  ])
}