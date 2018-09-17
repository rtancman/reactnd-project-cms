import { combineReducers } from 'redux'
import { categories, categoryPosts } from 'components/category/reducers'
import { posts, post, createPost } from 'components/post/reducers'
import { createComment } from 'components/comment/reducers'

export default combineReducers({
  categories,
  posts,
  categoryPosts,
  post,
  createPost,
  createComment,
})