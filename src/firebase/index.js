import firebase from 'firebase'
import { config } from './config'

// for upload audio file
let audioBucketName = process.env.REACT_APP_AUDIO_BUCKET_NAME

export const firebaseApp = firebase.initializeApp(config)
export const audioStorage = firebaseApp.storage()
// custum storage(not work)
//export const audioStorage = firebase.app().storage(audioBucketName)


export const uploadAudioStorage = async (dataBase64, filename) => {
  console.log('upload filename', filename)
  console.log('upload data', dataBase64)
  // 参照
  let storageRef = audioStorage.ref()

  // Create a reference to 'filename'
  let ref = storageRef.child(filename)
  console.log('ref', ref)

  // upload base64 format
  let uploadTask = ref.putString(dataBase64, 'data_url')

  return uploadTask.then(async (snapshot) => {
    console.log('uploaded: ', snapshot)
    return await snapshot

  })
  /* not get state_changed???
  return uploadTask.on('state_chenged', async (snapshot) => {
    let progress = await (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log('Upload is ' + progress + '% done')

    return progress


  }, (error) => {
    console.log('error: ', error)
  },  async (snapshot) => {
    console.log('successful uploads')
    return await snapshot
  })
  */ 
}
