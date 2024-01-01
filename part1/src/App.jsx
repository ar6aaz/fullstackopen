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
      {props.courseParts[0].part1} {props.courseParts[0].exercises1}
      </p>
      <p>
        {props.courseParts[1].part2} {props.courseParts[1].exercises2}
      </p>
      <p>
      {props.courseParts[2].part3} {props.courseParts[2].exercises3}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const courseParts = [
    { part1: 'Fundamentals of React', exercises1: 10 },
    { part2: 'Using props to pass data', exercises2: 7 },
    { part3: 'State of a component', exercises3: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content courseParts={courseParts}/>
      <Total total={courseParts[0].exercises1+courseParts[1].exercises2+courseParts[2].exercises3} />
    </div>
  )

}
export default App