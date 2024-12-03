import PropTypes from 'prop-types'


const Persons = ({notesToShow}) => {
  return (
    <ul>
    {notesToShow.map((person) => {
        return(
          <li key={person.id}>{person.name} {person.number}</li>
        )
      })}
    </ul>

  )
}

Persons.propTypes = {
    notesToShow: PropTypes.array
}

export default Persons