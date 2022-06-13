import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

import { configureStore } from '@reduxjs/toolkit'
import anecdoteService from './services/anecdotes'



const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})



export default store