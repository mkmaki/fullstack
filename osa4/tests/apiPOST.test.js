const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('adding blog', async () => {
  const blog = {
    "title": "TestTitle",
    "author": "TestAuthor",
    "url": "http://testurl.com"
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


})

afterAll(() => {
  server.close()
})