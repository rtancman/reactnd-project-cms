import { 
  REQUEST_POSTS, 
  RECEIVE_POSTS, 
  INVALIDATE_POSTS,
  REQUEST_POST, 
  RECEIVE_POST, 
  INVALIDATE_POST
} from './constants/ActionTypes'
import { initialListPostState, initialPostState } from './constants/ReducersInitialState'

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

export const post = (state = initialPostState, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        content: {
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          author: action.author,
          category: action.category,
          voteScore: action.voteScore,
          deleted: action.deleted,
          commentCount: action.commentCount
        }
      })
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case INVALIDATE_POST:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    default:
        return state;
  }
}