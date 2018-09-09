import { select, call, put, takeEvery } from 'redux-saga/effects'
import { postTextParseApi, postLexrankApi, postLdaApi } from './api'

import { SET_TEXT, POST_TEXT_PARSE, POST_LEXRANK, POST_LDA, FETCH_SUCCEEDED, FETCH_FAILED } from '../modules/NlpApi'


// selector 
const getText = (state) => {
  let props = state.nlpApi
  let params = {
    ngram: Number(props.inputNgram)
  }
  return [props.inputText, params]
}


function* fetchTextParseResult(action) {
  try {
    const [stateText, params] = yield select(getText)
    console.log('sage state', stateText, params)
    const res = yield call(postTextParseApi, stateText, params)
    //console.log('saga res', res)
    yield put({type: FETCH_SUCCEEDED, res: res})
  } catch (e) {
    yield put({type: FETCH_FAILED, message: e.message})
  }
}


function* fetchLexrankResult(action) {
  try {
    const [stateText, params] = yield select(getText)
    //const stateText = yield select(getText)
    const res = yield call(postLexrankApi, stateText, params)
    yield put({type: FETCH_SUCCEEDED, res: res})
  } catch (e) {
    yield put({type: FETCH_FAILED, message: e.message})
  }
}

function* fetchLdaResult(action) {
  try {
    const [stateText, params] = yield select(getText)
    //const stateText = yield select(getText)
    const res = yield call(postLdaApi, stateText, params)
    yield put({type: FETCH_SUCCEEDED, res: res})
  } catch (e) {
    yield put({type: FETCH_FAILED, message: e.message})
  }
}

/*
  run fetchResult post each SEARCH_REQUESTED Action
*/
function* runTextParseEvery() {
  yield takeEvery(POST_TEXT_PARSE, fetchTextParseResult)
}

function* runLexrankEvery() {
  yield takeEvery(POST_LEXRANK, fetchLexrankResult)
}

function* runLdaEvery() {
  yield takeEvery(POST_LDA, fetchLdaResult)
}


export const nlpApiSagas = [
  runTextParseEvery(),
  runLexrankEvery(),
  runLdaEvery()
]

