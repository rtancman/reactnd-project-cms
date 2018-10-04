import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './actions'
import * as types from './constants/ActionTypes'
import { initialCategoriesState, initialCategoryPostsState } from './constants/ReducersInitialState'
import { categoriesMock, categoryPostsMock } from './constants/Fixtures'
import { headers, listCategoriesUrl, categoryPostsUrl } from 'api/cms';

describe('actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  describe('ListCategories', () => {
    describe('should create an action', () => {
      it('to receive categories', () => {
        const expectedAction = {
          type: types.RECEIVE_CATEGORIES,
          items: categoriesMock.categories,
        }

        expect(actions.receiveCategories({categories: categoriesMock.categories})).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates RECEIVE_CATEGORIES when fetching categories has been done', () => {
        fetchMock.getOnce(listCategoriesUrl, { body: {categories: categoriesMock.categories}, headers })
        const expectedActions = [
          { type: types.RECEIVE_CATEGORIES, items: categoriesMock.categories },
        ]
        const store = mockStore({ categories: initialCategoriesState })
        return store.dispatch(actions.categoriesFetchData()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })

  describe('Category', () => {
    describe('should create an action', () => {
      it('to receive category posts', () => {
        const expectedAction = {
          type: types.RECEIVE_CATEGORY_POSTS,
          items: categoryPostsMock
        }

        expect(actions.receiveCategoryPosts(categoryPostsMock)).toEqual(expectedAction)
      })
    })

    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates RECEIVE_CATEGORY_POSTS when fetching category posts has been done', () => {
        const categoryId = 'lala'
        const expectedActions = [
          { type: types.RECEIVE_CATEGORY_POSTS, items: categoryPostsMock },
        ]
        const store = mockStore({ category: initialCategoryPostsState })

        fetchMock.getOnce(categoryPostsUrl(categoryId), { body: categoryPostsMock, headers })
        
        return store.dispatch(actions.categoryPostsFetchData(categoryId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })
})