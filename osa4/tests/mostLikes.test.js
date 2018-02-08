const listHelper = require('../utils/helper')
const blogs = require('./blogsForTest')

// 4.7
describe('Most likes/votes', () => {
  test('test finds most votes holder', () => {
    const expected = [ {
      author: 'Edsger W. Dijkstra',
      votes: 17
    } ]
    const result = listHelper.mostLikes(blogs)
    expect(expected).toContainEqual(result)
  })
})
