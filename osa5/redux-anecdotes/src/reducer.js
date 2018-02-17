const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)
const getVotes = () => (100*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: getVotes()
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  //console.log('state now: ',state)
  //console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const anecdoteTochange = state.find(n => n.id === action.data.id)
      const anecdoteModified = { ...anecdoteTochange }
      anecdoteModified.votes++
      return state.map(anec => anec.id !== action.data.id ? anec : anecdoteModified)
    case 'ADD':
    //console.log('AC data:',action.data.val)
      const newOb = asObject(action.data.val)
      console.log('AC:', newOb)
      return state.concat(newOb)
  }
  return state
}

export default reducer
