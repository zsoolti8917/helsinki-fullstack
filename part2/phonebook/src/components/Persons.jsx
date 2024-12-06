import PropTypes from 'prop-types'


const Persons = ({notesToShow, deleteHandleChange}) => {
  return (
    <ul>
    {notesToShow.map((person) => {
        return(
          <li key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandleChange(person.id)}>delete {person.id} </button></li>
          
        )
      })}
    </ul>

  )
}

Persons.propTypes = {
    notesToShow: PropTypes.array,
    deleteHandleChange: PropTypes.func
}

export default Persons