import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { MemoryRouter } from 'react-router'
import thunk from 'redux-thunk'
import ListCategories from './ListCategories'
import { initialCategoriesState } from './constants/ReducersInitialState'
import { categoriesMock } from './constants/Fixtures'
import { listCategoriesUrl } from '../../api/cms'
import { Provider } from 'react-redux'


describe('ListCategory Component', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store
  
  describe('when component renders', () => {
    beforeEach(() => {
      store = mockStore({categories: {...initialCategoriesState, items: categoriesMock.categories} })
      fetchMock.getOnce(listCategoriesUrl, { body: {categories: categoriesMock.categories} })
    })

    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })
    
    it('without crashing', () => {
      const props = {
        store: store,
      }
      let wrapper = shallow(<ListCategories {...props} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('when request categories displays the CircularProgress', () => {
      store = mockStore({categories: {...initialCategoriesState, items: []} })
      const root = mount(
        <Provider store={store}>
          <MemoryRouter>
            <ListCategories />
          </MemoryRouter>
        </Provider>
      )

      let wrapper = root.find('ListCategories')
      expect(wrapper.length).toBe(1)
      wrapper.instance().setState({isFetching: true})
      root.update()
      wrapper = root.find('ListCategories')
      expect(wrapper.find('CircularProgress').length).toBe(1)
      expect(wrapper.props().items.length).toBe(0)
      expect(wrapper.find('List').length).toBe(0)
    })
  
    it('when receive categories displays the List', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter>
            <ListCategories />
          </MemoryRouter>
        </Provider>
      )

      let wrapper = root.find('ListCategories')
      expect(wrapper.length).toBe(1)
      wrapper.instance().setState({isFetching: false})
      root.update()
      wrapper = root.find('ListCategories')
      expect(wrapper.find('CircularProgress').length).toBe(0)
      expect(wrapper.find('List').length).toBe(1)
    })
  
    it('when does not receive categories show the error message', () => {
      const root = mount(
        <Provider store={store}>
          <MemoryRouter>
            <ListCategories />
          </MemoryRouter>
        </Provider>
      )

      let wrapper = root.find('ListCategories')
      expect(wrapper.length).toBe(1)
      wrapper.instance().setState({
        isFetching: false,
        didInvalidate: true,
      })
      root.update()
      wrapper = root.find('ListCategories')
      expect(wrapper.find('p').length).toBe(1)
      expect(wrapper.find('p').text()).toBe('Sorry! There was an error loading the items')
      expect(wrapper.find('CircularProgress').length).toBe(0)
    })
  })
})