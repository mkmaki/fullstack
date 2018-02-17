import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
// 5.13
  it('clicking the button calls event handler twice', () => {
    const blog = {
      title: 'Test title',
      author: 'Test Author',
      likes: 665
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})