import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )

}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(innitialPersons => {
        console.log('promise fulfilled')
        setPersons(innitialPersons)
      })
  },[])


  const changeNumber = (person) => {
    const changedPerson = {...person, number: newNumber}

    personsService
      .update(changedPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        console.log("returnedPerson")

        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))

        setNotificationMessage(`Changed ${changedPerson.name}'s number to ${newNumber}`)
        
        setNewNumber('');
        setNewName('');
        
        setTimeout(() => {
          setNotificationMessage(null)
        },5000)
      })


  }

  const addPerson = (event) => {
    
    persons.forEach(e => console.log(e.name, e.id))
    const person = persons.find(p => p.name.trim() === newName.trim())
    if(typeof person != 'undefined'){
      const changeTheNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(changeTheNumber){
        // Remember to preventDefault so that the site doesnt refresh
        event.preventDefault()
        changeNumber(person)
      }

    }else{
      event.preventDefault() 
      const personObject = {
        name: newName,
        number : newNumber
      }

      personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));

        setNotificationMessage(`Added ${newName}`)
        
        setNewNumber('');
        setNewName('');

        setTimeout(() => {
          setNotificationMessage(null)
        },5000)
        
      })
    }
  }

  const deletePerson = id =>{
    const personName =  persons.find(p => p.id === id).name
    console.log("deletedpersono")
    personsService
    .deletePerson(id)
    .then(() => {
      setPersons(persons.filter(n => n.id !== id))
      setNotificationMessage(`Deleted ${personName}`)
      setTimeout(() => {
        setNotificationMessage(null)
      },5000)
    })
  }

  const handleNameInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => 
                        person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter value = {newFilter} onChange = {handleFilterInputChange}/>
    
      <h2>Add a new</h2>

      <PersonForm newName={newName} newNumber={newNumber} 
                                    handleNameInputChange = {handleNameInputChange} 
                                    handleNumberInputChange = {handleNumberInputChange}
                                    addPerson = {addPerson}/>
      
      <h2>Numbers</h2>

      
      <Persons personsToShow = {personsToShow} deletePerson = {(id) => deletePerson(id)}/>
      

    </div>

  
        
  )}

export default App