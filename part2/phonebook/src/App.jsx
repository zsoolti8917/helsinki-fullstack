import { useState } from 'react'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }

    if(!(persons.find((element) => element.name === person.name))){
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const notesToShow = (search === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <form>
          <div>
            filter shown with <input value={search} onChange={handleSearchChange} />
          </div>
        </form>

      <h2>Add a new</h2>
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
      {notesToShow.map((person) => {
        return(
          <p key={person.id}>{person.name} {person.number}</p>
        )
      })}
    </div>
  )
}

export default App
