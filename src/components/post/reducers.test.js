import { posts, post, createPost } from './reducers'
import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState, initialCreatePostState } from './constants/ReducersInitialState'
import { postsMock, postMock, postCommentsMock } from './constants/Fixtures'


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

    it('should handle REQUEST_POST_COMMENTS', () => {
      const action = {
        type: types.REQUEST_POST_COMMENTS,
        isFetching: true
      }
      const expected = {
        ...initialPostState,
        comment: {
          isFetching: true
        }
      }

      expect(post(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_POST_COMMENTS', () => {
      const action = {
        type: types.INVALIDATE_POST_COMMENTS,
        didInvalidate: true
      }
      const expected = {
        ...initialPostState,
        comment: {
          didInvalidate: true
        }
      }

      expect(post(undefined, action)).toEqual(expected)
    })

    it('should handle RECEIVE_POST_COMMENTS', () => {
      const action = {
        type: types.RECEIVE_POST_COMMENTS,
        comments: postCommentsMock
      }
      const expected = {
        ...initialPostState,
        comment: {
          didInvalidate: false,
          isFetching: false,
          items: postCommentsMock
        }
      }

      expect(post(undefined, action)).toEqual(expected)
    })
  })

  describe('create post', () => {
    it('should return the initial state', () => {
      expect(createPost(undefined, {})).toEqual(initialCreatePostState)
    })

    it('should handle REQUEST_CREATE_POST', () => {
      const action = {
        type: types.REQUEST_CREATE_POST,
        isFetching: true
      }
      const expected = {
        ...initialCreatePostState,
        isFetching: true
      }

      expect(createPost(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_CREATE_POST', () => {
      const action = {
        type: types.INVALIDATE_CREATE_POST,
        didInvalidate: true
      }
      const expected = {
        ...initialCreatePostState,
        didInvalidate: true
      }

      expect(createPost(undefined, action)).toEqual(expected)
    })

    it('should handle POST_HAS_BEEN_CREATED', () => {
      const action = {
        type: types.POST_HAS_BEEN_CREATED,
        created: true
      }
      const expected = {
        ...initialCreatePostState,
        created: true
      }

      expect(createPost(undefined, action)).toEqual(expected)
    })
  })
})