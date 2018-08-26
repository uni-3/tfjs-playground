import { select, call, put, takeEvery } from 'redux-saga/effects'
import { postTextParseApi, postLexrankApi } from './api'


// selector 
const getText = (state) => {
  return state.nlpApi.inputText
}


function* fetchTextParseResult(action) {
  try {
    const stateText = yield select(getText)
    //console.log('sage state', stateText)
    const res = yield call(postTextParseApi, stateText)
    //console.log('saga res', res)
    yield put({type: "FETCH_SUCCEEDED", res: res})
  } catch (e) {
    yield put({type: "FETCH_FAILED", message: e.message})
  }
}


function* fetchLexrankResult(action) {
  try {
    const stateText = yield select(getText)
    const res = yield call(postLexrankApi, stateText)
    yield put({type: "FETCH_SUCCEEDED", res: res})
  } catch (e) {
    yield put({type: "FETCH_FAILED", message: e.message})
  }
}

/*
  run fetchResult post each SEARCH_REQUESTED Action
*/
function* runTextParseEvery() {
  yield takeEvery("POST_TEXT_PARSE", fetchTextParseResult)
}

function* runLexrankEvery() {
  yield takeEvery("POST_LEXRANK", fetchLexrankResult)
}


export const nlpApiSagas = [
  runTextParseEvery(),
  runLexrankEvery()
]

