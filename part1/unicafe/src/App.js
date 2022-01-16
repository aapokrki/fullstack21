import React, { useState } from 'react'

const StatisticsLine = (props) => {
  return(
    <div>
      
        {props.text} {props.value}
      
    </div>
  )
}

const Statistics = (props) => {
  if (props.all == 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
        <StatisticsLine text = "good" value = {props.good}/>
        <StatisticsLine text = "neutral" value = {props.neutral}/>
        <StatisticsLine text = "bad" value = {props.bad}/>
        <StatisticsLine text = "all" value = {props.all}/>
        <StatisticsLine text = "average" value = {props.average}/>
        <StatisticsLine text = "positive" value = {props.positive} />



    </div>
  )
}

const Button = ({ handleClick, text }) => (
  
  <button onClick={handleClick}>

    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    console.log("good clicked");
    
    setGood(good+1);
    setAll(all +1 );

    setAverage((good-bad)/all)
    setPositive(100 * good/all)

  }
  const handleNeutralClick = () => {
    console.log("neutral clicked");
    
    setNeutral(neutral + 1);
    setAll(all +1 );
    
    setAverage((good-bad)/all)
    setPositive(100 * good/all)
  }
  const handleBadClick = () => {
    console.log("bad clicked");

    setBad(bad + 1);
    setAll(all + 1 );
    setAverage((good-bad)/all)
    setPositive(100 * good/all)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = 'good'/>
      <Button handleClick={handleNeutralClick} text = 'neutral'/>
      <Button handleClick={handleBadClick} text = 'bad'/>

      <h1>statistics</h1>
    
      <Statistics good = {good} neutral = {neutral} bad = {bad}
      all = {all} positive = {positive} average = {average}/>

    </div>
  )
}

export default App
