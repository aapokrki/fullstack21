import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)
  //.sort((a,b) => b.votes - a.votes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  console.log(anecdotes[0].votes)

  const vote = async (anecdote) => {
    const id = anecdote.id
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted: ${anecdote.content}`))

  }

  const anecdotesToShow = [...anecdotes]
      .sort((a,b) => b.votes - a.votes) // sort in order
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) // filter by input
  
  return( 
    <>
    {anecdotesToShow.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList