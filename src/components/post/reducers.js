import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState, initialCreatePostState, initialRemovePostState } from './constants/ReducersInitialState'

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
    case types.PUSH_LIST_POSTS:
      return Object.assign({}, state, {
        items: [...state.items, action.post]
      })
    case types.REMOVE_POST_IN_LIST_POSTS:
      return Object.assign({}, state, {
        items: state.items.filter((post) => post.id !== action.postId)
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
    case types.INVALIDATE_POST_COMMENTS:
      return Object.assign({}, state, {
        comment: {
          didInvalidate: action.didInvalidate
        }
      })
    case types.REQUEST_POST_COMMENTS:
      return Object.assign({}, state, {
        comment: {
          isFetching: action.isFetching
        }
      })
    case types.RECEIVE_POST_COMMENTS:
      return Object.assign({}, state, {
        comment: {
          isFetching: false,
          didInvalidate: false,
          items: action.comments
        }
      })
    default:
        return state;
  }
}

export const createPost = (state = initialCreatePostState, action) => {
  switch (action.type) {
    case types.POST_HAS_BEEN_CREATED:
      return Object.assign({}, state, {
        created: action.created,
        isFetching: false,
        didInvalidate: false
      })
    case types.REQUEST_CREATE_POST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        created: false,
        didInvalidate: false,
      })
    case types.INVALIDATE_CREATE_POST:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate,
        created: false,
        isFetching: false,
      })
    default:
        return state;
  }
}

export const removePost = (state = initialRemovePostState, action) => {
  switch (action.type) {
    case types.POST_HAS_BEEN_REMOVED:
      return Object.assign({}, state, {
        removed: action.removed,
        isFetching: false,
        didInvalidate: false
      })
    case types.REQUEST_REMOVE_POST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        removed: false,
        didInvalidate: false,
      })
    case types.INVALIDATE_REMOVE_POST:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate,
        removed: false,
        isFetching: false,
      })
    default:
        return state;
  }
}