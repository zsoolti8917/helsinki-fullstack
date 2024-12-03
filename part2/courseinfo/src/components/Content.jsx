import Part from './Part.jsx'
import PropTypes from 'prop-types'

const Content = ({parts}) => {
    console.log(parts)
  return (
    <>
    {parts.map((part) => {
        return(
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )
       
    })}
    </>

  )
}

Content.propTypes = {
    parts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            exercises: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        })
    ).isRequired
}

export default Content