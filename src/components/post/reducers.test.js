import { posts } from './reducers'
import * as types from './constants/ActionTypes'
import { initialListPostState } from './constants/ReducersInitialState'
import { postsMock } from './constants/Fixtures'


describe('reducers', () => {
  describe('posts', () => {
    it('should return the initial state', () => {
      expect(posts(undefined, {})).toEqual(initialListPostState)
    })

    it('should handle REQUEST_POSTS', () => {
      const action = {
        type: types.REQUEST_POSTS,
        isFetching: true
      }
      const expected = {
        ...initialListPostState,
        isFetching: true
      }

      expect(posts(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_POSTS', () => {
      const action = {
        type: types.INVALIDATE_POSTS,
        didInvalidate: true
      }
      const expected = {
        ...initialListPostState,
        didInvalidate: true
      }
      
      expect(posts(undefined, action)).toEqual(expected)
    })

    it('should handle RECEIVE_POSTS', () => {
      const action = {
        type: types.RECEIVE_POSTS,
        isFetching: false,
        didInvalidate: false,
        items: postsMock,
      }
      const expected = {
        ...initialListPostState,
        items: postsMock,
      }
      
      expect(posts(undefined, action)).toEqual(expected)
    })
  })
})