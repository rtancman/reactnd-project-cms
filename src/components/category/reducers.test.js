import { categories } from './reducers'
import * as types from './constants/ActionTypes'
import { initialCategoriesState } from './constants/ReducersInitialState'
import { categoriesMock } from './constants/Fixtures'


describe('reducers', () => {
  describe('categories', () => {
    it('should return the initial state', () => {
      expect(categories(undefined, {})).toEqual(initialCategoriesState)
    })

    it('should handle REQUEST_CATEGORIES', () => {
      const action = {
        type: types.REQUEST_CATEGORIES,
        isFetching: true
      }
      const expected = {
        ...initialCategoriesState,
        isFetching: true
      }

      expect(categories(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_CATEGORIES', () => {
      const action = {
        type: types.INVALIDATE_CATEGORIES,
        didInvalidate: true
      }
      const expected = {
        ...initialCategoriesState,
        didInvalidate: true
      }
      
      expect(categories(undefined, action)).toEqual(expected)
    })

    it('should handle RECEIVE_CATEGORIES', () => {
      const action = {
        type: types.RECEIVE_CATEGORIES,
        isFetching: false,
        didInvalidate: false,
        items: categoriesMock.categories,
      }
      const expected = {
        ...initialCategoriesState,
        items: categoriesMock.categories,
      }
      
      expect(categories(undefined, action)).toEqual(expected)
    })
  })
})