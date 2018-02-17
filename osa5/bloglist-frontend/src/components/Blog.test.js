import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.skip('<Blog />', () => {
// 5.14
  it('by default Blog shows only title and author', () => {
    const blog = {
      title: 'Test title',
      author: 'Test Author',
      likes: 665
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
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