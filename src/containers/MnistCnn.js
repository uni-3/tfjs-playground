import { connect } from 'react-redux'
import * as mnistCnnModule from '../modules/MnistCnn'
import MnistCnn from '../components/MnistCnn/MnistCnn'


const mapStateToProps = state => {
  return {
    mnistCnn: state.mnistCnn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initModel: (canvas) => dispatch(mnistCnnModule.initModel(canvas))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MnistCnn)