import * as types from './constants/ActionTypes'
import { initialCreateCommentState } from './constants/ReducersInitialState'

export const createComment = (state = initialCreateCommentState, action) => {
  switch (action.type) {
    case types.REQUEST_CREATE_COMMENT:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case types.INVALIDATE_CREATE_COMMENT:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    case types.COMMENT_HAS_BEEN_CREATED:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        created: true
      })
    default:
        return state;
  }
}