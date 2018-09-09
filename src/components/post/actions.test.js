import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './actions'
import * as types from './constants/ActionTypes'
import { initialListPostState } from './constants/ReducersInitialState'
import { listPostsMock } from './constants/Fixtures'
import { listPostsUrl, headers } from 'api/cms';


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
        fetchMock.getOnce(listPostsUrl, { body: listPostsMock, headers })
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
})