import * as types from './constants/ActionTypes'
import { headers, listCategoriesUrl, categoryPostsUrl } from 'api/cms';

export const receiveCategories = (data) => {
  return {
      type: types.RECEIVE_CATEGORIES,
      items: data.categories,
  }
}

export function categoriesFetchData() {
  return dispatch => {
    return fetch(listCategoriesUrl, { headers })
      .then(res => res.json())
      .then(body => {
        dispatch(receiveCategories(body))
        return new Promise(function(resolve) {
          resolve(body);
        })
      })
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
    return fetch(categoryPostsUrl(categoryId), { headers })
      .then(res => res.json())
      .then(body => {
        dispatch(receiveCategoryPosts(body))
        return new Promise(function(resolve) {
          resolve(body);
        })
      })
  }
}
