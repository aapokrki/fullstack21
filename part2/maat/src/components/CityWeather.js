import { useEffect, useState } from "react";
import axios from "axios";

const CityWeather = ({city}) => {

    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})

    useEffect(() =>{
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${api_key}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
      console.log(`https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${api_key}`)

    },[])

    return(
        <>
        {weather.main ? (
          <div>
            <div>Temperature {(weather.main.temp-273.15).toFixed(1)}°C</div>
            <img
              alt="weather icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <div>Wind {weather.wind.speed} m/s</div>
          </div>
        ) : null}
      </>
    )
    

}
export default CityWeather;