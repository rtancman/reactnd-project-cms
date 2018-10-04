import * as types from './constants/ActionTypes'
import { initialCategoriesState, initialCategoryPostsState } from './constants/ReducersInitialState'

export const categories = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case types.RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        items: action.items
      })
    default:
        return state;
  }
}

export const categoryPosts = (state = initialCategoryPostsState, action) => {
  switch (action.type) {
    case types.RECEIVE_CATEGORY_POSTS:
      return Object.assign({}, state, {
        items: action.items
      })
    default:
        return state;
  }
}