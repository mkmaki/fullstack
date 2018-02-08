const listHelper = require('../utils/helper')

// 4.3
test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
