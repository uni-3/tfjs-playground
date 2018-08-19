import { connect } from 'react-redux'
import * as libraryApiModule from '../modules/LibraryApi'
import LibraryApi from '../components/LibraryApi/LibraryApi'


const mapStateToProps = state => {
 return {
   libraryApi: state.libraryApi
 }
}

const mapDispatchToProps = dispatch => {
  const modules = libraryApiModule
  return {
    onSearch: (e) => dispatch(modules.onSearch(e)),
    fetch: () => dispatch(modules.fetch()),
    changedForm: (e) => dispatch(modules.changedForm(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApi)