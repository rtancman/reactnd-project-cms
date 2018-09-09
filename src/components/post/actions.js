import * as types from './constants/ActionTypes'
import { headers, listPostsUrl } from 'api/cms';

export const invalidatePosts = (bool) => {
  return {
      type: types.INVALIDATE_POSTS,
      didInvalidate: bool
  }
}

export const requestPosts = (bool) => {
  return {
      type: types.REQUEST_POSTS,
      isFetching: bool
  }
}

export const receivePosts = (items) => {
  return {
      type: types.RECEIVE_POSTS,
      items
  }
}

export function postsFetchData() {
  return dispatch => {
    dispatch(requestPosts(true))
    return fetch(listPostsUrl, { headers })
      .then(res => res.json())
      .then(body => dispatch(receivePosts(body)))
      .catch(ex => dispatch(invalidatePosts(true)))
  }
}