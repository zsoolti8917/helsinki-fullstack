import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])

useEffect(() => {
  axios.get('http://localhost:3000/persons').then(res => {
    console.log(res)
    setPersons(res.data)
  })
}, [])
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
        
        <Filter value= {search} eventHandler={handleSearchChange}/>

      <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleInputNumChange={handleInputNumChange} name={newName} number={newNumber}/>
      <h2>Numbers</h2>
        <Persons notesToShow={notesToShow} />
    </div>
  )
}



export default App
