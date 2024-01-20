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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content courseParts={course.parts} />
      <Part courseParts={course.parts[0]}/>
      <Part courseParts={course.parts[1]}/>
      <Part courseParts={course.parts[2]}/>
      <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises} />
    </div>
  )

}
export default App