import React from 'react';

const Header = (props) => {
    return(
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Total = ({courseParts}) => {
    const total = courseParts.reduce((accumulator, p) => {
      accumulator += p.exercises
      return accumulator
    }, 0)
    return <b>total of {total} exercises</b>
  }
  
  const Part = (props) => {
    return(
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = ({courseParts}) => {
    return(
      <>
        {
          courseParts.map(coursePart => <Part key={coursePart.id} part={coursePart.name} exercises={coursePart.exercises} />)
        }
      </>
    )
  }
  
  const Course = ({courses}) => {
    return(
      <>
      {courses.map(course => (
        <div id={course.id}>
          <Header course={course.name} />
          <Content courseParts={course.parts}/>
          <Total courseParts={course.parts}/>
        </div>
      ))}
      </>
    )
  }

export default Course
