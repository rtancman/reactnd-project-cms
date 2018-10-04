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
export const postCreateUrl = `${baseApi}/posts`
export const postCommentsUrl = (postId) => `${baseApi}/posts/${postId}/comments`
export const commentCreateUrl = `${baseApi}/comments`
export const commentUrl = (commentId) => `${baseApi}/comments/${commentId}`

export function postVoteFetch(url, option) {
  return fetch(url, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option})
    })
    .then(res => res.json())
}

export function createCommentFetch(comment) {
  return fetch(commentCreateUrl, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(res => res.json())
}

export function editCommentFetch(commentId, comment) {
  return fetch(commentUrl(commentId), { 
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(res => res.json())
}

