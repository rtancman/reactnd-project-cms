import { categories, categoryPosts } from './reducers'
import * as types from './constants/ActionTypes'
import { initialCategoriesState, initialCategoryPostsState } from './constants/ReducersInitialState'
import { categoriesMock, categoryPostsMock } from './constants/Fixtures'


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

  describe('category posts', () => {
    it('should return the initial state', () => {
      expect(categoryPosts(undefined, {})).toEqual(initialCategoryPostsState)
    })

    it('should handle REQUEST_CATEGORY_POSTS', () => {
      const action = {
        type: types.REQUEST_CATEGORY_POSTS,
        isFetching: true
      }
      const expected = {
        ...initialCategoryPostsState,
        isFetching: true
      }

      expect(categoryPosts(undefined, action)).toEqual(expected)
    })

    it('should handle INVALIDATE_CATEGORY_POSTS', () => {
      const action = {
        type: types.INVALIDATE_CATEGORY_POSTS,
        didInvalidate: true
      }
      const expected = {
        ...initialCategoryPostsState,
        didInvalidate: true
      }

      expect(categoryPosts(undefined, action)).toEqual(expected)
    })

    it('should handle RECEIVE_CATEGORY_POSTS', () => {
      const action = {
        type: types.RECEIVE_CATEGORY_POSTS,
        isFetching: false,
        didInvalidate: false,
        items: categoryPostsMock,
      }
      const expected = {
        ...initialCategoriesState,
        items: categoryPostsMock,
      }
      
      expect(categoryPosts(undefined, action)).toEqual(expected)
    })
  })    
})