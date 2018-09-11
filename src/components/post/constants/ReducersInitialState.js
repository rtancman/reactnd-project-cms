export const initialListPostState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}

const post = {
  id: '',
  timestamp: 0,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  deleted: false,
  commentCount: 0
}

export const initialPostState = {
  isFetching: false,
  didInvalidate: false,
  ...post
}