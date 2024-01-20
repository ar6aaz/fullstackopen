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

const Content = (props) => {
  return(
    <div>
      <p>
      {props.courseParts[0].part} {props.courseParts[0].exercises}
      </p>
      <p>
        {props.courseParts[1].part} {props.courseParts[1].exercises}
      </p>
      <p>
      {props.courseParts[2].part} {props.courseParts[2].exercises}
      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
      {props.courseParts.part} {props.courseParts.exercises}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const courseParts = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      {/* <Content courseParts={courseParts} /> */}
      <Part courseParts={courseParts[0]}/>
      <Part courseParts={courseParts[1]}/>
      <Part courseParts={courseParts[2]}/>
      <Total total={courseParts[0].exercises+courseParts[1].exercises+courseParts[2].exercises} />
    </div>
  )

}
export default App