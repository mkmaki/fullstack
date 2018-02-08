const supertest = require('supertest')
const { app, server } = require('../index')
const supertestApp = supertest(app)

const helper = require('./test_helper')

describe('API GET tests', () => {
  // 4.8
  test('blogs return as json', async () => {
    await supertestApp
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // 4.9
  test('Adding blog returns 201 json', async () => {
    const blog = {
      "title": "TestTitle",
      "author": "TestAuthor",
      "url": "http://testurl.com"
    }
    await supertestApp
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    })

  // 4.10
  test('Missing likes sets it to zero', async () => {
    const randomTitle = Math.random().toString(36).substr(2, 10)
    const blog = {
      "title": randomTitle,
      "author": "Test Author",
      "url": "http://testurl.com"
    }
    const response = await supertestApp
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const res = await supertestApp.get('/api/blogs')
      const ob = res.body.find(m => m.title === randomTitle)

      expect(ob.title).toEqual(randomTitle)
      expect(ob.likes).toBe(0)
    })
  // 4.11
  test('Missing title or url returns 400', async () => {
    const blog = {
      "author": "Missing Title and URL",
      "likes": 1
    }
    const response = await supertestApp
      .post('/api/blogs')
      .send(blog)
      .expect(400)
    })
})

afterAll(() => {
  server.close()
})