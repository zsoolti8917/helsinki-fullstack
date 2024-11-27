import PropTypes from 'prop-types';



function App() {
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
      <Content parts={course.parts}/>
      <Total total={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

Header.propTypes = {
  course: PropTypes.string.isRequired
}

const Content = (props) => {
  return (
    <>
    {props.parts.map((part, index) => <Part key={index} part={part.name} exercises={part.exercises} />)}
    </>
  )
}

Content.propTypes = {
  parts: PropTypes.array.isRequired
}

const Part = (props) => {
console.log(props)
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

Part.propTypes = {
  part: PropTypes.string.isRequired,
  exercises: PropTypes.number.isRequired
}

const Total = (props) => {
  let total = 0
  props.total.forEach(part => total += part.exercises)
  return (
    <p>Number of exercises {total}</p>
  )
}

Total.propTypes = {
  total: PropTypes.array.isRequired
}

export default App
