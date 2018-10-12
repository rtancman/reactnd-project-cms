import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { List, ListContent } from './List'

describe('List Component', () => {
  describe('when component renders', () => {
    it('without crashing', () => {
      const props = {
        items: [],
        title: 'Title list',
      }
      const wrapper = shallow(<List {...props} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('with valid props display list content', () => {
      const props = {
        items: [
          { path: '4', name: 'item 4', },
        ],
        title: 'Title list',
      }
      const wrapper = mount(
        <MemoryRouter>
          <List {...props} />
        </MemoryRouter>
      )

      expect(wrapper.find('.list_content h2').length).toBe(1)
      expect(wrapper.find('.list_content h2').text()).toBe('Title list')
      expect(wrapper.find('.list_content__item').length).toBe(1)
      const item = wrapper.find('.list_content__item').first()
      expect(item.text()).toBe('item 4')
      expect(item.find('Link').length).toBe(1)
      expect(item.find('Link').instance().props.to).toBe('/4')
    })
  })

  describe('#orderBy', () => {
    describe('when user does not click', () => {
      it('render list like props.items', () => {
        const props = {
          items: [
            { path: '4', name: 'item 4', },
            { path: '1', name: 'item 1', },
            { path: '5', name: 'item 5', },
            { path: '3', name: 'item 3', },
            { path: '2', name: 'item 2', },
          ],
          title: 'Title list',
        }
        const wrapper = mount(
          <MemoryRouter>
            <List {...props} />
          </MemoryRouter>
        )
  
        expect(wrapper.find('List').props().items).toEqual(props.items)
      })
    })

    describe('when user click', () => {
      it('in option Default render list like props.items', () => {
        const props = {
          items: [
            { path: '4', name: 'item 4', },
            { path: '1', name: 'item 1', },
            { path: '5', name: 'item 5', },
            { path: '3', name: 'item 3', },
            { path: '2', name: 'item 2', },
          ],
          title: 'Title list',
        }
        const wrapper = mount(
          <MemoryRouter>
            <List {...props} />
          </MemoryRouter>
        )
  
        wrapper.find('div.list_content__filter__item[data-filter-option-value=false]').simulate('click')
        expect(wrapper.find('List').props().items).toEqual(props.items)
        expect(wrapper.find('List').instance().state.orderBy).toEqual(false)
        const item = wrapper.find('.list_content__item').first()
        expect(item.text()).toBe('item 4')
        expect(item.find('Link').length).toBe(1)
        expect(item.find('Link').instance().props.to).toBe('/4')
      })
  
      it('in option Name render list sorted by path', () => {
        const sortedByPath = [
          { path: '1', name: 'item 1', },
          { path: '2', name: 'item 2', },
          { path: '3', name: 'item 3', },
          { path: '4', name: 'item 4', },
          { path: '5', name: 'item 5', },
        ]
        const props = {
          items: [
            { path: '4', name: 'item 4', },
            { path: '1', name: 'item 1', },
            { path: '5', name: 'item 5', },
            { path: '3', name: 'item 3', },
            { path: '2', name: 'item 2', },
          ],
          title: 'Title list',
        }
        const wrapper = mount(
          <MemoryRouter>
            <List {...props} />
          </MemoryRouter>
        )
  
        wrapper.find('div.list_content__filter__item[data-filter-option-value="path"]').simulate('click')
        expect(wrapper.find('List').props().items).toEqual(sortedByPath)
        expect(wrapper.find('List').instance().state.orderBy).toEqual('path')
        const item = wrapper.find('.list_content__item').first()
        expect(item.text()).toBe('item 1')
        expect(item.find('Link').length).toBe(1)
        expect(item.find('Link').instance().props.to).toBe('/1')
      })
    })
  })
})

describe('ListContent Component', () => {
  describe('when component renders', () => {
    it('without crashing', () => {
      const props = {
        items: [],
        title: 'Title list content',
      }
      const wrapper = shallow(<ListContent {...props} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('with valid props display list content', () => {
      const props = {
        items: [
          {
            "id": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1467166872634,
            "title": "Udacity is the best place to learn React",
            "body": "Everyone says so after all.",
            "author": "thingtwo",
            "category": "react",
            "voteScore": 6,
            "deleted": false,
            "commentCount": 2
          },
        ],
        title: 'Title list content',
      }
      const wrapper = mount(
        <MemoryRouter>
          <ListContent {...props} />
        </MemoryRouter>
      )

      expect(wrapper.find('.list_content h2').length).toBe(1)
      expect(wrapper.find('.list_content h2').text()).toBe('Title list content')
      expect(wrapper.find('.list_content__item').length).toBe(1)
      const item = wrapper.find('.list_content__item').first()
      const itemTitle = item.find('.list_content__item__title')
      expect(itemTitle.text()).toBe('Udacity is the best place to learn React')
      expect(itemTitle.find('Link').length).toBe(1)
      expect(itemTitle.find('Link').instance().props.to).toBe('/react/8xf0y6ziyjabvozdd253nd')
      const itemInfo = item.find('.list_content__item__info')
      expect(itemInfo.text()).toBe('date 06-28-2016 - in react - by thingtwo')
      expect(itemInfo.find('Link').length).toBe(1)
      expect(itemInfo.find('Link').instance().props.to).toBe('/react')
    })
  })

  describe('#orderBy', () => {
    describe('when user does not click', () => {
      it('render list sorted by default orderBy -voteScore', () => {
        const props = {
          items: [
            {
              "id": "8xf0y6ziyjabvozdd253nd",
              "timestamp": 1467166872634,
              "title": "Udacity is the best place to learn React",
              "body": "Everyone says so after all.",
              "author": "thingtwo",
              "category": "react",
              "voteScore": 6,
              "deleted": false,
              "commentCount": 2
            },
            {
              "id": "6ni6ok3ym7mf1p33lnez",
              "timestamp": 1468479767190,
              "title": "Learn Redux in 10 minutes!",
              "body": "Just kidding. It takes more than 10 minutes to learn technology.",
              "author": "lala",
              "category": "redux",
              "voteScore": 105,
              "deleted": false,
              "commentCount": 0
            }
          ],
          title: 'Title list content',
        }
        const wrapper = mount(
          <MemoryRouter>
            <ListContent {...props} />
          </MemoryRouter>
        )
  
        expect(wrapper.find('ListContent').instance().state.orderBy).toEqual('-voteScore')
        const item = wrapper.find('.list_content__item').first()
        const itemTitle = item.find('.list_content__item__title')
        expect(itemTitle.text()).toBe('Learn Redux in 10 minutes!')
        expect(itemTitle.find('Link').length).toBe(1)
        expect(itemTitle.find('Link').instance().props.to).toBe('/redux/6ni6ok3ym7mf1p33lnez')
        const itemInfo = item.find('.list_content__item__info')
        expect(itemInfo.text()).toBe('date 07-14-2016 - in redux - by lala')
        expect(itemInfo.find('Link').length).toBe(1)
        expect(itemInfo.find('Link').instance().props.to).toBe('/redux')
      })
    })

    describe('when user click', () => {
      it('in option Category render list sorted by post category', () => {
        const props = {
          items: [
            {
              "id": "8xf0y6ziyjabvozdd253nd",
              "timestamp": 1467166872634,
              "title": "Udacity is the best place to learn React",
              "body": "Everyone says so after all.",
              "author": "thingtwo",
              "category": "react",
              "voteScore": 6,
              "deleted": false,
              "commentCount": 2
            },
            {
              "id": "6ni6ok3ym7mf1p33lnez",
              "timestamp": 1468479767190,
              "title": "Learn Redux in 10 minutes!",
              "body": "Just kidding. It takes more than 10 minutes to learn technology.",
              "author": "lala",
              "category": "redux",
              "voteScore": 105,
              "deleted": false,
              "commentCount": 0
            },
          ],
          title: 'Title list',
        }
        const expected = [
          {title: 'Udacity is the best place to learn React', linkTitle: '/react/8xf0y6ziyjabvozdd253nd', info: 'date 06-28-2016 - in react - by thingtwo', linkInfo: '/react'},
          {title: 'Learn Redux in 10 minutes!', linkTitle: '/redux/6ni6ok3ym7mf1p33lnez', info: 'date 07-14-2016 - in redux - by lala', linkInfo: '/redux'},
        ]

        const wrapper = mount(
          <MemoryRouter>
            <ListContent {...props} />
          </MemoryRouter>
        )
  
        wrapper.find('div.list_content__filter__item[data-filter-option-value="category"]').simulate('click')
        expect(wrapper.find('ListContent').instance().state.orderBy).toEqual('category')
        wrapper.find('.list_content__item').forEach((node, i) => {
          let itemTitle = node.find('.list_content__item__title')
          expect(itemTitle.text()).toBe(expected[i].title)
          expect(itemTitle.find('Link').length).toBe(1)
          expect(itemTitle.find('Link').instance().props.to).toBe(expected[i].linkTitle)
          let itemInfo = node.find('.list_content__item__info')
          expect(itemInfo.text()).toBe(expected[i].info)
          expect(itemInfo.find('Link').length).toBe(1)
          expect(itemInfo.find('Link').instance().props.to).toBe(expected[i].linkInfo)
        });
      })
  
      it('in option Recent render list sorted by post -timestamp', () => {
        const props = {
          items: [
            {
              "id": "8xf0y6ziyjabvozdd253nd",
              "timestamp": 1468479767190,
              "title": "Udacity is the best place to learn React",
              "body": "Everyone says so after all.",
              "author": "thingtwo",
              "category": "react",
              "voteScore": 6,
              "deleted": false,
              "commentCount": 2
            },
            {
              "id": "1468479767190",
              "timestamp": 1539053910610,
              "title": "teste 3",
              "body": "teste body 3",
              "author": "lele",
              "category": "oieee",
              "voteScore": 6,
              "deleted": false,
              "commentCount": 2
            },
            {
              "id": "6ni6ok3ym7mf1p33lnez",
              "timestamp": 1539053766412,
              "title": "Learn Redux in 10 minutes!",
              "body": "Just kidding. It takes more than 10 minutes to learn technology.",
              "author": "lala",
              "category": "redux",
              "voteScore": 105,
              "deleted": false,
              "commentCount": 0
            },
          ],
          title: 'Title list',
        }
        const expected = [
          {title: 'teste 3', linkTitle: '/oieee/1468479767190', info: 'date 10-08-2018 - in oieee - by lele', linkInfo: '/oieee'},
          {title: 'Learn Redux in 10 minutes!', linkTitle: '/redux/6ni6ok3ym7mf1p33lnez', info: 'date 10-08-2018 - in redux - by lala', linkInfo: '/redux'},
          {title: 'Udacity is the best place to learn React', linkTitle: '/react/8xf0y6ziyjabvozdd253nd', info: 'date 07-14-2016 - in react - by thingtwo', linkInfo: '/react'},
        ]
        const wrapper = mount(
          <MemoryRouter>
            <ListContent {...props} />
          </MemoryRouter>
        )

        wrapper.find('div.list_content__filter__item[data-filter-option-value="-timestamp"]').simulate('click')
        expect(wrapper.find('ListContent').instance().state.orderBy).toEqual('-timestamp')
        wrapper.find('.list_content__item').forEach((node, i) => {
          let itemTitle = node.find('.list_content__item__title')
          expect(itemTitle.text()).toBe(expected[i].title)
          expect(itemTitle.find('Link').length).toBe(1)
          expect(itemTitle.find('Link').instance().props.to).toBe(expected[i].linkTitle)
          let itemInfo = node.find('.list_content__item__info')
          expect(itemInfo.text()).toBe(expected[i].info)
          expect(itemInfo.find('Link').length).toBe(1)
          expect(itemInfo.find('Link').instance().props.to).toBe(expected[i].linkInfo)
        });
      })

      it('in option Popular render list sorted by post -voteScore', () => {
        const props = {
          items: [
            {
              "id": "8xf0y6ziyjabvozdd253nd",
              "timestamp": 1468479767190,
              "title": "Udacity is the best place to learn React",
              "body": "Everyone says so after all.",
              "author": "thingtwo",
              "category": "react",
              "voteScore": 611,
              "deleted": false,
              "commentCount": 2
            },
            {
              "id": "1468479767190",
              "timestamp": 1539053910610,
              "title": "teste 3",
              "body": "teste body 3",
              "author": "lele",
              "category": "oieee",
              "voteScore": 42,
              "deleted": false,
              "commentCount": 2
            },
            {
              "id": "6ni6ok3ym7mf1p33lnez",
              "timestamp": 1539053766412,
              "title": "Learn Redux in 10 minutes!",
              "body": "Just kidding. It takes more than 10 minutes to learn technology.",
              "author": "lala",
              "category": "redux",
              "voteScore": 1005,
              "deleted": false,
              "commentCount": 0
            },
          ],
          title: 'Title list',
        }
        const expected = [
          {title: 'Learn Redux in 10 minutes!', linkTitle: '/redux/6ni6ok3ym7mf1p33lnez', info: 'date 10-08-2018 - in redux - by lala', linkInfo: '/redux'},
          {title: 'Udacity is the best place to learn React', linkTitle: '/react/8xf0y6ziyjabvozdd253nd', info: 'date 07-14-2016 - in react - by thingtwo', linkInfo: '/react'},
          {title: 'teste 3', linkTitle: '/oieee/1468479767190', info: 'date 10-08-2018 - in oieee - by lele', linkInfo: '/oieee'},
        ]

        const wrapper = mount(
          <MemoryRouter>
            <ListContent {...props} />
          </MemoryRouter>
        )

        wrapper.find('div.list_content__filter__item[data-filter-option-value="-voteScore"]').simulate('click')
        expect(wrapper.find('ListContent').instance().state.orderBy).toEqual('-voteScore')
        wrapper.find('.list_content__item').forEach((node, i) => {
          let itemTitle = node.find('.list_content__item__title')
          expect(itemTitle.text()).toBe(expected[i].title)
          expect(itemTitle.find('Link').length).toBe(1)
          expect(itemTitle.find('Link').instance().props.to).toBe(expected[i].linkTitle)
          let itemInfo = node.find('.list_content__item__info')
          expect(itemInfo.text()).toBe(expected[i].info)
          expect(itemInfo.find('Link').length).toBe(1)
          expect(itemInfo.find('Link').instance().props.to).toBe(expected[i].linkInfo)
        });
      })
    })
  })
})