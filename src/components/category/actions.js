export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const INVALIDATE_CATEGORIES = 'INVALIDATE_CATEGORIES'

export const invalidateCategories = (bool) => {
  return {
      type: 'INVALIDATE_CATEGORIES',
      didInvalidate: bool
  }
}

export const requestCategories = (bool) => {
  return {
      type: 'REQUEST_CATEGORIES',
      isFetching: bool
  }
}

export const receiveCategories = (data) => {
  return {
      type: 'RECEIVE_CATEGORIES',
      items: data.categories
  }
}

export function categoriesFetchData(url, headers) {
  return (dispatch) => {
    dispatch(requestCategories(true));
    fetch(url, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => dispatch(receiveCategories(json)))
      .catch(() => dispatch(invalidateCategories(true)));
  };
}