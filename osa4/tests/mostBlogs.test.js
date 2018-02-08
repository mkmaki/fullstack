const listHelper = require('../utils/helper')
const blogs = require('./blogsForTest')

// 4.6
describe('Most blogs', () => {
  test('test finds most blogs holder', () => {
    const expected = [ {
      author: 'Robert C. Martin',
      blogs: 2
    },
    {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    }
    ]
    const result = listHelper.mostBlogs(blogs)
    expect(expected).toContainEqual(result)
  })
})
