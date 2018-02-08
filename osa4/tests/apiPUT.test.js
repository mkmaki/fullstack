const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { blogsInDb } = require('./test_helper')

// 4.14
describe('API PUT tests', async () => {
  test('modifying invalid blog id fails', async () => {
    const blogit = await blogsInDb()
    const blog = {
      "title": "overwrite",
      "author": "overwrite",
      "url": "overwrite",
      "likes": 1111
    }
  await api
    .put('/api/blogs/5a785a4252ecf4cd6cfcbe64ddddd')
    .send(blog)
    .expect(400)
  })

  test('only likes field can modify blog', async () => {
    const blogit = await blogsInDb()
    const firstBlogId = blogit[0].id
    const blog = {
      "title": "overwrite",
      "author": "overwrite",
      "url": "overwrite",
      "likes": 2111
    }
  await api
    .put(`/api/blogs/${firstBlogId}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  afterAll(() => {
    server.close()
  })
})