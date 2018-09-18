import * as types from './constants/ActionTypes'
import { commentCreateUrl, headers } from 'api/cms'
import { pushListComments } from 'components/post/actions'

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