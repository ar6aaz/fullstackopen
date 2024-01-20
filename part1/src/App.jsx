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

const Content = (props) => {
  return(
    <div>
      <p>
      {props.courseParts[0].name} {props.courseParts[0].exercises}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exercises}
      </p>
      <p>
      {props.courseParts[2].name} {props.courseParts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content courseParts={parts} />
      <Part courseParts={parts[0]}/>
      <Part courseParts={parts[1]}/>
      <Part courseParts={parts[2]}/>
      <Total total={parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  )

}
export default App