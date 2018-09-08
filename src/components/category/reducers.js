import { 
  REQUEST_CATEGORIES, 
  RECEIVE_CATEGORIES, 
  INVALIDATE_CATEGORIES 
} from './constants/ActionTypes'

const initialCategoriesState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  lastUpdated: ''
}

export const categories = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case INVALIDATE_CATEGORIES:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
        return state;
  }
}