import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store' 
import anecdotes from './services/anecdotes'

anecdotes
  .getAll()
  .then(anecdotes => {
    anecdotes.forEach(anecdote => store.dispatch({ type: 'CREATE', content: anecdote.content }))
  })

  ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
