import PropTypes from 'prop-types'
const Total = ({total}) => {
  return (
    <div>Total of {total} exercises</div>
  )
}

Total.propTypes = {
    total: PropTypes.number
}

export default Total