import { connect } from 'react-redux'

import * as uploadAudioToGcsModule from '../modules/UploadAudioToGcs'
import UploadAudioToGcs from '../components/UploadAudioToGcs/UploadAudioToGcs'


const mapStateToProps = state => {
  return {
    uploadAudioToGcs: state.uploadAudioToGcs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDrop: (files, rejected) => dispatch(uploadAudioToGcsModule.onDrop(files, rejected)),
    onUpload: () => dispatch(uploadAudioToGcsModule.onUpload()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAudioToGcs)
