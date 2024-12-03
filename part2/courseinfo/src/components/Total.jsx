import PropTypes from 'prop-types'
const Total = ({total, totalExercises}) => {
  return (
    <>
        <p>Total of {total} parts</p>
        <p>Total of {totalExercises} exercises</p>
    </>

    
  )
}

Total.propTypes = {
    total: PropTypes.number,
    totalExercises: PropTypes.number
}

export default Total