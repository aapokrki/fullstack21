import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state,action){
      return state.map(anecdote => 
        anecdote.id !== action.payload.id ? anecdote : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state,action) {
      return action.payload
    }
  },

})
export const {appendAnecdote, setAnecdotes, addVote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {

  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.update(content)
    dispatch(addVote(newAnecdote))
  }
}
export default anecdoteSlice.reducer