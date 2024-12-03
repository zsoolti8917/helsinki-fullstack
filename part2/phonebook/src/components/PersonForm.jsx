import PropTypes from 'prop-types'

const PersonForm = ({handleSubmit, handleInputChange, handleInputNumChange, name, number}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleInputChange} required />
    </div>
    <div>
      number: <input value={number} onChange={handleInputNumChange} required />
    </div>
    <div>
      <button type="submit" >add</button>
    </div>
  </form>
  )
}

PersonForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleInputChange: PropTypes.func,
    handleInputNumChange: PropTypes.func,
    name: PropTypes.string,
    number: PropTypes.string
}

export default PersonForm