const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { blogsInDb, initialBlogs } = require('./test_helper')
const { Blog, mongoose } = require ('../models/blogs')

// 4.13
describe('API DELETE tests', async () => {
  test('delete using wrong id fails', async () => {
    await api
      .delete('/api/blogs/5a7859b13e301ccce86d3bd3asddddddd')
      .expect(400)
  })

  test('deleting a blog returns 204 and blog count is reduced by one', async () => {
    const blogsBefore = await blogsInDb()
    const firstBlogId = blogsBefore[0].id
    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .expect(204)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length-1)
  })

  afterAll(() => {
    server.close()
  })
})
