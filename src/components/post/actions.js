import * as types from './constants/ActionTypes'
import { headers, listPostsUrl, postUrl, postCreateUrl, postCommentsUrl } from '../../api/cms';

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

export const pushListPost = (post) => {
  return {
      type: types.PUSH_LIST_POSTS,
      post: {
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
}

export function createPostFetch(post, resetForm) {
  return dispatch => {
    return fetch(postCreateUrl, { 
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      .then(res => res.json())
      .then(body => {
        dispatch(pushListPost(body))
        return new Promise(function(resolve) {
          resolve(body);
        })
      })
  }
}

export const receivePostComments = (comments) => {
  return {
      type: types.RECEIVE_POST_COMMENTS,
      comments
  }
}

export function postCommentsFetchData(postId) {
  return dispatch => {
    return fetch(postCommentsUrl(postId), { headers })
      .then(res => res.json())
      .then(body => dispatch(receivePostComments(body)))
  }
}

export const removePostInListPost = (postId) => {
  return {
      type: types.REMOVE_POST_IN_LIST_POSTS,
      postId
  }
}

export function removePostFetch(postId) {
  return dispatch => {
    return fetch(postUrl(postId), { 
        method: 'DELETE',
        headers,
      })
      .then(res => res.json())
      .then(body => {
        dispatch(removePostInListPost(body.id))
        return new Promise(function(resolve) {
          resolve(body);
        })
      })
  }
}

export const pushListComments = (comment) => {
  return {
      type: types.PUSH_LIST_COMMENTS,
      comment: {
        id: comment.id,
        timestamp: comment.timestamp,
        parentId: comment.parentId,
        body: comment.body,
        author: comment.author,
        voteScore: comment.voteScore,
        deleted: comment.deleted,
        parentDeleted: comment.parentDeleted
      }
  }
}

export const removeCommentInListComments = (commentId) => {
  return {
    type: types.REMOVE_COMMENT_IN_LIST_COMMENTS,
    commentId
  }
}

export const updatePostInListPost = (post) => {
  return {
      type: types.UPDATE_POST_IN_LIST_POSTS,
      post: {
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
}

export function editPostFetch(postId, post) {
  return dispatch => {
    return fetch(postUrl(postId), {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(body => {
      dispatch(updatePostInListPost(body))
      return new Promise(function(resolve) {
        resolve(body);
      })
    })
  }
}

export const updateCommentInListComments = (comment) => {
  return {
      type: types.UPDATE_COMMENT_IN_LIST_COMNENTS,
      comment: {
        id: comment.id,
        parentId: comment.parentId,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        voteScore: comment.voteScore,
        deleted: comment.deleted,
        parentDeleted: comment.parentDeleted,
      }
  }
}