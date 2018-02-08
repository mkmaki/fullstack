// 4.3
const dummy = (blogs) => {
  return 1
}

// 4.4
const totalLikes = (blogs) => {
  const tot = blogs.reduce((eka, toka) => eka + toka.likes, 0)
  return tot
}

// 4.5
const favoriteBlog = (blogs) => {
  const ret = Object.keys(blogs).reduce((a, b) => blogs[a].likes > blogs[b].likes ? a : b)
  return blogs[ret]
}
// 4.6
const mostBlogs = (blogs) => {
  const count = blogs.reduce( (mostBlogs, next) => {
    mostBlogs[next.author] = (mostBlogs[next.author] || 0) + 1
    return mostBlogs
  } , {})

  const author = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b)
  const ob = {}
  ob.author = author
  ob.blogs = count[author]
  return ob
}

// 4.7
const mostLikes = (blogs) => {
  const count = blogs.reduce( (mostLikes, next) => {
    mostLikes[next.author] = (mostLikes[next.author] || 0) + next.likes
    return mostLikes
  } , {})

  const author = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b)
  const ob = {}
  ob.author = author
  ob.votes = count[author] // returns votes instead of likes
  return ob
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}