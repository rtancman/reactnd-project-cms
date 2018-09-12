import { combineReducers } from 'redux'
import { categories, categoryPosts } from 'components/category/reducers'
import { posts, post } from 'components/post/reducers'

export default combineReducers({
  categories,
  posts,
  categoryPosts,
  post,
})