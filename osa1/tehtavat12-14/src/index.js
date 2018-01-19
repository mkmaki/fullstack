import React from 'react'
import ReactDOM from 'react-dom'

// Mixing ES5/ES6 syntax for fun

const Anecdote = ({title, anecdote}) => {
    return (
        <div>
            <div>{title}</div>
            <div>{anecdote}</div>            
        </div>
    )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {}     
    }
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)    
    this.setState({ selected: random })
  }

  handleVoteClick = () => {
    const obj = this.state.votes
    if(!obj[this.state.selected]) {        
        obj[this.state.selected] = 0
    }
    obj[this.state.selected] = obj[this.state.selected] + 1
    this.setState({ votes: obj })
  }

  render() {
    const ob = this.state.votes
    const most = Object.keys(ob).reduce((a,b) => ob[a] > ob[b] ? a : b, 0)
    return (
      <div>        
        <Anecdote anecdote={anecdotes[this.state.selected]}/>
        <div>
            <button onClick={this.handleClick}>Next anecdote</button>
            <button onClick={this.handleVoteClick}>Vote</button>
        </div>
        <Anecdote anecdote={anecdotes[most]} title="Anecdote with most votes:"/>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)