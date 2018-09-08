import fetch from 'cross-fetch'
import * as types from './constants/ActionTypes'
import { headers, listCategoriesUrl } from 'api/cms';

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