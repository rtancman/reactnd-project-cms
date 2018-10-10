import React from 'react'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import { MemoryRouter, Match } from 'react-router';
import { initialCategoriesState, initialCategoryPostsState } from 'components/category/constants/ReducersInitialState'
import { categoriesMock, categoryPostsMock } from 'components/category/constants/Fixtures'
import { initialListPostState, initialPostState } from 'components/post/constants/ReducersInitialState'
import { listPostsMock, postMock, postCommentsMock } from 'components/post/constants/Fixtures'
import { listCategoriesUrl, listPostsUrl, categoryPostsUrl, postUrl, postCommentsUrl } from 'api/cms'
import { Provider } from 'react-redux'
import App from './App'

describe('App Component', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const categoryId = 'd98340dc-ca67-11e8-9479-1866dafe6ab0'
  const postId = '2cd9c540-cc47-11e8-882f-fcaa142a9210'
  let store
  fetchMock.getOnce(listCategoriesUrl, { body: {categories: categoriesMock.categories} })
  fetchMock.getOnce(listPostsUrl, { body: listPostsMock })
  fetchMock.getOnce(categoryPostsUrl(categoryId), { body: categoryPostsMock })
  fetchMock.getOnce(postUrl(postId), { body: postMock })
  fetchMock.getOnce(postCommentsUrl(postId), { body: postCommentsMock })

  
  describe('when component renders', () => {

    beforeEach(() => {
      store = mockStore({
        categories: {...initialCategoriesState, items: categoriesMock.categories},
        posts: {...initialListPostState, items: listPostsMock},
        categoryPosts: {...initialCategoryPostsState, items: categoryPostsMock},
        post: {...initialPostState, content: postMock, comment: postCommentsMock},
      })
    })

    it('without crashing', () => {
      const props = {
        store: store,
      }
      let wrapper = shallow(<App {...props} />)

      expect(wrapper).toMatchSnapshot();
    })

    it('HomePage without crashing', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter 
            initialEntries={['/']}
            initialIndex={0}
          >
            <App />
          </MemoryRouter>
        </Provider>
      )
      
      let wrapper = root.find('Home')
      expect(wrapper.length).toBe(1)
    })

    it('CategoryPage without crashing', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter 
            initialEntries={[`/category/${categoryId}`]}
            initialIndex={0}
          >
            <App />
          </MemoryRouter>
        </Provider>
      )
      
      let wrapper = root.find('CategoryPage')
      expect(wrapper.length).toBe(1)
    })

    it('PostCreatePage without crashing', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter 
            initialEntries={['/posts/create']}
            initialIndex={0}
          >
            <App />
          </MemoryRouter>
        </Provider>
      )
      
      let wrapper = root.find('PostCreatePage')
      expect(wrapper.length).toBe(1)
    })

    it('PostEditPage without crashing', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter 
            initialEntries={[`/posts/edit/${postId}`]}
            initialIndex={0}
          >
            <App />
          </MemoryRouter>
        </Provider>
      )
      
      let wrapper = root.find('PostEditPage')
      expect(wrapper.length).toBe(1)
    })

    xit('PostPage without crashing', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter 
            initialEntries={[`/posts/${postId}`]}
            initialIndex={0}
          >
            <App />
          </MemoryRouter>
        </Provider>
      )
      
      let wrapper = root.find('PostPage')
      expect(wrapper.length).toBe(1)
    })
  })
})