import PropTypes from 'prop-types'
const Part = ({name, exercises}) => {
  return (
    <p>
        {name} {exercises}
    </p>
  )
}

Part.propTypes = {
    name: PropTypes.string.isRequired,
    exercises: PropTypes.number.isRequired
}

export default Part