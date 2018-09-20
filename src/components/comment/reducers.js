import * as types from './constants/ActionTypes'
import { initialCreateCommentState, initialRemoveCommentState } from './constants/ReducersInitialState'

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

export const removeComment = (state = initialRemoveCommentState, action) => {
  switch (action.type) {
    case types.REQUEST_REMOVE_COMMENT:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        removed: false,
        didInvalidate: false,
        id: action.id,
      })
    case types.INVALIDATE_REMOVE_COMMENT:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate,
        removed: false,
        isFetching: false,
      })
    case types.COMMENT_HAS_BEEN_REMOVED:
      return Object.assign({}, state, {
        removed: action.removed,
        isFetching: false,
        didInvalidate: false
      })
    default:
        return state;
  }
}