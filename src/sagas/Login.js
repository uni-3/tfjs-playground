import { select, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { ON_LOGIN, REF_LOGIN, LOGIN_SUCCEEDED, LOGOUT } from '../modules/Login'
import firebase from 'firebase'


function* onLogin(action) {
  console.log('onlogin saga')
  let provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
  yield put({type: REF_LOGIN})
}


function* refLogin(action) {
  console.log('ref login saga')
  let user = yield call(onAuthStateChanged)
  yield put({type: LOGIN_SUCCEEDED, payload: user})
}

function onAuthStateChanged() {
  console.log('ref login saga')
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        console.log('ref login saga e')
        //reject(new Error('login error!'));
      }
    });
  });
}


function* runOnLoginEvery() {
  yield takeEvery(ON_LOGIN, onLogin)
}

function* runRefLoginEvery() {
  yield takeEvery(REF_LOGIN, refLogin)
}


export const loginSagas = [
  runOnLoginEvery(),
  runRefLoginEvery()
]