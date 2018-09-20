import { posts, post, createPost, removePost } from './reducers'
import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState, initialCreatePostState, initialRemovePostState } from './constants/ReducersInitialState'
import { postsMock, postMock, postCommentsMock } from './constants/Fixtures'
import { commentMock } from 'components/comment/constants/Fixtures'


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


    it('should handle REMOVE_POST_IN_LIST_POSTS', () => {
      const listPost = [
        {
          id: '0664afa6-bac2-11e8-b5a3-fcaa142a9210',
          timestamp: 1467166872634,
          title: 'Post 1 title',
          body: 'Post 1 body',
          author: 'lala',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2
        },
        {
          id: '052f8016-bac2-11e8-aa21-fcaa142a9210',
          timestamp: 1467166872634,
          title: 'Post 2 title',
          body: 'Post 2 body',
          author: 'lele',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2
        },
      ]
      const action = {
        type: types.REMOVE_POST_IN_LIST_POSTS,
        postId: '052f8016-bac2-11e8-aa21-fcaa142a9210'
      }
      const expected = {
        ...initialListPostState,
        items: [listPost[0]],
      }
      const customInitialState = {
        ...initialListPostState,
        items: listPost
      }

      expect(posts(customInitialState, action)).toEqual(expected)
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

    it('should handle PUSH_LIST_COMMENTS', () => {
      const customInitialState = {
        ...initialPostState,
        comment: {
          didInvalidate: false,
          isFetching: false,
          items: postCommentsMock
        }
      }
      const action = {
        type: types.PUSH_LIST_COMMENTS,
        comment: commentMock
      }
      const expected = {
        ...initialPostState,
        comment: {
          didInvalidate: false,
          isFetching: false,
          items: [...postCommentsMock, commentMock]
        }
      }

      expect(post(customInitialState, action)).toEqual(expected)
    })

    it('should handle REMOVE_COMMENT_IN_LIST_COMMENTS', () => {
      const customInitialState = {
        ...initialPostState,
        comment: {
          didInvalidate: false,
          isFetching: false,
          items: [ ...postCommentsMock, commentMock ]
        }
      }
      const action = {
        type: types.REMOVE_COMMENT_IN_LIST_COMMENTS,
        commentId: commentMock.id
      }
      const expected = {
        ...initialPostState,
        comment: {
          didInvalidate: false,
          isFetching: false,
          items: postCommentsMock
        }
      }

      expect(post(customInitialState, action)).toEqual(expected)
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

  describe('remove post', () => {
    it('should return the initial state', () => {
      expect(removePost(undefined, {})).toEqual(initialRemovePostState)
    })

    it('should handle REQUEST_REMOVE_POST', () => {
      const postId = '12345'
      const action = {
        type: types.REQUEST_REMOVE_POST,
        isFetching: true,
        id: postId
      }
      const expected = {
        ...initialRemovePostState,
        isFetching: true,
        id: postId
      }

      expect(removePost(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_REMOVE_POST', () => {
      const action = {
        type: types.INVALIDATE_REMOVE_POST,
        didInvalidate: true
      }
      const expected = {
        ...initialRemovePostState,
        didInvalidate: true
      }

      expect(removePost(undefined, action)).toEqual(expected)
    })

    it('should handle POST_HAS_BEEN_REMOVED', () => {
      const action = {
        type: types.POST_HAS_BEEN_REMOVED,
        removed: true
      }
      const expected = {
        ...initialRemovePostState,
        removed: true
      }

      expect(removePost(undefined, action)).toEqual(expected)
    })
  })
})