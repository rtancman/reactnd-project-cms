import { 
  REQUEST_POSTS, 
  RECEIVE_POSTS, 
  INVALIDATE_POSTS 
} from './constants/ActionTypes'
import { initialListPostState } from './constants/ReducersInitialState'

export const posts = (state = initialListPostState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case INVALIDATE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    default:
        return state;
  }
}