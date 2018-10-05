import * as types from './constants/ActionTypes'
import { commentCreateUrl, headers, commentUrl } from 'api/cms'
import { pushListComments, removeCommentInListComments, updateCommentInListComments } from 'components/post/actions'

export const invalidateCreateComment = (bool) => {
  return {
    type: types.INVALIDATE_CREATE_COMMENT,
    didInvalidate: bool
  }
}

export const requestCreateComment = (bool) => {
  return {
    type: types.REQUEST_CREATE_COMMENT,
    isFetching: bool
  }
}

export const commentHasBeenCreated = (bool) => {
  return {
    type: types.COMMENT_HAS_BEEN_CREATED,
    created: bool
  }
}

export function createCommentFetch(comment) {
  return dispatch => {
    dispatch(requestCreateComment(true))
    return fetch(commentCreateUrl, { 
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      .then(res => res.json())
      .then(body => {
        dispatch(pushListComments(body))
        dispatch(commentHasBeenCreated(true))
      })
      .catch(ex => dispatch(invalidateCreateComment(true)))
  }
}

export const invalidateRemoveComment = (bool) => {
  return {
      type: types.INVALIDATE_REMOVE_COMMENT,
      didInvalidate: bool
  }
}

export const requestRemoveComment = ({ bool, commentId }) => {
  return {
      type: types.REQUEST_REMOVE_COMMENT,
      isFetching: bool,
      id: commentId
  }
}

export const commentHasBeenRemoved = (bool) => {
  return {
      type: types.COMMENT_HAS_BEEN_REMOVED,
      removed: bool
  }
}

export function removeCommentFetch(commentId) {
  return dispatch => {
    dispatch(requestRemoveComment({ bool: true, commentId }))
    return fetch(commentUrl(commentId), { 
        method: 'DELETE',
        headers,
      })
      .then(res => res.json())
      .then(body => {
        dispatch(removeCommentInListComments(body.id))
        dispatch(commentHasBeenRemoved(true))
      })
      .catch(ex => dispatch(invalidateRemoveComment(true)))
  }
}

export function editCommentFetch(commentId, comment) {
  return dispatch => {
    return fetch(commentUrl(commentId), { 
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      .then(res => res.json())
      .then(body => {
        dispatch(updateCommentInListComments(body))
        return new Promise(function(resolve) {
          resolve(body);
        })
      })
  }
}
