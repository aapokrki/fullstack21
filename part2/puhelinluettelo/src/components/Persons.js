import React from 'react'



const Person = ({id, name, number, deletePerson}) => {
  const message = `Delete ${name}`
    return (
      <li>
        {name} {number}
        <button onClick={() => (window.confirm(message) ? deletePerson(id) : null)}>delete</button>
      </li>
      
    )
}

const Persons = ({personsToShow, deletePerson}) => {
    return (
        <ul>
        {personsToShow.map(person =>
            <Person key = {person.id}
                    id = {person.id}
                    name = {person.name}
                    number = {person.number}
                    deletePerson = {(id) => deletePerson(id)}/>)}
      
        </ul>
    )
  }
export default Persons