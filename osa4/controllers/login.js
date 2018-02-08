const loginRouter = require ('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require ('../models/users')

const bodyParser = require('body-parser')
loginRouter.use(bodyParser.json())

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(request.body.password, user.password)

  if ( !(user && passwordCorrect) ) {
    return response.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = {
  loginRouter
}