import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import { getAll, create, deletePerson } from './services/people.js'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


    useEffect(() => {
      getAll().then(res => {
        setPersons(res)
      })
    }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
      id: (persons.length+1).toString()
    }

    if(!(persons.find((element) => element.name === person.name))){
      create(person).then((res) => {
        setPersons(persons.concat(res))
      })
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

  const deleteHandleChange = (id) => {
    if (window.confirm(`Delete person with id ${id}?`)) {
      deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        console.log(error)
        alert(`The person with id ${id} was already deleted from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const notesToShow = (search === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
        
        <Filter value= {search} eventHandler={handleSearchChange}/>

      <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleInputNumChange={handleInputNumChange} name={newName} number={newNumber}/>
      <h2>Numbers</h2>
        <Persons notesToShow={notesToShow} deleteHandleChange={deleteHandleChange} />
    </div>
  )
}



export default App
