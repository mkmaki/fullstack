const blogsRouter = require ('express').Router()

const jwt = require('jsonwebtoken')
const auth = require('../utils/auth')

const { Blog } = require ('../models/blogs')
const { User } = require ('../models/users')

const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())
blogsRouter.use(auth)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1 })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  if(!request.body.likes) {
    request.body.likes = 0
  }
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'Missing title or url' })
  }
  if(!request.body.token) {
    return response.status(400).json({ error: 'Authorization header required' })
  }
  try {
    const decodedToken = jwt.verify(request.body.token, process.env.SECRET)
    request.body.user = decodedToken.id
    request.body.author = decodedToken.name
    const blog = new Blog(request.body)
    const result = await blog.save()

    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (exception) {
    response.status(400).json({ error: 'invalid token' })
  }
})

// 4.13
blogsRouter.delete('/:id', async (request, response) => {
  const blogId = String(request.params.id)

  if(!request.body.token) {
    return response.status(400).json({ error: 'Authorization header required' })
  }
  try {
    const decodedToken = jwt.verify(request.body.token, process.env.SECRET)

    if(!decodedToken.id) {
      return response.status(400).json({ error: 'invalid token' })
    }
    const blogi = await Blog.findById(blogId)

    if(decodedToken.id === String(blogi.user)) {
      await Blog.findByIdAndRemove(blogId)
      return response.status(204).end()
    } else {
      return response.status(400).json({ error: 'Authorization failed' })
    }

  } catch (exception) {
    response.status(400).json({ error: exception.name })
  }
})

// 4.14.
blogsRouter.put('/:id', async (request, response) => {
  const blogId = String(request.params.id)
  const ob = {}
  ob.likes = request.body.likes
  try {
    const update = await Blog.findByIdAndUpdate(blogId, { $set: ob })
    response.json(ob)
  } catch (exception) {
    response.status(400).end()
  }
})

module.exports = {
  blogsRouter
}



