import { useState } from "react";

const SingleCountry = ({filteredCountries}) => {
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
        </>
      ))}
    </>
  )
}

const ShowAllCountries = ({countries}) => {
  return (
    <>
    {console.log('showing all')}
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
        (
         filteredCountries
           .map(country => (
             <div key={country.id}>
               {country.name.common}
             </div>
           ))
        )
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