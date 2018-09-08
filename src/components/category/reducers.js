import { 
  REQUEST_CATEGORIES, 
  RECEIVE_CATEGORIES, 
  INVALIDATE_CATEGORIES 
} from './constants/ActionTypes'
import { initialCategoriesState } from './constants/ReducersInitialState'

export const categories = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items
      })
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case INVALIDATE_CATEGORIES:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    default:
        return state;
  }
}