import {useEffect, useState } from 'react'
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
  console.log(props.hasFeedback);
  return (
    <>
        <p>{props.text} {props.value}</p>
    </>
  )
}

Statistics.propTypes = {
  hasFeedback: PropTypes.bool
}

Statistics.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const handleClick = (type) => {
    if (type === "Good") {
      setGood(good + 1);
    } else if (type === "Neutral") {
      setNeutral(neutral + 1);
    } else if (type === "Bad") {
      setBad(bad + 1);
    }
    setTotal(total + 1);
  };

  useEffect(() => {
    const calculateAverage = () => {
        setAverage((good - bad) / (total))
    };

    const calculatePositive = () => {
      setPositive((good*100)/total)
    };
    if(total !== 0){
      if(!(((good - bad) / (total)) < 0)){
        calculateAverage();
      }
      if(!(((good*100)/total) < 0)){
        calculatePositive();
      }

    }

  }, [good, bad, neutral, total]);

  const hasFeedback = () => {
    return good !== 0 || neutral !== 0 || bad !==0
  }

  return (
    <>
     <Heading title="Give feedback" />
     <button onClick={() => handleClick("Good")}>Good</button> 
     <button onClick={() => handleClick("Neutral")}>Neutral</button> 
     <button onClick={() => handleClick("Bad")}>Bad</button> 
     <Heading title="Statistics" />
    {hasFeedback() ? (
      <>
        <Statistics text="Good" value={good}  />
        <Statistics text="Neutral" value={neutral} />
        <Statistics text="Bad" value={bad} />
        <Statistics text="All" value={total} />
        <Statistics text="Average" value={average} />
        <Statistics text="Positive" value={positive }/>
      </>
    ) : (
      <p>No feedback given.</p>
    )}
     
    </>
  )
}


export default App
