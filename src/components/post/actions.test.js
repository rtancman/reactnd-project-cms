import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './actions'
import * as types from './constants/ActionTypes'
import { initialListPostState, initialPostState } from './constants/ReducersInitialState'
import { listPostsMock, postMock } from './constants/Fixtures'
import { listPostsUrl, headers, postUrl, postCreateUrl } from 'api/cms';


describe('actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  describe('ListPosts', () => {
    it('should create an action to invalidate posts', () => {
      const bool = false
      const expectedAction = {
        type: types.INVALIDATE_POSTS,
        didInvalidate: bool
      }

      expect(actions.invalidatePosts(bool)).toEqual(expectedAction)
    })

    it('should create an action to request posts', () => {
      const bool = true
      const expectedAction = {
        type: types.REQUEST_POSTS,
        isFetching: bool
      }

      expect(actions.requestPosts(bool)).toEqual(expectedAction)
    })

    it('should create an action to receive posts', () => {
      const expectedAction = {
        type: types.RECEIVE_POSTS,
        items: listPostsMock,
      }

      expect(actions.receivePosts(listPostsMock)).toEqual(expectedAction)
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
    describe('should create an action ', () => {
      it('to invalidate add post', () => {
        const bool = false
        const expectedAction = {
          type: types.INVALIDATE_ADD_POST,
          didInvalidate: bool
        }

        expect(actions.invalidateAddPost(bool)).toEqual(expectedAction)
      })

      it('to request add post', () => {
        const bool = true
        const expectedAction = {
          type: types.REQUEST_ADD_POST,
          isFetching: bool
        }

        expect(actions.requestAddPost(bool)).toEqual(expectedAction)
      })

      it('to add post', () => {
        const expectedAction = {
          type: types.ADD_POST,
          ...postMock,
        }

        expect(actions.addPost(postMock)).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates ADD_POST when fetching new post has been done', () => {
        const post = {
          id: postMock.id,
          timestamp: postMock.timestamp,
          title: postMock.title,
          body: postMock.body,
          author: postMock.author,
          category: postMock.category,
        }
        fetchMock.post(postCreateUrl, { body: postMock })
        const expectedActions = [
          { type: types.REQUEST_ADD_POST, isFetching: true },
          { type: types.ADD_POST, ...postMock },
        ]
        const store = mockStore({ posts: initialListPostState })
        return store.dispatch(actions.createPostFetch(post)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })
})