import { connect } from 'react-redux'
import * as googleSpeechToTextModule from '../modules/GoogleSpeechToText'
import GoogleSpeechToText from '../components/GoogleSpeechToText/GoogleSpeechToText'


const mapStateToProps = state => {
  return {
    googleSpeechToText: state.googleSpeechToText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadResults: (e) => dispatch(googleSpeechToTextModule.loadResults(e)),
    fetch: () => dispatch(googleSpeechToTextModule.fetch()),
    postAudioApi: () => dispatch(googleSpeechToTextModule.postAudioApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSpeechToText)