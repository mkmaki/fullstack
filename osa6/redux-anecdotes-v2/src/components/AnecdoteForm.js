import React from 'react'
import { create } from '../reducers/anecdotesReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.create(content)
    this.props.notify(`You created a new blog "${content}"`)
    
    setTimeout(() => {
      this.props.notify('')
    }, 5000)
    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
        <button onClick={ () => console.log(this.props.state) }>State </button>
      </div>
     )
   }
}

const mapDispatchToProps = {
    create: create,
    notify: notify
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
