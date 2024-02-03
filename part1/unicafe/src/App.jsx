import React from 'react'
import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    if( good+bad+neutral === 0){
      return (
        <p>No feedback given</p>
      )
    }
    else {
      return (
        <>
        <table>
          <tbody>
            <StatisticLine name="good" num={good} />
            <StatisticLine name="neutral" num={neutral}/>
            <StatisticLine name="bad" num={bad} />
            <StatisticLine name="total" num={good + bad + neutral} />
            <StatisticLine name="average" num={(good-bad)/(good+bad+neutral)}/>
            <StatisticLine name="positive" num={(good)/(bad+good+neutral)*100}/>
          </tbody>
        </table>
        </>
      )
   }
}

const StatisticLine = ({name, num}) => {
    return (
      <tr>
        <td>{name}</td>
        <td>{num}</td>
      </tr>
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App