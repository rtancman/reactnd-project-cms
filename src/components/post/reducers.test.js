import { posts, post } from './reducers'
import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState } from './constants/ReducersInitialState'
import { postsMock, postMock } from './constants/Fixtures'


describe('reducers', () => {
  describe('list posts', () => {
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

  describe('post', () => {
    it('should return the initial state', () => {
      expect(post(undefined, {})).toEqual(initialPostState)
    })

    it('should handle REQUEST_POST', () => {
      const action = {
        type: types.REQUEST_POST,
        isFetching: true
      }
      const expected = {
        ...initialPostState,
        isFetching: true
      }

      expect(post(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_POST', () => {
      const action = {
        type: types.INVALIDATE_POST,
        didInvalidate: true
      }
      const expected = {
        ...initialPostState,
        didInvalidate: true
      }
      
      expect(post(undefined, action)).toEqual(expected)
    })

    it('should handle RECEIVE_POST', () => {
      const action = {
        type: types.RECEIVE_POST,
        isFetching: false,
        didInvalidate: false,
        ...postMock
      }
      const expected = {
        ...initialPostState,
        content: {
          ...postMock
        }
      }
      
      expect(post(undefined, action)).toEqual(expected)
    })
  })
})