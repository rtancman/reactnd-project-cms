import { combineReducers } from 'redux'
import { categories, categoryPosts } from 'components/category/reducers'
import { posts, post, createPost, removePost } from 'components/post/reducers'
import { createComment, removeComment } from 'components/comment/reducers'

export default combineReducers({
  categories,
  posts,
  categoryPosts,
  post,
  createPost,
  createComment,
  removePost,
  removeComment,
})