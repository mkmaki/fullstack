const auth = (request, response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')) {
    request.body.token = auth.substring(7)
  }
  next()
}

module.exports = auth