import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (

  <button onClick={handleClick}>{text}</button>

)

const App = () => {

  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  // let points = Array(anecdotes.length).fill(0);
  // let copy = [...points];
  
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const setRandomAnecdote = () => {
    const randomElement = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomElement);
    console.log(votes);
  }

  const addVote = () => {
    
    const copy = [...votes]
    copy[selected] += 1;
    // points[selected] += 1;
    setVote(copy);
    if(copy[selected] > copy[mostVotes]){
      setMostVotes(selected);
    }
    
  }

  return (
    <div>
      <h1>The anecdote with the most votes</h1>
      <>{anecdotes[mostVotes]}  <b>has {votes[mostVotes]} votes</b></>
      <br></br>

      <Button handleClick={setRandomAnecdote} text = 'next anecdote'/>
      <Button handleClick={addVote} text = 'vote'/>
      <h1>The anecdote of the day</h1>
      <>{anecdotes[selected]}  <b>has {votes[selected]} votes</b></>
      

      
    </div>
  )
}

export default App