import { select, call, put, takeEvery } from 'redux-saga/effects'
import { postTextParseApi } from './api'


// selector 
const getText = (state) => {
  console.log("get", state)
  return state.nlpApi.inputText
}

// run by action SEARCH_REQUESTED Action
function* fetchResult(action) {
  try {
    console.log('saga', action)
    const stateText = yield select(getText)
    console.log('sage state', stateText)
    const res = yield call(postTextParseApi, stateText)
    console.log('saga res', res)
    yield put({type: "FETCH_SUCCEEDED", res: res})
  } catch (e) {
    yield put({type: "FETCH_FAILED", message: e.message})
  }
}

/*
  run fetchResult post each SEARCH_REQUESTED Action
*/
function* runTextParseEvery() {
  console.log('run take')
  yield takeEvery("POST_TEXT_PARSE", fetchResult)
}


export default runTextParseEvery

