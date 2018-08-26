// action type
const SEARCH_REQUESTED = 'SEARCH_REQUESTED'
const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED'
const SET_FORM = 'SET_FORM'
const SET_PAGE = 'SET_PAGE'
const SET_ORDER= 'SET_OEDER'

const initialState = {
  author: '夏目漱石',
  title: '',
  page: 1,
  loading: false,
  order: 'asc',
  orderBy: 'title',
  res: {}
}

// reducer
export default function libraryApi(state=initialState, action) {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        ...action.payload,
        loading: true,
      }

    case SEARCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        res: action.res
      }

    case SET_FORM:
      /*
        action.payload = { key: value}
      */
      return {
        ...state,
        ...action.payload
      }

    case SET_PAGE:
      /*
        action.payload = { page: value}
      */
      return {
        ...state,
        ...action.payload
      }

    case SET_ORDER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// action-creator
// clicked search button
export function onSearch(e) {
  e.preventDefault()
  return { 
    type: SEARCH_REQUESTED,
    payload: {
      page: 1,
      res: []
    }
  }
}

// changed page
export function search() {
  return { 
    type: SEARCH_REQUESTED,
  }
}

export function fetch() {
  return { 
    type: SEARCH_SUCCEEDED
  }
}

export function changedForm(e) {
  console.log('action changed form', e)
  const payload = {
    [e.target.name]: e.target.value
  }
  return { 
    type: SET_FORM,
    payload: payload
  }
}

export function onChangePage(e, page) {
  console.log('onchangepage', page)
  if (page === undefined) {
    page = 1
  }
  return {
    type: SET_PAGE,
    payload: {
      page: page
    }
  }
}

export function createSortHandler(orderBy, order) {
  if (order === 'desc') {
    order = 'asc'
  } else {
    order = 'desc'
  }
  return {
    type: SET_ORDER,
    payload: {
      orderBy: orderBy,
      order: order
    }
  }
}