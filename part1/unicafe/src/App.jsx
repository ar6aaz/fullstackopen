import React from 'react'
import { useState } from 'react'

const StatisticsContainer = ({good, neutral, bad}) => {
    if( good+bad+neutral === 0){
      return (
        <p>No feedback given</p>
      )
    }
    else {
      return (
        <>
          <Statistics name="good" num={good} />
          <Statistics name="neutral" num={neutral}/>
          <Statistics name="bad" num={bad} />
          <Statistics name="total" num={good + bad + neutral} />
          <Statistics name="average" num={(good-bad)/(good+bad+neutral)}/>
          <Statistics name="positive" num={(good)/(bad+good+neutral)*100}/>
        </>
      )
   }
}

const Statistics = ({name, num}) => {
    return (
      <p>{name} {num}</p>
    )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} >{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [goodPercent, setGoodPercent] = useState(0)

  const calculateAverage = () => {
    const newAverage = (good - bad)/total
    setAverage(newAverage)
  }

  const goodReview = () => {
    setGood(good + 1)
    setTotal(total + 1)
    calculateAverage()
    setGoodPercent(good/total * 100)
  }
  const neutralReview = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    calculateAverage()
    setGoodPercent(good/total * 100)
  }
  const badReview = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    calculateAverage()
    setGoodPercent(good/total * 100)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={goodReview} text="good"/>
      <Button onClick={neutralReview} text="neutral"/>
      <Button onClick={badReview} text="bad"/>

      <h1>statistics</h1>
      <StatisticsContainer good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App