import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import { getAll, create, deletePerson, updatePerson } from './services/people.js'
import Notification from './components/Notification.jsx'
function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

    useEffect(() => {
      getAll().then(res => {
        setPersons(res)
      })
    }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const newId = persons.length > 0 ? Math.max(...persons.map(person => parseInt(person.id))) + 1 : 1;

    const person = {
      name: newName,
      number: newNumber,
      id: newId.toString()
    }

    if(!(persons.find((element) => element.name === person.name))){
      create(person).then((res) => {
        setPersons(persons.concat(res))
      })
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${person.name} succesfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }else{
      if (window.confirm(`${newName} is already added to the Phonebook, replace the old number with the new one?`)){
        const oldPerson = persons.find(n => n.name === person.name)
        const changedPerson = {...oldPerson, number: person.number}
        updatePerson(oldPerson.id, changedPerson).then((res) => {
          setPersons(persons.map((x => x.name === person.name ? res : x)))
        })
        setMessage(`Updated ${person.name}'s phone number succesfully`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }

    console.log(message)
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
      const currentPerson = persons.filter(person => person.id !== id)
      deletePerson(id).then(() => {
        setPersons(currentPerson)
        setMessage(`Deleted ${currentPerson.name} from the database`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        console.log(error)
        setMessage(`The person with ${currentPerson.name} was already deleted from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const notesToShow = (search === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <Notification message={message} />
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
