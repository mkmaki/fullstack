import axios from 'axios'
//const baseUrl = '/api/persons'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllNumbers = () => {
  return axios.get(baseUrl)
}

const addPerson = (person) => {
  return axios.post(baseUrl, person)
}

const replacePerson = (person, id) => {
  return axios.put(`${baseUrl}/${id}`, person)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAllNumbers, addPerson, replacePerson, removePerson }