import { select, take, call, put, cancelled, takeEvery, takeLatest } from 'redux-saga/effects'

import { INIT_MODEL, MODEL_LOADED } from '../modules/MnistCnn'

import { MnistData, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE, CLASSES, TEST_ELEMENTS } from '../utils/mnist/data'
import { MnistModel } from '../utils/mnist/model'


// selector 
const getModel = (state) => {
  let props = state.mnistCnn

  return props.mnistModel
}

function* loadModel(action) {
  console.log('load model saga', action)
  let mnistModel = new MnistModel(action.payload.canvas)
  console.log('mnistload', mnistModel)
  mnistModel.initModel()
  //mnistModel.initModel_def()
  console.log('mnist init', mnistModel)
  yield put({type: MODEL_LOADED, payload: { mnistModel: mnistModel } })
}


function* runLoadModelEvery() {
  yield takeEvery(INIT_MODEL, loadModel)
}


export const mnistCnnSagas = [
  runLoadModelEvery()
]
