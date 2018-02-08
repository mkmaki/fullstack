const listHelper = require('../utils/helper')
const blogs = require('./blogsForTest')

// 4.4
describe('Total likes', () => {
  test('sums all values correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
  test('empty array is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})
