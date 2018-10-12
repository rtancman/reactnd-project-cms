import React from 'react'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { MemoryRouter } from 'react-router';
import thunk from 'redux-thunk'
import Category from './Category'
import { Provider } from 'react-redux';
import { listCategoriesUrl, listPostsUrl } from '../../api/cms';
import { listPostsMock } from '../post/constants/Fixtures'
import { initialListPostState } from '../post/constants/ReducersInitialState'
import { initialCategoriesState } from './constants/ReducersInitialState'
import { categoriesMock } from './constants/Fixtures'


describe('Category Component', () => {
  fetchMock.getOnce(listCategoriesUrl, { body: {categories: categoriesMock.categories} })
  fetchMock.getOnce(listPostsUrl, { body: listPostsMock })
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const categoryId = categoriesMock.categories[0].path
  const fetchData = jest.fn(() => Promise.resolve({body:{}}))
  let store
  
  describe('when component renders', () => {
    beforeEach(() => {
      store = mockStore({
        categories: {...initialCategoriesState, items: categoriesMock.categories},
        posts: {...initialListPostState, items: listPostsMock},
      })
    })

    it('without crashing', () => {
      const props = {
        store: store,
        categories: {},
        posts: {},
        categoryId: categoryId,
      }
      let wrapper = shallow(<Category {...props} />)

      expect(wrapper).toMatchSnapshot();
    })

    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    it('displays the NotFoundPage component when request category posts', () => {
      const props = {
        categoryId: '1111',
      }
      const root = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Category {...props} />
          </MemoryRouter>
        </Provider>
      );

      const wrapper = root.find('Category')
      expect(wrapper.length).toBe(1)
      expect(wrapper.find('NotFoundPage').length).toBe(1);
      expect(wrapper.find('ListContent').length).toBe(0);
    })

    it('displays the ListContent component when request category posts', () => {
      const props = {
        categoryId: categoryId,
      }
      const root = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Category {...props} />
          </MemoryRouter>
        </Provider>
      );
      
      let wrapper = root.find('Category')
      expect(wrapper.length).toBe(1)
      wrapper.instance().setState({isFetching: false})
      root.update()
      wrapper = root.find('Category')
      expect(wrapper.find('NotFoundPage').length).toBe(0);
      expect(wrapper.find('ListContent').length).toBe(1);
    })

    it('calls componentDidMount() lifecycle method', () => {
      const componentDidMountSpy = jest.spyOn(Category.prototype, 'componentDidMount');
      const props = {
        store: store,
        fetchData: fetchData,
        items: [],
        categoryId: categoryId,
      }
      let wrapper = shallow(<Category {...props} />)

      expect(Category.prototype.componentDidMount).toHaveBeenCalledTimes(1)
      componentDidMountSpy.mockRestore()
    })
  })
})