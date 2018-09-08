import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './actions'
import * as types from './constants/ActionTypes'
import { initialCategoriesState } from './constants/ReducersInitialState'
import { categoriesMock } from './constants/Fixtures'

describe('actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'whatever-you-want'
  }

  describe('ListCategories', () => {
    it('should create an action to invalidate categories', () => {
      const bool = false
      const expectedAction = {
        type: types.INVALIDATE_CATEGORIES,
        didInvalidate: bool
      }

      expect(actions.invalidateCategories(bool)).toEqual(expectedAction)
    })

    it('should create an action to request categories', () => {
      const bool = true
      const expectedAction = {
        type: types.REQUEST_CATEGORIES,
        isFetching: bool
      }

      expect(actions.requestCategories(bool)).toEqual(expectedAction)
    })

    it('should create an action to receive categories', () => {
      const expectedAction = {
        type: types.RECEIVE_CATEGORIES,
        items: categoriesMock.categories,
      }

      expect(actions.receiveCategories({categories: categoriesMock.categories})).toEqual(expectedAction)
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates RECEIVE_CATEGORIES when fetching categories has been done', () => {
        fetchMock.getOnce('/categories', { body: {categories: categoriesMock.categories}, headers })
        const expectedActions = [
          { type: types.REQUEST_CATEGORIES, isFetching: true },
          { type: types.RECEIVE_CATEGORIES, items: categoriesMock.categories },
        ]
        const store = mockStore({ categories: initialCategoriesState })
        return store.dispatch(actions.categoriesFetchData()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })
})