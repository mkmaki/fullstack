const { Blog } = require('../models/blogs')

const initialBlogs = [
  {
    title: "Initial 1",
    author: "Author 1",
    url: "",
    likes: 1,
    id: "5a785cfc2da1ebd0049afd6a"
    },
    {
    title: "Initial 2",
    author: "Author 2",
    url: "",
    likes: 2,
    id: "5a785cfd06404ed00458a42d"
    },
]
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

module.exports = {
  blogsInDb, initialBlogs
}