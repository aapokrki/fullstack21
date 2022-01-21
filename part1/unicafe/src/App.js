import React, { useState } from 'react'

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  

  if (props.good > 0 || props.neutral > 0 || props.bad > 0){

  let total = props.good + props.neutral + props.bad;
  let average = (props.good * 1 + props.neutral * 0 + props.bad * -1)/total;
  let positivePercent = `${(props.good / total) * 100}%`;
  
  if(total == 0){
    average = 0;
  }

  return(
    <div>
      <table>
        <tbody>
          <StatisticsLine text = "good" value = {props.good}/>
          <StatisticsLine text = "neutral" value = {props.neutral}/>
          <StatisticsLine text = "bad" value = {props.bad}/>
          <StatisticsLine text = "all" value = {total}/>
          <StatisticsLine text = "average" value = {average}/>
          <StatisticsLine text = "positive" value = {positivePercent} />
        </tbody>
      </table>
    </div>
  );

  }else{
    return(
      <div>
        No feedback given
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (

  <button onClick={handleClick}>{text}</button>

)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("good clicked"); 
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    console.log("neutral clicked");   
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    console.log("bad clicked");
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = 'good'/>
      <Button handleClick={handleNeutralClick} text = 'neutral'/>
      <Button handleClick={handleBadClick} text = 'bad'/>

      <h2>statistics</h2>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>

    </div>
  )
}

export default App
