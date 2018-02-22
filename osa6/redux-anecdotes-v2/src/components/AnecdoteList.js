import React from 'react'
import { vote } from '../reducers/anecdotesReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter/>
        {this.props.visibleAnecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes
              <button onClick={() => {
                this.props.notify(`You voted for "${anecdote.content}"`)
                this.props.vote(anecdote.id)
                setTimeout(() => {
                  this.props.notify('')
                  }, 3000)
                }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
    vote: vote,
    notify: notify
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

