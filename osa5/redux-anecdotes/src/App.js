import React from 'react';


class App extends React.Component {

  onSubmit = (event) => {
    event.preventDefault()
    const val = document.forms.addAnecdote.content.value
    console.log(val)
    this.props.store.dispatch({ type: 'ADD', data: { content: val }})
    document.forms.addAnecdote.content = 'kulli'
  }

  render() {
    const anecdotes = this.props.store.getState()
    console.log('ANEC: ', anecdotes)


    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort(function(a,b) {
            return b.votes - a.votes
          })
          .map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch({ type: 'VOTE', data: { id: anecdote.id, votes: anecdote.votes } })}>
                vote
              </button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form name="addAnecdote" onSubmit={this.onSubmit}>
          <div><input name="content"/></div>
          <button onClick={this.onSubmit}>
            create
          </button> 
        </form>
      </div>
    )
  }
}

export default App