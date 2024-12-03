import { useState } from 'react'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => {
        return(
          <p key={i}>{person.name}</p>
        )
      })}
    </div>
  )
}

export default App
