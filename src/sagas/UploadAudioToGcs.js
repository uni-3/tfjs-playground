import { select, call, put, takeEvery } from 'redux-saga/effects'

import moment from 'moment'

import { uploadAudioStorage } from '../firebase'
import { DROP, DROPPED, UPLOAD, UPLOADED} from '../modules/UploadAudioToGcs'


// selector 
const selectFiles = (state) => {
  let props = state.uploadAudioToGcs
  let files = props.files
  return files
}

const selectDataUrl = (state) => {
  let props = state.uploadAudioToGcs
  let dataUrl = props.dataUrl
  return dataUrl
}


let getDuration = (files) => {
  const audio = new Audio()
  audio.src = files[0].preview
  console.log('audio', audio)
  return new Promise((resolve, reject) => {
    audio.addEventListener('loadedmetadata', () => {
      // 再生時間の取得
      //console.log('get duration', audio.duration)
      let duration = audio.duration
      resolve(duration)
    })
  })
}

let getDataUrl = (files) => {
  const reader = new FileReader()
  //console.log('get dataUrl')
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const fileBinary = reader.result
      //console.log('read file', fileBinary)

      resolve(fileBinary)
    }
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    // base64
    reader.readAsDataURL(files[0])
  })
}

function* dropFile(action) {
  try {
    let files = action.payload.files
    const duration = yield call(getDuration, files)
    console.log('sage duration ', duration)
    const dataUrl = yield call(getDataUrl, files)
    console.log('sage dataUrl ', dataUrl)
    yield put({type: DROPPED, payload: { files: files, duration: duration, dataUrl: dataUrl }})
  } catch (e) {
    yield put({type: DROPPED, message: e.message})
  }
}

function* uploadToGcs(action) {
  try {
    console.log('saga upload start')
    const files = yield select(selectFiles)
    const dataUrl = yield select(selectDataUrl)
    console.log('upload dataUrl', dataUrl)

    let fileName = moment().format('YYYYMMDD') + '_' + files[0].name
    const res = yield call(uploadAudioStorage, dataUrl, fileName)
    console.log('saga upload res', res)
    console.log('saga upload res', res.metadata)
    //let path = 'gs://' + res.metadata.bucket + '/' + res.matedata.fullPath
    //console.log('saga upload path', path)
    yield put({type: UPLOADED, payload: { res: res }})
  } catch (e) {
    yield put({type: UPLOADED, message: e.message})
  }
}

/*
  run each function
*/
function* runDropEvery() {
  yield takeEvery(DROP, dropFile)
}

function* runUploadEvery() {
  yield takeEvery(UPLOAD, uploadToGcs)
}


export const uploadAudioToGcsSagas = [
  runDropEvery(),
  runUploadEvery()
]

