import { useDispatch } from "react-redux";
import {createAnecdote}  from "../reducers/anecdoteReducer";
import {setNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added: ${content}`, 5))

  }

  return (
    <>
    <h2>Create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
    
  )
}
export default AnecdoteForm