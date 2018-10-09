import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { ShowMessage } from 'components/layout/Message'

describe('ShowMessage Component', () => {
  describe('when component renders', () => {
    it('without crashing', () => {
      const props = {
        message: 'Message',
        variant: 'success',
        open: true,
      }
      const wrapper = shallow(<ShowMessage {...props} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('with success message', () => {
      const props = {
        message: 'Message success',
        variant: 'success',
        open: true,
      }
      const wrapper = mount(<ShowMessage {...props} />)
      
      const snackBar = wrapper.find('Snackbar')
      expect(snackBar.length).toBe(1)
      const snackBarMessage = snackBar.find('span.client__snackbar')
      expect(snackBarMessage.length).toBe(1)
      expect(snackBarMessage.text()).toBe('Message success')
      expect(snackBarMessage.find('CheckCircleIcon').length).toBe(1)
      const snackBarAction = snackBar.find('IconButton')
      expect(snackBarAction.length).toBe(1)
      expect(snackBarAction.find('CloseIcon').length).toBe(1)
      snackBarAction.simulate('click')
      expect(snackBar.find('CloseIcon').length).toBe(1)
      expect(wrapper.state('open')).toEqual(false)
    })

    it('with warning message', () => {
      const props = {
        message: 'Message warning',
        variant: 'warning',
        open: true,
      }
      const wrapper = mount(<ShowMessage {...props} />)
      
      const snackBar = wrapper.find('Snackbar')
      expect(snackBar.length).toBe(1)
      const snackBarMessage = snackBar.find('span.client__snackbar')
      expect(snackBarMessage.length).toBe(1)
      expect(snackBarMessage.text()).toBe('Message warning')
      expect(snackBarMessage.find('WarningIcon').length).toBe(1)
      const snackBarAction = snackBar.find('IconButton')
      expect(snackBarAction.length).toBe(1)
      expect(snackBarAction.find('CloseIcon').length).toBe(1)
      snackBarAction.simulate('click')
      expect(snackBar.find('CloseIcon').length).toBe(1)
      expect(wrapper.state('open')).toEqual(false)
    })

    it('with error message', () => {
      const props = {
        message: 'Message error',
        variant: 'error',
        open: true,
      }
      const wrapper = mount(<ShowMessage {...props} />)
      
      const snackBar = wrapper.find('Snackbar')
      expect(snackBar.length).toBe(1)
      const snackBarMessage = snackBar.find('span.client__snackbar')
      expect(snackBarMessage.length).toBe(1)
      expect(snackBarMessage.text()).toBe('Message error')
      expect(snackBarMessage.find('ErrorIcon').length).toBe(1)
      const snackBarAction = snackBar.find('IconButton')
      expect(snackBarAction.length).toBe(1)
      expect(snackBarAction.find('CloseIcon').length).toBe(1)
      snackBarAction.simulate('click')
      expect(snackBar.find('CloseIcon').length).toBe(1)
      expect(wrapper.state('open')).toEqual(false)
    })

    it('with info message', () => {
      const props = {
        message: 'Message info',
        variant: 'info',
        open: true,
      }
      const wrapper = mount(<ShowMessage {...props} />)
      
      const snackBar = wrapper.find('Snackbar')
      expect(snackBar.length).toBe(1)
      const snackBarMessage = snackBar.find('span.client__snackbar')
      expect(snackBarMessage.length).toBe(1)
      expect(snackBarMessage.text()).toBe('Message info')
      expect(snackBarMessage.find('InfoIcon').length).toBe(1)
      const snackBarAction = snackBar.find('IconButton')
      expect(snackBarAction.length).toBe(1)
      expect(snackBarAction.find('CloseIcon').length).toBe(1)
      snackBarAction.simulate('click')
      expect(snackBar.find('CloseIcon').length).toBe(1)
      expect(wrapper.state('open')).toEqual(false)
    })
  })
})