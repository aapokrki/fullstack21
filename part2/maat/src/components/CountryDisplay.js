import React from 'react'


const Country = ({country}) => {
  return(
    <li>
      {country.name.common}
    </li>
  )

}
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
      

      

    </div>
  )

}

const CountryDisplay = ({countriesToShow}) => {

  if(countriesToShow.length > 10){
    return(
      <p>Narrow it down</p>
    )

  }else if (countriesToShow.length == 1){
    return (
      
      <CountryDetails key = {countriesToShow[0].cca2} country={countriesToShow[0]}/>
      
    )

  }else{
    return(
      <ul>
        {countriesToShow.map(country =>
            <Country key = {country.cca2} country = {country}/>
          )}
      </ul>
    )
  }

   
}
export default CountryDisplay