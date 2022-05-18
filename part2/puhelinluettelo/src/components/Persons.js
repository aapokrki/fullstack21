import React from 'react'

const Persons = ({personsToShow, deletePerson}) => {

    return (
      <ul>
      {personsToShow.map(person =>
        <li key = {person.name}>
          {person.name} {person.number}
          <button onClick={e => deletePerson(e, person.id)}>delete</button>
        </li>)}
    
      </ul>
    )
  }
export default Persons