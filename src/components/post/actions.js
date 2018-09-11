import * as types from './constants/ActionTypes'
import { headers, listPostsUrl, postUrl } from 'api/cms';

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

export const invalidatePost = (bool) => {
  return {
      type: types.INVALIDATE_POST,
      didInvalidate: bool
  }
}

export const requestPost = (bool) => {
  return {
      type: types.REQUEST_POST,
      isFetching: bool
  }
}

export const receivePost = (post) => {
  return {
      type: types.RECEIVE_POST,
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: post.voteScore,
      deleted: post.deleted,
      commentCount: post.commentCount
  }
}

export function postFetchData(postId) {
  return dispatch => {
    dispatch(requestPost(true))
    return fetch(postUrl(postId), { headers })
      .then(res => res.json())
      .then(body => dispatch(receivePost(body)))
      .catch(ex => dispatch(invalidatePost(true)))
  }
}