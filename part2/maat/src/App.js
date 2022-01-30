import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'


const App = () => {

  const[countries, setCountries] = useState([])
  const[newFilter, setNewFilter] = useState('Ru')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')



  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return(
    <div>
      <h2>COUNTRIES</h2>
      <p>find countries <input value = {newFilter} onChange = {handleFilterChange}/></p>

     
        <CountryDisplay key = {1} countriesToShow={countriesToShow}/>
      
    </div>

  )
}

export default App