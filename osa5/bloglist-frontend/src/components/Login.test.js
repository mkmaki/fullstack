import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../App'
import Login from './Login'

// 5.15, 5.16

describe('Integration test for App', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<div><App/></div>)
    })

    it('only login form is rendered', () => {
      app.update()
      const testDiv1 = app.find('.login')
      expect(testDiv1.length).toBe(1)
      const testDiv2 = app.find('.blogspage')
      expect(testDiv2.length).toBe(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      window.localStorage.setItem('FullStackUser', JSON.stringify(user))
      app = mount(<div><App/></div>)
    })

    it('all notes are rendered', () => {
      app.update()
      const testDiv1 = app.find('.login')
      expect(testDiv1.length).toBe(0)
      const testDiv2 = app.find('.blogspage')
      expect(testDiv2.length).toBe(1)
    })
  })
})