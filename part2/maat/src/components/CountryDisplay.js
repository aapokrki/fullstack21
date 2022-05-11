import React, {useState, useEffect } from 'react'
import CountryDetails from './CountryDetails'


const CountryDisplay = ({countriesToShow, handleFilterChange}) => {

  if(countriesToShow.length > 10){
    return(
      <p>Narrow it down</p>
    )

  }else if (countriesToShow.length == 1){
    console.log(countriesToShow[0].cca2)
    return (
      
      <CountryDetails key = {countriesToShow[0].cca2} country={countriesToShow[0]}/>
      )

  }else{
    return(
      <ul>
        {countriesToShow.map(country =>

        <li key={country.cca2}>

          {country.name.common}
          
          <button value={country.name.common} 
                  onClick={handleFilterChange}>show</button>
        </li>
            
            
          )}
          
      </ul>
    )
  }

   
}
export default CountryDisplay