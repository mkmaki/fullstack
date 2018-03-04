import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

export const addAnecdote = (anecdote) => {
  return axios.post('http://localhost:3001/anecdotes', anecdote)
}


export default { getAll }