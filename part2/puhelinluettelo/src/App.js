import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(innitialPersons => {
        console.log('promise fulfilled')
        setPersons(innitialPersons)
      })
  }, [])

  console.log('render', persons.length, 'notes')


  const addPerson = (event) => {
    if(persons.filter(e => e.name === newName).length > 0){
      window.alert(`${newName} is already added to phonebook`);
        
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
        setNewNumber('');
        setNewName('');
      })
      
    }
  }

  const deletePerson = id =>{

    console.log("deletedpersono")
    personsService
    .deletePerson(id)
    .then(() => {
      setPersons(persons.filter(n => n.id !== id))
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