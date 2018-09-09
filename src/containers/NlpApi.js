import { connect } from 'react-redux'
import * as nlpApiModule from '../modules/NlpApi'
import NlpApi from '../components/NlpApi/NlpApi'


const mapStateToProps = state => {
  return {
    nlpApi: state.nlpApi
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: (e) => dispatch(nlpApiModule.onChange(e)),
    loadSample: (text) => dispatch(nlpApiModule.loadSample(text)),
    postTextParse: () => dispatch(nlpApiModule.postTextParse()),
    postLexrank: () => dispatch(nlpApiModule.postLexrank()),
    postLda: () => dispatch(nlpApiModule.postLda()),
    fetch: () => dispatch(nlpApiModule.fetch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NlpApi)