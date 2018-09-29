import { select, call, put, takeEvery } from 'redux-saga/effects'
import { postAudioApi } from './api'

import { POST_AUDIO_API, FETCH_SUCCEEDED, FETCH_FAILED } from '../modules/GoogleSpeechToText'


// selector 
const selectGcsPath = (state) => {
  //console.log('saga select ', state)
  let gcsPath = state.uploadAudioToGcs.gcsPath

  return gcsPath
}

function* fetchAudioApiResult(action) {
  try {
    const gcsPath = yield select(selectGcsPath)
    console.log('g select sage', gcsPath)
    const res = yield call(postAudioApi, gcsPath)
    console.log('g fetch sage', res)
    // add gcsPath for set disable flag
    yield put({type: FETCH_SUCCEEDED, payload: {res: res, gcsPath: gcsPath} })
  } catch (e) {
    yield put({type: FETCH_FAILED, message: e.message})
  }
}

/*
  run fetchResult post each SEARCH_REQUESTED Action
*/
function* runAudioEvery() {
  yield takeEvery(POST_AUDIO_API, fetchAudioApiResult)
}

export const googleSpeechToTextSagas = [
  runAudioEvery()
]

