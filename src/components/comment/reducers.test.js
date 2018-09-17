import { createComment } from './reducers'
import * as types from './constants/ActionTypes'
import { initialCreateCommentState } from './constants/ReducersInitialState'

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
})