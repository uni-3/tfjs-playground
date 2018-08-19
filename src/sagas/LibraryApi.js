import { select, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { postSearch } from './api'


// selector 
const getFormValue = (state) => {
  console.log("get", state)
  return {
    title: state.libraryApi.title,
    author: state.libraryApi.author,
    page: state.libraryApi.page
  }
}

// run by action SEARCH_REQUESTED Action
function* fetchResult(action) {
  try {
    console.log('saga', action)
    console.log('saga this', this)
    const stateFormValue = yield select(getFormValue)
    console.log('sage state', stateFormValue)
    const res = yield call(postSearch, stateFormValue)
    console.log('saga res', res)
    yield put({type: "SEARCH_SUCCEEDED", res: res})
  } catch (e) {
    yield put({type: "SEARCH_FAILED", message: e.message})
  }
}

/*
  run fetchResult post each SEARCH_REQUESTED Action
*/
function* runTakeEvery() {
  yield takeEvery("SEARCH_REQUESTED", fetchResult)
}

/*
  other implement takeLatest

  レスポンス待ちの状態で SEARCH_REQUESTED を受け取った場合、
  待ち状態のリクエストはキャンセルされて最後の1つだけが実行
*/
function* runTaleLatest() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchResult)
}

export default runTakeEvery

