import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number : '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    if(persons.filter(e => e.name === newName).length > 0){
      window.alert(`${newName} is already added to phonebook`);
        
    }else{
      event.preventDefault()
      const personObject = {
        name: newName,
        number : newNumber
      }
      setPersons(persons.concat(personObject));
      setNewNumber('');
      setNewName('');
    }
  }

  const handleNameInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const Person= ({ name, number }) => {
    return (
      <li>{name} {number}</li>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>

          name: <input 
                value={newName}
                onChange={handleNameInputChange}/>

        </div>
        <div>

          number: <input
                  value = {newNumber}
                  onChange={handleNumberInputChange}/>

        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      



      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key = {person.name} name = {person.name} number = {person.number}/>)}
      </ul>
    </div>
  
        
  )}

export default App