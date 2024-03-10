import { useState } from "react";
import axios from 'axios';

const SingleCountry = ({filteredCountries}) => {
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [imageUrl, setImageUrl] = useState('');

  const city = filteredCountries[0].capital[0]
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  
  const url = 'https://api.openweathermap.org/data/2.5/weather'
   const request = axios.get(url, {
    params: {
      q: city,
      appid: api_key
    }
  });

  request.then(response => {
    setTemp(response.data.main.temp - 273.15)
    setWind(response.data.wind.speed)
    setImageUrl('https://openweathermap.org/img/wn/'+response.data.weather[0].icon+'@2x.png')
  })
  
  
  return (
    <>
      {filteredCountries
      .map(country => (
        <>
        <h1 key={country.id}>{country.name.common}</h1>
        <div key={country.id}>capital: {country.capital}</div>
        <div key={country.id}>area: {country.area}</div>
        <h4>languages: </h4>
        {Object.entries(country.languages).map(([code, language], index) => (
          <div key={index}>
            <ul><li>{language}</li></ul>
          </div>
        ))}
        <div>{country.flag}</div>
        <h1>Weather in {country.capital}</h1>
        <div>temperature {temp}</div>
        <div>
          <img src={imageUrl} />
        </div>
        <div>wind {wind} m/s</div>
        </>
      ))}
    </>
  )
}

const MultipleCountries = ({filteredCountries}) => {
  const [renderSingleCountry, setRenderSingleCountry] = useState(false);
  const [singleCountry, setSingleCountry] = useState(null);
  
  const handleClick = (event) => {
    const country = filteredCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if(country!=null){
      setSingleCountry(country)
      setRenderSingleCountry(true)
    }
  }

  return (
    <>
      {
        renderSingleCountry === false ? (
          filteredCountries
           .map(country => (
             <div key={country.id}>
               {country.name.common}&nbsp;
               <button value={country.name.common} onClick={handleClick}>show</button>
             </div>
      )))
        :
        <SingleCountry filteredCountries={singleCountry} />
      }
    </>
  )
}

const ShowAllCountries = ({countries}) => {
  return (
    <>
      {countries != null ? (
        countries
          .filter(country => country.name != null)
          .map(country => (
            <div key={country.id}>
              {country.name.common}
            </div>
          ))
      ) : (
        <p>Loading countries...</p>
      )}
    </>
  );
}

const ShowFilteredCountries = ({countries, countryName}) => {
  const filteredCountries = countries != null
        ? countries
            .filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))
        : [];

  return (
    <>
      {
        (filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>)
        ||
        (filteredCountries.length === 1 && <SingleCountry filteredCountries={filteredCountries} />)
        ||
        (filteredCountries.length < 10 && <MultipleCountries filteredCountries={filteredCountries} /> )
      }
    </>
  );
}

const Country = ({ countries, country }) => {

  return(
    <>
      {
        country === null
        ? <ShowAllCountries countries={countries}/>
        : <ShowFilteredCountries countries={countries} countryName={country} />
      }
    </>
  )
    
  };

export default Country