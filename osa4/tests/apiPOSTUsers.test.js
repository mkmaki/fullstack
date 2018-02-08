const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

// tests are broken because tokens were added
describe('API POST user', async () => {
  const randomUserName = Math.random().toString(36).substr(2, 10)
  test('adding user with too short password fails', async () => {
    const user = {
      "username": "vlast",
      "name": "Vladimir P",
      "adult": true,
      "password": "kg"
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('adding user with missing parameters fails', async () => {
    const user = {
      //"username": "vlast",
      "name": "Vladimir P",
      "adult": true,
      "password": "kgb"
    }
    delete user.name
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('adding user with correct parameters works. adult field is optional', async () => {
    const user = {
      "username": randomUserName,
      "name": "Vladimir P",
      //"adult": true,
      "password": "kgb"
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  test('adding user with a name that is already taken', async () => {
    const user = {
      "username": randomUserName,
      "name": "Vladimir P",
      "adult": true,
      "password": "kgb"
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})
afterAll(() => {
  server.close()
})