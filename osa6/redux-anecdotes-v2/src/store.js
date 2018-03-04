import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdotesReducer from './reducers/anecdotesReducer'
import filterReducer  from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer,
  notification: notificationReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store