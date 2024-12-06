import PropTypes from 'prop-types'

const Notification = ({message}) => {
    if(message===null){
        return null
    }

  return (
    <div className='container'>
        <p className='text'>
          {message}
        </p>
      </div>
  )
}

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification