const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  adult: Boolean,
  password: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = function (content) {
  return {
    id: content.id,
    username: content.username,
    name: content.name,
    adult: content.adult,
    blogs: content.blogs
  }
}

const User = mongoose.model('User', userSchema )

module.exports = {
  User
}