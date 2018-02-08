const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = function (content) {
  return {
    id: content.id,
    title: content.title,
    author: content.author,
    url: content.url,
    likes: content.likes,
    user: content.user
  }
}

const Blog = mongoose.model('Blog', blogSchema )

module.exports = {
  Blog
}