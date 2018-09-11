import { 
  REQUEST_CATEGORIES, 
  RECEIVE_CATEGORIES, 
  INVALIDATE_CATEGORIES,
  REQUEST_CATEGORY_POSTS,
  RECEIVE_CATEGORY_POSTS,
  INVALIDATE_CATEGORY_POSTS
} from './constants/ActionTypes'
import { initialCategoriesState, initialCategoryPostsState } from './constants/ReducersInitialState'

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

export const categoryPosts = (state = initialCategoryPostsState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items
      })
    case REQUEST_CATEGORY_POSTS:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case INVALIDATE_CATEGORY_POSTS:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      })
    default:
        return state;
  }
}