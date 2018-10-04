import { categories, categoryPosts } from './reducers'
import * as types from './constants/ActionTypes'
import { initialCategoriesState, initialCategoryPostsState } from './constants/ReducersInitialState'
import { categoriesMock, categoryPostsMock } from './constants/Fixtures'


describe('reducers', () => {
  describe('categories', () => {
    it('should return the initial state', () => {
      expect(categories(undefined, {})).toEqual(initialCategoriesState)
    })

    it('should handle RECEIVE_CATEGORIES', () => {
      const action = {
        type: types.RECEIVE_CATEGORIES,
        items: categoriesMock.categories,
      }
      const expected = {
        items: categoriesMock.categories,
      }
      
      expect(categories(undefined, action)).toEqual(expected)
    })
  })

  describe('category posts', () => {
    it('should return the initial state', () => {
      expect(categoryPosts(undefined, {})).toEqual(initialCategoryPostsState)
    })

    it('should handle RECEIVE_CATEGORY_POSTS', () => {
      const action = {
        type: types.RECEIVE_CATEGORY_POSTS,
        items: categoryPostsMock,
      }
      const expected = {
        items: categoryPostsMock,
      }
      
      expect(categoryPosts(undefined, action)).toEqual(expected)
    })
  })    
})