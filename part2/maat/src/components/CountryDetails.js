import axios from "axios"
import React, { useEffect, useState } from "react"
import CityWeather from './CityWeather'


const Currency = ({currency}) => {

    return(
      <p>
        {currency.name} {currency.symbol}
      </p>
    )
  }
  
  const Language = ({language}) => {
  
    return(
      <li>
        {language}
      </li>
    )
  }

  const CountryDetails = ({country}) => {
  
    
    const currencies = Object.values(country.currencies)

    console.log(currencies);
  
    return(
      <div>
        <h2>
        {country.name.common} - {country.cca2}
        </h2>
  
        <p>Capital: {country.capital}</p>
  
        <h3>Currencies </h3>
        <ul>
          {currencies.map(currency =>
                <Currency key = {currency.name} currency = {currency}/>
                        
          )} 
        </ul>
  
      <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language =>
                <Language key = {language} language={language}/>
                        
          )} 
        </ul>
  
        <img src={country.flags.png} />
        

      <h3>Weather in {country.capital}</h3>
        <CityWeather key={country.capital} city = {country.capital} />
      </div>
    )
  
  }
  export default CountryDetails