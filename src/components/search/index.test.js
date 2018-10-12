import React from 'react'
import { shallow, mount } from 'enzyme'
import Search from './'
import { MemoryRouter } from 'react-router';
import Input from '@material-ui/core/Input';

describe('Search Component', () => {
  const history = jest.fn()
  const options = [
    { name: 'article 1', path: '/article/1' },
    { name: 'post 1', path: '/post/2' },
    { name: 'article 2', path: '/article/2' },
    { name: 'post 2', path: '/post/2' },
  ]

  describe('when component renders', () => {
    it('without crashing', () => {
      const props = {
        options: [],
        history,
      }
      const wrapper = shallow(<Search {...props} />)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when search have result', () => {
    describe('when component renders', () => {
      it('display children components', () => {
        const props = {
          options,
        }
        const root = mount(
          <MemoryRouter>
            <Search {...props} />
          </MemoryRouter>
        )
        
        const search = root.find('Search')
        expect(search.length).toBe(1)
        expect(search.find('Input').length).toBe(1)
        expect(search.find('SearchIcon').length).toBe(1)
        expect(search.find('Paper').length).toBe(1)
        expect(search.find('Paper').text()).toEqual('')
      })
    })

    describe('when user put word in search', () => {

      it('simulate change event for input', () => {
        const props = {
          options,
        }
        const root = mount(
          <MemoryRouter>
            <Search {...props} />
          </MemoryRouter>
        )

        const search = root.find('Search')
        search.instance().onSearchDebounced = search.instance().onSearch //@TODO change this hack ;)
        const inputSearch = search.find('Input[name="query"]').find('input')
        inputSearch.instance().value = "article"
        inputSearch.simulate('change');
        expect(search.instance().state.query).toEqual('article')
        expect(search.instance().state.items.length).toBe(2)
      })
    })
  })
})