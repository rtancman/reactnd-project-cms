import * as types from './constants/ActionTypes'
import { headers, listCategoriesUrl, categoryPostsUrl } from 'api/cms';

export const invalidateCategories = (bool) => {
  return {
      type: types.INVALIDATE_CATEGORIES,
      didInvalidate: bool
  }
}

export const requestCategories = (bool) => {
  return {
      type: types.REQUEST_CATEGORIES,
      isFetching: bool
  }
}

export const receiveCategories = (data) => {
  return {
      type: types.RECEIVE_CATEGORIES,
      items: data.categories,
  }
}

export function categoriesFetchData() {
  return dispatch => {
    dispatch(requestCategories(true))
    return fetch(listCategoriesUrl, { headers })
      .then(res => res.json())
      .then(body => dispatch(receiveCategories(body)))
      .catch(ex => dispatch(invalidateCategories(true)))
  }
}

export const invalidateCategoryPosts = (bool) => {
  return {
      type: types.INVALIDATE_CATEGORY_POSTS,
      didInvalidate: bool
  }
}

export const requestCategoryPosts = (bool) => {
  return {
      type: types.REQUEST_CATEGORY_POSTS,
      isFetching: bool
  }
}

export const receiveCategoryPosts = (data) => {
  return {
      type: types.RECEIVE_CATEGORY_POSTS,
      items: data,
  }
}

export function categoryPostsFetchData(categoryId) {
  return dispatch => {
    dispatch(requestCategoryPosts(true))
    return fetch(categoryPostsUrl(categoryId), { headers })
      .then(res => res.json())
      .then(body => dispatch(receiveCategoryPosts(body)))
      .catch(ex => dispatch(invalidateCategoryPosts(true)))
  }
}
