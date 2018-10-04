import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './actions'
import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState } from './constants/ReducersInitialState'
import { listPostsMock, postMock, postCommentsMock } from './constants/Fixtures'
import { commentMock }  from 'components/comment/constants/Fixtures'
import { listPostsUrl, headers, postUrl, postCreateUrl, postCommentsUrl } from 'api/cms';


describe('actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  describe('ListPosts', () => {
    describe('should create an action ', () => {
      it('to invalidate posts', () => {
        const bool = false
        const expectedAction = {
          type: types.INVALIDATE_POSTS,
          didInvalidate: bool
        }

        expect(actions.invalidatePosts(bool)).toEqual(expectedAction)
      })

      it('to request posts', () => {
        const bool = true
        const expectedAction = {
          type: types.REQUEST_POSTS,
          isFetching: bool
        }

        expect(actions.requestPosts(bool)).toEqual(expectedAction)
      })

      it('to receive posts', () => {
        const expectedAction = {
          type: types.RECEIVE_POSTS,
          items: listPostsMock,
        }

        expect(actions.receivePosts(listPostsMock)).toEqual(expectedAction)
      })

      it('to remove post in list posts', () => {
        const postId = 'lala123456'
        const expectedAction = {
          type: types.REMOVE_POST_IN_LIST_POSTS,
          postId,
        }

        expect(actions.removePostInListPost(postId)).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates RECEIVE_POSTS when fetching posts has been done', () => {
        fetchMock.getOnce(listPostsUrl, { body: listPostsMock })
        const expectedActions = [
          { type: types.REQUEST_POSTS, isFetching: true },
          { type: types.RECEIVE_POSTS, items: listPostsMock },
        ]
        const store = mockStore({ posts: initialListPostState })
        return store.dispatch(actions.postsFetchData()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })

  describe('Post', () => {
    describe('should create an action ', () => {
      it('to invalidate post', () => {
        const bool = false
        const expectedAction = {
          type: types.INVALIDATE_POST,
          didInvalidate: bool
        }

        expect(actions.invalidatePost(bool)).toEqual(expectedAction)
      })

      it('to request post', () => {
        const bool = true
        const expectedAction = {
          type: types.REQUEST_POST,
          isFetching: bool
        }

        expect(actions.requestPost(bool)).toEqual(expectedAction)
      })

      it('to receive post', () => {
        const expectedAction = {
          type: types.RECEIVE_POST,
          ...postMock,
        }

        expect(actions.receivePost(postMock)).toEqual(expectedAction)
      })

      it('to push list comment', () => {
        const bool = true
        const expectedAction = {
          type: types.PUSH_LIST_COMMENTS,
          comment: commentMock
        }

        expect(actions.pushListComments(commentMock)).toEqual(expectedAction)
      })

      it('to remove comment in list comments', () => {
        const commentId = commentMock.id
        const expectedAction = {
          type: types.REMOVE_COMMENT_IN_LIST_COMMENTS,
          commentId
        }

        expect(actions.removeCommentInListComments(commentId)).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates RECEIVE_POST when fetching post has been done', () => {
        const postId = 'postlala123'
        fetchMock.getOnce(postUrl(postId), { body: postMock })
        const expectedActions = [
          { type: types.REQUEST_POST, isFetching: true },
          { type: types.RECEIVE_POST, ...postMock },
        ]
        const store = mockStore({ posts: initialPostState })
        return store.dispatch(actions.postFetchData(postId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })

  describe('AddPost', () => {
    const post = {
      id: postMock.id,
      timestamp: postMock.timestamp,
      title: postMock.title,
      body: postMock.body,
      author: postMock.author,
      category: postMock.category,
    }

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates POST_HAS_BEEN_CREATED when fetching new post has been done', () => {
        fetchMock.post(postCreateUrl, { body: postMock })
        const expectedActions = [
          { type: types.PUSH_LIST_POSTS, post: postMock },
        ]
        const store = mockStore({ posts: initialListPostState })
        return store.dispatch(actions.createPostFetch(post)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })

  describe('Post Comments', () => {
    describe('should create an action ', () => {
      it('to invalidate post comments', () => {
        const bool = false
        const expectedAction = {
          type: types.INVALIDATE_POST_COMMENTS,
          didInvalidate: bool
        }

        expect(actions.invalidatePostComments(bool)).toEqual(expectedAction)
      })

      it('to request post comments', () => {
        const bool = false
        const expectedAction = {
          type: types.REQUEST_POST_COMMENTS,
          isFetching: bool
        }

        expect(actions.requestPostComments(bool)).toEqual(expectedAction)
      })

      it('to receive post comments', () => {
        const expectedAction = {
          type: types.RECEIVE_POST_COMMENTS,
          comments: postCommentsMock
        }

        expect(actions.receivePostComments(postCommentsMock)).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates RECEIVE_POST when fetching post has been done', () => {
        const postId = 'postlala123'
        fetchMock.getOnce(postCommentsUrl(postId), { body: postCommentsMock })
        const expectedActions = [
          { type: types.REQUEST_POST_COMMENTS, isFetching: true },
          { type: types.RECEIVE_POST_COMMENTS, comments: postCommentsMock },
        ]
        const store = mockStore({ posts: initialPostState })
        return store.dispatch(actions.postCommentsFetchData(postId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })

  describe('Remove Post', () => {
    describe('should create an action ', () => {
      it('to invalidate remove post', () => {
        const bool = true
        const expectedAction = {
          type: types.INVALIDATE_REMOVE_POST,
          didInvalidate: bool
        }

        expect(actions.invalidateRemovePost(bool)).toEqual(expectedAction)
      })

      it('to request remove post', () => {
        const data = {
          bool: true,
          postId: '88112233'
        }
        const expectedAction = {
          type: types.REQUEST_REMOVE_POST,
          isFetching: data.bool,
          id: data.postId
        }

        expect(actions.requestRemovePost(data)).toEqual(expectedAction)
      })

      it('to post has been removed', () => {
        const bool = true
        const expectedAction = {
          type: types.POST_HAS_BEEN_REMOVED,
          removed: bool
        }

        expect(actions.postHasBeenRemoved(bool)).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates POST_HAS_BEEN_REMOVED when fetching remove post has been done', () => {
        const postId = 'postlala123'
        fetchMock.delete(postUrl(postId), { body: {...postMock, id: postId } })
        const expectedActions = [
          { type: types.REMOVE_POST_IN_LIST_POSTS, postId }
        ]
        const store = mockStore({})
        return store.dispatch(actions.removePostFetch(postId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })
})