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
        console.log(innitialPersons)
        setPersons(innitialPersons)
      })
  },[])

  //console.log('render', persons.length, 'people')

  const changeNumber = (person) => {
    const changedNumber = {...person, number: newNumber}
    console.log(changeNumber)

    personsService
      .update(person.id, changedNumber)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.map(p => p !== person ? person : returnedPerson))
      })

  }

  const addPerson = (event) => {
    
    persons.forEach(e => console.log(e.name, e.id))
    const person = persons.find(p => p.name.trim() === newName.trim())
    if(typeof person != 'undefined'){
      const changeTheNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
    
      if(changeTheNumber){
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