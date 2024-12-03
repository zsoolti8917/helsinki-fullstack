import PropTypes from 'prop-types'

const Filter = ({value, eventHandler}) => {
  return (
    <form>
    <div>
      filter shown with <input value={value} onChange={eventHandler} />
    </div>
  </form>
  )
}

Filter.propTypes = {
    value: PropTypes.string,
    eventHandler: PropTypes.func
}


export default Filter