import React from 'react'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { MemoryRouter } from 'react-router';
import thunk from 'redux-thunk'
import Category from './Category'
import { initialCategoryPostsState } from './constants/ReducersInitialState'
import { categoryPostsMock } from './constants/Fixtures'
import { categoryPostsUrl } from 'api/cms';
import { Provider } from 'react-redux';


describe('Category Component', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const categoryId = 'd98340dc-ca67-11e8-9479-1866dafe6ab0'
  const fetchData = jest.fn(() => Promise.resolve({body:{}}))
  let store
  
  describe('when component renders', () => {
    beforeEach(() => {
      store = mockStore({categoryPosts: {...initialCategoryPostsState, items: categoryPostsMock} })
      fetchMock.getOnce(categoryPostsUrl(categoryId), { body: categoryPostsMock })
    })

    it('without crashing', () => {
      const props = {
        store: store,
        fetchData: fetchData,
        items: [],
        categoryId: categoryId,
      }
      let wrapper = shallow(<Category {...props} />)

      expect(wrapper).toMatchSnapshot();
    })

    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    it('displays the CircularProgress component when request category posts', () => {
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

      const wrapper = root.find('Category')
      expect(wrapper.length).toBe(1)
      expect(wrapper.find('CircularProgress').length).toBe(1);
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
      expect(wrapper.find('CircularProgress').length).toBe(0);
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