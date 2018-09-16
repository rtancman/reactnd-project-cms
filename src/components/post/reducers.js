import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState } from './constants/ReducersInitialState'

export const posts = (state = initialListPostState, action) => {
  switch (action.type) {
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items
      })
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case types.INVALIDATE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    case types.POST_HAS_BEEN_CREATED:
      return Object.assign({}, state, {
        items: [...state.items, action.post]
      })
    default:
        return state;
  }
}

export const post = (state = initialPostState, action) => {
  switch (action.type) {
    case types.RECEIVE_POST:
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
    case types.REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case types.INVALIDATE_POST:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    default:
        return state;
  }
}