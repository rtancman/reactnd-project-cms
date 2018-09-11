const baseApi = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const listCategoriesUrl = `${baseApi}/categories`
export const listPostsUrl = `${baseApi}/posts`
export const categoryPostsUrl = (categoryId) => `${baseApi}/${categoryId}/posts`
export const postUrl = (postId) => `${baseApi}/posts/${postId}`