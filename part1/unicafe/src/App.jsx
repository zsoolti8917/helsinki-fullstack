import { useState } from 'react'
import PropTypes from 'prop-types';


const Heading = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

Heading.propTypes = {
  title: PropTypes.string.isRequired
}

const Statistics = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  )
}

Statistics.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (text) => {
    switch(text){
      case "Good":
        setGood(good + 1);
        break;
      case "Neutral":
        setNeutral(neutral+1);
        break;
      case "Bad":
        setBad(bad+1);
        break;
    }
  }
  return (
    <>
     <Heading title="Give feedback" />
     <button onClick={() => handleClick("Good")}>Good</button> 
     <button onClick={() => handleClick("Neutral")}>Neutral</button> 
     <button onClick={() => handleClick("Bad")}>Bad</button> 
     <Heading title="Statistics" />
     <Statistics text="Good" value={good} />
     <Statistics text="Neutral" value={neutral} />
     <Statistics text="Bad" value={bad} />
    </>
  )
}

export default App
