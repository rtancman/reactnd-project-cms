import { createComment, removeComment } from './reducers'
import * as types from './constants/ActionTypes'
import { initialCreateCommentState, initialRemoveCommentState } from './constants/ReducersInitialState'

describe('reducers', () => {
  describe('create comment', () => {
    it('should return the initial state', () => {
      expect(createComment(undefined, {})).toEqual(initialCreateCommentState)
    })

    it('should handle INVALIDATE_CREATE_COMMENT', () => {
      const action = {
        type: types.INVALIDATE_CREATE_COMMENT,
        didInvalidate: true
      }
      const expected = {
        ...initialCreateCommentState,
        didInvalidate: true
      }

      expect(createComment(undefined, action)).toEqual(expected)
    })

    it('should handle REQUEST_CREATE_COMMENT', () => {
      const action = {
        type: types.REQUEST_CREATE_COMMENT,
        isFetching: true
      }
      const expected = {
        ...initialCreateCommentState,
        isFetching: true
      }

      expect(createComment(undefined, action)).toEqual(expected)
    })

    it('should handle POST_HAS_BEEN_CREATED', () => {
      const action = {
        type: types.COMMENT_HAS_BEEN_CREATED,
        created: true
      }
      const expected = {
        ...initialCreateCommentState,
        created: true
      }

      expect(createComment(undefined, action)).toEqual(expected)
    })
  })

  describe('remove comment', () => {
    it('should return the initial state', () => {
      expect(removeComment(undefined, {})).toEqual(initialRemoveCommentState)
    })

    it('should handle INVALIDATE_REMOVE_COMMENT', () => {
      const action = {
        type: types.INVALIDATE_REMOVE_COMMENT,
        didInvalidate: true
      }
      const expected = {
        ...initialRemoveCommentState,
        didInvalidate: true
      }

      expect(removeComment(undefined, action)).toEqual(expected)
    })

    it('should handle REQUEST_REMOVE_COMMENT', () => {
      const commentId = '12345'
      const action = {
        type: types.REQUEST_REMOVE_COMMENT,
        isFetching: true,
        id: commentId
      }
      const expected = {
        ...initialRemoveCommentState,
        isFetching: true,
        id: commentId
      }

      expect(removeComment(undefined, action)).toEqual(expected)
    })

    it('should handle COMMENT_HAS_BEEN_REMOVED', () => {
      const action = {
        type: types.COMMENT_HAS_BEEN_REMOVED,
        removed: true,
      }
      const expected = {
        ...initialRemoveCommentState,
        removed: true,
      }

      expect(removeComment(undefined, action)).toEqual(expected)
    })
  })
})