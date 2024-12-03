import { useState } from 'react'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "+421123456789"

     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber
    }

    if(!(persons.find((element) => element.name === person.name))){
      setPersons(persons.concat(person))
      setNewName('')
    }else{
      alert(`${person.name} is already on the list`)
    }

    console.log(persons)
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} required />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumChange} required />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => {
        return(
          <p key={i}>{person.name} {person.number}</p>
        )
      })}
    </div>
  )
}

export default App
