import { combineReducers } from 'redux'
import { categories } from 'components/category/reducers'
import { posts } from 'components/post/reducers'

export default combineReducers({
  categories,
  posts,
})