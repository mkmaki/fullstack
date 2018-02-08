const listHelper = require('../utils/helper')
const blogs = require('./blogsForTest')

// 4.5
describe('Favorite blog', () => {
  test('most likes', () => {
    const blog = blogs[2]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog)
  })
})
