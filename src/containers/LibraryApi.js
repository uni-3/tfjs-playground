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
    search: () => dispatch(modules.search()),
    fetch: () => dispatch(modules.fetch()),
    createSortHandler: (orderBy, order) => dispatch(modules.createSortHandler(orderBy, order)),
    changedForm: (e) => dispatch(modules.changedForm(e)),
    onChangePage: (e, page) => dispatch(modules.onChangePage(e, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApi)