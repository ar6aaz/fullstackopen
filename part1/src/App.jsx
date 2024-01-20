import React from 'react';

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <h1>{props.total}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
      {props.courseParts.name} {props.courseParts.exercises}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Part courseParts={part1}/>
      <Part courseParts={part2}/>
      <Part courseParts={part3}/>
      <Total total={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )

}
export default App