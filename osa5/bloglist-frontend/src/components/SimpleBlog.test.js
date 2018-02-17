import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
// 5.12
  it('renders content', () => {
    const blog = {
      title: 'Test title',
      author: 'Test Author',
      likes: 665
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders likes count correcly', () => {
    const blog = {
      title: 'Test title',
      author: 'Test Author',
      likes: 666
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.likes')
    expect(contentDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })
})