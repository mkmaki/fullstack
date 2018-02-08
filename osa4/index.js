const cors = require('cors')
const http = require('http')
const express = require ('express')
const app = express()
const server = http.createServer(app)
const config = require('./utils/config')
const mongoose = require('mongoose')
const { blogsRouter } = require('./controllers/blogs')
const { loginRouter } = require('./controllers/login')
const { usersRouter } = require('./controllers/users')

app.use('/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Blogi!</h1>')
})

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

server.listen(config.port, () => {
  console.log(`Running server on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server
}