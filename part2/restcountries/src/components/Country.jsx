import { useState } from "react";

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
            .map(country => country.name.common)
        : [];

  console.log("filteredCountries: ", filteredCountries)

  return (
    <>
      {
       filteredCountries.length > 10
       ?
          <p>Too many matches, specify another filter</p>
       : 
        filteredCountries
          .map(country => (
            <div key={country.id}>
              {country}
            </div>
          ))
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