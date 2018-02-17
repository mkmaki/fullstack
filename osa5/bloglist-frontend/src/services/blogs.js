import axios from 'axios'
//const baseUrl = '/api/blogs'

//const baseUrl = 'http://localhost:3003'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  // put default auth header here?
}

const getAll = () => {
  const request = axios.get('/api/blogs')
  return request.then(response => response.data)
}

const login = (person) => {
  return axios.post('/login', person)
}

// Adds +1 to likes
const modify = (id) => {
  return axios.put(`/api/blogs/${id}`)
}

const deleteBlog = (blog) => {
  return axios({
    method: 'delete',
    url: `/api/blogs/${blog.id}`,
    headers: {'Authorization': token}
  })
}

const create = (person) => {
  return axios({
    method: 'post',
    url: '/api/blogs',
    data: person,
    headers: {'Authorization': token}
  })
}



export default { getAll, login, setToken, create, modify, deleteBlog }

