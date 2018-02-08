const usersRouter = require ('express').Router()
const bcrypt = require('bcrypt')
const { User } = require ('../models/users')
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    if(!request.body.username || !request.body.name || !request.body.password) {
      return response.status(400).json({ error: 'missing parameters' })
    }
    if(request.body.password.length < 3) {
      return response.status(400).json({ error: 'password too short' })
    }
    const existingUser = await User.find({ username: request.body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username is already taken' })
    }
    const passwordHash = await bcrypt.hash(request.body.password, 10)
    const ob = {}
    ob.username = request.body.username
    ob.name = request.body.name
    ob.adult = request.body.adult || true
    ob.password = passwordHash

    const user = await new User(ob).save()
    response.status(201).json(User.format(user))

  } catch(exception) {
    response.status(400).json({ error: exception.name })
  }
})

module.exports = {
  usersRouter
}